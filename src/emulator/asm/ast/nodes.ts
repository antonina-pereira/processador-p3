// nodes.ts
// defines all the nodes in the AST

export interface AstNode {
  line: number;
  column: number;
}

export interface ProgramNode extends AstNode {
  statements: StatementNode[];
}

export type StatementNode = InstructionNode | DirectiveNode;

export interface LabelDefinitionNode extends AstNode {
  name: string;
}

export interface LabelReferenceNode extends AstNode {
  type: "LABEL_REFERENCE";
  name: string;
}

export type OperandNode =
  | ConstantNode
  | LabelReferenceNode
  | RegisterNode
  | ConstantNode
  | DirectNode
  | RegisterIndirectNode
  | IndexedNode
  | RelativeNode
  | BasedNode;

export interface ConstantNode extends AstNode {
  type: "CONSTANT";
  value: number;
}

export interface RegisterNode extends AstNode {
  register: string; // this will include SP that is separate in the grammar
}

export interface ImmediateNode extends AstNode {
  value: ConstantNode;
}

export interface DirectNode extends AstNode {
  address: ConstantNode;
}

export interface RegisterIndirectNode extends AstNode {
  register: RegisterNode;
}

export interface IndexedNode extends AstNode {
  register: RegisterNode;
  offset: ConstantNode;
}

export interface RelativeNode extends AstNode {
  offset: ConstantNode;
}

export interface BasedNode extends AstNode {
  offset: ConstantNode;
}

export interface InstructionNode extends AstNode {
  label?: LabelDefinitionNode;
  mnemonic: string;
  condition?: Condition;
  operands: OperandNode[];
}

export type Condition =
  | "C"
  | "NC"
  | "N"
  | "NN"
  | "O"
  | "NO"
  | "Z"
  | "NZ"
  | "I"
  | "NI"
  | "P"
  | "NP";

export type DirectiveNode =
  | OrigDirNode
  | EquDirNode
  | WordDirNode
  | StrDirNode
  | TabDirNode;

export interface OrigDirNode extends AstNode {
  type: "ORIG";
  address: ConstantNode | LabelReferenceNode;
}

export interface EquDirNode extends AstNode {
  type: "EQU";
  symbol: LabelDefinitionNode;
  value: ConstantNode;
}

export interface WordDirNode extends AstNode {
  type: "WORD";
  label: LabelDefinitionNode;
  value: ConstantNode;
}

export interface StrDirNode extends AstNode {
  type: "STR";
  label: LabelDefinitionNode;
  values: StrElementNode[];
}

export type StrElementNode = StringNode | ConstantNode;

export interface StringNode extends AstNode {
  value: string;
}

export interface TabDirNode extends AstNode {
  type: "TAB";
  label: LabelDefinitionNode;
  value: ConstantNode;
}
