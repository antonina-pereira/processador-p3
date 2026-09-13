import { describe, it, expect, vi } from "vitest";
import Memory from "../memory";
import { decodeInstruction } from "../decoder";
import { AddressingMode, OperandType } from "../instruction-format";

// Mock a instruction set
vi.mock("./instruction-set", () => ({
  InstructionSet: {
    0x21: { mnemonic: "ADD", operandCount: 2, OperandType: "register" },
  },
}));

describe("decoder", () => {
  it("decodes opcode correctly", () => {
    const memory = new Memory();
    const word = 0x21 << 10; // opcode 0x21 = ADD

    const decoded = decodeInstruction(word, memory, 0x0000);

    expect(decoded.opcode).toBe(0x21);
    expect(decoded.mnemonic).toBe("ADD");
  });

  it("decodes register addressing mode", () => {
    const memory = new Memory();

    // opcode = 0x21 (ADD)
    // S = 0
    // reg_reg = 3  (operand 1 = R3)
    // M = 00       (register mode)
    // reg_modo = 5 (operand 2 = R5)

    const opcode = 0x21 << 10;
    const S = 0 << 9;
    const regReg = 3 << 6;
    const M = 0 << 4;
    const regModo = 5;

    const word = opcode | S | regReg | M | regModo;

    const decoded = decodeInstruction(word, memory, 0x0000);

    expect(decoded.operands[0]).toEqual({
      type: OperandType.Register,
      reg: 3,
    });

    expect(decoded.operands[1]).toEqual({
      type: OperandType.Register,
      reg: 5,
    });

    expect(decoded.size).toBe(2);
  });

  it("decodes immediate operand with extension word", () => {
    const memory = new Memory();

    // opcode = 0x21 (ADD)
    // S = 0
    // reg_reg = 3 (operand 1 = R3)
    // M = 0b10 (immediate)
    // reg_modo = 0 (ignored for immediate)

    const opcode = 0x21 << 10;
    const S = 0 << 9;
    const regReg = 3 << 6;
    const M = 0b10 << 4;
    const regModo = 0;

    const word = opcode | S | regReg | M | regModo;

    // extension word for immediate value
    memory.writeWord(0x8002, 0x1234);

    const decoded = decodeInstruction(word, memory, 0x8000);

    expect(decoded.operands[0]).toEqual({
      type: OperandType.Register,
      reg: 3,
    });

    expect(decoded.operands[1]).toEqual({
      type: OperandType.Immediate,
      value: 0x1234,
    });

    expect(decoded.size).toBe(4);
  });

  it("decodes direct addressing mode", () => {
    const memory = new Memory();

    // opcode = 0x21 (ADD)
    // S = 0
    // reg_reg = 3 (operand 1 = R3)
    // M = 0b11 (memory mode)
    // reg_modo = 0 (direct addressing)

    const opcode = 0x21 << 10;
    const S = 0 << 9;
    const regReg = 3 << 6;
    const M = 0b11 << 4;
    const regModo = 0;

    const word = opcode | S | regReg | M | regModo;

    // extension word = direct address
    memory.writeWord(0x8002, 0x5555);

    const decoded = decodeInstruction(word, memory, 0x8000);

    expect(decoded.operands[0]).toEqual({
      type: OperandType.Register,
      reg: 3,
    });

    expect(decoded.operands[1]).toEqual({
      type: OperandType.Direct,
      address: 0x5555,
    });

    expect(decoded.size).toBe(4);
  });

  it("decodes indexed addressing mode", () => {
    const memory = new Memory();

    // opcode = 0x21 (ADD)
    // S = 0
    // reg_reg = 3 (operand 1 = R3)
    // M = 0b11 (memory mode)
    // reg_modo = 2 (index register = R2)

    const opcode = 0x21 << 10;
    const S = 0 << 9;
    const regReg = 3 << 6;
    const M = 0b11 << 4;
    const regModo = 2; // index register R2

    const word = opcode | S | regReg | M | regModo;

    // extension word = displacement
    memory.writeWord(0x8002, 0x0100);

    const decoded = decodeInstruction(word, memory, 0x8000);

    expect(decoded.operands[0]).toEqual({
      type: OperandType.Register,
      reg: 3,
    });

    expect(decoded.operands[1]).toEqual({
      type: OperandType.Indexed,
      reg: 2,
      displacement: 0x0100,
    });

    expect(decoded.size).toBe(4);
  });

  it("decodes relative addressing mode", () => {
    const memory = new Memory();

    // opcode = 0x21 (ADD)
    // S = 0
    // reg_reg = 3 (operand 1 = R3)
    // M = 0b11 (memory mode)
    // reg_modo = PC register index

    const opcode = 0x21 << 10;
    const S = 0 << 9;
    const regReg = 3 << 6;
    const M = 0b11 << 4;

    // Import the PC register index from your register map
    const PC_REG = 8;
    const regModo = PC_REG;

    const word = opcode | S | regReg | M | regModo;

    // extension word = displacement
    memory.writeWord(0x8002, 0x0004);

    const decoded = decodeInstruction(word, memory, 0x8000);

    expect(decoded.operands[0]).toEqual({
      type: OperandType.Register,
      reg: 3,
    });

    expect(decoded.operands[1]).toEqual({
      type: OperandType.Relative,
      displacement: 0x0004,
    });

    expect(decoded.size).toBe(4);
  });

  it("throws on unknown addressing mode", () => {
    const memory = new Memory();

    // MODE = 3 (binary 11) is valid (register indirect)
    // So to force an invalid mode, we must break decodeAddressingMode
    const word = (0x21 << 9) | (0xf << 6); // invalid modeBits = 0b1111

    expect(() => decodeInstruction(word, memory, 0x0000)).toThrow();
  });

  it("throws on unknown opcode", () => {
    const memory = new Memory();

    const word = 0x99 << 10;

    expect(() => decodeInstruction(word, memory, 0x0000)).toThrow();
  });
});
