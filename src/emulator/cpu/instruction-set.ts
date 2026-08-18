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

  // BR
  // PC <- PC + offset
  // Does not update any flag

  // BR.cond
  //

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
