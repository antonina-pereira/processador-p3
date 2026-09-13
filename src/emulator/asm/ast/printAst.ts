// printAst.ts
// Prints the AST for debugging
import type { ProgramNode } from "./nodes";

export function printAst(ast: ProgramNode): void {
  console.log(JSON.stringify(ast, null, 2));
}
