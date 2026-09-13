// buildAst.ts
// Builds an AST ready to be used by the assembler using AstBuilder

import { ProgramContext } from "../grammar/asmParser";

import type { ProgramNode } from "./nodes";
import { AstBuilder } from "./AstBuilder";
import type { Diagnostic } from "../semantic/Diagnostic";

export interface AstBuildResult {
  ast: ProgramNode;
  diagnostics: Diagnostic[];
}

export function buildAst(tree: ProgramContext): AstBuildResult {
  const builder = new AstBuilder();

  const ast = builder.visitProgram(tree) as ProgramNode;

  return {
    ast,
    diagnostics: builder.diagnostics,
  };
}
