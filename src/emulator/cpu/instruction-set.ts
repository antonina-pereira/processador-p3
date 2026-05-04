// instruction-set.ts

import {
  InstructionFormat,
  OperandType,
  AddressingMode
} from "./instruction-format";

export const InstructionSet: Record<number, InstructionFormat> = {

  // ADD
  0x21: {
    mnemonic: "ADD",
    format: "twoOp",
    operandCount: 2,

    operandEncodings: [
      {
        type: OperandType.Register,
        mode: AddressingMode.Register,
        canBeDestination: true
      },
      {
        type: OperandType.Any,
        mode: AddressingMode.Any,
        canBeDestination: false
      }
    ],

    size: { words: 1, hasExtensionWord: false },

    flagEffects: { Z: true, N: true, C: true, O: true },

    description: "op1 ← op1 + op2"
  },

 };
