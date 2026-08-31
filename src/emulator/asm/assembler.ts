// assembler/assemble.ts
import { parseAssembly } from "./parser/parseAssembly";
import { buildAst } from "./ast/buildAst";
import { SemanticAnalyzer } from "./semantic/SemanticAnalyzer";
import { CodeGenerator } from "./codegen/CodeGenerator";
import type { ProgramContext } from "./grammar/asmParser";

export function assemble(source: string) {
  const { tree } = parseAssembly(source);

  const ast = buildAst(tree as ProgramContext);

  const analyzer = new SemanticAnalyzer();

  const result = analyzer.analyze(ast);

  if (result.diagnostics.length > 0) {
    return {
      diagnostics: result.diagnostics,
      code: [],
    };
  }

  const generator = new CodeGenerator();

  const code = generator.generate(ast);

  return {
    diagnostics: [],
    code,
  };
}
