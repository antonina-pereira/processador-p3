// Generated from asm.g4 by ANTLR 4.13.2

import {ParseTreeVisitor} from 'antlr4';


import { ProgramContext } from "./asmParser.js";
import { StatementContext } from "./asmParser.js";
import { InstructionContext } from "./asmParser.js";
import { InstructionFormatContext } from "./asmParser.js";
import { ZeroOpInstContext } from "./asmParser.js";
import { ZeroOpMnemonicContext } from "./asmParser.js";
import { ZeroOpValueInstContext } from "./asmParser.js";
import { ZeroOpValueMnemonicContext } from "./asmParser.js";
import { OneOpInstContext } from "./asmParser.js";
import { OneOpMnemonicContext } from "./asmParser.js";
import { OneOpValueInstContext } from "./asmParser.js";
import { OneOpValueMnemonicContext } from "./asmParser.js";
import { TwoOpInstContext } from "./asmParser.js";
import { TwoOpMnemonicContext } from "./asmParser.js";
import { JmpInstContext } from "./asmParser.js";
import { JmpMnemonicContext } from "./asmParser.js";
import { DirectiveContext } from "./asmParser.js";
import { OrigDirectiveContext } from "./asmParser.js";
import { EquDirectiveContext } from "./asmParser.js";
import { WordDirectiveContext } from "./asmParser.js";
import { StrDirectiveContext } from "./asmParser.js";
import { StrDirectiveElementContext } from "./asmParser.js";
import { TabDirectiveContext } from "./asmParser.js";
import { OperandContext } from "./asmParser.js";
import { AddressContext } from "./asmParser.js";
import { RegisterContext } from "./asmParser.js";
import { ImmediateContext } from "./asmParser.js";
import { DirectContext } from "./asmParser.js";
import { RegisterIndirectContext } from "./asmParser.js";
import { IndexedContext } from "./asmParser.js";
import { RelativeContext } from "./asmParser.js";
import { BasedContext } from "./asmParser.js";
import { ConstContext } from "./asmParser.js";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `asmParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export default class asmVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `asmParser.program`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProgram?: (ctx: ProgramContext) => Result;
	/**
	 * Visit a parse tree produced by `asmParser.statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStatement?: (ctx: StatementContext) => Result;
	/**
	 * Visit a parse tree produced by `asmParser.instruction`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInstruction?: (ctx: InstructionContext) => Result;
	/**
	 * Visit a parse tree produced by `asmParser.instructionFormat`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInstructionFormat?: (ctx: InstructionFormatContext) => Result;
	/**
	 * Visit a parse tree produced by `asmParser.zeroOpInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitZeroOpInst?: (ctx: ZeroOpInstContext) => Result;
	/**
	 * Visit a parse tree produced by `asmParser.zeroOpMnemonic`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitZeroOpMnemonic?: (ctx: ZeroOpMnemonicContext) => Result;
	/**
	 * Visit a parse tree produced by `asmParser.zeroOpValueInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitZeroOpValueInst?: (ctx: ZeroOpValueInstContext) => Result;
	/**
	 * Visit a parse tree produced by `asmParser.zeroOpValueMnemonic`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitZeroOpValueMnemonic?: (ctx: ZeroOpValueMnemonicContext) => Result;
	/**
	 * Visit a parse tree produced by `asmParser.oneOpInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOneOpInst?: (ctx: OneOpInstContext) => Result;
	/**
	 * Visit a parse tree produced by `asmParser.oneOpMnemonic`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOneOpMnemonic?: (ctx: OneOpMnemonicContext) => Result;
	/**
	 * Visit a parse tree produced by `asmParser.oneOpValueInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOneOpValueInst?: (ctx: OneOpValueInstContext) => Result;
	/**
	 * Visit a parse tree produced by `asmParser.oneOpValueMnemonic`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOneOpValueMnemonic?: (ctx: OneOpValueMnemonicContext) => Result;
	/**
	 * Visit a parse tree produced by `asmParser.twoOpInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTwoOpInst?: (ctx: TwoOpInstContext) => Result;
	/**
	 * Visit a parse tree produced by `asmParser.twoOpMnemonic`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTwoOpMnemonic?: (ctx: TwoOpMnemonicContext) => Result;
	/**
	 * Visit a parse tree produced by `asmParser.jmpInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitJmpInst?: (ctx: JmpInstContext) => Result;
	/**
	 * Visit a parse tree produced by `asmParser.jmpMnemonic`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitJmpMnemonic?: (ctx: JmpMnemonicContext) => Result;
	/**
	 * Visit a parse tree produced by `asmParser.directive`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDirective?: (ctx: DirectiveContext) => Result;
	/**
	 * Visit a parse tree produced by `asmParser.origDirective`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOrigDirective?: (ctx: OrigDirectiveContext) => Result;
	/**
	 * Visit a parse tree produced by `asmParser.equDirective`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEquDirective?: (ctx: EquDirectiveContext) => Result;
	/**
	 * Visit a parse tree produced by `asmParser.wordDirective`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWordDirective?: (ctx: WordDirectiveContext) => Result;
	/**
	 * Visit a parse tree produced by `asmParser.strDirective`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStrDirective?: (ctx: StrDirectiveContext) => Result;
	/**
	 * Visit a parse tree produced by `asmParser.strDirectiveElement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStrDirectiveElement?: (ctx: StrDirectiveElementContext) => Result;
	/**
	 * Visit a parse tree produced by `asmParser.tabDirective`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTabDirective?: (ctx: TabDirectiveContext) => Result;
	/**
	 * Visit a parse tree produced by `asmParser.operand`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOperand?: (ctx: OperandContext) => Result;
	/**
	 * Visit a parse tree produced by `asmParser.address`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAddress?: (ctx: AddressContext) => Result;
	/**
	 * Visit a parse tree produced by `asmParser.register`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRegister?: (ctx: RegisterContext) => Result;
	/**
	 * Visit a parse tree produced by `asmParser.immediate`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitImmediate?: (ctx: ImmediateContext) => Result;
	/**
	 * Visit a parse tree produced by `asmParser.direct`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDirect?: (ctx: DirectContext) => Result;
	/**
	 * Visit a parse tree produced by `asmParser.registerIndirect`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRegisterIndirect?: (ctx: RegisterIndirectContext) => Result;
	/**
	 * Visit a parse tree produced by `asmParser.indexed`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIndexed?: (ctx: IndexedContext) => Result;
	/**
	 * Visit a parse tree produced by `asmParser.relative`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRelative?: (ctx: RelativeContext) => Result;
	/**
	 * Visit a parse tree produced by `asmParser.based`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBased?: (ctx: BasedContext) => Result;
	/**
	 * Visit a parse tree produced by `asmParser.const`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConst?: (ctx: ConstContext) => Result;
}

