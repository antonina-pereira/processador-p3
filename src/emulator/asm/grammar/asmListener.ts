// Generated from asm.g4 by ANTLR 4.13.2

import {ParseTreeListener} from "antlr4";


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
 * This interface defines a complete listener for a parse tree produced by
 * `asmParser`.
 */
export default class asmListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `asmParser.program`.
	 * @param ctx the parse tree
	 */
	enterProgram?: (ctx: ProgramContext) => void;
	/**
	 * Exit a parse tree produced by `asmParser.program`.
	 * @param ctx the parse tree
	 */
	exitProgram?: (ctx: ProgramContext) => void;
	/**
	 * Enter a parse tree produced by `asmParser.statement`.
	 * @param ctx the parse tree
	 */
	enterStatement?: (ctx: StatementContext) => void;
	/**
	 * Exit a parse tree produced by `asmParser.statement`.
	 * @param ctx the parse tree
	 */
	exitStatement?: (ctx: StatementContext) => void;
	/**
	 * Enter a parse tree produced by `asmParser.instruction`.
	 * @param ctx the parse tree
	 */
	enterInstruction?: (ctx: InstructionContext) => void;
	/**
	 * Exit a parse tree produced by `asmParser.instruction`.
	 * @param ctx the parse tree
	 */
	exitInstruction?: (ctx: InstructionContext) => void;
	/**
	 * Enter a parse tree produced by `asmParser.instructionFormat`.
	 * @param ctx the parse tree
	 */
	enterInstructionFormat?: (ctx: InstructionFormatContext) => void;
	/**
	 * Exit a parse tree produced by `asmParser.instructionFormat`.
	 * @param ctx the parse tree
	 */
	exitInstructionFormat?: (ctx: InstructionFormatContext) => void;
	/**
	 * Enter a parse tree produced by `asmParser.zeroOpInst`.
	 * @param ctx the parse tree
	 */
	enterZeroOpInst?: (ctx: ZeroOpInstContext) => void;
	/**
	 * Exit a parse tree produced by `asmParser.zeroOpInst`.
	 * @param ctx the parse tree
	 */
	exitZeroOpInst?: (ctx: ZeroOpInstContext) => void;
	/**
	 * Enter a parse tree produced by `asmParser.zeroOpMnemonic`.
	 * @param ctx the parse tree
	 */
	enterZeroOpMnemonic?: (ctx: ZeroOpMnemonicContext) => void;
	/**
	 * Exit a parse tree produced by `asmParser.zeroOpMnemonic`.
	 * @param ctx the parse tree
	 */
	exitZeroOpMnemonic?: (ctx: ZeroOpMnemonicContext) => void;
	/**
	 * Enter a parse tree produced by `asmParser.zeroOpValueInst`.
	 * @param ctx the parse tree
	 */
	enterZeroOpValueInst?: (ctx: ZeroOpValueInstContext) => void;
	/**
	 * Exit a parse tree produced by `asmParser.zeroOpValueInst`.
	 * @param ctx the parse tree
	 */
	exitZeroOpValueInst?: (ctx: ZeroOpValueInstContext) => void;
	/**
	 * Enter a parse tree produced by `asmParser.zeroOpValueMnemonic`.
	 * @param ctx the parse tree
	 */
	enterZeroOpValueMnemonic?: (ctx: ZeroOpValueMnemonicContext) => void;
	/**
	 * Exit a parse tree produced by `asmParser.zeroOpValueMnemonic`.
	 * @param ctx the parse tree
	 */
	exitZeroOpValueMnemonic?: (ctx: ZeroOpValueMnemonicContext) => void;
	/**
	 * Enter a parse tree produced by `asmParser.oneOpInst`.
	 * @param ctx the parse tree
	 */
	enterOneOpInst?: (ctx: OneOpInstContext) => void;
	/**
	 * Exit a parse tree produced by `asmParser.oneOpInst`.
	 * @param ctx the parse tree
	 */
	exitOneOpInst?: (ctx: OneOpInstContext) => void;
	/**
	 * Enter a parse tree produced by `asmParser.oneOpMnemonic`.
	 * @param ctx the parse tree
	 */
	enterOneOpMnemonic?: (ctx: OneOpMnemonicContext) => void;
	/**
	 * Exit a parse tree produced by `asmParser.oneOpMnemonic`.
	 * @param ctx the parse tree
	 */
	exitOneOpMnemonic?: (ctx: OneOpMnemonicContext) => void;
	/**
	 * Enter a parse tree produced by `asmParser.oneOpValueInst`.
	 * @param ctx the parse tree
	 */
	enterOneOpValueInst?: (ctx: OneOpValueInstContext) => void;
	/**
	 * Exit a parse tree produced by `asmParser.oneOpValueInst`.
	 * @param ctx the parse tree
	 */
	exitOneOpValueInst?: (ctx: OneOpValueInstContext) => void;
	/**
	 * Enter a parse tree produced by `asmParser.oneOpValueMnemonic`.
	 * @param ctx the parse tree
	 */
	enterOneOpValueMnemonic?: (ctx: OneOpValueMnemonicContext) => void;
	/**
	 * Exit a parse tree produced by `asmParser.oneOpValueMnemonic`.
	 * @param ctx the parse tree
	 */
	exitOneOpValueMnemonic?: (ctx: OneOpValueMnemonicContext) => void;
	/**
	 * Enter a parse tree produced by `asmParser.twoOpInst`.
	 * @param ctx the parse tree
	 */
	enterTwoOpInst?: (ctx: TwoOpInstContext) => void;
	/**
	 * Exit a parse tree produced by `asmParser.twoOpInst`.
	 * @param ctx the parse tree
	 */
	exitTwoOpInst?: (ctx: TwoOpInstContext) => void;
	/**
	 * Enter a parse tree produced by `asmParser.twoOpMnemonic`.
	 * @param ctx the parse tree
	 */
	enterTwoOpMnemonic?: (ctx: TwoOpMnemonicContext) => void;
	/**
	 * Exit a parse tree produced by `asmParser.twoOpMnemonic`.
	 * @param ctx the parse tree
	 */
	exitTwoOpMnemonic?: (ctx: TwoOpMnemonicContext) => void;
	/**
	 * Enter a parse tree produced by `asmParser.jmpInst`.
	 * @param ctx the parse tree
	 */
	enterJmpInst?: (ctx: JmpInstContext) => void;
	/**
	 * Exit a parse tree produced by `asmParser.jmpInst`.
	 * @param ctx the parse tree
	 */
	exitJmpInst?: (ctx: JmpInstContext) => void;
	/**
	 * Enter a parse tree produced by `asmParser.jmpMnemonic`.
	 * @param ctx the parse tree
	 */
	enterJmpMnemonic?: (ctx: JmpMnemonicContext) => void;
	/**
	 * Exit a parse tree produced by `asmParser.jmpMnemonic`.
	 * @param ctx the parse tree
	 */
	exitJmpMnemonic?: (ctx: JmpMnemonicContext) => void;
	/**
	 * Enter a parse tree produced by `asmParser.directive`.
	 * @param ctx the parse tree
	 */
	enterDirective?: (ctx: DirectiveContext) => void;
	/**
	 * Exit a parse tree produced by `asmParser.directive`.
	 * @param ctx the parse tree
	 */
	exitDirective?: (ctx: DirectiveContext) => void;
	/**
	 * Enter a parse tree produced by `asmParser.origDirective`.
	 * @param ctx the parse tree
	 */
	enterOrigDirective?: (ctx: OrigDirectiveContext) => void;
	/**
	 * Exit a parse tree produced by `asmParser.origDirective`.
	 * @param ctx the parse tree
	 */
	exitOrigDirective?: (ctx: OrigDirectiveContext) => void;
	/**
	 * Enter a parse tree produced by `asmParser.equDirective`.
	 * @param ctx the parse tree
	 */
	enterEquDirective?: (ctx: EquDirectiveContext) => void;
	/**
	 * Exit a parse tree produced by `asmParser.equDirective`.
	 * @param ctx the parse tree
	 */
	exitEquDirective?: (ctx: EquDirectiveContext) => void;
	/**
	 * Enter a parse tree produced by `asmParser.wordDirective`.
	 * @param ctx the parse tree
	 */
	enterWordDirective?: (ctx: WordDirectiveContext) => void;
	/**
	 * Exit a parse tree produced by `asmParser.wordDirective`.
	 * @param ctx the parse tree
	 */
	exitWordDirective?: (ctx: WordDirectiveContext) => void;
	/**
	 * Enter a parse tree produced by `asmParser.strDirective`.
	 * @param ctx the parse tree
	 */
	enterStrDirective?: (ctx: StrDirectiveContext) => void;
	/**
	 * Exit a parse tree produced by `asmParser.strDirective`.
	 * @param ctx the parse tree
	 */
	exitStrDirective?: (ctx: StrDirectiveContext) => void;
	/**
	 * Enter a parse tree produced by `asmParser.strDirectiveElement`.
	 * @param ctx the parse tree
	 */
	enterStrDirectiveElement?: (ctx: StrDirectiveElementContext) => void;
	/**
	 * Exit a parse tree produced by `asmParser.strDirectiveElement`.
	 * @param ctx the parse tree
	 */
	exitStrDirectiveElement?: (ctx: StrDirectiveElementContext) => void;
	/**
	 * Enter a parse tree produced by `asmParser.tabDirective`.
	 * @param ctx the parse tree
	 */
	enterTabDirective?: (ctx: TabDirectiveContext) => void;
	/**
	 * Exit a parse tree produced by `asmParser.tabDirective`.
	 * @param ctx the parse tree
	 */
	exitTabDirective?: (ctx: TabDirectiveContext) => void;
	/**
	 * Enter a parse tree produced by `asmParser.operand`.
	 * @param ctx the parse tree
	 */
	enterOperand?: (ctx: OperandContext) => void;
	/**
	 * Exit a parse tree produced by `asmParser.operand`.
	 * @param ctx the parse tree
	 */
	exitOperand?: (ctx: OperandContext) => void;
	/**
	 * Enter a parse tree produced by `asmParser.address`.
	 * @param ctx the parse tree
	 */
	enterAddress?: (ctx: AddressContext) => void;
	/**
	 * Exit a parse tree produced by `asmParser.address`.
	 * @param ctx the parse tree
	 */
	exitAddress?: (ctx: AddressContext) => void;
	/**
	 * Enter a parse tree produced by `asmParser.register`.
	 * @param ctx the parse tree
	 */
	enterRegister?: (ctx: RegisterContext) => void;
	/**
	 * Exit a parse tree produced by `asmParser.register`.
	 * @param ctx the parse tree
	 */
	exitRegister?: (ctx: RegisterContext) => void;
	/**
	 * Enter a parse tree produced by `asmParser.immediate`.
	 * @param ctx the parse tree
	 */
	enterImmediate?: (ctx: ImmediateContext) => void;
	/**
	 * Exit a parse tree produced by `asmParser.immediate`.
	 * @param ctx the parse tree
	 */
	exitImmediate?: (ctx: ImmediateContext) => void;
	/**
	 * Enter a parse tree produced by `asmParser.direct`.
	 * @param ctx the parse tree
	 */
	enterDirect?: (ctx: DirectContext) => void;
	/**
	 * Exit a parse tree produced by `asmParser.direct`.
	 * @param ctx the parse tree
	 */
	exitDirect?: (ctx: DirectContext) => void;
	/**
	 * Enter a parse tree produced by `asmParser.registerIndirect`.
	 * @param ctx the parse tree
	 */
	enterRegisterIndirect?: (ctx: RegisterIndirectContext) => void;
	/**
	 * Exit a parse tree produced by `asmParser.registerIndirect`.
	 * @param ctx the parse tree
	 */
	exitRegisterIndirect?: (ctx: RegisterIndirectContext) => void;
	/**
	 * Enter a parse tree produced by `asmParser.indexed`.
	 * @param ctx the parse tree
	 */
	enterIndexed?: (ctx: IndexedContext) => void;
	/**
	 * Exit a parse tree produced by `asmParser.indexed`.
	 * @param ctx the parse tree
	 */
	exitIndexed?: (ctx: IndexedContext) => void;
	/**
	 * Enter a parse tree produced by `asmParser.relative`.
	 * @param ctx the parse tree
	 */
	enterRelative?: (ctx: RelativeContext) => void;
	/**
	 * Exit a parse tree produced by `asmParser.relative`.
	 * @param ctx the parse tree
	 */
	exitRelative?: (ctx: RelativeContext) => void;
	/**
	 * Enter a parse tree produced by `asmParser.based`.
	 * @param ctx the parse tree
	 */
	enterBased?: (ctx: BasedContext) => void;
	/**
	 * Exit a parse tree produced by `asmParser.based`.
	 * @param ctx the parse tree
	 */
	exitBased?: (ctx: BasedContext) => void;
	/**
	 * Enter a parse tree produced by `asmParser.const`.
	 * @param ctx the parse tree
	 */
	enterConst?: (ctx: ConstContext) => void;
	/**
	 * Exit a parse tree produced by `asmParser.const`.
	 * @param ctx the parse tree
	 */
	exitConst?: (ctx: ConstContext) => void;
}

