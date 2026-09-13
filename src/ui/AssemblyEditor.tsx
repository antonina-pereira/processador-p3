import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";

interface AssemblyEditorProps {
  source: string;
  onChange: (value: string) => void;
}

export function AssemblyEditor({ source, onChange }: AssemblyEditorProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        flex: 1,
        minHeight: 0,
        minWidth: 0,
        background: "red",
      }}
    >
      <CodeMirror
        value={source}
        height="100%"
        width="100%"
        theme={oneDark}
        basicSetup={{
          lineNumbers: true,
          foldGutter: false,
        }}
        onChange={(value) => onChange(value)}
      />
    </div>
  );
}
