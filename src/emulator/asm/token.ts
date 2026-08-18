// token.ts
// Defines the different types of tokens in Assembly code
// Used by the lexer

export const TokenType = {
  // Words
  Mnemonic: "Mnemonic", // Instruction
  Register: "Register",
  Identifier: "Identifier",
  Label: "Label",

  // Literals
  Number: "Number",

  // Separators
  Comma: "Comma",

  // Labels
  Colon: "Colon",

  // Comments
  SemiColon: "SemiColon",

  // Operators
  Plus: "Plus",
  Minus: "Minus", // plus addressing

  // Addressing
  LBracket: "LBracket",
  RBracket: "RBracket",

  // Structure
  NewLine: "NewLine",
  EOF: "EOF",
} as const;

export type TokenType = (typeof TokenType)[keyof typeof TokenType];

// Token interface
// A token has a type and an optional value
export interface Token {
  type: TokenType;
  value?: string | number;
}
