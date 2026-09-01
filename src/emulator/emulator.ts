// emulator.ts
// Converts assembly code into machine code
// Runs the CPU and retrieves its state

import { assemble } from "./asm/assembler";

import { Cpu } from "./cpu/cpu";
import type { CpuState } from "./cpu/cpu-state";
import Memory from "./cpu/memory";
import { Registers } from "./cpu/registers";
import { Flags } from "./cpu/flags";
import { ControlUnit } from "./cpu/control-unit";
import type { ProgramLine } from "./program-line";

export class EmulatorSession {
  private readonly cpu: Cpu;
  private listing: ProgramLine[] = [];
  private programSize = 0;

  constructor() {
    const memory = new Memory();
    const registers = new Registers();
    const flags = new Flags(registers);

    const controlUnit = new ControlUnit(memory, registers, flags);

    this.cpu = new Cpu(memory, registers, flags, controlUnit);
  }

  public assemble(source: string) {
    const result = assemble(source);
    this.listing = result.listing;
    return result;
  }

  public getListing(): ProgramLine[] {
    return this.listing;
  }

  public load(program: number[], origin = 0): void {
    this.cpu.reset();
    this.cpu.loadProgram(program, origin);
    this.programSize = program.length * 2;
  }

  public step(): void {
    console.log("BEFORE STEP EMULATOR", this.cpu.getState());
    this.cpu.step();
    console.log("AFTER STEP EMULATOR", this.cpu.getState());
  }

  public run(maxSteps = 10000): void {
    let count = 0;

    while (count < maxSteps) {
      const pcBefore = this.cpu.getPC();

      if (pcBefore >= this.programSize) {
        break;
      }

      this.cpu.step();
      count++;

      const pcAfter = this.cpu.getPC();

      if (pcAfter === pcBefore) {
        break;
      }
    }
  }

  public getState(): CpuState {
    const state = this.cpu.getState();
    return {
      ...state,
      listing: this.listing,
    };
  }

  public reset(): void {
    this.cpu.reset();
  }
}
