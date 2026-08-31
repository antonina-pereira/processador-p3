// Diagnostic.ts
// Provides a framework to provide useful diagnostics to the user

export interface Diagnostic {
  line: number;
  column: number;
  message: string;
}
