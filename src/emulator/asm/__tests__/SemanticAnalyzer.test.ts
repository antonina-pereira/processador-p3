import { expect, it } from "vitest";

import { parseAssembly } from "../parser/parseAssembly";
import { buildAst } from "../ast/buildAst";
import type { ProgramContext } from "../grammar/asmParser";
import { SemanticAnalyzer } from "../semantic/SemanticAnalyzer";

it("reports duplicate labels", () => {
  const { tree } = parseAssembly(`
Loop:
  NOP

Loop:
  RET
`);

  const astResult = buildAst(tree as ProgramContext);

  const analyzer = new SemanticAnalyzer();

  const result = analyzer.analyze(astResult.ast);

  expect(result.diagnostics).toHaveLength(1);

  expect(result.diagnostics[0].message).toContain("Duplicate symbol 'Loop'");
});

it("reports duplicate data symbols", () => {
  const { tree } = parseAssembly(`
COUNT WORD 0
COUNT WORD 1
`);

  const astResult = buildAst(tree as ProgramContext);

  const analyzer = new SemanticAnalyzer();

  const result = analyzer.analyze(astResult.ast);

  expect(result.diagnostics).toHaveLength(1);

  expect(result.diagnostics[0].message).toContain("Duplicate symbol 'COUNT'");
});

it("reports duplicate names across symbol types", () => {
  const { tree } = parseAssembly(`
Loop:
  NOP

Loop WORD 0
`);

  const astResult = buildAst(tree as ProgramContext);

  const analyzer = new SemanticAnalyzer();

  const result = analyzer.analyze(astResult.ast);

  expect(result.diagnostics).toHaveLength(1);

  expect(result.diagnostics[0].message).toContain("Duplicate symbol 'Loop'");
});

it("accepts unique symbols", () => {
  const { tree } = parseAssembly(`
MAX EQU 10
COUNT WORD 0

Loop:
  NOP
`);

  const astResult = buildAst(tree as ProgramContext);

  const analyzer = new SemanticAnalyzer();

  const result = analyzer.analyze(astResult.ast);

  expect(result.diagnostics).toHaveLength(0);
});

it("invalid label", () => {
  const { tree } = parseAssembly(`
BR MissingLabel
`);

  const astResult = buildAst(tree as ProgramContext);

  const analyzer = new SemanticAnalyzer();

  const result = analyzer.analyze(astResult.ast);

  expect(result.diagnostics).toHaveLength(2);
});

it("valid label", () => {
  const { tree } = parseAssembly(`
Loop:
  NOP
  BR Loop
`);

  const astResult = buildAst(tree as ProgramContext);

  const analyzer = new SemanticAnalyzer();

  const result = analyzer.analyze(astResult.ast);

  expect(result.diagnostics).toHaveLength(0);
});

it("invalid data reference", () => {
  const { tree } = parseAssembly(`
MOV R1, COUNT
`);

  const astResult = buildAst(tree as ProgramContext);

  const analyzer = new SemanticAnalyzer();

  const result = analyzer.analyze(astResult.ast);

  expect(result.diagnostics).toHaveLength(1);
});

it("valid data reference", () => {
  const { tree } = parseAssembly(`
COUNT WORD 0
MOV R1, COUNT
`);

  const astResult = buildAst(tree as ProgramContext);

  const analyzer = new SemanticAnalyzer();

  const result = analyzer.analyze(astResult.ast);

  expect(result.diagnostics).toHaveLength(0);
});

it("ORIG + WORD", () => {
  const { tree } = parseAssembly(`
ORIG 8000h
COUNT WORD 0
`);

  const astResult = buildAst(tree as ProgramContext);

  const analyzer = new SemanticAnalyzer();

  const result = analyzer.analyze(astResult.ast);

  console.log(result.symbols.entries());
});

it("Label after variable", () => {
  const { tree } = parseAssembly(`
ORIG 8000h
COUNT WORD 0

Loop:
  NOP
`);

  const astResult = buildAst(tree as ProgramContext);

  const analyzer = new SemanticAnalyzer();

  const result = analyzer.analyze(astResult.ast);

  console.log(result.symbols.entries());
});
