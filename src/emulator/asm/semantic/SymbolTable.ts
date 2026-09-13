// SymbolTable.ts
// Creates a record of the symbols used in the program

// Types of user defined symbols
export type SymbolType =
  | "LABEL" // it is a code location
  | "CONSTANT" // it is an EQU symbol
  | "VARIABLE" // it is a memory location
  | undefined;

export interface SymbolEntry {
  name: string;
  type: SymbolType;
  value?: number;
  line: number;
  column: number;
}

export class SymbolTable {
  private readonly symbols = new Map<string, SymbolEntry>();

  public define(symbol: SymbolEntry): boolean {
    // Identify if the symbol already exists
    if (this.symbols.has(symbol.name)) {
      return false;
    }
    // Add it to the set of symbols if unique
    this.symbols.set(symbol.name, symbol);
    return true;
  }

  public lookup(name: string): SymbolEntry | undefined {
    return this.symbols.get(name);
  }

  public exists(name: string): boolean {
    return this.symbols.has(name);
  }

  public entries(): SymbolEntry[] {
    return [...this.symbols.values()];
  }

  public updateValue(name: string, value: number): void {
    const symbol = this.symbols.get(name);
    if (!symbol) {
      return;
    }
    symbol.value = value;
  }
}
