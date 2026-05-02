// cpu.ts
// Holds CPU state
// Executes micro-instructions from the microcode
// Coordinates datapath components
// Advances the micro-instruction sequencer
// Provides methods like step() or cycle()

import { Registers } from "../registers"
import { Flags } from "../flags"
// import { ALU } from "../alu"
// import { Memory } from "../memory"
// import { MIcrocode } from "../microcode"

export class CPU {
  public registers: Registers
  public flags: Flags
  // private alu: ALU
  // private memory: Memory
  // private microcode: Microcode
  
  constructor() {
    this.registers = new Registers()
    this.flags = new Flags(this.registers)
    // this.alu = new ALU(this.flags)
    // this.memory = new Memory()
    // this.microcode = new Microcode()

  }
}
