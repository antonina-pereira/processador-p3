// conditions.ts

export enum ConditionCode {
  Z  = 0b0000,   // Zero
  N  = 0b0100,   // Negative
  C  = 0b0010,   // Carry
  O  = 0b0110,   // Overflow
  I  = 0b1010,   // Interruption
  P  = 0b1000,   // Positive
  NZ = 0b0001,   // Not Zero
  NN = 0b0101,   // Not Negative
  NC = 0b0011,   // Not Carry
  NO = 0b0111,   // Not Overflow
  NI = 0b1011,   // Not Interruption
  NP = 0b1001,   // Not Positive
}

export const ConditionNames: Record<number, string> = {
  [ConditionCode.Z]:  "Z",
  [ConditionCode.N]:  "N",
  [ConditionCode.C]:  "C",
  [ConditionCode.O]:  "O",
  [ConditionCode.I]:  "I",
  [ConditionCode.P]:  "P",
  [ConditionCode.NZ]: "NZ",
  [ConditionCode.NN]: "NN",
  [ConditionCode.NC]: "NC",
  [ConditionCode.NO]: "NO",
  [ConditionCode.NI]: "NI",
  [ConditionCode.NP]: "NP"
};
