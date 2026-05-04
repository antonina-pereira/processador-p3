// cpu.ts

import Memory from "./memory";
import { RegisterIndex } from "./registers";
import { Flags } from "./flags";
import { OperandType } from "./instruction-format"
import { decodeInstruction } from "./decoder";
import { alu, AluOp } from "./alu";
import { MicroOp, getMicrocode } from "./microcode";

export class CPU {
  memory: Memory;
  registers: Registers;
  flags: Flags;

  // Internal latches used during micro‑ops
  private op1 = 0;
  private op2 = 0;
  private aluResult = 0;

  constructor(memory: Memory, registers: Registers, flags: Flags) {
    this.memory = memory;
    this.registers = registers;
    this.flags = flags;
  }

  // Execute one full instruction
  step() {
    const pc = this.registers.read("PC");

    // FETCH
    const word = this.memory.readWord(pc);
    this.registers.setPC((pc + 2) & 0xFFFF);

    // DECODE
    const decoded = decodeInstruction(word, this.memory, pc);

    // MICROCODE
    const microSeq = getMicrocode(decoded.opcode);

    for (const micro of microSeq) {
      for (const op of micro.ops) {
        this.executeMicroOp(op, decoded);
      }
    }
  }

  // Execute a single micro‑operation.
  private executeMicroOp(op: MicroOp, decoded: any) {
    switch (op) {
      case MicroOp.LOAD_OP1:
        this.op1 = this.readOperand(decoded.operands[0]);
        break;

      case MicroOp.LOAD_OP2:
        this.op2 = this.readOperand(decoded.operands[1]);
        break;

      case MicroOp.ALU_ADD:
        this.aluResult = alu(AluOp.ADD, this.op1, this.op2);
        break;

      case MicroOp.ALU_SUB:
        this.aluResult = alu(AluOp.SUB, this.op1, this.op2);
        break;

      case MicroOp.ALU_AND:
        this.aluResult = alu(AluOp.AND, this.op1, this.op2);
        break;

      case MicroOp.ALU_OR:
        this.aluResult = alu(AluOp.OR, this.op1, this.op2);
        break;

      case MicroOp.ALU_XOR:
        this.aluResult = alu(AluOp.XOR, this.op1, this.op2);
        break;

      case MicroOp.ALU_NOT:
        this.aluResult = alu(AluOp.NOT, this.op1, 0);
        break;

      case MicroOp.UPDATE_FLAGS: {
        const { result, overflow, carry } = this.aluResult;
        this.flags.update(result, overflow, carry);
        break;
      }

      case MicroOp.WRITEBACK_RESULT:
        this.writeOperand(decoded.operands[0], this.aluResult.result);
        break;

      case MicroOp.UPDATE_PC_FROM_ALU:
        this.registers.setPC(this.aluResult & 0xFFFF);
        break;

      case MicroOp.NOP:
        break;

      default:
        throw new Error(`Unknown micro‑op: ${op}`);
    }
  }

  // Read an operand 
  private readOperand(op: any): number {
    switch (op.type) {
      case OperandType.Register:
        return this.registers.read(op.reg);

      case OperandType.Immediate:
        return op.value;

      case OperandType.Direct:
        return this.memory.readWord(op.address);

      case OperandType.RegisterIndirect:
        return this.memory.readWord(this.registers.read(op.reg));

      case OperandType.Indexed:
        return this.memory.readWord(
          (this.registers.read(op.reg) + op.displacement) & 0xFFFF);

      case OperandType.Based:
        return this.memory.readWord(
          (this.registers.read(op.reg) + op.displacement) & 0xFFFF);

      case OperandType.Relative:
        return this.memory.readWord(
          (this.registers.read("PC") + op.displacement) & 0xFFFF);

      default:
        throw new Error(`Unsupported operand type: ${op.type}`);
    }
  }

  // Write to an operand
  private writeOperand(op: any, value: number) {
    switch (op.type) {
      case OperandType.Register:
        this.registers.write(op.reg, value);
        break;

      case OperandType.Direct:
        this.memory.writeWord(op.address, value);
        break;

      case OperandType.RegisterIndirect:
        this.memory.writeWord(this.registers.read(op.reg), value);
        break;

      case OperandType.Indexed:
        this.memory.writeWord(
          (this.registers.read(op.reg) + op.displacement) & 0xFFFF,
          value
        );
        break;

      case OperandType.Based:
        this.memory.writeWord(
          (this.registers.read(op.reg) + op.displacement) & 0xFFFF,
        value
        );
        break;

      case OperandType.Relative:
        this.memory.writeWord(
          (this.registers.read("PC") + op.displacement) & 0xFFFF,
          value
        );
        break;

      default:
        throw new Error(`Cannot write to operand type: ${op.type}`);
    }
  }
}

export default CPU;
