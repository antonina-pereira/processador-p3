// registers.ts
// Defines general purpose and special registers
// Implements helper functions

export type RegisterName =
  // R0-R7 multipurpose registers
  | "R0"
  | "R1"
  | "R2"
  | "R3"
  | "R4"
  | "R5"
  | "R6"
  | "R7"
  | "PC" // Program counter, has the address of the next instruction to execute
  | "SP" // Stack pointer, points to the top of the stack
  | "RE"; // State register, saves the flags

// Maps the register names to numerical values
export const RegisterIndex: Record<number, RegisterName> = {
  0: "R0",
  1: "R1",
  2: "R2",
  3: "R3",
  4: "R4",
  5: "R5",
  6: "R6",
  7: "R7",
  8: "PC",
  9: "SP",
  10: "RE",
};

// Inverse map from number to register name
export const IndexToRegister: RegisterName[] = [
  "R0",
  "R1",
  "R2",
  "R3",
  "R4",
  "R5",
  "R6",
  "R7",
  "PC",
  "SP",
  "RE",
];

export class Registers {
  private values: Record<RegisterName, number>;
  // Initializes all registers to zero
  constructor() {
    this.values = {
      R0: 0,
      R1: 0,
      R2: 0,
      R3: 0,
      R4: 0,
      R5: 0,
      R6: 0,
      R7: 0,
      PC: 0,
      SP: 0,
      RE: 0,
    };
  }

  // Reads a value from a register
  read(name: RegisterName): number {
    return this.values[name];
  }

  // Writes a value to a register
  write(name: RegisterName, value: number): void {
    // R0 is hardwired to 0
    if (name === "R0") {
      return;
    }

    // PC and RE cannot be written directly by instructions
    // (only control‑flow instructions modify PC, and ALU modifies RE)
    if (name === "PC" || name === "RE") {
      return;
    }

    this.values[name] = value & 0xffff; // Each word is 16 bits
  }

  setPC(value: number): void {
    // Used internally by the CPU
    this.values.PC = value & 0xffff;
  }

  setRE(value: number): void {
    // Used internally by ALU operations
    this.values.RE = value & 0xffff;
  }

  // Resets all registers
  reset(): void {
    for (const key in this.values) {
      this.values[key as RegisterName] = 0;
    }
  }

  // Gets the values for all registers
  dump(): Record<RegisterName, number> {
    return {
      R0: this.read("R0"),
      R1: this.read("R1"),
      R2: this.read("R2"),
      R3: this.read("R3"),
      R4: this.read("R4"),
      R5: this.read("R5"),
      R6: this.read("R6"),
      R7: this.read("R7"),
      SP: this.read("SP"),
      PC: this.read("PC"),
      RE: this.read("RE"),
    };
  }
}
