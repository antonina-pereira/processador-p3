// microcode.ts
// Defines micro-operations used internally by the control unit
// Micro-operations are the smallest execution steps of an instruction

import { AluOp } from "./alu";

export const MicroOp = {
  // Operand fetch
  LOAD_OP1: "LOAD_OP1", // Load operand 1 into internal latch
  LOAD_OP1_ADDRESS: "LOAD_OP1_ADDRESS", // For branches and jumps
  LOAD_OP2: "LOAD_OP2", // Load operand 2 into internal latch
  EXEC_ALU: "EXEC_ALU", // ALU operations
  WRITEBACK_RESULT: "WRITEBACK_RESULT", // Write ALU result to destination register
  UPDATE_PC_FROM_ALU: "UPDATE_PC_FROM_ALU", // Used for jumps/branches
  UPDATE_FLAGS: "UPDATE_FLAGS", // Update Z, N, C, O based on ALU result
  NOP: "NOP", // No operation
} as const;

export type MicroOp = (typeof MicroOp)[keyof typeof MicroOp];

// Micro-instruction represents a single execution cycle
// It can be composed of one or more micro-instructions
export interface MicroInstruction {
  ops: MicroOp[];
  aluOp?: AluOp; // Optional: if there is EXEC_ALU
}

// Mapping of the opcode to a micro-instruction sequence
export const Microcode: Record<number, MicroInstruction[]> = {
  // ADD
  0x21: [
    { ops: [MicroOp.LOAD_OP1, MicroOp.LOAD_OP2] },
    { ops: [MicroOp.EXEC_ALU], aluOp: AluOp.ADD },
    { ops: [MicroOp.UPDATE_FLAGS] },
    { ops: [MicroOp.WRITEBACK_RESULT] },
  ],

  // AND
  0x28: [
    { ops: [MicroOp.LOAD_OP1, MicroOp.LOAD_OP2] },
    { ops: [MicroOp.EXEC_ALU], aluOp: AluOp.AND },
    { ops: [MicroOp.UPDATE_FLAGS] },
    { ops: [MicroOp.WRITEBACK_RESULT] },
  ],

  // BR
  0x38: [
    { ops: [MicroOp.LOAD_OP1_ADDRESS] }, // load offset
    { ops: [MicroOp.EXEC_ALU], aluOp: AluOp.ADD },
    { ops: [MicroOp.UPDATE_PC_FROM_ALU] },
  ],

  // CMP
  0x20: [
    { ops: [MicroOp.LOAD_OP1] },
    { ops: [MicroOp.LOAD_OP2] },
    { ops: [MicroOp.EXEC_ALU], aluOp: AluOp.CMP },
    { ops: [MicroOp.UPDATE_FLAGS] },
  ],

  // COM
  0x13: [
    { ops: [MicroOp.LOAD_OP1] },
    { ops: [MicroOp.EXEC_ALU], aluOp: AluOp.COM },
    { ops: [MicroOp.UPDATE_FLAGS] },
    { ops: [MicroOp.WRITEBACK_RESULT] },
  ],

  // INC
  0x11: [
    { ops: [MicroOp.LOAD_OP1] },
    { ops: [MicroOp.EXEC_ALU], aluOp: AluOp.INC },
    { ops: [MicroOp.WRITEBACK_RESULT] },
    { ops: [MicroOp.UPDATE_FLAGS] },
  ],

  // JMP

  // MOV
  0x2b: [
    { ops: [MicroOp.LOAD_OP2] },
    { ops: [MicroOp.EXEC_ALU], aluOp: AluOp.MOV },
    { ops: [MicroOp.WRITEBACK_RESULT] },
  ],

  // OR
  0x29: [
    { ops: [MicroOp.LOAD_OP1, MicroOp.LOAD_OP2] },
    { ops: [MicroOp.EXEC_ALU], aluOp: AluOp.OR },
    { ops: [MicroOp.UPDATE_FLAGS] },
    { ops: [MicroOp.WRITEBACK_RESULT] },
  ],

  // SUB
  0x23: [
    { ops: [MicroOp.LOAD_OP1] },
    { ops: [MicroOp.LOAD_OP2] },
    { ops: [MicroOp.EXEC_ALU], aluOp: AluOp.SUB },
    { ops: [MicroOp.WRITEBACK_RESULT] },
    { ops: [MicroOp.UPDATE_FLAGS] },
  ],

  // XOR
  0x2a: [
    { ops: [MicroOp.LOAD_OP1, MicroOp.LOAD_OP2] },
    { ops: [MicroOp.EXEC_ALU], aluOp: AluOp.XOR },
    { ops: [MicroOp.UPDATE_FLAGS] },
    { ops: [MicroOp.WRITEBACK_RESULT] },
  ],
};
// Returns the micro‑instruction sequence for a given opcode
export function getMicrocode(opcode: number): MicroInstruction[] {
  const entry = Microcode[opcode];
  if (!entry) {
    throw new Error("No microcode defined for opcode 0x${opcode.toString(16)}");
  }

  return entry;
}
