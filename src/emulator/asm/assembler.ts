// assembler/assemble.ts
import { parseAssembly } from "./parser/parseAssembly";
import { buildAst } from "./ast/buildAst";
import { SemanticAnalyzer } from "./semantic/SemanticAnalyzer";
import { CodeGenerator } from "./codegen/CodeGenerator";
import type { ProgramContext } from "./grammar/asmParser";
import type { ProgramLine } from "../program-line";
import { printAst } from "./ast/printAst";

// Helper functions
function buildListing(source: string, statements: any[]): ProgramLine[] {
  const lines = source.split(/\r?\n/);

  const listing: ProgramLine[] = [];

  let address = 0;
  let sourceIndex = 0;

  for (const statement of statements) {
    while (sourceIndex < lines.length && lines[sourceIndex].trim() === "") {
      sourceIndex++;
    }

    const sourceText = lines[sourceIndex]?.trim() ?? "";

    listing.push({
      address,
      source: sourceText,
    });

    address += getStatementSize(statement) * 2;

    sourceIndex++;
  }

  return listing;
}

function getStatementSize(statement: any): number {
  if ("mnemonic" in statement) {
    return getInstructionSize(statement);
  }

  return 0;
}

function getInstructionSize(instruction: any): number {
  if (!instruction.operands) {
    return 1;
  }

  for (const operand of instruction.operands) {
    if (operand.type === "CONSTANT") {
      return 2;
    }
  }

  return 1;
}

export function assemble(source: string) {
  const { tree } = parseAssembly(source);

  const ast = buildAst(tree as ProgramContext);

  const analyzer = new SemanticAnalyzer();

  const result = analyzer.analyze(ast);
  if (result.diagnostics.length > 0) {
    return {
      diagnostics: result.diagnostics,
      code: [],
      listing: [],
    };
  }

  // Creates a list of program lines to show user
  const listing = buildListing(source, ast.statements);

  const generator = new CodeGenerator();

  const code = generator.generate(ast);

  console.log(code);

  return {
    diagnostics: [],
    code,
    listing,
  };
}
