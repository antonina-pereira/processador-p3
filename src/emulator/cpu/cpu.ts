// CPU.ts
// Provides a step, reset, load program, and get state.

import Memory from "./memory";
import { Registers } from "./registers";
import { Flags } from "./flags";
import { ControlUnit } from "./control-unit";
import type { CpuState } from "./cpu-state";

export class Cpu {
  private readonly memory: Memory;
  private readonly registers: Registers;
  private readonly flags: Flags;
  private readonly controlUnit: ControlUnit;

  constructor(
    memory: Memory,
    registers: Registers,
    flags: Flags,
    controlUnit: ControlUnit,
  ) {
    this.memory = memory;
    this.registers = registers;
    this.flags = flags;
    this.controlUnit = controlUnit;
  }

  public step(): void {
    this.controlUnit.step();
  }

  public reset(): void {
    this.registers.reset();
    this.memory.clear();
  }

  public loadProgram(program: number[], origin = 0): void {
    this.memory.loadProgram(program, origin);
  }

  public getState(): CpuState {
    return {
      registers: this.registers.dump(),
      flags: this.flags.dump(),
      memory: this.memory.dumpWords(0, 0x003e), // returns 32 words
    };
  }

  public getPC(): number {
    return this.registers.read("PC");
  }
}
