import { expect, it } from "vitest";

import { parseAssembly } from "../parser/parseAssembly";
import { buildAst } from "../ast/buildAst";
import type { ProgramContext } from "../grammar/asmParser";
import { SemanticAnalyzer } from "../semantic/SemanticAnalyzer";
import { CodeGenerator } from "../codegen/CodeGenerator";

it("generates machine code for NOP", () => {
  const { tree } = parseAssembly("NOP");

  const ast = buildAst(tree as ProgramContext);

  const analyzer = new SemanticAnalyzer();

  analyzer.analyze(ast);

  const generator = new CodeGenerator();

  const code = generator.generate(ast);

  console.log(code);
});

it("generates machine code for ADD", () => {
  const { tree } = parseAssembly("ADD R1, R2");

  const ast = buildAst(tree as ProgramContext);

  const analyzer = new SemanticAnalyzer();

  analyzer.analyze(ast);

  const generator = new CodeGenerator();

  const code = generator.generate(ast);
  console.log(code);
  console.log(code[0]);
  console.log(code[0].constructor.name);
  console.log(ast);
  expect(code).toHaveLength(2);
  expect(code[1]).toBe(5);
});
