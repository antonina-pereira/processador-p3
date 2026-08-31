// buildAst.ts

import { ProgramContext } from "../grammar/asmParser";

import type { ProgramNode } from "./nodes";
import { AstBuilder } from "./AstBuilder";

export function buildAst(tree: ProgramContext): ProgramNode {
  const builder = new AstBuilder();

  return builder.visitProgram(tree);
}
