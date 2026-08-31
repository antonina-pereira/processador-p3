import { describe, expect, it } from "vitest";
import { parseAssembly } from "../parser/parseAssembly";

describe("parser", () => {
  it("parses NOP", () => {
    const tree = parseAssembly("NOP");
    expect(tree).toBeDefined();
  });

  it("parses RETN 4", () => {
    const tree = parseAssembly("RETN 4");
    expect(tree).toBeDefined();
  });

  it("parses ADD R1, R2", () => {
    const tree = parseAssembly("ADD R1, R2");
    expect(tree).toBeDefined();
  });

  it("parses BR.NZ Loop", () => {
    const tree = parseAssembly("BR.NZ Loop");
    expect(tree).toBeDefined();
  });

  it("parses START EQU 8000h", () => {
    const tree = parseAssembly("START EQU 8000h");
    expect(tree).toBeDefined();
  });

  it("parses Message STR 'Hello',13", () => {
    const tree = parseAssembly("Message STR 'Hello',13");
    expect(tree).toBeDefined();
  });

  it("parses a label", () => {
    const tree = parseAssembly(`
    Loop:
    ADD R1, R2
    `);
    expect(tree).toBeDefined();
  });

  it("rejects missing operand", () => {
    const result = parseAssembly("ADD R1");
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it("rejects RET with operand", () => {
    const result = parseAssembly("RET R1");
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it("rejects INC with two operands", () => {
    const result = parseAssembly("INC R1, R2");
    expect(result.errors.length).toBeGreaterThan(0);
  });
});
