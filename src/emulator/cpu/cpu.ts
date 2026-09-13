// cpu.ts
// Provides a step, reset, load program, and get state.

import Memory from "./memory";
import { Registers } from "./registers";
import { Flags } from "./flags";
import { ControlUnit } from "./control-unit";
import type { CpuState } from "./cpu-state";
import {
  MAIN_MEMORY_START,
  MAIN_MEMORY_END,
  STACK_MEMORY_START,
  STACK_MEMORY_END,
} from "./memory";

export class Cpu {
  public memory: Memory;
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

  public loadProgram(program: number[]): void {
    this.memory.loadProgram(program);
  }

  public getState(): CpuState {
    return {
      registers: this.registers.dump(),
      flags: this.flags.dump(),
      memory: [
        ...this.memory.dumpWords(MAIN_MEMORY_START, MAIN_MEMORY_END),
        ...this.memory.dumpWords(STACK_MEMORY_START, STACK_MEMORY_END),
      ],
    };
  }

  public getPC(): number {
    return this.registers.read("PC");
  }
}
