import { describe, it, expect } from "vitest"
import { alu } from "../alu"

function f(Z = false, N = false, C = false, O = false) {
  return { Z, N, C, O }
}

describe("ALU", () => {
  // -------------------------
  // ADD
  // -------------------------
  it("ADD: simple addition", () => {
    const { result, flags } = alu("ADD", 5, 3)
    expect(result).toBe(8)
    expect(flags).toEqual(f(false, false, false, false))
  })

  it("ADD: zero result sets Z flag", () => {
    const { result, flags } = alu("ADD", 0, 0)
    expect(result).toBe(0)
    expect(flags.Z).toBe(true)
  })

  it("ADD: carry out of 16 bits sets C flag", () => {
    const { result, flags } = alu("ADD", 0xffff, 1)
    expect(result).toBe(0x0000)
    expect(flags.C).toBe(true)
  })

  it("ADD: signed overflow", () => {
    const { flags } = alu("ADD", 0x7fff, 1) // +32767 + 1 = -32768
    expect(flags.O).toBe(true)
  })

  // -------------------------
  // SUB
  // -------------------------
  it("SUB: simple subtraction", () => {
    const { result, flags } = alu("SUB", 10, 3)
    expect(result).toBe(7)
    expect(flags.Z).toBe(false)
  })

  it("SUB: zero result sets Z flag", () => {
    const { flags } = alu("SUB", 5, 5)
    expect(flags.Z).toBe(true)
  })

  it("SUB: borrow clears carry flag", () => {
    const { flags } = alu("SUB", 3, 5)
    expect(flags.C).toBe(false)
  })

  it("SUB: signed overflow", () => {
    const { flags } = alu("SUB", 0x8000, 1) // -32768 - 1 = +32767
    expect(flags.O).toBe(true)
  })

  // -------------------------
  // AND / OR / XOR
  // -------------------------
  it("AND: bitwise and", () => {
    const { result } = alu("AND", 0b1100, 0b1010)
    expect(result).toBe(0b1000)
  })

  it("OR: bitwise or", () => {
    const { result } = alu("OR", 0b1100, 0b1010)
    expect(result).toBe(0b1110)
  })

  it("XOR: bitwise xor", () => {
    const { result } = alu("XOR", 0b1100, 0b1010)
    expect(result).toBe(0b0110)
  })

  // -------------------------
  // CMP
  // -------------------------
  it("CMP: sets flags based on a - b", () => {
    const { flags } = alu("CMP", 10, 3)
    expect(flags.Z).toBe(false)
    expect(flags.N).toBe(false)
  })

  it("CMP: zero result", () => {
    const { flags } = alu("CMP", 5, 5)
    expect(flags.Z).toBe(true)
  })

  it("CMP: negative result", () => {
    const { flags } = alu("CMP", 3, 5)
    expect(flags.N).toBe(true)
  })
})

