// lexer.ts
// Reads assembly code and breaks it into tokens

import { type Token, TokenType } from "./token.ts";
import { InstructionSet } from "../cpu/instruction-set.ts";

export class Lexer {
  private text: string;
  private position = 0;

  constructor(text: string) {
    this.text = text;
  }

  tokenize(): Token[] {
    const tokens: Token[] = [];

    while (!this.isAtEnd()) {
      const char = this.look();

      // If char is whitespace, skip over
      if (this.isWhitespace(char)) {
        this.advance();
        continue;
      }

      // If it is a comment, skip over
      if (char === ";") {
        this.skipComment();
        continue;
      }

      // Comma
      if (char === ",") {
        tokens.push({ type: TokenType.Comma });
        this.advance();
        continue;
      }

      // Colon
      if (char === ":") {
        tokens.push({ type: TokenType.Colon });
        this.advance();
        continue;
      }

      // Semi-colon
      if (char === ";") {
        tokens.push({ type: TokenType.SemiColon });
        this.advance();
        continue;
      }

      // Plus
      if (char === "+") {
        tokens.push({ type: TokenType.Plus });
        this.advance();
        continue;
      }

      // Minus
      if (char === "-") {
        tokens.push({ type: TokenType.Minus });
        this.advance();
        continue;
      }

      // Left bracket
      if (char === "[") {
        tokens.push({ type: TokenType.LBracket });
        this.advance();
        continue;
      }

      // Right bracket
      if (char === "]") {
        tokens.push({ type: TokenType.RBracket });
        this.advance();
        continue;
      }

      // New line
      if (char == "\n") {
        tokens.push({ type: TokenType.NewLine });
        this.advance();
        continue;
      }

      // Word
      if (this.isAlphaUnderscore(char)) {
        tokens.push(this.readWord());
        continue;
      }

      // Number
      // If the number is alphanumeric, it needs to be converted to ASCII code
      if (char === "'") {
        tokens.push(this.readAscii());
        continue;
      }

      if (this.isDigit(char)) {
        tokens.push(this.readNumber());
        continue;
      }

      throw new Error("Unexpected character: ${char}.");
    }

    // End of file reached
    tokens.push({ type: TokenType.EOF });

    return tokens;
  }

  // NUMBERS
  // Obtain a token of number in alphanumeric
  private readAscii(): Token {
    this.advance(); // To skip the starting '

    // If the ASCII is empty
    if (this.look() === "'") {
      throw new Error("Empty ASCII literal.");
    }

    const char = this.look();
    this.advance();

    // If it does not end with a closing '
    if (this.look() != "'") {
      throw new Error("Unterminated ASCII literal.");
    }

    this.advance(); // To skip the closing '

    return {
      type: TokenType.Number,
      value: char.charCodeAt(0),
    };
  }

  // Obtain a token of a number from a series of digits in the Assembly code
  private readNumber(): Token {
    let value = "";

    // Detect a prefix from bin, hex, or oct
    if (this.look() === "0") {
      value += this.look();
      this.advance();

      const next = this.look()?.toLowerCase();

      // HEX: 0x1f
      if (next === "x") {
        this.advance();
        return this.readRadixNumber(16, /[0-9a-fA-F]/);
      }

      // BIN: 0b1010
      if (next === "b") {
        this.advance();
        return this.readRadixNumber(2, /[01]/);
      }

      // OCTAL: 0o17
      if (next === "o") {
        this.advance();
        return this.readRadixNumber(8, /[0-7]/);
      }
    }

    // Decimal or suffix based
    while (!this.isAtEnd() && this.isDigit(this.look())) {
      value += this.look();
      this.advance();
    }

    const suffix = this.look()?.toLowerCase();

    // BIN: 1010b
    if (suffix === "b") {
      this.advance();
      return {
        type: TokenType.Number,
        value: parseInt(value, 2),
      };
    }

    // OCTAL: 17o
    if (suffix === "o") {
      this.advance();
      return {
        type: TokenType.Number,
        value: parseInt(value, 8),
      };
    }

    // HEX: 1fh
    if (suffix === "h") {
      this.advance();
      return {
        type: TokenType.Number,
        value: parseInt(value, 16),
      };
    }

    // Decimal
    return {
      type: TokenType.Number,
      value: parseInt(value, 10),
    };
  }

  // WORDS
  // Obtain a token of a word from a series of characters in the Assembly code
  private readWord(): Token {
    let value = "";

    // The first character cannot be a digit
    if (!this.isAlphaUnderscore(this.look())) {
      throw new Error("Invalid identifier start: ${this.look()}");
    }

    // Otherwise we store the character
    value += this.look();
    this.advance();

    // Walthrough the word
    while (!this.isAtEnd() && this.isAlphaNumericUnderscore(this.look())) {
      value += this.look();
      this.advance();
    }

    // If the word is a label (ends with :)
    if (this.look() === ":") {
      this.advance();
      return { type: TokenType.Label, value };
    }

    // Convert to uppercase
    const uppercaseValue = value.toUpperCase();

    // Check if it is a mnemonic
    if (this.isMnemonic(uppercaseValue)) {
      return { type: TokenType.Mnemonic, value: uppercaseValue };
    }

    // Check if it is a register name
    if (this.isRegister(uppercaseValue)) {
      return { type: TokenType.Register, value: uppercaseValue };
    }

    // Else it should be an identifier
    return { type: TokenType.Identifier, value };
  }

  // HELPER FUNCTIONS

  // Skip comments
  private skipComment() {
    while (!this.isAtEnd() && this.look() !== "\n") {
      this.advance();
    }
  }

  // Look at text in current position
  private look(): string {
    return this.text[this.position];
  }

  // Advance in the text
  private advance(): void {
    this.position++;
  }

  // Was the end of the text reached?
  private isAtEnd(): boolean {
    return this.position >= this.text.length;
  }

  // Is the character whitespace?
  private isWhitespace(char: string): boolean {
    return char == " " || char == "/t";
  }

  // Is it a alphanumeric character or an underscore?
  // Useful to identify labels
  private isAlphaNumericUnderscore(char: string): boolean {
    return /[a-zA-Z0-9_]/.test(char);
  }

  // Is it a letter or underscore?
  private isAlphaUnderscore(char: string): boolean {
    return /[a-zA-Z_]/.test(char);
  }

  // Is the character a digit?
  private isDigit(char: string): boolean {
    return /[0-9]/.test(char);
  }

  // Is the word a register name?
  private isRegister(word: string): boolean {
    return /^R[0-7]$/.test(word) || word == "PC" || word == "SP";
  }

  // Is the word a mnemonic?
  // Step 1: generate a set of mnemonics
  Mnemonics = new Set(Object.values(InstructionSet).map((def) => def.mnemonic));
  // Step 2: Check if the word is in the set of Mnemonics
  private isMnemonic(word: string): boolean {
    return this.Mnemonics.has(word);
  }

  // Helper function to read number with a base
  private readRadixNumber(base: number, regex: RegExp): Token {
    let value = "";
    while (!this.isAtEnd() && regex.test(this.look())) {
      value += this.look();
      this.advance();
    }

    return {
      type: TokenType.Number,
      value: parseInt(value, base),
    };
  }
}
