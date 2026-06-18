// control-unit.ts
// Executes instructions through microcode

import Memory from "./memory";
import { Registers, IndexToRegister } from "./registers";
import { Flags } from "./flags";
import {
  decodeInstruction,
  type DecodedInstruction,
  type DecodedOperand,
} from "./decoder";
import { executeAlu, type AluResult } from "./alu";
import { MicroOp, getMicrocode, type MicroInstruction } from "./microcode";

export class ControlUnit {
  memory: Memory;
  registers: Registers;
  flags: Flags;

  // Internal latches used during micro‑operations to simulate CPU datapath registers
  private op1 = 0;
  private op2 = 0;
  private aluResult!: AluResult;

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

    // DECODE
    const decoded = decodeInstruction(word, this.memory, pc);

    // Update PC using the size from the decoder
    this.registers.setPC((pc + decoded.size) & 0xffff);

    // MICROCODE
    const microSeq = getMicrocode(decoded.opcode);

    for (const micro of microSeq) {
      this.executeMicroOp(micro, decoded);
    }

    // DEBUG
    console.log("PC:", pc.toString(16));
    console.log("WORD:", word.toString(16));
  }

  // Execute a single micro‑operation.
  private executeMicroOp(micro: MicroInstruction, decoded: DecodedInstruction) {
    for (const op of micro.ops) {
      switch (op) {
        case "LOAD_OP1":
          this.op1 = this.readOperand(decoded.operands[0]);
          break;

        case "LOAD_OP2":
          this.op2 = this.readOperand(decoded.operands[1]);
          break;

        case "EXEC_ALU":
          const result = executeAlu(micro.aluOp!, this.op1, this.op2);
          this.aluResult = result;
          break;

        case "UPDATE_FLAGS": {
          const { result, flags } = this.aluResult;
          this.flags.update(result, { overflow: flags.O, carry: flags.C });
          break;
        }

        case "WRITEBACK_RESULT":
          this.writeOperand(decoded.operands[0], this.aluResult.result);
          break;

        case "UPDATE_PC_FROM_ALU":
          this.registers.setPC(this.aluResult.result);
          break;

        case MicroOp.NOP:
          break;

        default:
          throw new Error("Unknown micro‑op: ${op}");
      }
      // DEBUG
      console.log("Decoded:", decoded);
      console.log("ALU:", this.op1, this.op2, this.aluResult);
    }
  }

  // Read an operand
  private readOperand(op: DecodedOperand): number {
    switch (op.type) {
      case "register":
        return this.registers.read(IndexToRegister[op.reg]);

      case "immediate":
        return op.value;

      case "direct":
        return this.memory.readWord(op.address);

      case "register_indirect":
        return this.memory.readWord(
          this.registers.read(IndexToRegister[op.reg]),
        );

      case "indexed":
        return this.memory.readWord(
          (this.registers.read(IndexToRegister[op.reg]) + op.displacement) &
            0xffff,
        );

      case "based":
        return this.memory.readWord(
          (this.registers.read(IndexToRegister[op.baseReg]) + op.displacement) &
            0xffff,
        );

      case "relative":
        return this.memory.readWord(
          (this.registers.read("PC") + op.displacement) & 0xffff,
        );

      default:
        throw new Error("Unsupported operand type: ${op.type}");
    }
  }

  // Write to an operand
  private writeOperand(op: any, value: number) {
    switch (op.type) {
      case "register":
        this.registers.write(IndexToRegister[op.reg], value);
        break;

      case "direct":
        this.memory.writeWord(op.address, value);
        break;

      case "register_indirect":
        this.memory.writeWord(
          this.registers.read(IndexToRegister[op.reg]),
          value,
        );
        break;

      case "indexed":
        this.memory.writeWord(
          (this.registers.read(IndexToRegister[op.reg]) + op.displacement) &
            0xffff,
          value,
        );
        break;

      case "based":
        this.memory.writeWord(
          (this.registers.read(IndexToRegister[op.reg]) + op.displacement) &
            0xffff,
          value,
        );
        break;

      case "relative":
        this.memory.writeWord(
          (this.registers.read("PC") + op.displacement) & 0xffff,
          value,
        );
        break;

      default:
        throw new Error("Cannot write to operand type: ${op.type}");
    }
  }
}

export default ControlUnit;
