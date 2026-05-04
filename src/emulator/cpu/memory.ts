// memory.ts

export const WORD_SIZE = 2;              // bytes per word
export const MEMORY_SIZE = 0x10000;      // 64 KB address space
export const MAX_ADDRESS = MEMORY_SIZE - 1;

// Memory is modeled as a Uint16Array (word‑addressable)
// Internally stored as bytes but exposed as 16‑bit words
export class Memory {
  private data: Uint8Array;

  constructor(size: number = MEMORY_SIZE) {
    this.data = new Uint8Array(size);
  }

  // Assegurar que um endereço está dentro dos limites
  private checkAddress(addr: number) {
    if (addr < 0 || addr > MAX_ADDRESS) {
      throw new Error(`Memory access out of bounds: 0x${addr.toString(16)}`);
    }
  }

  // Ler um byte da memória
  readByte(addr: number): number {
    this.checkAddress(addr);
    return this.data[addr];
  }

  // Escrever um byte na memória
  writeByte(addr: number, value: number) {
    this.checkAddress(addr);
    this.data[addr] = value & 0xFF;
  }

  // Ler uma palavra de 16-bits
  readWord(addr: number): number {
    this.checkAddress(addr);
    this.checkAddress(addr + 1);

    const hi = this.data[addr];
    const lo = this.data[addr + 1];
    return (hi << 8) | lo;
  }

  // Escrever uma palavra de 16-bits
  writeWord(addr: number, value: number) {
    this.checkAddress(addr);
    this.checkAddress(addr + 1);

    this.data[addr] = (value >> 8) & 0xFF;
    this.data[addr + 1] = value & 0xFF;
  }

  // Carregar um programa na memória num endereço específico
  loadProgram(words: number[], origin: number = 0) {
    let addr = origin;
    for (const w of words) {
      this.writeWord(addr, w);
      addr += WORD_SIZE;
    }
  }

  // Obter valores na memória
  dump(start: number, end: number): string {
    const lines: string[] = [];
    for (let addr = start; addr <= end; addr += 2) {
      const word = this.readWord(addr);
      lines.push(`0x${addr.toString(16).padStart(4, "0")}: 0x${word.toString(16).padStart(4, "0")}`);
    }
    return lines.join("\n");
  }

  // Reset da memória a zero
  clear() {
    this.data.fill(0);
  }
}

export default Memory;
