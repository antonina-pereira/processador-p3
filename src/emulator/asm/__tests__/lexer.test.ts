import { describe, test, expect } from "vitest";
import { Lexer } from "../lexer";
import { TokenType } from "../token";

describe("Lexer - ADD instruction variations", () => {
  test("ADD R1, R2", () => {
    const tokens = new Lexer("ADD R1, R2").tokenize();

    expect(tokens).toEqual([
      { type: TokenType.Mnemonic, value: "ADD" },
      { type: TokenType.Register, value: "R1" },
      { type: TokenType.Comma },
      { type: TokenType.Register, value: "R2" },
      { type: TokenType.EOF },
    ]);
  });

  test("ADD R1, 5", () => {
    const tokens = new Lexer("ADD R1, 5").tokenize();

    expect(tokens).toEqual([
      { type: TokenType.Mnemonic, value: "ADD" },
      { type: TokenType.Register, value: "R1" },
      { type: TokenType.Comma },
      { type: TokenType.Number, value: 5 },
      { type: TokenType.EOF },
    ]);
  });

  test("ADD R1, [R2]", () => {
    const tokens = new Lexer("ADD R1, [R2]").tokenize();

    expect(tokens).toEqual([
      { type: TokenType.Mnemonic, value: "ADD" },
      { type: TokenType.Register, value: "R1" },
      { type: TokenType.Comma },
      { type: TokenType.LBracket },
      { type: TokenType.Register, value: "R2" },
      { type: TokenType.RBracket },
      { type: TokenType.EOF },
    ]);
  });

  test("ADD R1, [R2 + 4]", () => {
    const tokens = new Lexer("ADD R1, [R2 + 4]").tokenize();

    expect(tokens).toEqual([
      { type: TokenType.Mnemonic, value: "ADD" },
      { type: TokenType.Register, value: "R1" },
      { type: TokenType.Comma },
      { type: TokenType.LBracket },
      { type: TokenType.Register, value: "R2" },
      { type: TokenType.Plus },
      { type: TokenType.Number, value: 4 },
      { type: TokenType.RBracket },
      { type: TokenType.EOF },
    ]);
  });

  test("label definition", () => {
    const tokens = new Lexer("loop: ADD R1, R2").tokenize();

    expect(tokens).toEqual([
      { type: TokenType.Label, value: "loop" },
      { type: TokenType.Mnemonic, value: "ADD" },
      { type: TokenType.Register, value: "R1" },
      { type: TokenType.Comma },
      { type: TokenType.Register, value: "R2" },
      { type: TokenType.EOF },
    ]);
  });

  test("ADD with comment", () => {
    const tokens = new Lexer("ADD R1, 5 ; this is a comment").tokenize();

    expect(tokens).toEqual([
      { type: TokenType.Mnemonic, value: "ADD" },
      { type: TokenType.Register, value: "R1" },
      { type: TokenType.Comma },
      { type: TokenType.Number, value: 5 },
      { type: TokenType.EOF },
    ]);
  });

  test("ADD with negative number", () => {
    const tokens = new Lexer("ADD R1, -5").tokenize();

    expect(tokens).toEqual([
      { type: TokenType.Mnemonic, value: "ADD" },
      { type: TokenType.Register, value: "R1" },
      { type: TokenType.Comma },
      { type: TokenType.Minus },
      { type: TokenType.Number, value: 5 },
      { type: TokenType.EOF },
    ]);
  });

  test("ADD with hex number", () => {
    const tokens = new Lexer("ADD R1, 0x10").tokenize();

    expect(tokens).toEqual([
      { type: TokenType.Mnemonic, value: "ADD" },
      { type: TokenType.Register, value: "R1" },
      { type: TokenType.Comma },
      { type: TokenType.Number, value: 16 },
      { type: TokenType.EOF },
    ]);
  });

  test("ADD with binary number", () => {
    const tokens = new Lexer("ADD R1, 1010b").tokenize();

    expect(tokens).toEqual([
      { type: TokenType.Mnemonic, value: "ADD" },
      { type: TokenType.Register, value: "R1" },
      { type: TokenType.Comma },
      { type: TokenType.Number, value: 10 },
      { type: TokenType.EOF },
    ]);
  });

  test("ADD with octal number", () => {
    const tokens = new Lexer("ADD R1, 17o").tokenize();

    expect(tokens).toEqual([
      { type: TokenType.Mnemonic, value: "ADD" },
      { type: TokenType.Register, value: "R1" },
      { type: TokenType.Comma },
      { type: TokenType.Number, value: 15 },
      { type: TokenType.EOF },
    ]);
  });

  test("ADD with ASCII literal", () => {
    const tokens = new Lexer("ADD R1, 'A'").tokenize();

    expect(tokens).toEqual([
      { type: TokenType.Mnemonic, value: "ADD" },
      { type: TokenType.Register, value: "R1" },
      { type: TokenType.Comma },
      { type: TokenType.Number, value: 65 },
      { type: TokenType.EOF },
    ]);
  });
});
