import Editor from "@monaco-editor/react";
import { registerAsmLanguage } from "../utils/registerAsmLanguage";

interface AssemblyEditorProps {
  source: string;
  onChange: (value: string) => void;
}

export function AssemblyEditor({ source, onChange }: AssemblyEditorProps) {
  return (
    <Editor
      height="500px"
      defaultLanguage="asm"
      beforeMount={(monaco) => {
        registerAsmLanguage(monaco);
      }}
      value={source}
      onChange={(value) => onChange(value ?? "")}
      options={{
        minimap: {
          enabled: false,
        },
        fontSize: 14,
        lineNumbers: "on",
        roundedSelection: false,
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2,
      }}
    />
  );
}
