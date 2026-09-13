// memory.ts
// Manages the memory

import type { MemoryWord } from "./cpu-state";

// Models and manages memory
export const WORD_SIZE = 2; // bytes per word
export const MEMORY_SIZE = 0x10000; // 64 KB address space
export const MAX_ADDRESS = MEMORY_SIZE - 1;

// Memory regions
export const MAIN_MEMORY_START = 0x8000;
export const MAIN_MEMORY_END = 0x81ff;

export const STACK_MEMORY_START = 0xfd00;
export const STACK_MEMORY_END = 0xfeff;

// Memory is modeled as a Uint16Array (word‑addressable)
// Internally stored as bytes but exposed as 16‑bit words
export class Memory {
  private data: Uint8Array;

  constructor(size: number = MEMORY_SIZE) {
    this.data = new Uint8Array(size);
  }

  // Helper functions
  // Is the address in the main memory zone?
  private isMainMemory(addr: number): boolean {
    return addr >= MAIN_MEMORY_START && addr <= MAIN_MEMORY_END;
  }

  // Is the address in the stack memory zone?
  private isStackMemory(addr: number): boolean {
    return addr >= STACK_MEMORY_START && addr <= STACK_MEMORY_END;
  }

  // Is the address in a valid position in memory?
  private isValidMemory(addr: number): boolean {
    return this.isMainMemory(addr) || this.isStackMemory(addr);
  }

  // Make sure an address is within the limits
  private checkAddress(addr: number) {
    if (addr < 0 || addr > MAX_ADDRESS) {
      throw new Error(`Memory access out of bounds: 0x${addr.toString(16)}`);
    }

    if (!this.isValidMemory(addr)) {
      throw new Error(`Address not mapped to memory: 0x${addr.toString(16)}`);
    }
  }

  // Functions to be used by the CPU
  isStackAddress(addr: number): boolean {
    return this.isStackMemory(addr);
  }

  isMainAddress(addr: number): boolean {
    return this.isMainMemory(addr);
  }

  // Read a byte from memory
  readByte(addr: number): number {
    this.checkAddress(addr);
    return this.data[addr];
  }

  // Write a byte in memory
  writeByte(addr: number, value: number) {
    this.checkAddress(addr);
    this.data[addr] = value & 0xff;
  }

  // Read 16-bit word
  readWord(addr: number): number {
    this.checkAddress(addr);
    this.checkAddress(addr + 1);

    const hi = this.data[addr];
    const lo = this.data[addr + 1];

    return (hi << 8) | lo;
  }

  // Write a 16-bit word
  writeWord(addr: number, value: number) {
    this.checkAddress(addr);
    this.checkAddress(addr + 1);

    this.data[addr] = (value >> 8) & 0xff;
    this.data[addr + 1] = value & 0xff;
  }

  // Load a program to memory in a specified address
  loadProgram(words: number[]) {
    let addr = MAIN_MEMORY_START;
    for (const w of words) {
      this.writeWord(addr, w);
      addr += WORD_SIZE;
    }
  }

  // Retrieve values from memory
  dump(start: number, end: number): string {
    const lines: string[] = [];
    for (let addr = start; addr <= end; addr += 2) {
      const word = this.readWord(addr);
      lines.push(
        `0x${addr.toString(16).padStart(4, "0")}: 0x${word.toString(16).padStart(4, "0")}`,
      );
    }
    return lines.join("\n");
  }

  // Reset memory to zero
  clear() {
    this.data.fill(0);
  }

  // Shows memory by words
  // Used by cpu-state for UI
  dumpWords(start: number, end: number): MemoryWord[] {
    const words: MemoryWord[] = [];

    for (let addr = start; addr <= end; addr += 2) {
      words.push({
        address: addr,
        value: this.readWord(addr),
      });
    }
    return words;
  }
}

export default Memory;
