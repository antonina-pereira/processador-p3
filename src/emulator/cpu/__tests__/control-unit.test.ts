import { test, expect } from "vitest";
import Memory from "../memory";
import { Registers } from "../registers";
import { Flags } from "../flags";
import ControlUnit from "../control-unit";

test("ADD R1, R2 updates register and flags", () => {
  const memory = new Memory();
  const registers = new Registers();
  const flags = new Flags(registers);

  const cpu = new ControlUnit(memory, registers, flags);

  // Initial values
  registers.write("R1", 5);
  registers.write("R2", 3);
  registers.setPC(0x8000);

  // Encode ADD R1, R2
  const instruction =
    (0x21 << 10) |
    (1 << 6) | // R1
    (0b00 << 4) |
    2; // R2

  memory.writeWord(0x8000, instruction);

  // Execute one instruction
  cpu.step();

  // Check result
  expect(registers.read("R1")).toBe(8);

  // Flags
  expect(flags.Z).toBe(false);
  expect(flags.N).toBe(false);
});

test("ADD with overflow wraps correctly and sets flags", () => {
  const memory = new Memory();
  const registers = new Registers();
  const flags = new Flags(registers);

  const cpu = new ControlUnit(memory, registers, flags);

  // R1 = 0xFFFF (max 16-bit)
  // R2 = 1 → causes overflow
  registers.write("R1", 0xffff);
  registers.write("R2", 1);
  registers.setPC(0x8000);

  // Encode ADD R1, R2
  const instruction =
    (0x21 << 10) | // ADD opcode
    (1 << 6) | // R1
    (0b00 << 4) |
    2; // R2

  memory.writeWord(0x8000, instruction);

  cpu.step();

  // Result wraps to 0
  expect(registers.read("R1")).toBe(0);

  // Flags
  expect(flags.Z).toBe(true); // result is zero
  expect(flags.N).toBe(false); // not negative
  expect(flags.C).toBe(true); // carry occurred
});

test("ADD with immediate operand uses extension word", () => {
  const memory = new Memory();
  const registers = new Registers();
  const flags = new Flags(registers);

  const cpu = new ControlUnit(memory, registers, flags);

  registers.write("R1", 10);
  registers.write("PC", 0x8000);

  // Encode ADD R1, immediate
  // M = 10 (immediate)
  const instruction =
    (0x21 << 10) | // opcode
    (1 << 6) | // R1
    (0b10 << 4) | // immediate mode
    0; // regMode not used

  memory.writeWord(0x8000, instruction);

  // Extension word (immediate value)
  memory.writeWord(0x8002, 5);

  cpu.step();

  // Result
  expect(registers.read("R1")).toBe(15);

  // Flags
  expect(flags.Z).toBe(false);
  expect(flags.N).toBe(false);

  // PC advanced by 4 bytes (2 words)
  expect(registers.read("PC")).toBe(0x8004);
});
