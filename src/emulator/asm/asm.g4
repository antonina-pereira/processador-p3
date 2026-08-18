// asm.g4
// Lexer and parser rules to be used with ANTLR

grammar asm;

// ======================
// PARSER RULES
// ======================

// A program consists of a series of statements
program
    : statement* EOF ;

// Statements can be instructions or directives (pseudo-instructions)
statement
    : instruction
    | directive
    ;

/* Instructions */
instruction
    : (ID COLON)? instructionFormat
    ;

instructionFormat
    : zeroOpInst
    | zeroOpValueInst
    | oneOpInst
    | oneOpValueInst
    | twoOpInst
    | jmpInst
    ;

// Instructions are defined by their format
zeroOpInst
  : zeroOpMnemonic
  ;

zeroOpMnemonic
  : NOP
  | ENI
  | DSI
  | STC
  | CLC
  | CMC
  | RET
  | RTI
  ;

zeroOpValueInst
  : zeroOpValueMnemonic const
  ;

zeroOpValueMnemonic
  : RETN
  | INT
  ;

oneOpInst
  : oneOpMnemonic (address | ID)
  ;

oneOpMnemonic
  : NEG
  | INC
  | DEC
  | COM
  | PUSH
  | POP
  ;

oneOpValueInst
  : oneOpValueMnemonic (address | ID) COMMA const
  ;

oneOpValueMnemonic
  : SHR
  | SHL
  | SHRA
  | SHLA
  | ROR
  | ROL
  | RORC
  | ROLC
  ;

twoOpInst
  : twoOpMnemonic (address | ID) COMMA (address | ID)
  ;

twoOpMnemonic
  : CMP
  | ADD
  | ADDC
  | SUB
  | SUBB
  | MUL
  | DIV
  | TEST
  | AND
  | OR
  | XOR
  | MOV
  | MVBL
  | MVBH
  | XCH
  ;

jmpInst
  : jmpMnemonic (DOT COND)? (address | ID) 
  ;

jmpMnemonic
  : JMP
  | CALL
  | BR
  ;

/* Directives */
directive
  : origDirective
  | equDirective
  | wordDirective
  | strDirective
  | tabDirective
  ;

origDirective
  : ORIG (const | ID)
  ;

equDirective
  : ID EQU const
  ;

wordDirective
  : ID WORD const
  ;

strDirective
  : ID STR strDirectiveElement (COMMA strDirectiveElement)*
  ;

strDirectiveElement
  : STRING
  | const
  ;

tabDirective
  : ID TAB const
  ;

/* Addressing */
address
    : register
    | SP
    | immediate
    | direct
    | registerIndirect
    | indexed
    | relative
    | based
    ;

register
  : REGISTER
  ;

immediate
  : const
  ;

direct
  : MEM_POS LBRACK const RBRACK
  ;

registerIndirect
  : MEM_POS LBRACK REGISTER RBRACK
  ;

indexed
  : MEM_POS LBRACK REGISTER PLUS const RBRACK
  ;

relative
  : MEM_POS LBRACK PC PLUS const RBRACK
  ;

based
  : MEM_POS LBRACK SP PLUS const RBRACK
  ;

/* Constants */
const
    : DEC_VAL
    | HEX_VAL
    | BIN_VAL
    | OCT_VAL
    | CHAR_VAL
    ;

// ======================
// LEXER RULES
// ======================

/* Keywords */
// Instructions (opcodes)
ADD     : 'ADD' ;
ADDC    : 'ADDC' ;
AND     : 'AND' ;
BR      : 'BR' ;
CALL    : 'CALL' ;
CLC     : 'CLC' ;
CMC     : 'CMC' ;
CMP     : 'CMP' ;
COM     : 'COM' ;
DEC     : 'DEC' ;
DIV     : 'DIV' ;
DSI     : 'DSI' ;
ENI     : 'ENI' ;
INC     : 'INC' ;
INT     : 'INT' ;
JMP     : 'JMP' ;
MOV     : 'MOV' ;
MUL     : 'MUL' ;
MVBH    : 'MVBH' ;
MVBL    : 'MVBL' ;
NEG     : 'NEG' ;
NOP     : 'NOP' ;
OR      : 'OR' ;
POP     : 'POP' ;
PUSH    : 'PUSH' ;
RET     : 'RET' ;
RETN    : 'RETN' ;
ROL     : 'ROL' ;
ROLC    : 'ROLC' ;
ROR     : 'ROR' ;
RORC    : 'RORC' ;
RTI     : 'RTI' ;
SHL     : 'SHL' ;
SHLA    : 'SHLA' ;
SHR     : 'SHR' ;
SHRA    : 'SHRA' ;
STC     : 'STC' ;
SUB     : 'SUB' ;
SUBB    : 'SUBB' ;
TEST    : 'TEST' ;
XCH     : 'XCH' ;
XOR     : 'XOR' ;

// Pseudo-instructions (directives)
ORIG    : 'ORIG' ;
EQU     : 'EQU' ;
WORD    : 'WORD' ;
STR     : 'STR' ;
TAB     : 'TAB' ;

/* Addressing */
// RE is not included because the programmer cannot change it directly
REGISTER  : 'R' [0-7] ;
MEM_POS   : 'M' ;        // Type M[y], references the position in memory with address y
PC        : 'PC' ;       // Program counter
SP        : 'SP' ;       // Stack pointer

/* Conditions */
COND      : 'C' | 'NC'
          | 'N' | 'NN'
          | 'O' | 'NO'
          | 'Z' | 'NZ'
          | 'I' | 'NI'
          | 'P' | 'NP'
          ;

/* Punctuation */
COMMA     : ',' ;
COLON     : ':' ;
SEMICOLON : ';' ;
LBRACK    : '[' ;
RBRACK    : ']' ;
DOT       : '.' ;
PLUS      : '+' ;
MINUS     : '-' ;

/* Identifier */
ID        : [a-zA-Z_][a-zA-Z0-9_]* ;

/* Immediate values */
DEC_VAL   : MINUS? [0-9]+ 'd'? ;
HEX_VAL   : MINUS? [0-9A-Fa-f]+ 'h' ;
BIN_VAL   : MINUS? [0-1]+ 'b' ;
OCT_VAL   : MINUS? [0-7]+ 'o' ;
CHAR_VAL  : '\'' ~['\r\n] '\'' ;

/* Strings */
STRING    : '\'' ~['\r\n]+ '\'' ;

/* Comments and whitespace */
WS      : [ \t\r\n]+ -> skip ;
COMMENT : SEMICOLON ~[\r\n]* -> skip ;
