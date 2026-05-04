import { describe, it, expect, vi } from "vitest";
import Memory from "../memory";
import { Registers } from "../registers";
import { Flags } from "../flags";
import CPU from "../cpu";

describe("CPU", () => {
  it("executes ADD R1, R2 correctly (opcode 0x21)", () => {
    const memory = new Memory();
    const registers = new Registers();
    const flags = new Flags(registers);

    // Set initial register values
    registers.write(1, 5);
    registers.write(2, 7);

    // Format: [ opcode:6 ][ S:1 ][ reg_reg:3 ][ M:2 ][ reg_modo:4 ]
    const opcode = 0x21 << 10;     // bits 15–10
    const S = 0 << 9;              // bit 9
    const regReg = 1 << 6;         // bits 8–6
    const M = 0b00 << 4;           // bits 5–4 (register mode)
    const regModo = 2;             // bits 3–0 (R2)

    const instruction = opcode | S | regReg | M | regModo;

    // Write instruction to memory at PC = 0
    memory.writeWord(0x0000, instruction);

    const cpu = new CPU(memory, registers, flags);

    cpu.step(); // execute ADD

    expect(registers.read(1)).toBe(12); // 5 + 7
    expect(flags.Z).toBe(false);
    expect(flags.N).toBe(false);
    expect(registers.read("PC")).toBe(2);
  });
});
