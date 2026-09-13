// cpu.test.ts

import { describe, expect, it, vi } from "vitest";

import { Cpu } from "../cpu";
import Memory from "../memory";

describe("CPU", () => {
  it("returns register and flag state", () => {
    const memory = new Memory();

    const registers = {
      dump: vi.fn().mockReturnValue({
        R0: 1,
        R1: 4,
        SP: 6,
        PC: 8,
      }),
      reset: vi.fn(),
    };

    const flags = {
      dump: vi.fn().mockReturnValue({
        Z: false,
        C: true,
        N: false,
        O: false,
        E: false,
      }),
    };

    const controlUnit = {
      step: vi.fn(),
    };

    const cpu = new Cpu(
      memory,
      registers as any,
      flags as any,
      controlUnit as any,
    );

    expect(cpu.getState()).toEqual(
      expect.objectContaining({
        registers: {
          R0: 1,
          R1: 4,
          SP: 6,
          PC: 8,
        },
        flags: {
          Z: false,
          C: true,
          N: false,
          O: false,
          E: false,
        },
      }),
    );
  });

  it("delegates step to the control unit", () => {
    const memory = new Memory();

    const registers = {
      dump: vi.fn(),
      reset: vi.fn(),
    };

    const flags = {
      dump: vi.fn(),
    };

    const controlUnit = {
      step: vi.fn(),
    };

    const cpu = new Cpu(
      memory,
      registers as any,
      flags as any,
      controlUnit as any,
    );

    cpu.step();

    expect(controlUnit.step).toHaveBeenCalledOnce();
  });

  it("resets registers and memory", () => {
    const memory = new Memory();

    const clearSpy = vi.spyOn(memory, "clear");

    const registers = {
      dump: vi.fn(),
      reset: vi.fn(),
    };

    const flags = {
      dump: vi.fn(),
    };

    const controlUnit = {
      step: vi.fn(),
    };

    const cpu = new Cpu(
      memory,
      registers as any,
      flags as any,
      controlUnit as any,
    );

    cpu.reset();

    expect(registers.reset).toHaveBeenCalledOnce();
    expect(clearSpy).toHaveBeenCalledOnce();
  });

  it("loads machine code into memory", () => {
    const memory = new Memory();
    const registers = {
      dump: vi.fn(),
      reset: vi.fn(),
    };

    const flags = {
      dump: vi.fn(),
    };

    const controlUnit = {
      step: vi.fn(),
    };

    const cpu = new Cpu(
      memory,
      registers as any,
      flags as any,
      controlUnit as any,
    );

    cpu.loadProgram([0x1234, 0x5678]);

    expect(memory.readWord(0x8000)).toBe(0x1234);
    expect(memory.readWord(0x8002)).toBe(0x5678);
  });
});
