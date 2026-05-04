// decoder.ts

import { RegisterIndex } from "./registers"
import { InstructionSet } from "./instruction-set";
import { AddressingMode, OperandType, InstructionFormat } from "./instruction-format";
import Memory from "./memory";
import { ConditionNames } from "./conditions";

const PC_REG = RegisterIndex.PC;
const SP_REG = RegisterIndex.SP; 

export interface DecodedOperand {
  type: OperandType;
  reg?: number;
  value?: number;
  address?: number;
  displacement?: number;
  baseReg?: number;
  needsExt?: boolean;
}

export interface DecodedInstruction {
  opcode: number;
  mnemonic: string;
  operands: DecodedOperand[];
  size: number;          // bytes
  condition?: number;    // for jump/branch
}

export function decodeInstruction(word: number, memory: Memory, pc: number): DecodedInstruction {
  const opcode = (word >> 10) & 0x3F;
  const info = InstructionSet[opcode];

  if (!info) {
    throw new Error(`Unknown opcode: ${opcode.toString(16)}`);
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

    case "jmpAbsIncond":
      return decodeJmpAbsIncond(opcode, info, word, memory, pc);

    case "jmpAbsCond":
      return decodeJmpAbsCond(opcode, info, word, memory, pc);

    case "jmpRelIncond":
      return decodeJmpRelIncod(opcode, info, word, pc);

    case "jmpRelCond":
      return decodeJmpRelCond();

    default:
      throw new Error(`Unsupported format for opcode ${opcode.toString(16)}`);
  }
}

// Format decoders 
function decodeZeroOp(opcode: number, info: any): DecodedInstruction {
  return {
    opcode,
    mnemonic: info.mnemonic,
    operands: [],
    size: 2
  };
}

function decodeZeroOpValue(opcode: number, info: any, word: number): DecodedInstruction {
  const constant = word & 0x03FF;

  return {
    opcode,
    mnemonic: info.mnemonic,
    operands: [
      { type: OperandType.Immediate, value: constant }
    ],
    size: 2
  };
}

function decodeOneOp(opcode: number, info: any, word: number, memory: Memory, pc: number): DecodedInstruction {
  const M = (word >> 4) & 0b11;
  const regModo = word & 0xF;

  const operand = decodeAddressing(M, regModo, memory, pc);

  return {
    opcode,
    mnemonic: info.mnemonic,
    operands: [operand],
    size: 2 + (operand.needsExt ? 2 : 0)
  };
}

function decodeOneOpValue(opcode: number, info: any, word: number, memory: Memory, pc: number): DecodedInstruction {
  const positions = (word >> 6) & 0xF;
  const M = (word >> 4) & 0b11;
  const regModo = word & 0xF;

  const operand = decodeAddressing(M, regModo, memory, pc);

  return {
    opcode,
    mnemonic: info.mnemonic,
    operands: [
      { type: OperandType.Immediate, value: positions },
      operand
    ],
    size: 2 + (operand.needsExt ? 2 : 0)
  };
}

function decodeTwoOp(opcode: number, info: any, word: number, memory: Memory, pc: number): DecodedInstruction {
  const S = (word >> 9) & 0x1;  
  const regReg = (word >> 6) & 0b111;
  const M = (word >> 4) & 0b11;
  const regModo = word & 0xF;

  const op1: DecodedOperand = {
    type: OperandType.Register,
    reg: regReg
  };

  const op2 = decodeAddressing(M, regModo, memory, pc);

  return {
    opcode,
    mnemonic: info.mnemonic,
    operands: [op1, op2],
    size: 2 + (op2.needsExt ? 2 : 0)
  };
}

function decodeJmpAbsIncond(opcode: number, info: any, word: number, memory: Memory, pc: number): DecodedInstruction {
  const cond = (word >> 6) & 0xF;
  const M = (word >> 4) & 0b11;
  const regModo = word & 0xF;

  const target = decodeAddressing(M, regModo, memory, pc);

  return {
    opcode,
    mnemonic: info.mnemonic,
    operands: [target],
    condition: cond,
    size: 2 + (target.needsExt ? 2 : 0)
  };
}

function decodeJmpAbsCond(opcode: number, info: any, word: number, memory: Memory, pc: number): DecodedInstruction {

  // Extract fields according to the JMP.cond format
  const condition = (word >> 6) & 0xF;   // 4-bit condition code
  const condName = ConditionNames[condition] ?? "UNKNOWN";

  const M = (word >> 4) & 0b11; 
  const regModo = word & 0xF; 

  const target = decodeAddressing(M, regModo, memory, pc);

  return {
    opcode,
    mnemonic: info.mnemonic,
    condition,              
    operands: [target], 
    size: 2 + (target.needsExt ? 2 : 0)
  };
}

function decodeJmpRelIncond(opcode: number, info: any, word: number, pc: number): DecodedInstruction {
  const cond = (word >> 6) & 0xF;
  const disp = word & 0x3F; 

  const operand: DecodedOperand = {
    type: OperandType.Relative,
    displacement: disp
  };

  return {
    opcode,
    mnemonic: info.mnemonic,
    operands: [operand],
    condition: cond,
    size: 2
  };
}

function decodeJmpRelCond(opcode: number, info: any, word: number, pc: number): DecodedInstruction {

  // Extract fields according to BR.cond format
  const condition = (word >> 6) & 0xF;   // 4-bit condition code
  const condName = ConditionNames[condition] ?? "UNKNOWN";

  let disp = word & 0x3F;  

  // Sign-extend displacement if needed
  if (disp & 0x20) {               
    disp = disp | 0xFFC0;            
  }

  const operand: DecodedOperand = {
    type: OperandType.Relative,
    displacement: disp
  };

  return {
    opcode,
    mnemonic: info.mnemonic,
    condition,
    operands: [operand],
    size: 2
  };
}

// Addressing‑mode decoding 
function decodeAddressing(M: number, regModo: number, memory: Memory, pc: number): DecodedOperand {
  switch (M) {
    case 0b00:
      // Register
      return {
        type: OperandType.Register,
        reg: regModo
      };

    case 0b01:
      // Register indirect
      return {
        type: OperandType.RegisterIndirect,
        reg: regModo
      };

    case 0b10:
      // Immediate (extension word)
      return {
        type: OperandType.Immediate,
        value: memory.readWord(pc + 2),
        needsExt: true
      };

    case 0b11:
      // Memory modes: direct / indexed / based / relative
      return decodeMemoryMode(regModo, memory, pc);

    default:
      throw new Error(`Invalid addressing mode M=${M}`);
  }
}

function decodeMemoryMode(regModo: number, memory: Memory, pc: number): DecodedOperand {
  const ext = memory.readWord(pc + 2);

  if (regModo === 0) {
    // Direct: address in extension word
    return {
      type: OperandType.Direct,
      address: ext,
      needsExt: true
    };
  }

  if (regModo === PC_REG) {
    // Relative: PC‑relative displacement
    return {
      type: OperandType.Relative,
      displacement: ext,
      needsExt: true
    };
  }

  if (regModo === SP_REG) {
    // Based: [SP + disp]
    return {
      type: OperandType.Based,
      baseReg: SP_REG,
      displacement: ext,
      needsExt: true
    };
  }

  // Indexed: [Rn + disp]
  return {
    type: OperandType.Indexed,
    reg: regModo,
    displacement: ext,
    needsExt: true
  };
}
