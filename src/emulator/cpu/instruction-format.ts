// instruction-format.ts
// Defines the structural representation of Instructions
// Used by:
// Assembler for validation and encoding
// Decoder for bit interpretation
// Control Unit for execution logic

// ASSEMBLY LEVEL
// Operand types used by assembler/parser
// May not map to hardware addressing modes
export const OperandType = {
  Register: "register",
  Immediate: "immediate",
  Direct: "direct",
  RegisterIndirect: "register_indirect",
  Indexed: "indexed",
  Relative: "relative",
  Based: "based",
  Any: "any", // for flexibility in definitions
  Label: "label", // assembler‑only
} as const;

export type OperandType = (typeof OperandType)[keyof typeof OperandType];

// ENCODING LEVEL
// Hardware addressing modes for instruction encoding
export const AddressingMode = {
  Register: "register", // M=00
  Immediate: "immediate", // M=10
  Direct: "direct", // M=11 + regModo=0
  RegisterIndirect: "register_indirect", // M=01
  Indexed: "indexed", // M=11 + regModo=Rn
  Relative: "relative", // M=11 + regModo=PC
  Based: "based", // M=11 + regModo=SP
} as const;

export type AddressingMode =
  (typeof AddressingMode)[keyof typeof AddressingMode];

// How an operand is encoded and allowed to behave
export interface OperandEncoding {
  type: OperandType;
  mode: AddressingMode;
  canBeDestination: boolean;
}

// RUNTIME LEVEL
/**
 * Instruction size information
 * Instructions are 1 (2 bytes) or 2 (4 bytes) 16-bit words
 * An extension word is used for constants or addresses
 */
export interface InstructionSize {
  words: number; // 1 or 2
  hasExtensionWord: boolean; // true if 2nd word exists
}

// Addressing modes that require an extension word
const EXTENSION_MODES = new Set<AddressingMode>([
  AddressingMode.Immediate,
  AddressingMode.Direct,
  AddressingMode.Indexed,
  AddressingMode.Relative,
  AddressingMode.Based,
]);

// Computes the size of an instruction based on operand addressing modes
export function computeInstructionSize(
  modes: AddressingMode[],
): InstructionSize {
  const needsExtension = modes.some((mode) => EXTENSION_MODES.has(mode));

  return {
    words: needsExtension ? 2 : 1,
    hasExtensionWord: needsExtension,
  };
}
// Describes which flags an instruction may modify
// If the flag is present, then it modifies it
export interface FlagEffects {
  Z?: boolean; // Zero
  N?: boolean; // Negative
  C?: boolean; // Carry
  O?: boolean; // Overflow
}

// INSTRUCTION FORMATS
// Classification of instruction encoding formats
export type InstructionFormat =
  | "zeroOp" // NOP, ENI, DSI, etc.
  | "zeroOpValue" // RETN, INT
  | "oneOp" // NEG, INC, DEC, etc.
  | "oneOpValue" // SHR, SHL, etc.
  | "twoOp" // CMP, ADD, ADDC, etc.
  | "jmpAbsUncond" // JMP, CALL
  | "jmpAbsCond" // JMP.cond, CALL.cond
  | "jmpRelUncond" // BR
  | "jmpRelCond"; // BR.cond

// Format structures
// Zero operand
// [ opcode:6 ][ unused:10 ]
export interface ZeroOpFormat {
  format: "zeroOp";
}

// Zero operand with constant
// [ opcode:6 ][ constant:10 ]
export interface ZeroOpValueFormat {
  format: "zeroOpValue";
}

// One operand
// [ opcode:6 ][ unused:4 ][ M:2 ][ reg_mode:4 ]
export interface OneOpFormat {
  format: "oneOp";
}

// One operand with constant
// [ opcode:6 ][ positions:4 ][ M:2 ][ reg_mode:4 ]
export interface OneOpValueFormat {
  format: "oneOpValue";
}

// Two operand
// [ opcode:6 ][ S:1 ][ Reg_reg:3 ][ M:2 ][ reg_mode:4 ]
export interface TwoOpFormat {
  format: "twoOp";
}

// Absolute jumps (unconditonal)
// [ opcode:6 ][ unused:4 ][ M:2 ][ reg_mode:4 ]
export interface JmpAbsUncondFormat {
  format: "jmpAbsUncond";
}

// Absolute jumps (conditional)
// [ opcode:6 ][ condition:4 ][ M:2 ][ reg_mode:4 ]
export interface JmpAbsCondFormat {
  format: "jmpAbsCond";
}

// Relative jumps (unconditional)
// [ opcode:6 ][ unused:4 ][ offset:6 ]
export interface JmpRelUncondFormat {
  format: "jmpRelUncond";
}

// Relative jumps (conditional)
// [ opcode:6 ][ condition:4 ][ offset:6 ]
export interface JmpRelCondFormat {
  format: "jmpRelCond";
}

// Union of all instruction format descriptors
export type InstructionFormatInfo =
  | ZeroOpFormat
  | ZeroOpValueFormat
  | OneOpFormat
  | OneOpValueFormat
  | TwoOpFormat
  | JmpAbsUncondFormat
  | JmpAbsCondFormat
  | JmpRelUncondFormat
  | JmpRelCondFormat;
