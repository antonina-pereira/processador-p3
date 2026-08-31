// parseAssembly.ts
// reads source text
// creates lexer, token stream, and parser

import { CharStream, CommonTokenStream } from "antlr4";

import asmLexer from "../grammar/asmLexer";
import asmParser from "../grammar/asmParser";

export interface ParseResult {
  tree: unknown;
  parser: asmParser;
  errors: string[];
}

export function parseAssembly(source: string): ParseResult {
  const errors: string[] = [];

  const input = new CharStream(source);

  const lexer = new asmLexer(input);

  lexer.removeErrorListeners();

  lexer.addErrorListener({
    syntaxError(_recognizer, _offendingSymbol, line, column, msg) {
      errors.push(`Lexer error at ${line}:${column} - ${msg}`);
    },
  });

  const tokens = new CommonTokenStream(lexer);

  const parser = new asmParser(tokens);

  parser.removeErrorListeners();

  parser.addErrorListener({
    syntaxError(_recognizer, _offendingSymbol, line, column, msg) {
      errors.push(`Lexer error at ${line}:${column} - ${msg}`);
    },
  });

  const tree = parser.program();

  return {
    tree,
    parser,
    errors,
  };
}
