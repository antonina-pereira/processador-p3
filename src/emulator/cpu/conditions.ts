// conditions.ts
// Defines and evaluates the conditional execution codes
// These conditions are used by instructions that control the flow like BR.cond
// Note: I (interrupt) does not come from the flags but is supplied by the control-unit

// Maps the condition names to their binary codes
export const ConditionCode = {
  Z: 0b0000, // Zero
  N: 0b0100, // Negative
  C: 0b0010, // Carry
  O: 0b0110, // Overflow
  I: 0b1010, // Interrupt pending
  P: 0b1000, // Positive
  NZ: 0b0001, // Not Zero
  NN: 0b0101, // Not Negative
  NC: 0b0011, // Not Carry
  NO: 0b0111, // Not Overflow
  NI: 0b1011, // No interrupt pending
  NP: 0b1001, // Not Positive
} as const;

// Union type for all valid condition codes
export type ConditionCode = (typeof ConditionCode)[keyof typeof ConditionCode];

// Reverse mapping for debugging and disassembly
export const ConditionNames: Record<ConditionCode, string> = {
  [ConditionCode.Z]: "Z",
  [ConditionCode.N]: "N",
  [ConditionCode.C]: "C",
  [ConditionCode.O]: "O",
  [ConditionCode.I]: "I",
  [ConditionCode.P]: "P",
  [ConditionCode.NZ]: "NZ",
  [ConditionCode.NN]: "NN",
  [ConditionCode.NC]: "NC",
  [ConditionCode.NO]: "NO",
  [ConditionCode.NI]: "NI",
  [ConditionCode.NP]: "NP",
};

// Evaluates a condition code
// Returns:
// true if condition is satisfied and branch is taken and
// false if the condition is not satisfied resulting in no branch
export function evaluateCondition(
  condition: ConditionCode,
  flags: { Z: boolean; N: boolean; C: boolean; O: boolean },
): boolean {
  switch (condition) {
    case ConditionCode.Z:
      return flags.Z;
    case ConditionCode.NZ:
      return !flags.Z;

    case ConditionCode.N:
      return flags.N;
    case ConditionCode.NN:
      return !flags.N;

    case ConditionCode.C:
      return flags.C;
    case ConditionCode.NC:
      return !flags.C;

    case ConditionCode.O:
      return flags.O;
    case ConditionCode.NO:
      return !flags.O;

    case ConditionCode.P:
      return !flags.Z && !flags.N;
    case ConditionCode.NP:
      return flags.Z || flags.N;

    default:
      throw new Error("Unknown condition.");
  }
}
