import { describe, it, expect } from "vitest";
import Memory, { MEMORY_SIZE, MAX_ADDRESS } from "../memory";

describe("Memory", () => {
  it("reads and writes bytes correctly", () => {
    const mem = new Memory();
    mem.writeByte(0x10, 0xAB);

    expect(mem.readByte(0x10)).toBe(0xAB);
  });

  it("reads and writes words", () => {
    const mem = new Memory();
    mem.writeWord(0x20, 0x1234);

    expect(mem.readWord(0x20)).toBe(0x1234);
    expect(mem.readByte(0x21)).toBe(0x34); // low byte
    expect(mem.readByte(0x20)).toBe(0x12); // high byte
  });

  it("throws on out-of-bounds byte access", () => {
    const mem = new Memory();

    expect(() => mem.readByte(MEMORY_SIZE)).toThrow();
    expect(() => mem.writeByte(MEMORY_SIZE, 0xFF)).toThrow();
  });

  it("throws on out-of-bounds word access", () => {
    const mem = new Memory();

    // last valid word starts at MAX_ADDRESS - 1
    expect(() => mem.readWord(MAX_ADDRESS)).toThrow();
    expect(() => mem.writeWord(MAX_ADDRESS, 0xFFFF)).toThrow();
  });

  it("loads a program into memory", () => {
    const mem = new Memory();
    const program = [0x1111, 0x2222, 0x3333];

    mem.loadProgram(program, 0x100);

    expect(mem.readWord(0x100)).toBe(0x1111);
    expect(mem.readWord(0x102)).toBe(0x2222);
    expect(mem.readWord(0x104)).toBe(0x3333);
  });

  it("clears memory", () => {
    const mem = new Memory();
    mem.writeWord(0x50, 0xABCD);

    mem.clear();

    expect(mem.readWord(0x50)).toBe(0x0000);
  });
});

