import { expect, it } from "vitest";

import { parseAssembly } from "../parser/parseAssembly";
import { buildAst } from "../ast/buildAst";
import type { ProgramContext } from "../grammar/asmParser";
import type {
  InstructionNode,
  LabelReferenceNode,
  WordDirNode,
} from "../ast/nodes";

it("builds a ProgramNode for a simple instruction", () => {
  const { tree } = parseAssembly("NOP");

  const ast = buildAst(tree as ProgramContext);

  console.log(JSON.stringify(ast, null, 2));

  expect(ast).toBeDefined();
  expect(ast.statements).toHaveLength(1);
});

it("builds a WORD directive followed by an instruction", () => {
  const { tree } = parseAssembly(`
COUNT WORD 0
NOP
`);

  const ast = buildAst(tree as ProgramContext);

  console.log(JSON.stringify(ast, null, 2));

  const wordDirective = ast.statements[0] as WordDirNode;
  const instruction = ast.statements[1] as InstructionNode;

  expect(wordDirective.label.name).toBe("COUNT");
  expect(wordDirective.value.value).toBe(0);

  expect(instruction.mnemonic).toBe("NOP");
  expect(instruction.operands).toHaveLength(0);
});

it("builds a complete program", () => {
  const { tree } = parseAssembly(`
ORIG 8000h

Loop:
    ADD R1, R2
    BR.NZ Loop
`);

  const ast = buildAst(tree as ProgramContext);
  console.log(JSON.stringify(ast, null, 2));
  expect(ast.statements).toHaveLength(3);

  // ORIG
  expect(ast.statements[0]).toHaveProperty("address");

  // ADD instruction
  const add = ast.statements[1] as InstructionNode;

  expect(add.label?.name).toBe("Loop");
  expect(add.mnemonic).toBe("ADD");
  expect(add.operands).toHaveLength(2);

  // BR.NZ
  const branch = ast.statements[2] as InstructionNode;

  expect(branch.mnemonic).toBe("BR");
  expect(branch.condition).toBe("NZ");
  expect(branch.operands).toHaveLength(1);

  const target = branch.operands[0] as LabelReferenceNode;

  expect(target.name).toBe("Loop");
});
