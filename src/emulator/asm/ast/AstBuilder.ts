// AstBuilder.ts
// creates an AST by visiting the parse tree nodes and instantiating the AST nodes

import { ParseTreeVisitor, TerminalNode } from "antlr4";
import {
  InstructionContext,
  InstructionFormatContext,
  ProgramContext,
  StatementContext,
  ZeroOpInstContext,
  ZeroOpValueInstContext,
  OneOpInstContext,
  OneOpValueInstContext,
  TwoOpInstContext,
  JmpInstContext,
  DirectiveContext,
  OrigDirectiveContext,
  EquDirectiveContext,
  WordDirectiveContext,
  StrDirectiveContext,
  TabDirectiveContext,
  StrDirectiveElementContext,
  OperandContext,
  AddressContext,
  RegisterContext,
  ImmediateContext,
  DirectContext,
  RegisterIndirectContext,
  IndexedContext,
  RelativeContext,
  BasedContext,
  ConstContext,
} from "../grammar/asmParser.ts";
import asmVisitor from "../grammar/asmVisitor.ts";

import * as AST from "./nodes";
import type { Diagnostic } from "../semantic/Diagnostic.ts";

export class AstBuilder
  extends ParseTreeVisitor<AST.AstNode>
  implements asmVisitor<AST.AstNode>
{
  // Creates error messages
  public readonly diagnostics: Diagnostic[] = [];
  private error(message: string, line: number, column: number): void {
    this.diagnostics.push({
      message,
      line,
      column,
    });
  }
  protected defaultResult(): unknown {
    return undefined;
  }

  visitProgram(ctx: ProgramContext): AST.ProgramNode {
    const statements: AST.StatementNode[] = [];

    for (const statementContext of ctx.statement_list()) {
      const statement = this.visit(statementContext) as AST.StatementNode;

      if (statement) {
        statements.push(statement);
      }
    }

    return {
      line: 0,
      column: 0,
      statements,
    };
  }

  visitStatement(ctx: StatementContext): AST.StatementNode {
    const instruction = ctx.instruction();
    if (instruction) {
      return this.visitInstruction(instruction);
    }

    const directive = ctx.directive();
    if (directive) {
      return this.visitDirective(directive);
    }

    throw new Error("Invalid statement.");
  }

  visitInstruction(ctx: InstructionContext): AST.InstructionNode {
    let label: AST.LabelDefinitionNode | undefined;

    if (ctx.ID()) {
      label = {
        line: ctx.start.line,
        column: ctx.start.column,
        name: ctx.ID().getText(),
      };
    }

    const instruction = this.visit(
      ctx.instructionFormat(),
    ) as AST.InstructionNode;

    if (label) {
      instruction.label = label;
    }

    return instruction;
  }

  visitInstructionFormat(ctx: InstructionFormatContext): AST.InstructionNode {
    if (ctx.zeroOpInst()) {
      return this.visit(ctx.zeroOpInst()) as AST.InstructionNode;
    }

    if (ctx.zeroOpValueInst()) {
      return this.visit(ctx.zeroOpValueInst()) as AST.InstructionNode;
    }

    if (ctx.oneOpInst()) {
      return this.visit(ctx.oneOpInst()) as AST.InstructionNode;
    }

    if (ctx.oneOpValueInst()) {
      return this.visit(ctx.oneOpValueInst()) as AST.InstructionNode;
    }

    if (ctx.twoOpInst()) {
      return this.visit(ctx.twoOpInst()) as AST.InstructionNode;
    }

    if (ctx.jmpInst()) {
      return this.visit(ctx.jmpInst()) as AST.InstructionNode;
    }

    throw new Error("Invalid instruction format.");
  }

  visitZeroOpInst(ctx: ZeroOpInstContext): AST.InstructionNode {
    return {
      line: ctx.start.line,
      column: ctx.start.column,
      mnemonic: ctx.zeroOpMnemonic().getText(),
      operands: [],
    };
  }

  visitZeroOpValueInst(ctx: ZeroOpValueInstContext): AST.InstructionNode {
    const constant = this.visit(ctx.const_()) as AST.ConstantNode;

    return {
      line: ctx.start.line,
      column: ctx.start.column,
      mnemonic: ctx.zeroOpValueMnemonic().getText(),
      operands: [constant],
    };
  }

  visitOneOpInst(ctx: OneOpInstContext): AST.InstructionNode {
    const operand = this.visit(ctx.operand()) as AST.OperandNode;

    return {
      line: ctx.start.line,
      column: ctx.start.column,
      mnemonic: ctx.oneOpMnemonic().getText(),
      operands: [operand],
    };
  }

  visitOneOpValueInst(ctx: OneOpValueInstContext): AST.InstructionNode {
    const operand = this.visit(ctx.operand()) as AST.OperandNode;

    const constant = this.visit(ctx.const_()) as AST.ConstantNode;

    return {
      line: ctx.start.line,
      column: ctx.start.column,
      mnemonic: ctx.oneOpValueMnemonic().getText(),
      operands: [operand, constant],
    };
  }

  visitTwoOpInst(ctx: TwoOpInstContext): AST.InstructionNode {
    const leftCtx = ctx.operand(0);
    const rightCtx = ctx.operand(1);
    if (!leftCtx) {
      this.error(
        "Missing destination operand.",
        ctx.start.line,
        ctx.start.column,
      );
      return {
        line: ctx.start.line,
        column: ctx.start.column,
        mnemonic: ctx.twoOpMnemonic().getText(),
        operands: [],
      };
    }
    if (!rightCtx) {
      this.error("Missing source operand.", ctx.start.line, ctx.start.column);
      return {
        line: ctx.start.line,
        column: ctx.start.column,
        mnemonic: ctx.twoOpMnemonic().getText(),
        operands: [],
      };
    }
    const leftOperand = this.visit(leftCtx) as AST.OperandNode;
    const rightOperand = this.visit(rightCtx) as AST.OperandNode;
    return {
      line: ctx.start.line,
      column: ctx.start.column,
      mnemonic: ctx.twoOpMnemonic().getText(),
      operands: [leftOperand, rightOperand],
    };
  }

  visitJmpInst(ctx: JmpInstContext): AST.InstructionNode {
    const operand = this.visit(ctx.operand()) as AST.OperandNode;

    const condition = ctx.COND()
      ? (ctx.COND().getText() as AST.Condition)
      : undefined;

    return {
      line: ctx.start.line,
      column: ctx.start.column,
      mnemonic: ctx.jmpMnemonic().getText(),
      condition,
      operands: [operand],
    };
  }

  visitDirective(ctx: DirectiveContext): AST.DirectiveNode {
    if (ctx.origDirective()) {
      return this.visit(ctx.origDirective()) as AST.DirectiveNode;
    }

    if (ctx.equDirective()) {
      return this.visit(ctx.equDirective()) as AST.DirectiveNode;
    }

    if (ctx.wordDirective()) {
      return this.visit(ctx.wordDirective()) as AST.DirectiveNode;
    }

    if (ctx.strDirective()) {
      return this.visit(ctx.strDirective()) as AST.DirectiveNode;
    }

    if (ctx.tabDirective()) {
      return this.visit(ctx.tabDirective()) as AST.DirectiveNode;
    }

    throw new Error("Invalid directive.");
  }

  visitOrigDirective(ctx: OrigDirectiveContext): AST.OrigDirNode {
    let address: AST.ConstantNode | AST.LabelReferenceNode;

    if (ctx.const_()) {
      address = this.visit(ctx.const_()) as AST.ConstantNode;
    } else {
      address = {
        line: ctx.start.line,
        column: ctx.start.column,
        type: "LABEL_REFERENCE",
        name: ctx.ID().getText(),
      };
    }

    return {
      line: ctx.start.line,
      column: ctx.start.column,
      type: "ORIG",
      address,
    };
  }

  visitEquDirective(ctx: EquDirectiveContext): AST.EquDirNode {
    const constant = this.visit(ctx.const_()) as AST.ConstantNode;

    const symbol: AST.LabelDefinitionNode = {
      line: ctx.start.line,
      column: ctx.start.column,
      name: ctx.ID().getText(),
    };

    return {
      line: ctx.start.line,
      column: ctx.start.column,
      type: "EQU",
      symbol: symbol,
      value: constant,
    };
  }

  visitWordDirective(ctx: WordDirectiveContext): AST.WordDirNode {
    const value = this.visit(ctx.const_()) as AST.ConstantNode;

    const label: AST.LabelDefinitionNode = {
      line: ctx.start.line,
      column: ctx.start.column,
      name: ctx.ID().getText(),
    };

    return {
      line: ctx.start.line,
      column: ctx.start.column,
      type: "WORD",
      label: label,
      value,
    };
  }

  visitStrDirective(ctx: StrDirectiveContext): AST.StrDirNode {
    const values: AST.StrElementNode[] = [];

    for (const StrDirectiveElementContext of ctx.strDirectiveElement_list()) {
      const element = this.visit(
        StrDirectiveElementContext,
      ) as AST.StrElementNode;

      if (element) {
        values.push(element);
      }
    }

    const label: AST.LabelDefinitionNode = {
      line: ctx.start.line,
      column: ctx.start.column,
      name: ctx.ID().getText(),
    };

    return {
      line: ctx.start.line,
      column: ctx.start.column,
      type: "STR",
      label: label,
      values,
    };
  }

  visitStrDirElement(ctx: StrDirectiveElementContext): AST.StrElementNode {
    if (ctx.const_()) {
      return this.visit(ctx.const_()) as AST.ConstantNode;
    } else {
      return {
        line: ctx.start.line,
        column: ctx.start.column,
        value: ctx.STRING().getText(),
      };
    }
  }

  visitTabDirective(ctx: TabDirectiveContext): AST.TabDirNode {
    const constant = this.visit(ctx.const_()) as AST.ConstantNode;

    const label: AST.LabelDefinitionNode = {
      line: ctx.start.line,
      column: ctx.start.column,
      name: ctx.ID().getText(),
    };

    return {
      line: ctx.start.line,
      column: ctx.start.column,
      type: "TAB",
      label: label,
      value: constant,
    };
  }

  visitOperand(ctx: OperandContext): AST.OperandNode {
    if (ctx.address()) {
      return this.visit(ctx.address()) as AST.OperandNode;
    }

    if (ctx.ID()) {
      return {
        line: ctx.start.line,
        column: ctx.start.column,
        name: ctx.ID().getText(),
      } as AST.LabelReferenceNode;
    }

    throw new Error("Invalid operand.");
  }

  visitAddress(ctx: AddressContext): AST.OperandNode {
    if (ctx.register()) {
      return this.visit(ctx.register()) as AST.RegisterNode;
    }

    if (ctx.SP()) {
      return {
        line: ctx.start.line,
        column: ctx.start.column,
        register: "SP",
      } as AST.RegisterNode;
    }

    if (ctx.immediate()) {
      return this.visit(ctx.immediate()) as AST.ConstantNode;
    }

    if (ctx.direct()) {
      return this.visit(ctx.direct()) as AST.DirectNode;
    }

    if (ctx.registerIndirect()) {
      return this.visit(ctx.registerIndirect()) as AST.RegisterIndirectNode;
    }

    if (ctx.indexed()) {
      return this.visit(ctx.indexed()) as AST.IndexedNode;
    }

    if (ctx.relative()) {
      return this.visit(ctx.relative()) as AST.RelativeNode;
    }

    if (ctx.based()) {
      return this.visit(ctx.based()) as AST.BasedNode;
    }

    throw new Error("Invalid address.");
  }

  visitRegister(ctx: RegisterContext): AST.RegisterNode {
    return {
      line: ctx.start.line,
      column: ctx.start.column,
      register: ctx.REGISTER().getText(),
    };
  }

  visitImmediate(ctx: ImmediateContext): AST.ImmediateNode {
    const value = this.visit(ctx.const_()) as AST.ConstantNode;

    return {
      line: ctx.start.line,
      column: ctx.start.column,
      value,
    };
  }

  visitDirect(ctx: DirectContext): AST.DirectNode {
    const address = this.visit(ctx.const_()) as AST.ConstantNode;

    return {
      line: ctx.start.line,
      column: ctx.start.column,
      address,
    };
  }

  visitRegisterIndirect(
    ctx: RegisterIndirectContext,
  ): AST.RegisterIndirectNode {
    return {
      line: ctx.start.line,
      column: ctx.start.column,
      register: this.visit(ctx.REGISTER()) as AST.RegisterNode,
    };
  }

  visitIndexed(ctx: IndexedContext): AST.IndexedNode {
    return {
      line: ctx.start.line,
      column: ctx.start.column,
      register: this.visit(ctx.REGISTER()) as AST.RegisterNode,
      offset: this.visit(ctx.const_()) as AST.ConstantNode,
    } as AST.IndexedNode;
  }

  visitRelative(ctx: RelativeContext): AST.RelativeNode {
    return {
      line: ctx.start.line,
      column: ctx.start.column,
      offset: this.visit(ctx.const_()) as AST.ConstantNode,
    };
  }

  visitBased(ctx: BasedContext): AST.BasedNode {
    return {
      line: ctx.start.line,
      column: ctx.start.column,
      offset: this.visit(ctx.const_()) as AST.ConstantNode,
    };
  }

  visitConst(ctx: ConstContext): AST.ConstantNode {
    let value: number;

    if (ctx.DEC_VAL()) {
      value = Number(ctx.DEC_VAL().getText().replace("d", ""));
    } else if (ctx.HEX_VAL()) {
      value = parseInt(ctx.HEX_VAL().getText().slice(0, -1), 16);
    } else if (ctx.BIN_VAL()) {
      value = parseInt(ctx.BIN_VAL().getText().slice(0, -1), 2);
    } else if (ctx.OCT_VAL()) {
      value = parseInt(ctx.OCT_VAL().getText().slice(0, -1), 8);
    } else if (ctx.CHAR_VAL()) {
      const text = ctx.CHAR_VAL().getText();
      value = text.charCodeAt(1);
    } else {
      throw new Error("Invalid number.");
    }

    return {
      line: ctx.start.line,
      type: "CONSTANT",
      column: ctx.start.column,
      value,
    };
  }
}
