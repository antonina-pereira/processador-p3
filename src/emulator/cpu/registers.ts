// registers.ts
// Implementa os registos do processador
// Define os registos de propósito geral
// Define os registos especiais (PC, SP e RE)
// Implementa funções de ajuda (ler, escrever, reset, obter os valores)

export type RegisterName =
  | "R0"  // Registo de propósito geral
  | "R1"  // Registo de propósito geral
  | "R2"  // Registo de propósito geral
  | "R3"  // Registo de propósito geral
  | "R4"
  | "R5"
  | "R6"
  | "R7"
  | "PC"  // Program counter, contém o endereço da próxima instrução a executar
  | "SP"  // Stack pointer, apontador para o topo da pilha
  | "RE";  // Registo de estado, registo onde estão guardados os bits de estado (flags)

export const RegisterIndex: Record<RegisterName, number> = {
  R0: 0,
  R1: 1,
  R2: 2,
  R3: 3,
  R4: 4,
  R5: 5,
  R6: 6,
  R7: 7,
  PC: 8,
  SP: 9,
  RE: 10
};

export class Registers {
  private values: Record<RegisterName, number>
  // Todos os registos são inicializados a 0 após um reset do processador
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
    }
  }

  // Lê o valor de um registo
  read(name: RegisterName): number {
    return this.values[name]
  }

  // Escreve um valor num registo
  write(name: RegisterName, value:number): void {
    // R0 is hardwired to 0
    if (name === "R0") {
      return;
    }

    // PC and RE cannot be written directly by instructions
    // (only control‑flow instructions modify PC, and ALU modifies RE)
    if (name === "PC" || name === "RE") {
      return;
    }

    this.values[name] = value & 0xFFFF // Cada palavra é de 16 bits
  }

  setPC(value: number): void {
    // Used internally by the CPU
    this.values.PC = value & 0xFFFF;
  }

  setRE(value: number): void {
    // Used internally by ALU operations
    this.values.RE = value & 0xFFFF;
  }

  // Reset de todos os registos
  reset(): void {
    for (const key in this.values) {
      this.values[key as RegisterName] = 0
    }
  }

  // Obter valores de todos os registos
  dump(): Record<RegisterName, number> {
    return { ...this.values }
  }
}
