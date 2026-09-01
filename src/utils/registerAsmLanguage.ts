import type * as monaco from "monaco-editor";

export function registerAsmLanguage(monacoInstance: typeof monaco) {
  monacoInstance.languages.register({
    id: "asm",
  });
  monacoInstance.languages.setMonarchTokensProvider("asm", {
    tokenizer: {
      root: [],
    },
  });
}
