// alu.ts
// Executes arithmethic and logical operations
// Sets the flags as per the result

// Lists the operations
export const AluOp = {
  ADD: "ADD",
  SUB: "SUB",
  AND: "AND",
  OR: "OR",
  XOR: "XOR",
  CMP: "CMP",
  COM: "COM",
} as const;

export type AluOp = (typeof AluOp)[keyof typeof AluOp];

// Creates the ALU flags
export interface AluFlags {
  O?: boolean; // Overflow - optional
  N: boolean; // Negative
  C?: boolean; // Carry - optional
  Z: boolean; // Zero
}

// Saves the result including flags
export interface AluResult {
  result: number;
  flags: AluFlags;
}

// Constants
const MASK_16 = 0xffff;
const SIGN_BIT_16 = 0x8000;

// Forces value to 16 bits
function to16(value: number): number {
  return value & MASK_16;
}

// Checks if a value is negative (bit 15)
function isNegative16(value: number): boolean {
  return (value & SIGN_BIT_16) !== 0;
}

// Computes flags from the result
function computeFlags(
  result16: number,
  opts?: {
    overflow?: boolean;
    carry?: boolean;
  },
): AluFlags {
  return {
    O: opts?.overflow,
    N: isNegative16(result16),
    C: opts?.carry,
    Z: result16 == 0,
  };
}

// Executes an ALU operation
export function executeAlu(op: AluOp, a: number, b: number): AluResult {
  // Normalizes values to 16-bits
  a = to16(a);
  b = to16(b);

  switch (op) {
    // ADD: a + b
    // Updates: O, N, C, Z
    case "ADD": {
      const sum = a + b;
      const result = to16(sum);

      const carry = sum > MASK_16;

      const overflow =
        isNegative16(a) === isNegative16(b) &&
        isNegative16(result) !== isNegative16(a);

      return {
        result,
        flags: computeFlags(result, { carry, overflow }),
      };
    }

    // SUB: a - b
    // Updates: O, N, C, Z
    case "SUB": {
      const sub = a - b;
      const result = to16(sub);

      const carry = a >= b; // Carry means there was no borrow

      const overflow =
        isNegative16(a) !== isNegative16(b) &&
        isNegative16(result) !== isNegative16(a);

      return {
        result,
        flags: computeFlags(result, { carry, overflow }),
      };
    }

    // AND: bitwise and
    // Updates: N, Z
    case "AND": {
      const result = to16(a & b);

      return {
        result,
        flags: computeFlags(result),
      };
    }

    // OR: bitwise over
    // Updates: N, Z
    case "OR": {
      const result = to16(a | b);

      return {
        result,
        flags: computeFlags(result),
      };
    }

    // XOR: bitwise xor
    // Updates: N, Z
    case "XOR": {
      const result = to16(a ^ b);

      return {
        result,
        flags: computeFlags(result),
      };
    }

    // CMP: a - b
    // Updates: O, N, C, Z
    case "CMP": {
      const sub = a - b;
      const result = to16(sub);

      const carry = a >= b;

      const overflow =
        isNegative16(a) !== isNegative16(b) &&
        isNegative16(result) !== isNegative16(a);

      return {
        result, // Control-unit should use this result
        flags: computeFlags(result, { carry, overflow }),
      };
    }

    // COM (NOT): bitwise complement
    // Updates: N, Z
    case "COM": {
      const result = to16(~a);

      return {
        result,
        flags: computeFlags(result),
      };
    }

    default:
      throw new Error("Unknown ALU operation: ${op}.");
  }
}
