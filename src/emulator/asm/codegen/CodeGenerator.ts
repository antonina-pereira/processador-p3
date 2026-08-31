// CodeGenerator.ts

import * as AST from "../ast/nodes";
import { getOpcodeFromMnemonic } from "../../cpu/instruction-set";

export interface MachineWord {
  address: number;
  value: number;
}

export class CodeGenerator {
  public generate(program: AST.ProgramNode): number[] {
    const code: number[] = [];

    for (const statement of program.statements) {
      this.generateStatement(statement, code);
    }

    return code;
  }

  private encodeRegister(register: string): number {
    if (register === "SP") {
      return 0b1000;
    }

    return Number(register.replace("R", ""));
  }

  private getOperandMode(operand: AST.OperandNode): number {
    if ("register" in operand) {
      return 0b00;
    }

    if ("value" in operand) {
      return 0b10;
    }

    if ("address" in operand) {
      return 0b11;
    }

    if ("offset" in operand && "register" in operand) {
      return 0b11;
    }

    throw new Error("Unsupported operand mode.");
  }

  private generateStatement(
    statement: AST.StatementNode,
    code: number[],
  ): void {
    if ("mnemonic" in statement) {
      code.push(...this.generateInstruction(statement));

      return;
    }

    this.generateDirective(statement, code);
  }

  private generateInstruction(instruction: AST.InstructionNode): number[] {
    const opcode = getOpcodeFromMnemonic(instruction.mnemonic);
    switch (this.getInstructionFormat(instruction)) {
      case "ZERO_OP":
        return [opcode];

      case "ZERO_OP_VALUE":
        return this.generateZeroOpValue(instruction, opcode);

      case "ONE_OP":
        return this.generateOneOp(instruction, opcode);

      case "ONE_OP_VALUE":
        return this.generateOneOpValue(instruction, opcode);

      case "TWO_OP":
        return this.generateTwoOp(instruction, opcode);

      case "JUMP":
        return this.generateJump(instruction, opcode);
    }
  }

  private generateDirective(
    directive: AST.DirectiveNode,
    code: number[],
  ): void {
    switch (directive.type) {
      case "ORIG":
        return;

      case "EQU":
        return;

      case "WORD":
        code.push(directive.value.value);
        return;

      case "TAB":
        for (let i = 0; i < directive.value.value; i++) {
          code.push(0);
        }
        return;

      case "STR":
        for (const value of directive.values) {
          if ("value" in value) {
            code.push(value.value);
          }
        }
        return;
    }
  }

  private generateZeroOpValue(
    instruction: AST.InstructionNode,
    opcode: number,
  ): number[] {
    throw new Error("Not implemented");
  }

  private generateOneOp(
    instruction: AST.InstructionNode,
    opcode: number,
  ): number[] {
    throw new Error("Not implemented");
  }

  private generateOneOpValue(
    instruction: AST.InstructionNode,
    opcode: number,
  ): number[] {
    throw new Error("Not implemented");
  }

  private generateTwoOp(
    instruction: AST.InstructionNode,
    opcode: number,
  ): number[] {
    const destination = instruction.operands[0] as AST.RegisterNode;

    const source = instruction.operands[1];

    let word = 0;

    // opcode:6 (bits 15..10)
    word |= opcode << 10;

    // S bit (bit 9)
    word |= 0 << 9;

    // destination register:3 (bits 8..6)
    word |= this.encodeRegister(destination.register) << 6;

    const result: number[] = [];

    // addressing mode:2
    word |= this.getOperandMode(source) << 4;

    // reg_mode:4
    if ("register" in source) {
      word |= 0b00 << 4; // M
      word |= this.encodeRegister(source.register.toString());

      result.push(word);

      return result;
    }

    // Immediate source
    if ("value" in source) {
      word |= 0b10 << 4; // M
      word |= 0;

      result.push(word);
      result.push(source.value);

      return result;
    }

    throw new Error(`Unsupported two operand operation.`);
  }

  private generateJump(
    instruction: AST.InstructionNode,
    opcode: number,
  ): number[] {
    throw new Error("Not implemented");
  }

  private getInstructionFormat(
    instruction: AST.InstructionNode,
  ):
    | "ZERO_OP"
    | "ZERO_OP_VALUE"
    | "ONE_OP"
    | "ONE_OP_VALUE"
    | "TWO_OP"
    | "JUMP" {
    switch (instruction.mnemonic) {
      case "NOP":
      case "RET":
      case "RTI":
      case "ENI":
      case "DSI":
        return "ZERO_OP";

      case "INT":
      case "RETN":
        return "ZERO_OP_VALUE";

      case "INC":
      case "DEC":
      case "NEG":
      case "PUSH":
      case "POP":
        return "ONE_OP";

      case "SHL":
      case "SHR":
      case "SHRA":
      case "ROR":
      case "ROL":
        return "ONE_OP_VALUE";

      case "ADD":
      case "ADDC":
      case "SUB":
      case "SUBB":
      case "CMP":
      case "AND":
      case "OR":
      case "XOR":
      case "MOV":
      case "MUL":
      case "DIV":
        return "TWO_OP";

      case "BR":
      case "CALL":
        return "JUMP";

      default:
        throw new Error(`Unknown mnemonic '${instruction.mnemonic}'`);
    }
  }
}
