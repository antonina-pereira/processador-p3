// emulator.ts
// Converts assembly code into machine code
// Runs the CPU and retrieves its state

import { assemble } from "./asm/assembler";

import { Cpu } from "./cpu/cpu";
import type { CpuState } from "./cpu/cpu-state";
import Memory, { MAIN_MEMORY_START } from "./cpu/memory";
import { Registers, type RegisterName } from "./cpu/registers";
import { Flags } from "./cpu/flags";
import { ControlUnit } from "./cpu/control-unit";
import type { ProgramLine } from "./program-line";

export interface EmulatorState extends CpuState {
  listing: ProgramLine[];
}

export class EmulatorSession {
  public cpu: Cpu;

  private memory: Memory;
  private registers: Registers;
  private listing: ProgramLine[] = [];

  private programStart = MAIN_MEMORY_START;
  private programEnd = MAIN_MEMORY_START;

  constructor() {
    this.memory = new Memory();
    this.registers = new Registers();
    const flags = new Flags(this.registers);

    const controlUnit = new ControlUnit(this.memory, this.registers, flags);

    this.cpu = new Cpu(this.memory, this.registers, flags, controlUnit);
  }

  public assemble(source: string) {
    const result = assemble(source);
    this.listing = result.listing;
    return result;
  }

  // Retrieves the list of program instructions
  public getListing(): ProgramLine[] {
    return this.listing;
  }

  public load(program: number[]): void {
    this.cpu.reset();
    this.cpu.loadProgram(program);
    this.programStart = MAIN_MEMORY_START;
    this.programEnd = MAIN_MEMORY_START + program.length * 2; // start address + number of instructions * bytes per instruction
  }

  public step(): void {
    this.cpu.step();
  }

  public run(maxSteps = 10000): void {
    let count = 0; // number of executed instructions

    while (count < maxSteps) {
      const pcBefore = this.cpu.getPC();

      // if the PC falls outside the program's memory range, the execution is stopped
      if (pcBefore < this.programStart || pcBefore >= this.programEnd) {
        break;
      }

      this.cpu.step();
      count++;

      const pcAfter = this.cpu.getPC();

      // stops the CPU from executing the same instruction several times
      if (pcAfter === pcBefore) {
        break;
      }
    }
  }

  public getState(): EmulatorState {
    const state = this.cpu.getState();
    return {
      ...state, // for the CPU state panel in the UI
      listing: this.listing, // for the program view in the UI
    };
  }

  public reset(): void {
    this.cpu.reset();
  }

  // Allows a memory address to be changed by the user in the UI
  public writeMemory(address: number, value: number): void {
    this.memory.writeWord(address, value & 0xffff);
  }

  // Allows the user to update the value of a register
  writeRegister(name: RegisterName, value: number) {
    this.registers.write(name, value & 0xffff);
  }
}
