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
        return [opcode << 10];

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
            code.push(Number(value.value));
          }
        }
        return;
    }
  }

  private generateZeroOpValue(
    instruction: AST.InstructionNode,
    opcode: number,
  ): number[] {
    // ZERO_OP_VALUE format: opcode in bits 15..10 and immediate in bits 9..0 (10 bits)
    // The AST is expected to provide the immediate (ConstantNode with a value ) as the first operand
    const operand = instruction.operands && instruction.operands[0];
    if (!operand || !("value" in operand)) {
      throw new Error("ZERO_OP_VALUE requires a constant operand");
    }

    const immediate = operand.value & 0x03ff; // 10 bits
    const word = (opcode << 10) | immediate;

    return [word];
  }

  private generateOneOp(
    instruction: AST.InstructionNode,
    opcode: number,
  ): number[] {
    const operand = instruction.operands[0];

    let word = 0;
    word |= opcode << 10;
    word |= 0 << 9; // S bit

    const result: number[] = [];

    // If operand is a direct register (RegisterNode with string)
    if (
      "register" in operand &&
      typeof (operand as any).register === "string"
    ) {
      // M = 0b00 and reg_mode = register index
      const regIndex = this.encodeRegister((operand as any).register as string);
      word |= 0b00 << 4;
      word |= regIndex & 0xf;

      result.push(word);
      return result;
    }

    // Register indirect: operand.register is an object node
    if (
      "register" in operand &&
      typeof (operand as any).register !== "string"
    ) {
      const regIndex = this.encodeRegister(
        ((operand as any).register as any).register,
      );
      // M = 0b01
      word |= 0b01 << 4;
      word |= regIndex & 0xf;

      result.push(word);
      return result;
    }

    // Immediate operand (uses an extension word)
    if ("value" in operand) {
      word |= 0b10 << 4; // M = immediate
      word |= 0; // reg_mode = 0

      result.push(word);
      const raw = (operand as any).value;
      const imm = typeof raw === "number" ? raw : raw.value;
      result.push(imm);

      return result;
    }

    // Direct/addressing modes (address, indexed, based, relative)
    if ("address" in operand) {
      // M = 0b11 and reg_mode = 0 (direct)
      word |= 0b11 << 4;
      word |= 0;

      result.push(word);
      const raw = (operand as any).address.value;
      const imm = typeof raw === "number" ? raw : raw.value;
      result.push(imm);

      return result;
    }

    if ("offset" in operand && "register" in operand) {
      // Indexed or based: M = 0b11 and reg_mode = register index
      const regIndex = this.encodeRegister(
        ((operand as any).register as any).register,
      );
      const regMode = regIndex & 0xf;
      word |= 0b11 << 4;
      word |= regMode;

      result.push(word);
      result.push((operand as any).offset.value);

      return result;
    }

    throw new Error("Unsupported ONE_OP operand type.");
  }

  private generateOneOpValue(
    instruction: AST.InstructionNode,
    opcode: number,
  ): number[] {
    // ONE_OP_VALUE: opcode (15..10), positions (9..6, 4 bits), M (5..4) and reg_mode (3..0)
    const target = instruction.operands[0];
    const positionsOperand = instruction.operands[1];

    if (!positionsOperand || !("value" in positionsOperand)) {
      throw new Error("ONE_OP_VALUE requires an immediate positions operand");
    }

    const positions = positionsOperand.value & 0xf;

    let word = 0;
    word |= opcode << 10;
    word |= (positions & 0xf) << 6;
    word |= 0 << 9; // S bit

    const result: number[] = [];

    // The target can be register
    if ("register" in target && typeof (target as any).register === "string") {
      const regIndex = this.encodeRegister((target as any).register as string);
      word |= 0b00 << 4; // M = register
      word |= regIndex & 0xf;

      result.push(word);
      return result;
    }

    // register indirect
    if ("register" in target && typeof (target as any).register !== "string") {
      const regIndex = this.encodeRegister(
        ((target as any).register as any).register,
      );
      word |= 0b01 << 4; // M = register indirect
      word |= regIndex & 0xf;

      result.push(word);
      return result;
    }

    // immediate as target -> extension
    if ("value" in target) {
      word |= 0b10 << 4; // M = immediate/address extension
      word |= 0; // reg_mode = 0

      result.push(word);
      const raw = (target as any).value;
      const imm = typeof raw === "number" ? raw : raw.value;
      result.push(imm);

      return result;
    }

    // memory modes
    if ("address" in target) {
      word |= 0b11 << 4; // M = memory modes
      word |= 0; // reg_mode = 0 -> direct

      result.push(word);
      const raw = (target as any).address.value;
      const imm = typeof raw === "number" ? raw : raw.value;
      result.push(imm);

      return result;
    }

    if ("offset" in target && "register" in target) {
      const regIndex = this.encodeRegister(
        ((target as any).register as any).register,
      );
      word |= 0b11 << 4;
      word |= regIndex & 0xf;

      result.push(word);
      result.push((target as any).offset.value);
      return result;
    }

    throw new Error("Unsupported ONE_OP_VALUE operand type.");
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
    if ("register" in source && typeof (source as any).register === "string") {
      word |= 0b00 << 4; // M
      word |= this.encodeRegister((source as any).register.toString());

      result.push(word);

      return result;
    }

    // Register indirect
    if ("register" in source && typeof (source as any).register !== "string") {
      const regIndex = this.encodeRegister(
        ((source as any).register as any).register,
      );
      word |= 0b01 << 4; // M = register indirect
      word |= regIndex & 0xf;

      result.push(word);
      return result;
    }

    // Immediate source
    if ("value" in source) {
      word |= 0b10 << 4; // M
      word |= 0;

      result.push(word);
      const raw = (source as any).value;
      const imm = typeof raw === "number" ? raw : raw.value;
      result.push(imm);

      return result;
    }

    // Direct/addressing modes
    if ("address" in source) {
      word |= 0b11 << 4;
      word |= 0; // reg_mode = 0 -> direct

      result.push(word);
      const raw = (source as any).address.value;
      const imm = typeof raw === "number" ? raw : raw.value;
      result.push(imm);

      return result;
    }

    if ("offset" in source && "register" in source) {
      const regIndex = this.encodeRegister(
        ((source as any).register as any).register,
      );
      word |= 0b11 << 4;
      word |= regIndex & 0xf;

      result.push(word);
      result.push((source as any).offset.value);

      return result;
    }

    throw new Error(`Unsupported two operand operation.`);
  }

  private generateJump(
    instruction: AST.InstructionNode,
    opcode: number,
  ): number[] {
    // Support relative small displacement (6-bit signed) and absolute direct address
    const operand = instruction.operands[0];

    // If operand is constant value and fits in signed 6-bit range, encode relative
    if ("value" in operand) {
      const val = (operand as any).value;
      if (val >= -32 && val <= 31) {
        const disp = val & 0x3f;
        const word = (opcode << 10) | disp;
        return [word];
      }

      // Otherwise use absolute direct addressing: M=0b11, reg_mode=0 and extension word
      const word = (opcode << 10) | (0b11 << 4) | 0;
      const raw = (operand as any).value;
      const imm = typeof raw === "number" ? raw : raw.value;
      return [word, imm];
    }

    // If it is a label reference or other memory mode, encode as direct
    if ("name" in operand || "address" in operand) {
      const word = (opcode << 10) | (0b11 << 4) | 0; // direct
      const raw = (operand as any).address.value;
      const imm = typeof raw === "number" ? raw : raw.value;
      const address = (operand as any).address ? imm : 0;
      return [word, address];
    }

    throw new Error("Unsupported JUMP operand type.");
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
