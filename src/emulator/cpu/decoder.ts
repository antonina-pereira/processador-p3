// decoder.ts

import { InstructionSet, type InstructionDefinition } from "./instruction-set";
import type { InstructionFormat } from "./instruction-format";
import Memory from "./memory";
import { ConditionCode } from "./conditions";

// Helper function: sign extension
function signExtend6(value: number): number {
  return value & 0x20 ? value | 0xffc0 : value;
}

// TYPES
/**
 * Represents a decoded operand after instruction decoding
 *
 * This is a discriminated union where each variant corresponds to a specific
 * addressing mode supported by the P3 architecture
 *
 * Fully resolves the addressing mode
 * Extracts all necessary fields (registers, values, displacement)
 */
export type DecodedOperand =
  | { type: "register"; reg: number }
  | { type: "immediate"; value: number }
  | { type: "direct"; address: number }
  | { type: "register_indirect"; reg: number }
  | { type: "indexed"; reg: number; displacement: number }
  | { type: "based"; baseReg: number; displacement: number }
  | { type: "relative"; displacement: number };

// Represents a fully encoded instruction ready for execution
export interface DecodedInstruction {
  opcode: number;
  mnemonic: string;
  operands: DecodedOperand[];
  size: number; // Instruction size in bytes (used to increment PC)
  condition?: ConditionCode; // For jump/branch
}

// Decoded Instructions
export function decodeInstruction(
  word: number,
  memory: Memory,
  pc: number,
): DecodedInstruction {
  const opcode = (word >> 10) & 0x3f;
  const info = InstructionSet[opcode];

  if (!info) {
    throw new Error("Unknown opcode: ${opcode.toString(16)}");
  }

  switch (info.format as InstructionFormat) {
    case "zeroOp":
      return decodeZeroOp(opcode, info);

    case "zeroOpValue":
      return decodeZeroOpValue(opcode, info, word);

    case "oneOp":
      return decodeOneOp(opcode, info, word, memory, pc);

    case "oneOpValue":
      return decodeOneOpValue(opcode, info, word, memory, pc);

    case "twoOp":
      return decodeTwoOp(opcode, info, word, memory, pc);

    case "jmpAbsUncond":
      return decodeJmpAbsUncond(opcode, info, word, memory, pc);

    case "jmpAbsCond":
      return decodeJmpAbsCond(opcode, info, word, memory, pc);

    case "jmpRelUncond":
      return decodeJmpRelUncond(opcode, info, word);

    case "jmpRelCond":
      return decodeJmpRelCond(opcode, info, word);

    default:
      throw new Error("Unsupported format for opcode ${opcode.toString(16)}");
  }
}

// Format decoders
function decodeZeroOp(
  opcode: number,
  info: InstructionDefinition,
): DecodedInstruction {
  return {
    opcode,
    mnemonic: info.mnemonic,
    operands: [],
    size: 2,
  };
}

function decodeZeroOpValue(
  opcode: number,
  info: InstructionDefinition,
  word: number,
): DecodedInstruction {
  const constant = word & 0x03ff;

  return {
    opcode,
    mnemonic: info.mnemonic,
    operands: [{ type: "immediate", value: constant }],
    size: 2,
  };
}

function decodeOneOp(
  opcode: number,
  info: InstructionDefinition,
  word: number,
  memory: Memory,
  pc: number,
): DecodedInstruction {
  let size = 2;
  let extOffset = 2;

  const M = (word >> 4) & 0b11;
  const regMode = word & 0xf;

  const { operand, extBytes } = decodeAddressing(
    M,
    regMode,
    memory,
    pc,
    extOffset,
  );

  size += extBytes;

  return {
    opcode,
    mnemonic: info.mnemonic,
    operands: [operand],
    size,
  };
}

function decodeOneOpValue(
  opcode: number,
  info: InstructionDefinition,
  word: number,
  memory: Memory,
  pc: number,
): DecodedInstruction {
  let size = 2;
  let extOffset = 2;

  const positions = (word >> 6) & 0xf;
  const M = (word >> 4) & 0b11;
  const regMode = word & 0xf;

  const { operand, extBytes } = decodeAddressing(
    M,
    regMode,
    memory,
    pc,
    extOffset,
  );

  size += extBytes;

  return {
    opcode,
    mnemonic: info.mnemonic,
    operands: [{ type: "immediate", value: positions }, operand],
    size,
  };
}

