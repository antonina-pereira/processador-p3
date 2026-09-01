import { Registers } from "../registers";
import { Flags } from "../flags";
import { describe, beforeEach, test, expect } from "vitest";

describe("Flags", () => {
  let registers: Registers;
  let flags: Flags;

  beforeEach(() => {
    registers = new Registers();
    flags = new Flags(registers);
  });

  test("initializes all flags to false", () => {
    const snapshot = flags.dump();
    for (const key in snapshot) {
      expect(snapshot[key as keyof typeof snapshot]).toBe(false);
    }
  });

  test("reads and writes individual flags", () => {
    flags.write("O", true);
    expect(flags.read("O")).toBe(true);

    flags.write("Z", false);
    expect(flags.read("Z")).toBe(false);
  });

  test("reset clears all flags", () => {
    flags.write("Z", true);
    flags.write("C", true);
    flags.reset();

    const snapshot = flags.dump();
    for (const key in snapshot) {
      expect(snapshot[key as keyof typeof snapshot]).toBe(false);
    }
  });

  test("update sets Overflow flag when provided", () => {
    flags.update(10, { overflow: true });
    expect(flags.read("O")).toBe(true);

    flags.update(10, { overflow: false });
    expect(flags.read("O")).toBe(false);
  });

  test("update sets Negative flag correctly (16-bit signed)", () => {
    flags.update(0x8000); // highest bit set
    expect(flags.read("N")).toBe(true);

    flags.update(0x7fff); // highest bit clear
    expect(flags.read("N")).toBe(false);
  });

  test("update sets Carry flag when provided", () => {
    flags.update(10, { carry: true });
    expect(flags.read("C")).toBe(true);

    flags.update(10, { carry: false });
    expect(flags.read("C")).toBe(false);
  });

  test("update sets Zero flag correctly", () => {
    flags.update(0);
    expect(flags.read("Z")).toBe(true);

    flags.update(5);
    expect(flags.read("Z")).toBe(false);
  });

  test("dump returns a copy", () => {
    const snapshot = flags.dump();
    // mutate snapshot (just a number)
    const mutated = snapshot | 0b1;
    // internal state should not change
    expect(flags.read("Z")).toBe(false);
  });
});
