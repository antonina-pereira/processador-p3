// alu.ts
// Executa as operações aritméticas e lógicas
// Define os bits de estado de acordo com o resultado

export enum AluOp {
  ADD = "ADD",
  SUB = "SUB",
  AND = "AND",
  OR  = "OR",
  XOR = "XOR",
  NOT = "NOT"
}

export interface AluFlags {
  O: boolean  // overflow
  N: boolean  // negative
  C: boolean  // carry
  Z: boolean  // zero
}

export interface AluResult {
  result: number
  flags: AluFlags
}

const MASK_16 = 0xffff
const SIGN_BIT_16 = 0x8000

function to16(value: number): number {
  return value & MASK_16
}

function isNegative16(value: number): boolean {
  return (value & SIGN_BIT_16) !== 0
}

function computeFlags(overflow: boolean, result16: number, carry: boolean): AluFlags {
  return {
    O: overflow,
    N: isNegative16(result16),
    C: carry,
    Z: result16 == 0,
  }
}

export function alu(op: AluOp, a: number, b: number): AluResult {
  // Assegurar que os valores são tratados como 16-bits
  a = to16(a)
  b = to16(b)

  switch(op) {
    case "ADD": {
      const sum = a + b
      const result = to16(sum)
      const carry = sum > MASK_16
      const overflow =
        isNegative16(a) === isNegative16(b) &&
        isNegative16(result) !== isNegative16(a)

      return {
        result,
        flags: computeFlags(overflow, result, carry),
      }
    }

    case "SUB": {
      // a - b = a + (~b +1)
      const sub = a - b
      const result = to16(sub)
      const carry = a >= b
      const overflow =
        isNegative16(a) !== isNegative16(b) &&
        isNegative16(result) !== isNegative16(a)

      return {
        result,
        flags: computeFlags(overflow, result, carry),
      }
    }

    case "AND": {
      const result = to16(a & b)

      return {
        result,
        flags: computeFlags(false, result, false),
      }
    }

    case "OR": {
      const result = to16(a | b)

      return {
        result,
        flags: computeFlags(false, result, false),
      }
    }

    case "XOR": {
      const result = to16( a ^ b)

      return {
        result,
        flags: computeFlags(false, result, false),
      }
    }

    case "CMP": {
      const sub = a - b
      const result = to16(sub)
      const carry = a >= b
      const overflow =
        isNegative16(a) !== isNegative16(b) &&
        isNegative16(result) !== isNegative16(a)

      return {
        result,
        flags: computeFlags(overflow, result, carry),
      }
    }

    case "NOT": {
      const result = to16(~a)

      return {
        result,
        flags: computeFlags(false, result, false),
      }
    }
  }
}
