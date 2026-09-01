// cpu-state.ts
// Returns the state of the flags and registers for the CPU

import { Registers } from "./registers";
import { Flags } from "./flags";

export interface MemoryWord {
  address: number;
  value: number;
}

export interface CpuState {
  registers: ReturnType<Registers["dump"]>;
  flags: ReturnType<Flags["dump"]>;
  memory: MemoryWord[];
}
