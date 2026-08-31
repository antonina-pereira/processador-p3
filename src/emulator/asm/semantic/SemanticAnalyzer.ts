// SemanticAnalyzer.ts
// Validates the AST and provides diagnostics

import * as AST from "../ast/nodes";
import { SymbolTable, type SymbolEntry, type SymbolType } from "./SymbolTable";
import { type Diagnostic } from "./Diagnostic.ts";

export interface AnalysisResult {
  symbols: SymbolTable;
  diagnostics: Diagnostic[];
}

export class SemanticAnalyzer {
  private readonly symbols = new SymbolTable();

  private readonly diagnostics: Diagnostic[] = [];

  private currentAddress = 0;

  public analyze(program: AST.ProgramNode): AnalysisResult {
    // Pass 1: add symbols to Symbol Table and check duplicates
    this.buildSymbolTable(program);
    // Pass 2: check for undefined symbols
    this.checkUndefinedSymbols(program);
    // Pass 3: instruction and directive validation
    this.validateProgram(program);
    // Pass 4: assign addresses
    this.assignAddress(program);
    // Pass 5: resolve branches
    //this.resolveBranch(program);

    return {
      symbols: this.symbols,
      diagnostics: this.diagnostics,
    };
  }

  private buildSymbolTable(program: AST.ProgramNode): void {
    for (const statement of program.statements) {
      this.buildStatement(statement);
    }
  }

  private buildStatement(statement: AST.StatementNode): void {
    if ("mnemonic" in statement) {
      this.buildInstruction(statement);
      return;
    }
    this.buildDirective(statement);
  }

  private buildInstruction(instruction: AST.InstructionNode): void {
    if (!instruction.label) {
      return;
    }
    this.defineSymbol({
      name: instruction.label.name,
      type: "LABEL",
      value: undefined,
      line: instruction.label.line,
      column: instruction.label.column,
    });
  }

  private buildDirective(directive: AST.DirectiveNode): void {
    switch (directive.type) {
      case "ORIG":
        break;

      case "EQU":
        this.defineSymbol({
          name: directive.symbol.name,
          type: "CONSTANT",
          value: directive.value.value,
          line: directive.line,
          column: directive.column,
        });
        break;

      case "WORD":
        this.defineSymbol({
          name: directive.label.name,
          type: "VARIABLE",
          value: undefined,
          line: directive.line,
          column: directive.column,
        });
        break;

      case "STR":
        this.defineSymbol({
          name: directive.label.name,
          type: "VARIABLE",
          value: undefined,
          line: directive.line,
          column: directive.column,
        });
        break;

      case "TAB":
        this.defineSymbol({
          name: directive.label.name,
          type: "VARIABLE",
          value: undefined,
          line: directive.line,
          column: directive.column,
        });
        break;
    }
  }

  private defineSymbol(symbol: SymbolEntry): void {
    if (!this.symbols.define(symbol)) {
      this.diagnostics.push({
        line: symbol.line,
        column: symbol.column,
        message: `Duplicate symbol '${symbol.name}'.`,
      });

      return;
    }

    console.log(this.symbols.entries());
  }

  private checkUndefinedSymbols(program: AST.ProgramNode): void {
    for (const statement of program.statements) {
      this.checkStatement(statement);
    }
  }

  private checkStatement(statement: AST.StatementNode): void {
    if ("mnemonic" in statement) {
      this.checkInstruction(statement);
      return;
    }

    this.checkDirective(statement);
  }

  private checkInstruction(instruction: AST.InstructionNode): void {
    for (const operand of instruction.operands) {
      this.checkOperand(operand);
    }
  }

  private checkOperand(operand: AST.OperandNode): void {
    if ("name" in operand) {
      if (!this.symbols.exists(operand.name)) {
        this.diagnostics.push({
          line: operand.line,
          column: operand.column,
          message: `Undefined symbol '${operand.name}'.`,
        });
      }
    }
  }

  // Only the ORIG directive applies
  private checkDirective(directive: AST.DirectiveNode): void {
    if (directive.type === "ORIG" && "name" in directive.address) {
      if (!this.symbols.exists(directive.address.name)) {
        this.diagnostics.push({
          line: directive.address.line,
          column: directive.address.column,
          message: `Undefined symbol '${directive.address.name}'.`,
        });
      }
    }
  }

  private validateProgram(program: AST.ProgramNode): void {
    for (const statement of program.statements) {
      if ("mnemonic" in statement) {
        this.validateInstruction(statement as AST.InstructionNode);
      }
      this.validateDirective(statement as AST.DirectiveNode);
    }
  }

  private validateInstruction(instruction: AST.InstructionNode): void {
    switch (instruction.mnemonic) {
      case "INT":
        const operand = instruction.operands[0] as AST.ConstantNode;
        if (operand.value < 0 || operand.value > 255) {
          this.diagnostics.push({
            line: instruction.line,
            column: instruction.column,
            message: "Interrupt vector must be between 0 and 255.",
          });
        }
        break;

      case "RETN":
        // RETN value must be between 0 and 1023.
        break;

      case "MOV":
        // Destination must not be immediate.
        break;

      case "MUL":
        // Destination must not be immediate.
        break;
    }
  }

  private validateDirective(directive: AST.DirectiveNode): void {
    return;
  }

  private assignAddress(program: AST.ProgramNode): void {
    for (const statement of program.statements) {
      this.assignStatementAddress(statement);
    }
  }

  private assignStatementAddress(statement: AST.StatementNode): void {
    if ("mnemonic" in statement) {
      this.assignInstructionAddress(statement as AST.InstructionNode);
    }

    this.assignDirectiveAddress(statement as AST.DirectiveNode);
  }

  private assignInstructionAddress(instruction: AST.InstructionNode): void {
    if (instruction.label) {
      this.assignSymbolValue(instruction.label.name, this.currentAddress);
    }

    this.currentAddress += 1;
  }

  private assignDirectiveAddress(directive: AST.DirectiveNode): void {
    switch (directive.type) {
      case "ORIG":
        this.currentAddress = this.resolveOrigValue(directive.address);
        break;

      case "WORD":
        this.assignVariable(directive.label.name);
        this.currentAddress += 1;
        break;

      case "TAB":
        this.assignVariable(directive.label.name);
        this.currentAddress += directive.value.value;
        break;

      case "STR":
        this.assignVariable(directive.label.name);
        this.currentAddress += directive.values.length;
        break;

      case "EQU":
        break;
    }
  }

  private resolveOrigValue(
    value: AST.ConstantNode | AST.LabelReferenceNode,
  ): number {
    if ("value" in value) {
      return value.value;
    }

    const symbol = this.symbols.lookup(value.name);

    if (!symbol?.value) {
      throw new Error(`Unable to resolve '${value.name}'.`);
    }

    return symbol.value;
  }

  private assignVariable(name: string): void {
    this.assignSymbolValue(name, this.currentAddress);
  }

  private assignSymbolValue(name: string, value: number): void {
    this.symbols.updateValue(name, value);
  }
}
