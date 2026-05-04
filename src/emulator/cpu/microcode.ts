// microcode.ts

export enum MicroOp {
  // Operand fetch
  LOAD_OP1,              // Load operand 1 into internal latch
  LOAD_OP2,              // Load operand 2 into internal latch

  // ALU operations
  ALU_ADD,
  ALU_SUB,
  ALU_AND,
  ALU_OR,
  ALU_XOR,
  ALU_NOT,

  // Write‑back
  WRITEBACK_RESULT,      // Write ALU result to destination register

  // Branching
  UPDATE_PC_FROM_ALU,    // Used for jumps/branches

  // Flags
  UPDATE_FLAGS,          // Update Z, N, C, O based on ALU result

  // No‑op
  NOP
}

export interface MicroInstruction {
  ops: MicroOp[];
}

export const Microcode: Record<number, MicroInstruction[]> = {
  // ADD 
   0x21: [
    { ops: [MicroOp.LOAD_OP1, MicroOp.LOAD_OP2] },
    { ops: [MicroOp.ALU_ADD] },
    { ops: [MicroOp.UPDATE_FLAGS] },
    { ops: [MicroOp.WRITEBACK_RESULT] }
  ],
};

// Returns the micro‑instruction sequence for a given opcode
export function getMicrocode(opcode: number): MicroInstruction[] {
  const entry = Microcode[opcode];
  if (!entry) {
    throw new Error(`No microcode defined for opcode 0x${opcode.toString(16)}`);
  }
  return entry;
}
