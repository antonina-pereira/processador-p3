// instruction-set.ts
// Defines the instructions as per the format

import { OperandType, AddressingMode } from "./instruction-format";

import type {
  InstructionFormat,
  OperandEncoding,
  FlagEffects,
} from "./instruction-format";

// Instruction metadata definition
export interface InstructionDefinition {
  mnemonic: string;
  format: InstructionFormat;
  operandCount: number;
  operandEncodings: OperandEncoding[];
  flagEffects: FlagEffects;
  description: string;
}

// Instruction set mapping from opcode to definition
export const InstructionSet: Record<number, InstructionDefinition> = {
  // ADD
  // op1 <- op1 + op2
  // Updates: ZCNO
  0x21: {
    mnemonic: "ADD",
    format: "twoOp",
    operandCount: 2,

    operandEncodings: [
      // The destination must be register
      {
        type: OperandType.Register,
        mode: AddressingMode.Register,
        canBeDestination: true,
      },
      // The source can use multiple addressing modes
      {
        type: OperandType.Any,
        mode: AddressingMode.Register, // base mode
        canBeDestination: false,
      },
    ],

    flagEffects: { Z: true, N: true, C: true, O: true },

    description: "Adds op2 to op1 (op1 ← op1 + op2)",
  },

  // ADDC
  // op1 <- op1 + op2 + C
  // Updates: ZCNO

  // AND
  // op1 <- op1 AND op2
  // Updates: ZN
  0x28: {
    mnemonic: "AND",
    format: "twoOp",
    operandCount: 2,

    operandEncodings: [
      {
        type: OperandType.Register,
        mode: AddressingMode.Register,
        canBeDestination: true,
      },
      {
        type: OperandType.Any,
        mode: AddressingMode.Register,
        canBeDestination: false,
      },
    ],

    flagEffects: {
      Z: true,
      N: true,
      C: false,
      O: false,
    },

    description: "Bitwise AND of op1 and op2 (op1 ← op1 AND op2)",
  },

  // BR
  // PC <- PC + offset
  // Does not update any flag
  0x38: {
    mnemonic: "BR",
    format: "oneOp",
    operandCount: 1,
    operandEncodings: [
      {
        type: OperandType.Any,
        mode: AddressingMode.Immediate,
        canBeDestination: false,
      },
    ],
    flagEffects: { Z: false, N: false, C: false, O: false },
    description: "PC <- PC + offset",
  },

  // CMP
  // op1 - op2 (result discarded)
  // Updates: ZCNO
  0x20: {
    mnemonic: "CMP",
    format: "twoOp",
    operandCount: 2,

    operandEncodings: [
      {
        type: OperandType.Register,
        mode: AddressingMode.Register,
        canBeDestination: false,
      },
      {
        type: OperandType.Any,
        mode: AddressingMode.Register,
        canBeDestination: false,
      },
    ],

    flagEffects: {
      Z: true,
      N: true,
      C: true,
      O: true,
    },

    description:
      "Compares op1 with op2 by computing op1 - op2 and updating flags",
  },

  // COM
  // op <- NOT op
  // Updates: ZN
  0x13: {
    mnemonic: "COM",
    format: "oneOp",
    operandCount: 1,

    operandEncodings: [
      {
        type: OperandType.Register,
        mode: AddressingMode.Register,
        canBeDestination: true,
      },
    ],

    flagEffects: {
      Z: true,
      N: true,
      C: false,
      O: false,
    },

    description: "Bitwise complement of operand (op ← NOT op)",
  },

  // INC
  // op <- op + 1
  // Updates: ZCNO
  0x11: {
    mnemonic: "INC",
    format: "oneOp",
    operandCount: 1,

    operandEncodings: [
      {
        type: OperandType.Any,
        mode: AddressingMode.Register, // base mode
        canBeDestination: true,
      },
    ],

    flagEffects: {
      Z: true,
      N: true,
      C: true,
      O: true,
    },

    description: "Increments operand by one (op <- op + 1)",
  },

  // JMP
  // PC ← <address>
  // Does not update any flag
  0x30: {
    mnemonic: "JMP",
    format: "jmpAbsUncond",
    operandCount: 1,
    operandEncodings: [
      {
        type: OperandType.Any,
        mode: AddressingMode.Immediate,
        canBeDestination: false,
      },
    ],
    flagEffects: { Z: false, N: false, C: false, O: false },
    description: "Jumps to address",
  },

  // MOV
  // Copies the content of op2 to op1
  // Does not update any flag
  0x2b: {
    mnemonic: "MOV",
    format: "twoOp",
    operandCount: 2,
    operandEncodings: [
      // The destination must be register
      {
        type: OperandType.Register,
        mode: AddressingMode.Register,
        canBeDestination: true,
      },
      // The source can be any addressing mode
      {
        type: OperandType.Any,
        mode: AddressingMode.Register,
        canBeDestination: false,
      },
    ],
    flagEffects: { Z: false, N: false, C: false, O: false },
    description: "Copies the content of op2 to op1 (op1 ← op1 + op2)",
  },

  // NOP
  // no operation
  // Does not update any flag
  0x00: {
    mnemonic: "NOP",
    format: "zeroOp",
    operandCount: 0,
    operandEncodings: [],
    flagEffects: { Z: false, N: false, C: false, O: false },
    description: "No operation",
  },

  // OR
  // op1 <- op1 OR op2
  // Updates: ZN
  0x29: {
    mnemonic: "OR",
    format: "twoOp",
    operandCount: 2,

    operandEncodings: [
      // Destination must be register
      {
        type: OperandType.Register,
        mode: AddressingMode.Register,
        canBeDestination: true,
      },

      // Source can use multiple addressing modes
      {
        type: OperandType.Any,
        mode: AddressingMode.Register,
        canBeDestination: false,
      },
    ],

    flagEffects: {
      Z: true,
      N: true,
      C: false,
      O: false,
    },

    description: "Bitwise OR of op1 and op2 (op1 ← op1 OR op2)",
  },

  // SUB
  // op1 <- op1 - op2
  // Updates: ZCNO
  0x23: {
    mnemonic: "SUB",
    format: "twoOp",
    operandCount: 2,

    operandEncodings: [
      // Destination must be register
      {
        type: OperandType.Register,
        mode: AddressingMode.Register,
        canBeDestination: true,
      },

      // Source can use multiple addressing modes
      {
        type: OperandType.Any,
        mode: AddressingMode.Register,
        canBeDestination: false,
      },
    ],

    flagEffects: {
      Z: true,
      N: true,
      C: true,
      O: true,
    },

    description: "Subtracts op2 from op1 (op1 ← op1 - op2)",
  },

  // XOR
  // op1 <- op1 XOR op2
  // Updates: ZN
  0x2a: {
    mnemonic: "XOR",
    format: "twoOp",
    operandCount: 2,

    operandEncodings: [
      {
        type: OperandType.Register,
        mode: AddressingMode.Register,
        canBeDestination: true,
      },
      {
        type: OperandType.Any,
        mode: AddressingMode.Register,
        canBeDestination: false,
      },
    ],

    flagEffects: {
      Z: true,
      N: true,
      C: false,
      O: false,
    },

    description: "Bitwise exclusive OR of op1 and op2 (op1 <- op1 XOR op2)",
  },
};

// Gets opcode from the mnemonic
export function getOpcodeFromMnemonic(mnemonic: string): number {
  const entry = Object.entries(InstructionSet).find(
    ([, def]) => def.mnemonic === mnemonic,
  );

  if (!entry) {
    throw new Error("Unknown mnemonic: ${mnemonic}");
  }

  return Number(entry[0]);
}
