import { Registers } from "../registers"

describe("Registers", () => {
  let regs: Registers

  beforeEach(() => {
    regs = new Registers()
  })

  test("initializes all registers to zero", () => {
    const snapshot = regs.dump()
    for (const key in snapshot) {
      expect(snapshot[key as keyof typeof snapshot]).toBe(0)
    }
  })

  test("writes and reads register values", () => {
    regs.write("R1", 123)
    expect(regs.read("R1")).toBe(123)
  })

  test("masks values to 16 bits", () => {
    regs.write("R7", 0x1FFFF) // 17 bits
    expect(regs.read("R7")).toBe(0xFFFF)
  })

  test("reset clears all registers", () => {
    regs.write("R2", 42)
    regs.write("PC", 99)
    regs.reset()

    const snapshot = regs.dump()
    for (const key in snapshot) {
      expect(snapshot[key as keyof typeof snapshot]).toBe(0)
    }
  })

  test("dump returns a copy, not a reference", () => {
    const snapshot = regs.dump()
    snapshot.SP = 999

    // internal state should not change
    expect(regs.read("SP")).toBe(0)
  })
})
