// flags.ts
// Define os bits de estado (O, N, C, Z, E)
// Os bits de estado estão guardados nos 5 bits menos significativos do registo RE
// Implementa funções para gerir os bits de estado
// Usado por ALU e microcode

import { Registers } from "./registers"

export type FlagName =
  | "O" // Overflow, indica que o resultado da última operação aritmética excede a capacidade do operando destino
  | "N" // Negative, indica que o resultado da última operação foi negativo
  | "C" // Carry, indica que a última operação gerou um bit de transporte para além da última posição do operando destino
  | "Z" // Zero, indica que o resultado da última operação foi Zero
  | "E" // Enable interrupts, habilita ou não as interrupções

export const FlagBit: Record<FlagName, number> = {
  O: 1,
  N: 2,
  C: 3,
  Z: 4,
  E: 5,
}

export class Flags {
  constructor(private registers: Registers) {}

  private get RE(): number {
    return this.registers.read("RE")
  }

  private set RE(value: number) {
    // mantém apenas 16 bits
    this.registers.write("RE", value & 0xFFFF)
  }

  // Ler o valor de um bit de estado
  read(name: FlagName): boolean {
    const bit = FlagBit[name]
    return ((this.RE >> bit) & 1) === 1
  }

  // Alterar o valor de um bit de estado
  write(name: FlagName, value: boolean): void {
    const bit = FlagBit[name]
    if (value) {
      this.RE = this.RE | (1 << bit)
    } else {
      this.RE = this.RE & ~(1 << bit)
    }
  }

  // Reset de todos os bits de estado (os 5 bits menos significativos)
  reset(): void {
    this.RE = this.RE & ~0b11111
  }

  // Actualizar todos os bits de estado de acordo com o resultado da última operação
  update(result: number, overflow?: boolean, carry?: boolean): void {
    // Overflow
    if (overflow !== undefined) {
      this.write("O", overflow)  
    }

    // Negative
    this.write("N", (result & 0x8000) !== 0)

    // Carry
    if (carry !== undefined) {
      this.write("C", carry)
    }

    // Zero
    this.write("Z", result === 0)
  }
  
  // Obter valores de todos os bits de estado
  dump(): number {
    return this.RE & 0b11111
  }
}
