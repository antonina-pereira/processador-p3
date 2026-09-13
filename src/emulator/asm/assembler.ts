// assembler/assemble.ts
// Assembles the user written program

import { parseAssembly } from "./parser/parseAssembly";
import { buildAst } from "./ast/buildAst";
import { SemanticAnalyzer } from "./semantic/SemanticAnalyzer";
import { CodeGenerator } from "./codegen/CodeGenerator";
import type { ProgramContext } from "./grammar/asmParser";
import type { ProgramLine } from "../program-line";
import { MAIN_MEMORY_START } from "../cpu/memory";

// Helper functions
// Builds the list of instructions
function buildListing(source: string, statements: any[]): ProgramLine[] {
  const lines = source.split(/\r?\n/);

  const listing: ProgramLine[] = [];

  let address = MAIN_MEMORY_START;
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
// Used by buildListing to retrieve the statement size
function getStatementSize(statement: any): number {
  if ("mnemonic" in statement) {
    return getInstructionSize(statement);
  }

  return 0;
}
// Used by getStatementSize to retrieve instruction size
function getInstructionSize(instruction: any): number {
  let words = 1;
  for (const operand of instruction.operands ?? []) {
    console.log("operand", operand);
    if (operand.value?.type === "CONSTANT") {
      words++;
    }
  }
  console.log(instruction.mnemonic, "size =", words);
  return words;
}

// Main function
export function assemble(source: string) {
  const { tree } = parseAssembly(source);

  const astResult = buildAst(tree as ProgramContext);

  // Stops immediately if the AST construction produced errors
  // Returns the error messages
  if (astResult.diagnostics.length > 0) {
    return {
      diagnostics: astResult.diagnostics,
      code: [],
      listing: [],
    };
  }

  const analyzer = new SemanticAnalyzer();

  const result = analyzer.analyze(astResult.ast);
  if (result.diagnostics.length > 0) {
    return {
      diagnostics: result.diagnostics,
      code: [],
      listing: [],
    };
  }

  // Creates a list of program lines to show user
  const listing = buildListing(source, astResult.ast.statements);

  const generator = new CodeGenerator();

  const code = generator.generate(astResult.ast);

  console.log(code);

  return {
    diagnostics: [],
    code,
    listing,
  };
}
