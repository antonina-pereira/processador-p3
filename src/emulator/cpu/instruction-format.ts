// instruction-format.ts

// Operand types supported by the architecture
export enum OperandType {
  Register = "register",
  Immediate = "immediate",
  Direct = "direct",
  RegisterIndirect = "register_indirect",
  Indexed = "indexed",
  Relative = "relative",
  Based = "based",
  Any = "any",
  Label = "label" // assembler‑only
}

export enum AddressingMode {
  Register = "register",                  // M=00
  Immediate = "immediate",                // M=10
  Direct = "direct",                      // M=11 + regModo=0
  RegisterIndirect = "register_indirect", // M=01
  Indexed = "indexed",                    // M=11 + regModo=Rn
  Relative = "relative",                  // M=11 + regModo=PC
  Based = "based",                        // M=11 + regModo=SP
  Any = "any"
}

// How an operand is allowed to behave
export interface OperandEncoding {
  type: OperandType;
  mode: AddressingMode;
  canBeDestination: boolean;
}

/**
 * Instruction size information
 * Instructions are 1 word (2 bytes) or 2 words (4 bytes)
 */
export interface InstructionSize {
  words: number;          // 1 or 2
  hasExtensionWord: boolean;
}

// Flags that an instruction may modify
export interface FlagEffects {
  Z?: boolean; // Zero
  N?: boolean; // Negative
  C?: boolean; // Carry
  O?: boolean; // Overflow
}

export function computeInstructionSize(
  modes: AddressingMode[]
): InstructionSize {
  const needsExt = modes.some(mode =>
    [
      AddressingMode.Immediate,
      AddressingMode.Direct,
      AddressingMode.Indexed,
      AddressingMode.Relative,
      AddressingMode.Based
    ].includes(mode)
  );

  return {
    words: needsExt ? 2 : 1,
    hasExtensionWord: needsExt
  };
}

export type InstructionFormat =
  | "zeroOp"        // NOP, ENI, DSI, etc.
  | "zeroOpValue"   // RETN, INT
  | "oneOp"         // NEG, INC, DEC, etc.
  | "oneOpValue"    // SHR, SHL, etc.
  | "twoOp"         // CMP, ADD, ADDC, etc.
  | "jmpAbsIncond"  // JMP, CALL
  | "jmpAbsCond"    // JMP.cond, CALL.cond
  | "jmpRelIncod"   // BR
  | "jmpRelCond";   // BR.cond

export interface ZeroOpFormat {
  format: "zeroOp";
  // [ opcode:6 ][ unused:10 ]
}

export interface Zero0pValueFormat {
  format: "zeroOpValue";
  // [ opcode:6 ][ constant:10 ]
}

export interface OneOpFormat {
  format: "oneOp";
  // [ opcode:6 ][ unused:4 ][ M:2 ][ Reg_modo:4 ]
}

export interface OneOpValueFormat {
  format: "oneOpValue";
  // [ opcode:6 ][ positions:4 ][ M:2 ][ Reg_modo:4 ]
}

export interface TwoOpFormat {
  format: "twoOp";
  // [ opcode:6 ][ S:1 ][ Reg_reg:3 ][ M:2 ][ Reg_modo:4 ]
}

export interface JmpAbsIncondFormat {
  format: "jmpAbsIncond";
  // [ opcode:6 ][ unused:4 ][ M:2 ][ Reg_modo:4 ]
}

export interface JmpAbsCondFormat {
  format: "jmpAbsCond";
  // [ opcode:6 ][ condition:4 ][ M:2 ][ Reg_modo:4 ]
}

export interface JmpRelIncondFormat {
  format: "jmpRelIncond";
  // [ opcode:6 ][ unused:4 ][ Deslocamento:6 ]
}

export interface JmpRelCondFormat {
  format: "jmpRelCond";
  // [ opcode:6 ][ condition:4 ][ Deslocamento:6 ]
}

export type InstructionFormatInfo =
  | ZeroOpFormat
  | Zero0pValueFormat
  | OneOpFormat
  | OneOpValueFormat
  | TwoOpFormat
  | JmpAbsIncondFormat
  | JmpAbsCondFormat
  | JmpRelIncondFormat
  | JmpRelCondFormat;
