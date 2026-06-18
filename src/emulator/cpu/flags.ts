// flags.ts
// Defines the flags (O, N, C, Z, E)
// Flags are stored in the 5 least significant bits of RE
// Defines helper functions

import { Registers } from "./registers";

export type FlagName =
  | "O" // Overflow
  | "N" // Negative
  | "C" // Carry
  | "Z" // Zero
  | "E"; // Enable interrupts

// Maps the flags to the bits
export const FlagBit: Record<FlagName, number> = {
  O: 0,
  N: 1,
  C: 2,
  Z: 3,
  E: 4,
};

export class Flags {
  private registers: Registers;

  constructor(registers: Registers) {
    this.registers = registers;
  }

  // Gets a single flag
  get Z(): boolean {
    return this.read("Z");
  }

  get N(): boolean {
    return this.read("N");
  }

  get C(): boolean {
    return this.read("C");
  }

  get O(): boolean {
    return this.read("O");
  }

  get E(): boolean {
    return this.read("E");
  }

  // Gets the values of the flags
  private get RE(): number {
    return this.registers.read("RE");
  }

  // Stores the flag value in RE
  private set RE(value: number) {
    // Keeps only 16 bits
    this.registers.setRE(value & 0xffff);
  }

  // Reads the values of a flag
  read(name: FlagName): boolean {
    const bit = FlagBit[name];
    return ((this.RE >> bit) & 1) === 1;
  }

  // Changes the value of a flag
  write(name: FlagName, value: boolean): void {
    const bit = FlagBit[name];
    if (value) {
      this.RE = this.RE | (1 << bit);
    } else {
      this.RE = this.RE & ~(1 << bit);
    }
  }

  // Resets all flags
  reset(): void {
    this.RE = 0;
  }

  // Updates all flags according to the result of the last operation
  update(result: number, opts?: { overflow?: boolean; carry?: boolean }): void {
    // 16 bits mask
    const value = result & 0xffff;

    // Overflow - optional
    if (opts?.overflow !== undefined) {
      this.write("O", opts.overflow);
    }

    // Negative
    this.write("N", (value & 0x8000) !== 0);

    // Carry - optional
    if (opts?.carry !== undefined) {
      this.write("C", opts.carry);
    }

    // Zero
    this.write("Z", value === 0);
  }

  // Gets the values of all flags
  dump(): Record<FlagName, boolean> {
    return {
      O: this.O,
      N: this.N,
      C: this.C,
      Z: this.Z,
      E: this.E,
    };
  }
}
