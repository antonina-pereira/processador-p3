import { expect, it } from "vitest";

import { parseAssembly } from "../parser/parseAssembly";
import { buildAst } from "../ast/buildAst";
import type { ProgramContext } from "../grammar/asmParser";
import { SemanticAnalyzer } from "../semantic/SemanticAnalyzer";
import { CodeGenerator } from "../codegen/CodeGenerator";

it("generates machine code for NOP", () => {
  const { tree } = parseAssembly("NOP");

  const astResult = buildAst(tree as ProgramContext);

  const analyzer = new SemanticAnalyzer();

  analyzer.analyze(astResult.ast);

  const generator = new CodeGenerator();

  const code = generator.generate(astResult.ast);

  console.log(code);
});

it("generates machine code for ADD", () => {
  const { tree } = parseAssembly("ADD R1, R2");

  const astResult = buildAst(tree as ProgramContext);

  const analyzer = new SemanticAnalyzer();

  analyzer.analyze(astResult.ast);

  const generator = new CodeGenerator();

  const code = generator.generate(astResult.ast);
  console.log(code);
  console.log(code[0]);
  console.log(code[0].constructor.name);
  console.log(astResult.ast);
  expect(code).toHaveLength(1);
  expect(code[0]).toBe(33858);
});
