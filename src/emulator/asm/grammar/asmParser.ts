// Generated from asm.g4 by ANTLR 4.13.2
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {
	ATN,
	ATNDeserializer, DecisionState, DFA, FailedPredicateException,
	RecognitionException, NoViableAltException, BailErrorStrategy,
	Parser, ParserATNSimulator,
	RuleContext, ParserRuleContext, PredictionMode, PredictionContextCache,
	TerminalNode, RuleNode,
	Token, TokenStream,
	Interval, IntervalSet
} from 'antlr4';
import asmListener from "./asmListener.js";
import asmVisitor from "./asmVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export default class asmParser extends Parser {
	public static readonly ADD = 1;
	public static readonly ADDC = 2;
	public static readonly AND = 3;
	public static readonly BR = 4;
	public static readonly CALL = 5;
	public static readonly CLC = 6;
	public static readonly CMC = 7;
	public static readonly CMP = 8;
	public static readonly COM = 9;
	public static readonly DEC = 10;
	public static readonly DIV = 11;
	public static readonly DSI = 12;
	public static readonly ENI = 13;
	public static readonly INC = 14;
	public static readonly INT = 15;
	public static readonly JMP = 16;
	public static readonly MOV = 17;
	public static readonly MUL = 18;
	public static readonly MVBH = 19;
	public static readonly MVBL = 20;
	public static readonly NEG = 21;
	public static readonly NOP = 22;
	public static readonly OR = 23;
	public static readonly POP = 24;
	public static readonly PUSH = 25;
	public static readonly RET = 26;
	public static readonly RETN = 27;
	public static readonly ROL = 28;
	public static readonly ROLC = 29;
	public static readonly ROR = 30;
	public static readonly RORC = 31;
	public static readonly RTI = 32;
	public static readonly SHL = 33;
	public static readonly SHLA = 34;
	public static readonly SHR = 35;
	public static readonly SHRA = 36;
	public static readonly STC = 37;
	public static readonly SUB = 38;
	public static readonly SUBB = 39;
	public static readonly TEST = 40;
	public static readonly XCH = 41;
	public static readonly XOR = 42;
	public static readonly ORIG = 43;
	public static readonly EQU = 44;
	public static readonly WORD = 45;
	public static readonly STR = 46;
	public static readonly TAB = 47;
	public static readonly REGISTER = 48;
	public static readonly MEM_POS = 49;
	public static readonly PC = 50;
	public static readonly SP = 51;
	public static readonly COND = 52;
	public static readonly COMMA = 53;
	public static readonly COLON = 54;
	public static readonly SEMICOLON = 55;
	public static readonly LBRACK = 56;
	public static readonly RBRACK = 57;
	public static readonly DOT = 58;
	public static readonly PLUS = 59;
	public static readonly MINUS = 60;
	public static readonly ID = 61;
	public static readonly DEC_VAL = 62;
	public static readonly HEX_VAL = 63;
	public static readonly BIN_VAL = 64;
	public static readonly OCT_VAL = 65;
	public static readonly CHAR_VAL = 66;
	public static readonly STRING = 67;
	public static readonly WS = 68;
	public static readonly COMMENT = 69;
	public static override readonly EOF = Token.EOF;
	public static readonly RULE_program = 0;
	public static readonly RULE_statement = 1;
	public static readonly RULE_instruction = 2;
	public static readonly RULE_instructionFormat = 3;
	public static readonly RULE_zeroOpInst = 4;
	public static readonly RULE_zeroOpMnemonic = 5;
	public static readonly RULE_zeroOpValueInst = 6;
	public static readonly RULE_zeroOpValueMnemonic = 7;
	public static readonly RULE_oneOpInst = 8;
	public static readonly RULE_oneOpMnemonic = 9;
	public static readonly RULE_oneOpValueInst = 10;
	public static readonly RULE_oneOpValueMnemonic = 11;
	public static readonly RULE_twoOpInst = 12;
	public static readonly RULE_twoOpMnemonic = 13;
	public static readonly RULE_jmpInst = 14;
	public static readonly RULE_jmpMnemonic = 15;
	public static readonly RULE_directive = 16;
	public static readonly RULE_origDirective = 17;
	public static readonly RULE_equDirective = 18;
	public static readonly RULE_wordDirective = 19;
	public static readonly RULE_strDirective = 20;
	public static readonly RULE_strDirectiveElement = 21;
	public static readonly RULE_tabDirective = 22;
	public static readonly RULE_operand = 23;
	public static readonly RULE_address = 24;
	public static readonly RULE_register = 25;
	public static readonly RULE_immediate = 26;
	public static readonly RULE_direct = 27;
	public static readonly RULE_registerIndirect = 28;
	public static readonly RULE_indexed = 29;
	public static readonly RULE_relative = 30;
	public static readonly RULE_based = 31;
	public static readonly RULE_const = 32;
	public static readonly literalNames: (string | null)[] = [ null, "'ADD'", 
                                                            "'ADDC'", "'AND'", 
                                                            "'BR'", "'CALL'", 
                                                            "'CLC'", "'CMC'", 
                                                            "'CMP'", "'COM'", 
                                                            "'DEC'", "'DIV'", 
                                                            "'DSI'", "'ENI'", 
                                                            "'INC'", "'INT'", 
                                                            "'JMP'", "'MOV'", 
                                                            "'MUL'", "'MVBH'", 
                                                            "'MVBL'", "'NEG'", 
                                                            "'NOP'", "'OR'", 
                                                            "'POP'", "'PUSH'", 
                                                            "'RET'", "'RETN'", 
                                                            "'ROL'", "'ROLC'", 
                                                            "'ROR'", "'RORC'", 
                                                            "'RTI'", "'SHL'", 
                                                            "'SHLA'", "'SHR'", 
                                                            "'SHRA'", "'STC'", 
                                                            "'SUB'", "'SUBB'", 
                                                            "'TEST'", "'XCH'", 
                                                            "'XOR'", "'ORIG'", 
                                                            "'EQU'", "'WORD'", 
                                                            "'STR'", "'TAB'", 
                                                            null, "'M'", 
                                                            "'PC'", "'SP'", 
                                                            null, "','", 
                                                            "':'", "';'", 
                                                            "'['", "']'", 
                                                            "'.'", "'+'", 
                                                            "'-'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, "ADD", 
                                                             "ADDC", "AND", 
                                                             "BR", "CALL", 
                                                             "CLC", "CMC", 
                                                             "CMP", "COM", 
                                                             "DEC", "DIV", 
                                                             "DSI", "ENI", 
                                                             "INC", "INT", 
                                                             "JMP", "MOV", 
                                                             "MUL", "MVBH", 
                                                             "MVBL", "NEG", 
                                                             "NOP", "OR", 
                                                             "POP", "PUSH", 
                                                             "RET", "RETN", 
                                                             "ROL", "ROLC", 
                                                             "ROR", "RORC", 
                                                             "RTI", "SHL", 
                                                             "SHLA", "SHR", 
                                                             "SHRA", "STC", 
                                                             "SUB", "SUBB", 
                                                             "TEST", "XCH", 
                                                             "XOR", "ORIG", 
                                                             "EQU", "WORD", 
                                                             "STR", "TAB", 
                                                             "REGISTER", 
                                                             "MEM_POS", 
                                                             "PC", "SP", 
                                                             "COND", "COMMA", 
                                                             "COLON", "SEMICOLON", 
                                                             "LBRACK", "RBRACK", 
                                                             "DOT", "PLUS", 
                                                             "MINUS", "ID", 
                                                             "DEC_VAL", 
                                                             "HEX_VAL", 
                                                             "BIN_VAL", 
                                                             "OCT_VAL", 
                                                             "CHAR_VAL", 
                                                             "STRING", "WS", 
                                                             "COMMENT" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"program", "statement", "instruction", "instructionFormat", "zeroOpInst", 
		"zeroOpMnemonic", "zeroOpValueInst", "zeroOpValueMnemonic", "oneOpInst", 
		"oneOpMnemonic", "oneOpValueInst", "oneOpValueMnemonic", "twoOpInst", 
		"twoOpMnemonic", "jmpInst", "jmpMnemonic", "directive", "origDirective", 
		"equDirective", "wordDirective", "strDirective", "strDirectiveElement", 
		"tabDirective", "operand", "address", "register", "immediate", "direct", 
		"registerIndirect", "indexed", "relative", "based", "const",
	];
	public get grammarFileName(): string { return "asm.g4"; }
	public get literalNames(): (string | null)[] { return asmParser.literalNames; }
	public get symbolicNames(): (string | null)[] { return asmParser.symbolicNames; }
	public get ruleNames(): string[] { return asmParser.ruleNames; }
	public get serializedATN(): number[] { return asmParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(this, asmParser._ATN, asmParser.DecisionsToDFA, new PredictionContextCache());
	}
	// @RuleVersion(0)
	public program(): ProgramContext {
		let localctx: ProgramContext = new ProgramContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, asmParser.RULE_program);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 69;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967294) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 536875007) !== 0)) {
				{
				{
				this.state = 66;
				this.statement();
				}
				}
				this.state = 71;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 72;
			this.match(asmParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public statement(): StatementContext {
		let localctx: StatementContext = new StatementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, asmParser.RULE_statement);
		try {
			this.state = 76;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 1, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 74;
				this.instruction();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 75;
				this.directive();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public instruction(): InstructionContext {
		let localctx: InstructionContext = new InstructionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, asmParser.RULE_instruction);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 80;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===61) {
				{
				this.state = 78;
				this.match(asmParser.ID);
				this.state = 79;
				this.match(asmParser.COLON);
				}
			}

			this.state = 82;
			this.instructionFormat();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public instructionFormat(): InstructionFormatContext {
		let localctx: InstructionFormatContext = new InstructionFormatContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, asmParser.RULE_instructionFormat);
		try {
			this.state = 90;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 6:
			case 7:
			case 12:
			case 13:
			case 22:
			case 26:
			case 32:
			case 37:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 84;
				this.zeroOpInst();
				}
				break;
			case 15:
			case 27:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 85;
				this.zeroOpValueInst();
				}
				break;
			case 9:
			case 10:
			case 14:
			case 21:
			case 24:
			case 25:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 86;
				this.oneOpInst();
				}
				break;
			case 28:
			case 29:
			case 30:
			case 31:
			case 33:
			case 34:
			case 35:
			case 36:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 87;
				this.oneOpValueInst();
				}
				break;
			case 1:
			case 2:
			case 3:
			case 8:
			case 11:
			case 17:
			case 18:
			case 19:
			case 20:
			case 23:
			case 38:
			case 39:
			case 40:
			case 41:
			case 42:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 88;
				this.twoOpInst();
				}
				break;
			case 4:
			case 5:
			case 16:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 89;
				this.jmpInst();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public zeroOpInst(): ZeroOpInstContext {
		let localctx: ZeroOpInstContext = new ZeroOpInstContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, asmParser.RULE_zeroOpInst);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 92;
			this.zeroOpMnemonic();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public zeroOpMnemonic(): ZeroOpMnemonicContext {
		let localctx: ZeroOpMnemonicContext = new ZeroOpMnemonicContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, asmParser.RULE_zeroOpMnemonic);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 94;
			_la = this._input.LA(1);
			if(!(((((_la - 6)) & ~0x1F) === 0 && ((1 << (_la - 6)) & 2215706819) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public zeroOpValueInst(): ZeroOpValueInstContext {
		let localctx: ZeroOpValueInstContext = new ZeroOpValueInstContext(this, this._ctx, this.state);
		this.enterRule(localctx, 12, asmParser.RULE_zeroOpValueInst);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 96;
			this.zeroOpValueMnemonic();
			this.state = 97;
			this.const_();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public zeroOpValueMnemonic(): ZeroOpValueMnemonicContext {
		let localctx: ZeroOpValueMnemonicContext = new ZeroOpValueMnemonicContext(this, this._ctx, this.state);
		this.enterRule(localctx, 14, asmParser.RULE_zeroOpValueMnemonic);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 99;
			_la = this._input.LA(1);
			if(!(_la===15 || _la===27)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public oneOpInst(): OneOpInstContext {
		let localctx: OneOpInstContext = new OneOpInstContext(this, this._ctx, this.state);
		this.enterRule(localctx, 16, asmParser.RULE_oneOpInst);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 101;
			this.oneOpMnemonic();
			this.state = 102;
			this.operand();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public oneOpMnemonic(): OneOpMnemonicContext {
		let localctx: OneOpMnemonicContext = new OneOpMnemonicContext(this, this._ctx, this.state);
		this.enterRule(localctx, 18, asmParser.RULE_oneOpMnemonic);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 104;
			_la = this._input.LA(1);
			if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 52446720) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public oneOpValueInst(): OneOpValueInstContext {
		let localctx: OneOpValueInstContext = new OneOpValueInstContext(this, this._ctx, this.state);
		this.enterRule(localctx, 20, asmParser.RULE_oneOpValueInst);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 106;
			this.oneOpValueMnemonic();
			this.state = 107;
			this.operand();
			this.state = 108;
			this.match(asmParser.COMMA);
			this.state = 109;
			this.const_();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public oneOpValueMnemonic(): OneOpValueMnemonicContext {
		let localctx: OneOpValueMnemonicContext = new OneOpValueMnemonicContext(this, this._ctx, this.state);
		this.enterRule(localctx, 22, asmParser.RULE_oneOpValueMnemonic);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 111;
			_la = this._input.LA(1);
			if(!(((((_la - 28)) & ~0x1F) === 0 && ((1 << (_la - 28)) & 495) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public twoOpInst(): TwoOpInstContext {
		let localctx: TwoOpInstContext = new TwoOpInstContext(this, this._ctx, this.state);
		this.enterRule(localctx, 24, asmParser.RULE_twoOpInst);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 113;
			this.twoOpMnemonic();
			this.state = 114;
			this.operand();
			this.state = 115;
			this.match(asmParser.COMMA);
			this.state = 116;
			this.operand();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public twoOpMnemonic(): TwoOpMnemonicContext {
		let localctx: TwoOpMnemonicContext = new TwoOpMnemonicContext(this, this._ctx, this.state);
		this.enterRule(localctx, 26, asmParser.RULE_twoOpMnemonic);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 118;
			_la = this._input.LA(1);
			if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 10357006) !== 0) || ((((_la - 38)) & ~0x1F) === 0 && ((1 << (_la - 38)) & 31) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public jmpInst(): JmpInstContext {
		let localctx: JmpInstContext = new JmpInstContext(this, this._ctx, this.state);
		this.enterRule(localctx, 28, asmParser.RULE_jmpInst);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 120;
			this.jmpMnemonic();
			this.state = 123;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===58) {
				{
				this.state = 121;
				this.match(asmParser.DOT);
				this.state = 122;
				this.match(asmParser.COND);
				}
			}

			this.state = 125;
			this.operand();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public jmpMnemonic(): JmpMnemonicContext {
		let localctx: JmpMnemonicContext = new JmpMnemonicContext(this, this._ctx, this.state);
		this.enterRule(localctx, 30, asmParser.RULE_jmpMnemonic);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 127;
			_la = this._input.LA(1);
			if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 65584) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public directive(): DirectiveContext {
		let localctx: DirectiveContext = new DirectiveContext(this, this._ctx, this.state);
		this.enterRule(localctx, 32, asmParser.RULE_directive);
		try {
			this.state = 134;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 5, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 129;
				this.origDirective();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 130;
				this.equDirective();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 131;
				this.wordDirective();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 132;
				this.strDirective();
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 133;
				this.tabDirective();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public origDirective(): OrigDirectiveContext {
		let localctx: OrigDirectiveContext = new OrigDirectiveContext(this, this._ctx, this.state);
		this.enterRule(localctx, 34, asmParser.RULE_origDirective);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 136;
			this.match(asmParser.ORIG);
			this.state = 139;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 62:
			case 63:
			case 64:
			case 65:
			case 66:
				{
				this.state = 137;
				this.const_();
				}
				break;
			case 61:
				{
				this.state = 138;
				this.match(asmParser.ID);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public equDirective(): EquDirectiveContext {
		let localctx: EquDirectiveContext = new EquDirectiveContext(this, this._ctx, this.state);
		this.enterRule(localctx, 36, asmParser.RULE_equDirective);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 141;
			this.match(asmParser.ID);
			this.state = 142;
			this.match(asmParser.EQU);
			this.state = 143;
			this.const_();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public wordDirective(): WordDirectiveContext {
		let localctx: WordDirectiveContext = new WordDirectiveContext(this, this._ctx, this.state);
		this.enterRule(localctx, 38, asmParser.RULE_wordDirective);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 145;
			this.match(asmParser.ID);
			this.state = 146;
			this.match(asmParser.WORD);
			this.state = 147;
			this.const_();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public strDirective(): StrDirectiveContext {
		let localctx: StrDirectiveContext = new StrDirectiveContext(this, this._ctx, this.state);
		this.enterRule(localctx, 40, asmParser.RULE_strDirective);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 149;
			this.match(asmParser.ID);
			this.state = 150;
			this.match(asmParser.STR);
			this.state = 151;
			this.strDirectiveElement();
			this.state = 156;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===53) {
				{
				{
				this.state = 152;
				this.match(asmParser.COMMA);
				this.state = 153;
				this.strDirectiveElement();
				}
				}
				this.state = 158;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public strDirectiveElement(): StrDirectiveElementContext {
		let localctx: StrDirectiveElementContext = new StrDirectiveElementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 42, asmParser.RULE_strDirectiveElement);
		try {
			this.state = 161;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 67:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 159;
				this.match(asmParser.STRING);
				}
				break;
			case 62:
			case 63:
			case 64:
			case 65:
			case 66:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 160;
				this.const_();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public tabDirective(): TabDirectiveContext {
		let localctx: TabDirectiveContext = new TabDirectiveContext(this, this._ctx, this.state);
		this.enterRule(localctx, 44, asmParser.RULE_tabDirective);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 163;
			this.match(asmParser.ID);
			this.state = 164;
			this.match(asmParser.TAB);
			this.state = 165;
			this.const_();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public operand(): OperandContext {
		let localctx: OperandContext = new OperandContext(this, this._ctx, this.state);
		this.enterRule(localctx, 46, asmParser.RULE_operand);
		try {
			this.state = 169;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 48:
			case 49:
			case 51:
			case 62:
			case 63:
			case 64:
			case 65:
			case 66:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 167;
				this.address();
				}
				break;
			case 61:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 168;
				this.match(asmParser.ID);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public address(): AddressContext {
		let localctx: AddressContext = new AddressContext(this, this._ctx, this.state);
		this.enterRule(localctx, 48, asmParser.RULE_address);
		try {
			this.state = 179;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 10, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 171;
				this.register();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 172;
				this.match(asmParser.SP);
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 173;
				this.immediate();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 174;
				this.direct();
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 175;
				this.registerIndirect();
				}
				break;
			case 6:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 176;
				this.indexed();
				}
				break;
			case 7:
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 177;
				this.relative();
				}
				break;
			case 8:
				this.enterOuterAlt(localctx, 8);
				{
				this.state = 178;
				this.based();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public register(): RegisterContext {
		let localctx: RegisterContext = new RegisterContext(this, this._ctx, this.state);
		this.enterRule(localctx, 50, asmParser.RULE_register);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 181;
			this.match(asmParser.REGISTER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public immediate(): ImmediateContext {
		let localctx: ImmediateContext = new ImmediateContext(this, this._ctx, this.state);
		this.enterRule(localctx, 52, asmParser.RULE_immediate);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 183;
			this.const_();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public direct(): DirectContext {
		let localctx: DirectContext = new DirectContext(this, this._ctx, this.state);
		this.enterRule(localctx, 54, asmParser.RULE_direct);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 185;
			this.match(asmParser.MEM_POS);
			this.state = 186;
			this.match(asmParser.LBRACK);
			this.state = 187;
			this.const_();
			this.state = 188;
			this.match(asmParser.RBRACK);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public registerIndirect(): RegisterIndirectContext {
		let localctx: RegisterIndirectContext = new RegisterIndirectContext(this, this._ctx, this.state);
		this.enterRule(localctx, 56, asmParser.RULE_registerIndirect);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 190;
			this.match(asmParser.MEM_POS);
			this.state = 191;
			this.match(asmParser.LBRACK);
			this.state = 192;
			this.match(asmParser.REGISTER);
			this.state = 193;
			this.match(asmParser.RBRACK);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public indexed(): IndexedContext {
		let localctx: IndexedContext = new IndexedContext(this, this._ctx, this.state);
		this.enterRule(localctx, 58, asmParser.RULE_indexed);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 195;
			this.match(asmParser.MEM_POS);
			this.state = 196;
			this.match(asmParser.LBRACK);
			this.state = 197;
			this.match(asmParser.REGISTER);
			this.state = 198;
			this.match(asmParser.PLUS);
			this.state = 199;
			this.const_();
			this.state = 200;
			this.match(asmParser.RBRACK);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public relative(): RelativeContext {
		let localctx: RelativeContext = new RelativeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 60, asmParser.RULE_relative);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 202;
			this.match(asmParser.MEM_POS);
			this.state = 203;
			this.match(asmParser.LBRACK);
			this.state = 204;
			this.match(asmParser.PC);
			this.state = 205;
			this.match(asmParser.PLUS);
			this.state = 206;
			this.const_();
			this.state = 207;
			this.match(asmParser.RBRACK);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public based(): BasedContext {
		let localctx: BasedContext = new BasedContext(this, this._ctx, this.state);
		this.enterRule(localctx, 62, asmParser.RULE_based);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 209;
			this.match(asmParser.MEM_POS);
			this.state = 210;
			this.match(asmParser.LBRACK);
			this.state = 211;
			this.match(asmParser.SP);
			this.state = 212;
			this.match(asmParser.PLUS);
			this.state = 213;
			this.const_();
			this.state = 214;
			this.match(asmParser.RBRACK);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public const_(): ConstContext {
		let localctx: ConstContext = new ConstContext(this, this._ctx, this.state);
		this.enterRule(localctx, 64, asmParser.RULE_const);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 216;
			_la = this._input.LA(1);
			if(!(((((_la - 62)) & ~0x1F) === 0 && ((1 << (_la - 62)) & 31) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public static readonly _serializedATN: number[] = [4,1,69,219,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,
	7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,
	24,2,25,7,25,2,26,7,26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,
	2,32,7,32,1,0,5,0,68,8,0,10,0,12,0,71,9,0,1,0,1,0,1,1,1,1,3,1,77,8,1,1,
	2,1,2,3,2,81,8,2,1,2,1,2,1,3,1,3,1,3,1,3,1,3,1,3,3,3,91,8,3,1,4,1,4,1,5,
	1,5,1,6,1,6,1,6,1,7,1,7,1,8,1,8,1,8,1,9,1,9,1,10,1,10,1,10,1,10,1,10,1,
	11,1,11,1,12,1,12,1,12,1,12,1,12,1,13,1,13,1,14,1,14,1,14,3,14,124,8,14,
	1,14,1,14,1,15,1,15,1,16,1,16,1,16,1,16,1,16,3,16,135,8,16,1,17,1,17,1,
	17,3,17,140,8,17,1,18,1,18,1,18,1,18,1,19,1,19,1,19,1,19,1,20,1,20,1,20,
	1,20,1,20,5,20,155,8,20,10,20,12,20,158,9,20,1,21,1,21,3,21,162,8,21,1,
	22,1,22,1,22,1,22,1,23,1,23,3,23,170,8,23,1,24,1,24,1,24,1,24,1,24,1,24,
	1,24,1,24,3,24,180,8,24,1,25,1,25,1,26,1,26,1,27,1,27,1,27,1,27,1,27,1,
	28,1,28,1,28,1,28,1,28,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,30,1,30,1,30,
	1,30,1,30,1,30,1,30,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,32,1,32,1,32,0,
	0,33,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,
	48,50,52,54,56,58,60,62,64,0,7,6,0,6,7,12,13,22,22,26,26,32,32,37,37,2,
	0,15,15,27,27,4,0,9,10,14,14,21,21,24,25,2,0,28,31,33,36,6,0,1,3,8,8,11,
	11,17,20,23,23,38,42,2,0,4,5,16,16,1,0,62,66,209,0,69,1,0,0,0,2,76,1,0,
	0,0,4,80,1,0,0,0,6,90,1,0,0,0,8,92,1,0,0,0,10,94,1,0,0,0,12,96,1,0,0,0,
	14,99,1,0,0,0,16,101,1,0,0,0,18,104,1,0,0,0,20,106,1,0,0,0,22,111,1,0,0,
	0,24,113,1,0,0,0,26,118,1,0,0,0,28,120,1,0,0,0,30,127,1,0,0,0,32,134,1,
	0,0,0,34,136,1,0,0,0,36,141,1,0,0,0,38,145,1,0,0,0,40,149,1,0,0,0,42,161,
	1,0,0,0,44,163,1,0,0,0,46,169,1,0,0,0,48,179,1,0,0,0,50,181,1,0,0,0,52,
	183,1,0,0,0,54,185,1,0,0,0,56,190,1,0,0,0,58,195,1,0,0,0,60,202,1,0,0,0,
	62,209,1,0,0,0,64,216,1,0,0,0,66,68,3,2,1,0,67,66,1,0,0,0,68,71,1,0,0,0,
	69,67,1,0,0,0,69,70,1,0,0,0,70,72,1,0,0,0,71,69,1,0,0,0,72,73,5,0,0,1,73,
	1,1,0,0,0,74,77,3,4,2,0,75,77,3,32,16,0,76,74,1,0,0,0,76,75,1,0,0,0,77,
	3,1,0,0,0,78,79,5,61,0,0,79,81,5,54,0,0,80,78,1,0,0,0,80,81,1,0,0,0,81,
	82,1,0,0,0,82,83,3,6,3,0,83,5,1,0,0,0,84,91,3,8,4,0,85,91,3,12,6,0,86,91,
	3,16,8,0,87,91,3,20,10,0,88,91,3,24,12,0,89,91,3,28,14,0,90,84,1,0,0,0,
	90,85,1,0,0,0,90,86,1,0,0,0,90,87,1,0,0,0,90,88,1,0,0,0,90,89,1,0,0,0,91,
	7,1,0,0,0,92,93,3,10,5,0,93,9,1,0,0,0,94,95,7,0,0,0,95,11,1,0,0,0,96,97,
	3,14,7,0,97,98,3,64,32,0,98,13,1,0,0,0,99,100,7,1,0,0,100,15,1,0,0,0,101,
	102,3,18,9,0,102,103,3,46,23,0,103,17,1,0,0,0,104,105,7,2,0,0,105,19,1,
	0,0,0,106,107,3,22,11,0,107,108,3,46,23,0,108,109,5,53,0,0,109,110,3,64,
	32,0,110,21,1,0,0,0,111,112,7,3,0,0,112,23,1,0,0,0,113,114,3,26,13,0,114,
	115,3,46,23,0,115,116,5,53,0,0,116,117,3,46,23,0,117,25,1,0,0,0,118,119,
	7,4,0,0,119,27,1,0,0,0,120,123,3,30,15,0,121,122,5,58,0,0,122,124,5,52,
	0,0,123,121,1,0,0,0,123,124,1,0,0,0,124,125,1,0,0,0,125,126,3,46,23,0,126,
	29,1,0,0,0,127,128,7,5,0,0,128,31,1,0,0,0,129,135,3,34,17,0,130,135,3,36,
	18,0,131,135,3,38,19,0,132,135,3,40,20,0,133,135,3,44,22,0,134,129,1,0,
	0,0,134,130,1,0,0,0,134,131,1,0,0,0,134,132,1,0,0,0,134,133,1,0,0,0,135,
	33,1,0,0,0,136,139,5,43,0,0,137,140,3,64,32,0,138,140,5,61,0,0,139,137,
	1,0,0,0,139,138,1,0,0,0,140,35,1,0,0,0,141,142,5,61,0,0,142,143,5,44,0,
	0,143,144,3,64,32,0,144,37,1,0,0,0,145,146,5,61,0,0,146,147,5,45,0,0,147,
	148,3,64,32,0,148,39,1,0,0,0,149,150,5,61,0,0,150,151,5,46,0,0,151,156,
	3,42,21,0,152,153,5,53,0,0,153,155,3,42,21,0,154,152,1,0,0,0,155,158,1,
	0,0,0,156,154,1,0,0,0,156,157,1,0,0,0,157,41,1,0,0,0,158,156,1,0,0,0,159,
	162,5,67,0,0,160,162,3,64,32,0,161,159,1,0,0,0,161,160,1,0,0,0,162,43,1,
	0,0,0,163,164,5,61,0,0,164,165,5,47,0,0,165,166,3,64,32,0,166,45,1,0,0,
	0,167,170,3,48,24,0,168,170,5,61,0,0,169,167,1,0,0,0,169,168,1,0,0,0,170,
	47,1,0,0,0,171,180,3,50,25,0,172,180,5,51,0,0,173,180,3,52,26,0,174,180,
	3,54,27,0,175,180,3,56,28,0,176,180,3,58,29,0,177,180,3,60,30,0,178,180,
	3,62,31,0,179,171,1,0,0,0,179,172,1,0,0,0,179,173,1,0,0,0,179,174,1,0,0,
	0,179,175,1,0,0,0,179,176,1,0,0,0,179,177,1,0,0,0,179,178,1,0,0,0,180,49,
	1,0,0,0,181,182,5,48,0,0,182,51,1,0,0,0,183,184,3,64,32,0,184,53,1,0,0,
	0,185,186,5,49,0,0,186,187,5,56,0,0,187,188,3,64,32,0,188,189,5,57,0,0,
	189,55,1,0,0,0,190,191,5,49,0,0,191,192,5,56,0,0,192,193,5,48,0,0,193,194,
	5,57,0,0,194,57,1,0,0,0,195,196,5,49,0,0,196,197,5,56,0,0,197,198,5,48,
	0,0,198,199,5,59,0,0,199,200,3,64,32,0,200,201,5,57,0,0,201,59,1,0,0,0,
	202,203,5,49,0,0,203,204,5,56,0,0,204,205,5,50,0,0,205,206,5,59,0,0,206,
	207,3,64,32,0,207,208,5,57,0,0,208,61,1,0,0,0,209,210,5,49,0,0,210,211,
	5,56,0,0,211,212,5,51,0,0,212,213,5,59,0,0,213,214,3,64,32,0,214,215,5,
	57,0,0,215,63,1,0,0,0,216,217,7,6,0,0,217,65,1,0,0,0,11,69,76,80,90,123,
	134,139,156,161,169,179];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!asmParser.__ATN) {
			asmParser.__ATN = new ATNDeserializer().deserialize(asmParser._serializedATN);
		}

		return asmParser.__ATN;
	}


	static DecisionsToDFA = asmParser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

}

export class ProgramContext extends ParserRuleContext {
	constructor(parser?: asmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public EOF(): TerminalNode {
		return this.getToken(asmParser.EOF, 0);
	}
	public statement_list(): StatementContext[] {
		return this.getTypedRuleContexts(StatementContext) as StatementContext[];
	}
	public statement(i: number): StatementContext {
		return this.getTypedRuleContext(StatementContext, i) as StatementContext;
	}
    public get ruleIndex(): number {
    	return asmParser.RULE_program;
	}
	public enterRule(listener: asmListener): void {
	    if(listener.enterProgram) {
	 		listener.enterProgram(this);
		}
	}
	public exitRule(listener: asmListener): void {
	    if(listener.exitProgram) {
	 		listener.exitProgram(this);
		}
	}
	// @Override
	public accept<Result>(visitor: asmVisitor<Result>): Result {
		if (visitor.visitProgram) {
			return visitor.visitProgram(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StatementContext extends ParserRuleContext {
	constructor(parser?: asmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public instruction(): InstructionContext {
		return this.getTypedRuleContext(InstructionContext, 0) as InstructionContext;
	}
	public directive(): DirectiveContext {
		return this.getTypedRuleContext(DirectiveContext, 0) as DirectiveContext;
	}
    public get ruleIndex(): number {
    	return asmParser.RULE_statement;
	}
	public enterRule(listener: asmListener): void {
	    if(listener.enterStatement) {
	 		listener.enterStatement(this);
		}
	}
	public exitRule(listener: asmListener): void {
	    if(listener.exitStatement) {
	 		listener.exitStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: asmVisitor<Result>): Result {
		if (visitor.visitStatement) {
			return visitor.visitStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InstructionContext extends ParserRuleContext {
	constructor(parser?: asmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public instructionFormat(): InstructionFormatContext {
		return this.getTypedRuleContext(InstructionFormatContext, 0) as InstructionFormatContext;
	}
	public ID(): TerminalNode {
		return this.getToken(asmParser.ID, 0);
	}
	public COLON(): TerminalNode {
		return this.getToken(asmParser.COLON, 0);
	}
    public get ruleIndex(): number {
    	return asmParser.RULE_instruction;
	}
	public enterRule(listener: asmListener): void {
	    if(listener.enterInstruction) {
	 		listener.enterInstruction(this);
		}
	}
	public exitRule(listener: asmListener): void {
	    if(listener.exitInstruction) {
	 		listener.exitInstruction(this);
		}
	}
	// @Override
	public accept<Result>(visitor: asmVisitor<Result>): Result {
		if (visitor.visitInstruction) {
			return visitor.visitInstruction(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InstructionFormatContext extends ParserRuleContext {
	constructor(parser?: asmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public zeroOpInst(): ZeroOpInstContext {
		return this.getTypedRuleContext(ZeroOpInstContext, 0) as ZeroOpInstContext;
	}
	public zeroOpValueInst(): ZeroOpValueInstContext {
		return this.getTypedRuleContext(ZeroOpValueInstContext, 0) as ZeroOpValueInstContext;
	}
	public oneOpInst(): OneOpInstContext {
		return this.getTypedRuleContext(OneOpInstContext, 0) as OneOpInstContext;
	}
	public oneOpValueInst(): OneOpValueInstContext {
		return this.getTypedRuleContext(OneOpValueInstContext, 0) as OneOpValueInstContext;
	}
	public twoOpInst(): TwoOpInstContext {
		return this.getTypedRuleContext(TwoOpInstContext, 0) as TwoOpInstContext;
	}
	public jmpInst(): JmpInstContext {
		return this.getTypedRuleContext(JmpInstContext, 0) as JmpInstContext;
	}
    public get ruleIndex(): number {
    	return asmParser.RULE_instructionFormat;
	}
	public enterRule(listener: asmListener): void {
	    if(listener.enterInstructionFormat) {
	 		listener.enterInstructionFormat(this);
		}
	}
	public exitRule(listener: asmListener): void {
	    if(listener.exitInstructionFormat) {
	 		listener.exitInstructionFormat(this);
		}
	}
	// @Override
	public accept<Result>(visitor: asmVisitor<Result>): Result {
		if (visitor.visitInstructionFormat) {
			return visitor.visitInstructionFormat(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ZeroOpInstContext extends ParserRuleContext {
	constructor(parser?: asmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public zeroOpMnemonic(): ZeroOpMnemonicContext {
		return this.getTypedRuleContext(ZeroOpMnemonicContext, 0) as ZeroOpMnemonicContext;
	}
    public get ruleIndex(): number {
    	return asmParser.RULE_zeroOpInst;
	}
	public enterRule(listener: asmListener): void {
	    if(listener.enterZeroOpInst) {
	 		listener.enterZeroOpInst(this);
		}
	}
	public exitRule(listener: asmListener): void {
	    if(listener.exitZeroOpInst) {
	 		listener.exitZeroOpInst(this);
		}
	}
	// @Override
	public accept<Result>(visitor: asmVisitor<Result>): Result {
		if (visitor.visitZeroOpInst) {
			return visitor.visitZeroOpInst(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ZeroOpMnemonicContext extends ParserRuleContext {
	constructor(parser?: asmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public NOP(): TerminalNode {
		return this.getToken(asmParser.NOP, 0);
	}
	public ENI(): TerminalNode {
		return this.getToken(asmParser.ENI, 0);
	}
	public DSI(): TerminalNode {
		return this.getToken(asmParser.DSI, 0);
	}
	public STC(): TerminalNode {
		return this.getToken(asmParser.STC, 0);
	}
	public CLC(): TerminalNode {
		return this.getToken(asmParser.CLC, 0);
	}
	public CMC(): TerminalNode {
		return this.getToken(asmParser.CMC, 0);
	}
	public RET(): TerminalNode {
		return this.getToken(asmParser.RET, 0);
	}
	public RTI(): TerminalNode {
		return this.getToken(asmParser.RTI, 0);
	}
    public get ruleIndex(): number {
    	return asmParser.RULE_zeroOpMnemonic;
	}
	public enterRule(listener: asmListener): void {
	    if(listener.enterZeroOpMnemonic) {
	 		listener.enterZeroOpMnemonic(this);
		}
	}
	public exitRule(listener: asmListener): void {
	    if(listener.exitZeroOpMnemonic) {
	 		listener.exitZeroOpMnemonic(this);
		}
	}
	// @Override
	public accept<Result>(visitor: asmVisitor<Result>): Result {
		if (visitor.visitZeroOpMnemonic) {
			return visitor.visitZeroOpMnemonic(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ZeroOpValueInstContext extends ParserRuleContext {
	constructor(parser?: asmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public zeroOpValueMnemonic(): ZeroOpValueMnemonicContext {
		return this.getTypedRuleContext(ZeroOpValueMnemonicContext, 0) as ZeroOpValueMnemonicContext;
	}
	public const_(): ConstContext {
		return this.getTypedRuleContext(ConstContext, 0) as ConstContext;
	}
    public get ruleIndex(): number {
    	return asmParser.RULE_zeroOpValueInst;
	}
	public enterRule(listener: asmListener): void {
	    if(listener.enterZeroOpValueInst) {
	 		listener.enterZeroOpValueInst(this);
		}
	}
	public exitRule(listener: asmListener): void {
	    if(listener.exitZeroOpValueInst) {
	 		listener.exitZeroOpValueInst(this);
		}
	}
	// @Override
	public accept<Result>(visitor: asmVisitor<Result>): Result {
		if (visitor.visitZeroOpValueInst) {
			return visitor.visitZeroOpValueInst(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ZeroOpValueMnemonicContext extends ParserRuleContext {
	constructor(parser?: asmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public RETN(): TerminalNode {
		return this.getToken(asmParser.RETN, 0);
	}
	public INT(): TerminalNode {
		return this.getToken(asmParser.INT, 0);
	}
    public get ruleIndex(): number {
    	return asmParser.RULE_zeroOpValueMnemonic;
	}
	public enterRule(listener: asmListener): void {
	    if(listener.enterZeroOpValueMnemonic) {
	 		listener.enterZeroOpValueMnemonic(this);
		}
	}
	public exitRule(listener: asmListener): void {
	    if(listener.exitZeroOpValueMnemonic) {
	 		listener.exitZeroOpValueMnemonic(this);
		}
	}
	// @Override
	public accept<Result>(visitor: asmVisitor<Result>): Result {
		if (visitor.visitZeroOpValueMnemonic) {
			return visitor.visitZeroOpValueMnemonic(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OneOpInstContext extends ParserRuleContext {
	constructor(parser?: asmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public oneOpMnemonic(): OneOpMnemonicContext {
		return this.getTypedRuleContext(OneOpMnemonicContext, 0) as OneOpMnemonicContext;
	}
	public operand(): OperandContext {
		return this.getTypedRuleContext(OperandContext, 0) as OperandContext;
	}
    public get ruleIndex(): number {
    	return asmParser.RULE_oneOpInst;
	}
	public enterRule(listener: asmListener): void {
	    if(listener.enterOneOpInst) {
	 		listener.enterOneOpInst(this);
		}
	}
	public exitRule(listener: asmListener): void {
	    if(listener.exitOneOpInst) {
	 		listener.exitOneOpInst(this);
		}
	}
	// @Override
	public accept<Result>(visitor: asmVisitor<Result>): Result {
		if (visitor.visitOneOpInst) {
			return visitor.visitOneOpInst(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OneOpMnemonicContext extends ParserRuleContext {
	constructor(parser?: asmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public NEG(): TerminalNode {
		return this.getToken(asmParser.NEG, 0);
	}
	public INC(): TerminalNode {
		return this.getToken(asmParser.INC, 0);
	}
	public DEC(): TerminalNode {
		return this.getToken(asmParser.DEC, 0);
	}
	public COM(): TerminalNode {
		return this.getToken(asmParser.COM, 0);
	}
	public PUSH(): TerminalNode {
		return this.getToken(asmParser.PUSH, 0);
	}
	public POP(): TerminalNode {
		return this.getToken(asmParser.POP, 0);
	}
    public get ruleIndex(): number {
    	return asmParser.RULE_oneOpMnemonic;
	}
	public enterRule(listener: asmListener): void {
	    if(listener.enterOneOpMnemonic) {
	 		listener.enterOneOpMnemonic(this);
		}
	}
	public exitRule(listener: asmListener): void {
	    if(listener.exitOneOpMnemonic) {
	 		listener.exitOneOpMnemonic(this);
		}
	}
	// @Override
	public accept<Result>(visitor: asmVisitor<Result>): Result {
		if (visitor.visitOneOpMnemonic) {
			return visitor.visitOneOpMnemonic(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OneOpValueInstContext extends ParserRuleContext {
	constructor(parser?: asmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public oneOpValueMnemonic(): OneOpValueMnemonicContext {
		return this.getTypedRuleContext(OneOpValueMnemonicContext, 0) as OneOpValueMnemonicContext;
	}
	public operand(): OperandContext {
		return this.getTypedRuleContext(OperandContext, 0) as OperandContext;
	}
	public COMMA(): TerminalNode {
		return this.getToken(asmParser.COMMA, 0);
	}
	public const_(): ConstContext {
		return this.getTypedRuleContext(ConstContext, 0) as ConstContext;
	}
    public get ruleIndex(): number {
    	return asmParser.RULE_oneOpValueInst;
	}
	public enterRule(listener: asmListener): void {
	    if(listener.enterOneOpValueInst) {
	 		listener.enterOneOpValueInst(this);
		}
	}
	public exitRule(listener: asmListener): void {
	    if(listener.exitOneOpValueInst) {
	 		listener.exitOneOpValueInst(this);
		}
	}
	// @Override
	public accept<Result>(visitor: asmVisitor<Result>): Result {
		if (visitor.visitOneOpValueInst) {
			return visitor.visitOneOpValueInst(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OneOpValueMnemonicContext extends ParserRuleContext {
	constructor(parser?: asmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public SHR(): TerminalNode {
		return this.getToken(asmParser.SHR, 0);
	}
	public SHL(): TerminalNode {
		return this.getToken(asmParser.SHL, 0);
	}
	public SHRA(): TerminalNode {
		return this.getToken(asmParser.SHRA, 0);
	}
	public SHLA(): TerminalNode {
		return this.getToken(asmParser.SHLA, 0);
	}
	public ROR(): TerminalNode {
		return this.getToken(asmParser.ROR, 0);
	}
	public ROL(): TerminalNode {
		return this.getToken(asmParser.ROL, 0);
	}
	public RORC(): TerminalNode {
		return this.getToken(asmParser.RORC, 0);
	}
	public ROLC(): TerminalNode {
		return this.getToken(asmParser.ROLC, 0);
	}
    public get ruleIndex(): number {
    	return asmParser.RULE_oneOpValueMnemonic;
	}
	public enterRule(listener: asmListener): void {
	    if(listener.enterOneOpValueMnemonic) {
	 		listener.enterOneOpValueMnemonic(this);
		}
	}
	public exitRule(listener: asmListener): void {
	    if(listener.exitOneOpValueMnemonic) {
	 		listener.exitOneOpValueMnemonic(this);
		}
	}
	// @Override
	public accept<Result>(visitor: asmVisitor<Result>): Result {
		if (visitor.visitOneOpValueMnemonic) {
			return visitor.visitOneOpValueMnemonic(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TwoOpInstContext extends ParserRuleContext {
	constructor(parser?: asmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public twoOpMnemonic(): TwoOpMnemonicContext {
		return this.getTypedRuleContext(TwoOpMnemonicContext, 0) as TwoOpMnemonicContext;
	}
	public operand_list(): OperandContext[] {
		return this.getTypedRuleContexts(OperandContext) as OperandContext[];
	}
	public operand(i: number): OperandContext {
		return this.getTypedRuleContext(OperandContext, i) as OperandContext;
	}
	public COMMA(): TerminalNode {
		return this.getToken(asmParser.COMMA, 0);
	}
    public get ruleIndex(): number {
    	return asmParser.RULE_twoOpInst;
	}
	public enterRule(listener: asmListener): void {
	    if(listener.enterTwoOpInst) {
	 		listener.enterTwoOpInst(this);
		}
	}
	public exitRule(listener: asmListener): void {
	    if(listener.exitTwoOpInst) {
	 		listener.exitTwoOpInst(this);
		}
	}
	// @Override
	public accept<Result>(visitor: asmVisitor<Result>): Result {
		if (visitor.visitTwoOpInst) {
			return visitor.visitTwoOpInst(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TwoOpMnemonicContext extends ParserRuleContext {
	constructor(parser?: asmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public CMP(): TerminalNode {
		return this.getToken(asmParser.CMP, 0);
	}
	public ADD(): TerminalNode {
		return this.getToken(asmParser.ADD, 0);
	}
	public ADDC(): TerminalNode {
		return this.getToken(asmParser.ADDC, 0);
	}
	public SUB(): TerminalNode {
		return this.getToken(asmParser.SUB, 0);
	}
	public SUBB(): TerminalNode {
		return this.getToken(asmParser.SUBB, 0);
	}
	public MUL(): TerminalNode {
		return this.getToken(asmParser.MUL, 0);
	}
	public DIV(): TerminalNode {
		return this.getToken(asmParser.DIV, 0);
	}
	public TEST(): TerminalNode {
		return this.getToken(asmParser.TEST, 0);
	}
	public AND(): TerminalNode {
		return this.getToken(asmParser.AND, 0);
	}
	public OR(): TerminalNode {
		return this.getToken(asmParser.OR, 0);
	}
	public XOR(): TerminalNode {
		return this.getToken(asmParser.XOR, 0);
	}
	public MOV(): TerminalNode {
		return this.getToken(asmParser.MOV, 0);
	}
	public MVBL(): TerminalNode {
		return this.getToken(asmParser.MVBL, 0);
	}
	public MVBH(): TerminalNode {
		return this.getToken(asmParser.MVBH, 0);
	}
	public XCH(): TerminalNode {
		return this.getToken(asmParser.XCH, 0);
	}
    public get ruleIndex(): number {
    	return asmParser.RULE_twoOpMnemonic;
	}
	public enterRule(listener: asmListener): void {
	    if(listener.enterTwoOpMnemonic) {
	 		listener.enterTwoOpMnemonic(this);
		}
	}
	public exitRule(listener: asmListener): void {
	    if(listener.exitTwoOpMnemonic) {
	 		listener.exitTwoOpMnemonic(this);
		}
	}
	// @Override
	public accept<Result>(visitor: asmVisitor<Result>): Result {
		if (visitor.visitTwoOpMnemonic) {
			return visitor.visitTwoOpMnemonic(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class JmpInstContext extends ParserRuleContext {
	constructor(parser?: asmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public jmpMnemonic(): JmpMnemonicContext {
		return this.getTypedRuleContext(JmpMnemonicContext, 0) as JmpMnemonicContext;
	}
	public operand(): OperandContext {
		return this.getTypedRuleContext(OperandContext, 0) as OperandContext;
	}
	public DOT(): TerminalNode {
		return this.getToken(asmParser.DOT, 0);
	}
	public COND(): TerminalNode {
		return this.getToken(asmParser.COND, 0);
	}
    public get ruleIndex(): number {
    	return asmParser.RULE_jmpInst;
	}
	public enterRule(listener: asmListener): void {
	    if(listener.enterJmpInst) {
	 		listener.enterJmpInst(this);
		}
	}
	public exitRule(listener: asmListener): void {
	    if(listener.exitJmpInst) {
	 		listener.exitJmpInst(this);
		}
	}
	// @Override
	public accept<Result>(visitor: asmVisitor<Result>): Result {
		if (visitor.visitJmpInst) {
			return visitor.visitJmpInst(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class JmpMnemonicContext extends ParserRuleContext {
	constructor(parser?: asmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public JMP(): TerminalNode {
		return this.getToken(asmParser.JMP, 0);
	}
	public CALL(): TerminalNode {
		return this.getToken(asmParser.CALL, 0);
	}
	public BR(): TerminalNode {
		return this.getToken(asmParser.BR, 0);
	}
    public get ruleIndex(): number {
    	return asmParser.RULE_jmpMnemonic;
	}
	public enterRule(listener: asmListener): void {
	    if(listener.enterJmpMnemonic) {
	 		listener.enterJmpMnemonic(this);
		}
	}
	public exitRule(listener: asmListener): void {
	    if(listener.exitJmpMnemonic) {
	 		listener.exitJmpMnemonic(this);
		}
	}
	// @Override
	public accept<Result>(visitor: asmVisitor<Result>): Result {
		if (visitor.visitJmpMnemonic) {
			return visitor.visitJmpMnemonic(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DirectiveContext extends ParserRuleContext {
	constructor(parser?: asmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public origDirective(): OrigDirectiveContext {
		return this.getTypedRuleContext(OrigDirectiveContext, 0) as OrigDirectiveContext;
	}
	public equDirective(): EquDirectiveContext {
		return this.getTypedRuleContext(EquDirectiveContext, 0) as EquDirectiveContext;
	}
	public wordDirective(): WordDirectiveContext {
		return this.getTypedRuleContext(WordDirectiveContext, 0) as WordDirectiveContext;
	}
	public strDirective(): StrDirectiveContext {
		return this.getTypedRuleContext(StrDirectiveContext, 0) as StrDirectiveContext;
	}
	public tabDirective(): TabDirectiveContext {
		return this.getTypedRuleContext(TabDirectiveContext, 0) as TabDirectiveContext;
	}
    public get ruleIndex(): number {
    	return asmParser.RULE_directive;
	}
	public enterRule(listener: asmListener): void {
	    if(listener.enterDirective) {
	 		listener.enterDirective(this);
		}
	}
	public exitRule(listener: asmListener): void {
	    if(listener.exitDirective) {
	 		listener.exitDirective(this);
		}
	}
	// @Override
	public accept<Result>(visitor: asmVisitor<Result>): Result {
		if (visitor.visitDirective) {
			return visitor.visitDirective(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OrigDirectiveContext extends ParserRuleContext {
	constructor(parser?: asmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ORIG(): TerminalNode {
		return this.getToken(asmParser.ORIG, 0);
	}
	public const_(): ConstContext {
		return this.getTypedRuleContext(ConstContext, 0) as ConstContext;
	}
	public ID(): TerminalNode {
		return this.getToken(asmParser.ID, 0);
	}
    public get ruleIndex(): number {
    	return asmParser.RULE_origDirective;
	}
	public enterRule(listener: asmListener): void {
	    if(listener.enterOrigDirective) {
	 		listener.enterOrigDirective(this);
		}
	}
	public exitRule(listener: asmListener): void {
	    if(listener.exitOrigDirective) {
	 		listener.exitOrigDirective(this);
		}
	}
	// @Override
	public accept<Result>(visitor: asmVisitor<Result>): Result {
		if (visitor.visitOrigDirective) {
			return visitor.visitOrigDirective(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EquDirectiveContext extends ParserRuleContext {
	constructor(parser?: asmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ID(): TerminalNode {
		return this.getToken(asmParser.ID, 0);
	}
	public EQU(): TerminalNode {
		return this.getToken(asmParser.EQU, 0);
	}
	public const_(): ConstContext {
		return this.getTypedRuleContext(ConstContext, 0) as ConstContext;
	}
    public get ruleIndex(): number {
    	return asmParser.RULE_equDirective;
	}
	public enterRule(listener: asmListener): void {
	    if(listener.enterEquDirective) {
	 		listener.enterEquDirective(this);
		}
	}
	public exitRule(listener: asmListener): void {
	    if(listener.exitEquDirective) {
	 		listener.exitEquDirective(this);
		}
	}
	// @Override
	public accept<Result>(visitor: asmVisitor<Result>): Result {
		if (visitor.visitEquDirective) {
			return visitor.visitEquDirective(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class WordDirectiveContext extends ParserRuleContext {
	constructor(parser?: asmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ID(): TerminalNode {
		return this.getToken(asmParser.ID, 0);
	}
	public WORD(): TerminalNode {
		return this.getToken(asmParser.WORD, 0);
	}
	public const_(): ConstContext {
		return this.getTypedRuleContext(ConstContext, 0) as ConstContext;
	}
    public get ruleIndex(): number {
    	return asmParser.RULE_wordDirective;
	}
	public enterRule(listener: asmListener): void {
	    if(listener.enterWordDirective) {
	 		listener.enterWordDirective(this);
		}
	}
	public exitRule(listener: asmListener): void {
	    if(listener.exitWordDirective) {
	 		listener.exitWordDirective(this);
		}
	}
	// @Override
	public accept<Result>(visitor: asmVisitor<Result>): Result {
		if (visitor.visitWordDirective) {
			return visitor.visitWordDirective(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StrDirectiveContext extends ParserRuleContext {
	constructor(parser?: asmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ID(): TerminalNode {
		return this.getToken(asmParser.ID, 0);
	}
	public STR(): TerminalNode {
		return this.getToken(asmParser.STR, 0);
	}
	public strDirectiveElement_list(): StrDirectiveElementContext[] {
		return this.getTypedRuleContexts(StrDirectiveElementContext) as StrDirectiveElementContext[];
	}
	public strDirectiveElement(i: number): StrDirectiveElementContext {
		return this.getTypedRuleContext(StrDirectiveElementContext, i) as StrDirectiveElementContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(asmParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(asmParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return asmParser.RULE_strDirective;
	}
	public enterRule(listener: asmListener): void {
	    if(listener.enterStrDirective) {
	 		listener.enterStrDirective(this);
		}
	}
	public exitRule(listener: asmListener): void {
	    if(listener.exitStrDirective) {
	 		listener.exitStrDirective(this);
		}
	}
	// @Override
	public accept<Result>(visitor: asmVisitor<Result>): Result {
		if (visitor.visitStrDirective) {
			return visitor.visitStrDirective(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StrDirectiveElementContext extends ParserRuleContext {
	constructor(parser?: asmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public STRING(): TerminalNode {
		return this.getToken(asmParser.STRING, 0);
	}
	public const_(): ConstContext {
		return this.getTypedRuleContext(ConstContext, 0) as ConstContext;
	}
    public get ruleIndex(): number {
    	return asmParser.RULE_strDirectiveElement;
	}
	public enterRule(listener: asmListener): void {
	    if(listener.enterStrDirectiveElement) {
	 		listener.enterStrDirectiveElement(this);
		}
	}
	public exitRule(listener: asmListener): void {
	    if(listener.exitStrDirectiveElement) {
	 		listener.exitStrDirectiveElement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: asmVisitor<Result>): Result {
		if (visitor.visitStrDirectiveElement) {
			return visitor.visitStrDirectiveElement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TabDirectiveContext extends ParserRuleContext {
	constructor(parser?: asmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ID(): TerminalNode {
		return this.getToken(asmParser.ID, 0);
	}
	public TAB(): TerminalNode {
		return this.getToken(asmParser.TAB, 0);
	}
	public const_(): ConstContext {
		return this.getTypedRuleContext(ConstContext, 0) as ConstContext;
	}
    public get ruleIndex(): number {
    	return asmParser.RULE_tabDirective;
	}
	public enterRule(listener: asmListener): void {
	    if(listener.enterTabDirective) {
	 		listener.enterTabDirective(this);
		}
	}
	public exitRule(listener: asmListener): void {
	    if(listener.exitTabDirective) {
	 		listener.exitTabDirective(this);
		}
	}
	// @Override
	public accept<Result>(visitor: asmVisitor<Result>): Result {
		if (visitor.visitTabDirective) {
			return visitor.visitTabDirective(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OperandContext extends ParserRuleContext {
	constructor(parser?: asmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public address(): AddressContext {
		return this.getTypedRuleContext(AddressContext, 0) as AddressContext;
	}
	public ID(): TerminalNode {
		return this.getToken(asmParser.ID, 0);
	}
    public get ruleIndex(): number {
    	return asmParser.RULE_operand;
	}
	public enterRule(listener: asmListener): void {
	    if(listener.enterOperand) {
	 		listener.enterOperand(this);
		}
	}
	public exitRule(listener: asmListener): void {
	    if(listener.exitOperand) {
	 		listener.exitOperand(this);
		}
	}
	// @Override
	public accept<Result>(visitor: asmVisitor<Result>): Result {
		if (visitor.visitOperand) {
			return visitor.visitOperand(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AddressContext extends ParserRuleContext {
	constructor(parser?: asmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public register(): RegisterContext {
		return this.getTypedRuleContext(RegisterContext, 0) as RegisterContext;
	}
	public SP(): TerminalNode {
		return this.getToken(asmParser.SP, 0);
	}
	public immediate(): ImmediateContext {
		return this.getTypedRuleContext(ImmediateContext, 0) as ImmediateContext;
	}
	public direct(): DirectContext {
		return this.getTypedRuleContext(DirectContext, 0) as DirectContext;
	}
	public registerIndirect(): RegisterIndirectContext {
		return this.getTypedRuleContext(RegisterIndirectContext, 0) as RegisterIndirectContext;
	}
	public indexed(): IndexedContext {
		return this.getTypedRuleContext(IndexedContext, 0) as IndexedContext;
	}
	public relative(): RelativeContext {
		return this.getTypedRuleContext(RelativeContext, 0) as RelativeContext;
	}
	public based(): BasedContext {
		return this.getTypedRuleContext(BasedContext, 0) as BasedContext;
	}
    public get ruleIndex(): number {
    	return asmParser.RULE_address;
	}
	public enterRule(listener: asmListener): void {
	    if(listener.enterAddress) {
	 		listener.enterAddress(this);
		}
	}
	public exitRule(listener: asmListener): void {
	    if(listener.exitAddress) {
	 		listener.exitAddress(this);
		}
	}
	// @Override
	public accept<Result>(visitor: asmVisitor<Result>): Result {
		if (visitor.visitAddress) {
			return visitor.visitAddress(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RegisterContext extends ParserRuleContext {
	constructor(parser?: asmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public REGISTER(): TerminalNode {
		return this.getToken(asmParser.REGISTER, 0);
	}
    public get ruleIndex(): number {
    	return asmParser.RULE_register;
	}
	public enterRule(listener: asmListener): void {
	    if(listener.enterRegister) {
	 		listener.enterRegister(this);
		}
	}
	public exitRule(listener: asmListener): void {
	    if(listener.exitRegister) {
	 		listener.exitRegister(this);
		}
	}
	// @Override
	public accept<Result>(visitor: asmVisitor<Result>): Result {
		if (visitor.visitRegister) {
			return visitor.visitRegister(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ImmediateContext extends ParserRuleContext {
	constructor(parser?: asmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public const_(): ConstContext {
		return this.getTypedRuleContext(ConstContext, 0) as ConstContext;
	}
    public get ruleIndex(): number {
    	return asmParser.RULE_immediate;
	}
	public enterRule(listener: asmListener): void {
	    if(listener.enterImmediate) {
	 		listener.enterImmediate(this);
		}
	}
	public exitRule(listener: asmListener): void {
	    if(listener.exitImmediate) {
	 		listener.exitImmediate(this);
		}
	}
	// @Override
	public accept<Result>(visitor: asmVisitor<Result>): Result {
		if (visitor.visitImmediate) {
			return visitor.visitImmediate(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DirectContext extends ParserRuleContext {
	constructor(parser?: asmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public MEM_POS(): TerminalNode {
		return this.getToken(asmParser.MEM_POS, 0);
	}
	public LBRACK(): TerminalNode {
		return this.getToken(asmParser.LBRACK, 0);
	}
	public const_(): ConstContext {
		return this.getTypedRuleContext(ConstContext, 0) as ConstContext;
	}
	public RBRACK(): TerminalNode {
		return this.getToken(asmParser.RBRACK, 0);
	}
    public get ruleIndex(): number {
    	return asmParser.RULE_direct;
	}
	public enterRule(listener: asmListener): void {
	    if(listener.enterDirect) {
	 		listener.enterDirect(this);
		}
	}
	public exitRule(listener: asmListener): void {
	    if(listener.exitDirect) {
	 		listener.exitDirect(this);
		}
	}
	// @Override
	public accept<Result>(visitor: asmVisitor<Result>): Result {
		if (visitor.visitDirect) {
			return visitor.visitDirect(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RegisterIndirectContext extends ParserRuleContext {
	constructor(parser?: asmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public MEM_POS(): TerminalNode {
		return this.getToken(asmParser.MEM_POS, 0);
	}
	public LBRACK(): TerminalNode {
		return this.getToken(asmParser.LBRACK, 0);
	}
	public REGISTER(): TerminalNode {
		return this.getToken(asmParser.REGISTER, 0);
	}
	public RBRACK(): TerminalNode {
		return this.getToken(asmParser.RBRACK, 0);
	}
    public get ruleIndex(): number {
    	return asmParser.RULE_registerIndirect;
	}
	public enterRule(listener: asmListener): void {
	    if(listener.enterRegisterIndirect) {
	 		listener.enterRegisterIndirect(this);
		}
	}
	public exitRule(listener: asmListener): void {
	    if(listener.exitRegisterIndirect) {
	 		listener.exitRegisterIndirect(this);
		}
	}
	// @Override
	public accept<Result>(visitor: asmVisitor<Result>): Result {
		if (visitor.visitRegisterIndirect) {
			return visitor.visitRegisterIndirect(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IndexedContext extends ParserRuleContext {
	constructor(parser?: asmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public MEM_POS(): TerminalNode {
		return this.getToken(asmParser.MEM_POS, 0);
	}
	public LBRACK(): TerminalNode {
		return this.getToken(asmParser.LBRACK, 0);
	}
	public REGISTER(): TerminalNode {
		return this.getToken(asmParser.REGISTER, 0);
	}
	public PLUS(): TerminalNode {
		return this.getToken(asmParser.PLUS, 0);
	}
	public const_(): ConstContext {
		return this.getTypedRuleContext(ConstContext, 0) as ConstContext;
	}
	public RBRACK(): TerminalNode {
		return this.getToken(asmParser.RBRACK, 0);
	}
    public get ruleIndex(): number {
    	return asmParser.RULE_indexed;
	}
	public enterRule(listener: asmListener): void {
	    if(listener.enterIndexed) {
	 		listener.enterIndexed(this);
		}
	}
	public exitRule(listener: asmListener): void {
	    if(listener.exitIndexed) {
	 		listener.exitIndexed(this);
		}
	}
	// @Override
	public accept<Result>(visitor: asmVisitor<Result>): Result {
		if (visitor.visitIndexed) {
			return visitor.visitIndexed(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RelativeContext extends ParserRuleContext {
	constructor(parser?: asmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public MEM_POS(): TerminalNode {
		return this.getToken(asmParser.MEM_POS, 0);
	}
	public LBRACK(): TerminalNode {
		return this.getToken(asmParser.LBRACK, 0);
	}
	public PC(): TerminalNode {
		return this.getToken(asmParser.PC, 0);
	}
	public PLUS(): TerminalNode {
		return this.getToken(asmParser.PLUS, 0);
	}
	public const_(): ConstContext {
		return this.getTypedRuleContext(ConstContext, 0) as ConstContext;
	}
	public RBRACK(): TerminalNode {
		return this.getToken(asmParser.RBRACK, 0);
	}
    public get ruleIndex(): number {
    	return asmParser.RULE_relative;
	}
	public enterRule(listener: asmListener): void {
	    if(listener.enterRelative) {
	 		listener.enterRelative(this);
		}
	}
	public exitRule(listener: asmListener): void {
	    if(listener.exitRelative) {
	 		listener.exitRelative(this);
		}
	}
	// @Override
	public accept<Result>(visitor: asmVisitor<Result>): Result {
		if (visitor.visitRelative) {
			return visitor.visitRelative(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BasedContext extends ParserRuleContext {
	constructor(parser?: asmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public MEM_POS(): TerminalNode {
		return this.getToken(asmParser.MEM_POS, 0);
	}
	public LBRACK(): TerminalNode {
		return this.getToken(asmParser.LBRACK, 0);
	}
	public SP(): TerminalNode {
		return this.getToken(asmParser.SP, 0);
	}
	public PLUS(): TerminalNode {
		return this.getToken(asmParser.PLUS, 0);
	}
	public const_(): ConstContext {
		return this.getTypedRuleContext(ConstContext, 0) as ConstContext;
	}
	public RBRACK(): TerminalNode {
		return this.getToken(asmParser.RBRACK, 0);
	}
    public get ruleIndex(): number {
    	return asmParser.RULE_based;
	}
	public enterRule(listener: asmListener): void {
	    if(listener.enterBased) {
	 		listener.enterBased(this);
		}
	}
	public exitRule(listener: asmListener): void {
	    if(listener.exitBased) {
	 		listener.exitBased(this);
		}
	}
	// @Override
	public accept<Result>(visitor: asmVisitor<Result>): Result {
		if (visitor.visitBased) {
			return visitor.visitBased(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConstContext extends ParserRuleContext {
	constructor(parser?: asmParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public DEC_VAL(): TerminalNode {
		return this.getToken(asmParser.DEC_VAL, 0);
	}
	public HEX_VAL(): TerminalNode {
		return this.getToken(asmParser.HEX_VAL, 0);
	}
	public BIN_VAL(): TerminalNode {
		return this.getToken(asmParser.BIN_VAL, 0);
	}
	public OCT_VAL(): TerminalNode {
		return this.getToken(asmParser.OCT_VAL, 0);
	}
	public CHAR_VAL(): TerminalNode {
		return this.getToken(asmParser.CHAR_VAL, 0);
	}
    public get ruleIndex(): number {
    	return asmParser.RULE_const;
	}
	public enterRule(listener: asmListener): void {
	    if(listener.enterConst) {
	 		listener.enterConst(this);
		}
	}
	public exitRule(listener: asmListener): void {
	    if(listener.exitConst) {
	 		listener.exitConst(this);
		}
	}
	// @Override
	public accept<Result>(visitor: asmVisitor<Result>): Result {
		if (visitor.visitConst) {
			return visitor.visitConst(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
