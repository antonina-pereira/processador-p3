import { describe, it, expect } from "vitest";
import { MicroOp, getMicrocode } from "../microcode";

describe("Microcode", () => {
  it("returns microcode for a known opcode", () => {
    const seq = getMicrocode(0x21); // ADD

    expect(Array.isArray(seq)).toBe(true);
    expect(seq.length).toBeGreaterThan(0);

    // First micro‑instruction should load operands
    expect(seq[0].ops).toContain(MicroOp.LOAD_OP1);
  });

  it("throws for unknown opcode", () => {
    expect(() => getMicrocode(0xffff)).toThrow();
  });

  it("ADD opcode contains ALU_ADD and WRITEBACK_RESULT", () => {
    const seq = getMicrocode(0x21);

    const allOps = seq.flatMap((step) => step.ops);

    expect(allOps).toContain(MicroOp.EXEC_ALU);
    expect(allOps).toContain(MicroOp.WRITEBACK_RESULT);
  });

  it("BR opcode contains UPDATE_PC_FROM_ALU", () => {
    const seq = getMicrocode(0x38);

    const allOps = seq.flatMap((step) => step.ops);

    expect(allOps).toContain(MicroOp.EXEC_ALU);
    expect(allOps).toContain(MicroOp.UPDATE_PC_FROM_ALU);
  });
});