function decodeTwoOp(
  opcode: number,
  info: InstructionDefinition,
  word: number,
  memory: Memory,
  pc: number,
): DecodedInstruction {
  let size = 2;
  let extOffset = 2;

  const regReg = (word >> 6) & 0b111;
  const M = (word >> 4) & 0b11;
  const regMode = word & 0xf;

  const op1: DecodedOperand = {
    type: "register",
    reg: regReg,
  };

  const { operand: op2, extBytes } = decodeAddressing(
    M,
    regMode,
    memory,
    pc,
    extOffset,
  );

  size += extBytes;

  return {
    opcode,
    mnemonic: info.mnemonic,
    operands: [op1, op2],
    size,
  };
}

function decodeJmpAbsUncond(
  opcode: number,
  info: InstructionDefinition,
  word: number,
  memory: Memory,
  pc: number,
): DecodedInstruction {
  let size = 2;
  let extOffset = 2;

  const M = (word >> 4) & 0b11;
  const regMode = word & 0xf;

  const { operand, extBytes } = decodeAddressing(
    M,
    regMode,
    memory,
    pc,
    extOffset,
  );

  size += extBytes;

  return {
    opcode,
    mnemonic: info.mnemonic,
    operands: [operand],
    size,
  };
}

function decodeJmpAbsCond(
  opcode: number,
  info: InstructionDefinition,
  word: number,
  memory: Memory,
  pc: number,
): DecodedInstruction {
  let size = 2;
  let extOffset = 2;
  // Extract fields according to the JMP.cond format
  const condition = ((word >> 6) & 0xf) as ConditionCode; // 4-bit condition code

  const M = (word >> 4) & 0b11;
  const regMode = word & 0xf;

  const { operand, extBytes } = decodeAddressing(
    M,
    regMode,
    memory,
    pc,
    extOffset,
  );

  size += extBytes;

  return {
    opcode,
    mnemonic: info.mnemonic,
    condition,
    operands: [operand],
    size,
  };
}

function decodeJmpRelUncond(
  opcode: number,
  info: InstructionDefinition,
  word: number,
): DecodedInstruction {
  const disp = signExtend6(word & 0x3f);

  return {
    opcode,
    mnemonic: info.mnemonic,
    operands: [{ type: "relative", displacement: disp }],
    size: 2,
  };
}

function decodeJmpRelCond(
  opcode: number,
  info: InstructionDefinition,
  word: number,
): DecodedInstruction {
  // Extract fields according to BR.cond format
  const condition = ((word >> 6) & 0xf) as ConditionCode; // 4-bit condition code

  let disp = signExtend6(word & 0x3f);

  return {
    opcode,
    mnemonic: info.mnemonic,
    condition,
    operands: [{ type: "relative", displacement: disp }],
    size: 2,
  };
}

// Addressing‑mode decoding
function decodeAddressing(
  M: number,
  regMode: number,
  memory: Memory,
  pc: number,
  extOffset: number,
): { operand: DecodedOperand; extBytes: number } {
  switch (M) {
    case 0b00:
      // Register
      return {
        operand: { type: "register", reg: regMode },
        extBytes: 0,
      };

    case 0b01:
      // Register indirect
      return {
        operand: { type: "register_indirect", reg: regMode },
        extBytes: 0,
      };

    case 0b10:
      // Immediate (extension word)
      const value = memory.readWord(pc + extOffset);

      return {
        operand: { type: "immediate", value },
        extBytes: 2,
      };

    case 0b11:
      // Memory modes: direct / indexed / based / relative
      return decodeMemoryMode(regMode, memory, pc, extOffset);

    default:
      throw new Error("Invalid addressing mode M=${M}");
  }
}

function decodeMemoryMode(
  regMode: number,
  memory: Memory,
  pc: number,
  extOffset: number,
): { operand: DecodedOperand; extBytes: number } {
  const ext = memory.readWord(pc + extOffset);

  if (regMode === 0) {
    // Direct: address in extension word
    return {
      operand: { type: "direct", address: ext },
      extBytes: 2,
    };
  }

  if (regMode === 8) {
    // Relative: PC‑relative displacement
    return {
      operand: { type: "relative", displacement: ext },
      extBytes: 2,
    };
  }

  if (regMode === 9) {
    // Based: [SP + disp]
    return {
      operand: { type: "based", baseReg: regMode, displacement: ext },
      extBytes: 2,
    };
  }

  // Indexed: [Rn + disp]
  return {
    operand: { type: "indexed", reg: regMode, displacement: ext },
    extBytes: 2,
  };
}
