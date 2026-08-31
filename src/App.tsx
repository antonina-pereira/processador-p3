import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

import { AppLayout } from "./ui/layout/AppLayout";
import { Header } from "./ui/sections/Header/Header";
import { CodeEditor } from "./ui/sections/CodeEditor/CodeEditor";
import { CodeControls } from "./ui/sections/CodeEditor/CodeControls";
import { Console } from "./ui/sections/Console/Console";
import { AssemblerControls } from "./ui/sections/Console/AssemblerControls";
import { MemoryView } from "./ui/sections/Memory/MemoryView";
import { ExecutionControls } from "./ui/sections/Memory/ExecutionControls";
import { ExecutionStats } from "./ui/sections/Memory/ExecutionStats";

import { assemble } from "./emulator/asm/assembler";
import type { Diagnostic } from "./emulator/asm/semantic/Diagnostic";

export default function App() {
  const [source, setSource] = useState(`COUNT WORD 0
                                        Loop:
                                          ADD R1, R2`);
  const [code, setCode] = useState<number[]>([]);
  const [diagnostics, setDiagnostics] = useState<Diagnostic[]>([]);

  const completeAssemble = () => {
    try {
      const result = assemble(source);

      setCode(result.code);
      setDiagnostics(result.diagnostics);
    } catch (error) {
      console.error(error);

      setDiagnostics([
        {
          line: 0,
          column: 0,
          message:
            error instanceof Error ? error.message : "Unknown assembly error.",
        },
      ]);

      setCode([]);
    }
  };

  return (
    <AppLayout>
      <Header />

      <div style={{ display: "flex", gap: 16 }}>
        <div style={{ flex: 1 }}>
          <CodeEditor value={source} onChange={setSource} />
        </div>

        <div style={{ width: 100 }}>
          <CodeControls />
        </div>
      </div>

      <div style={{ display: "flex", gap: 16 }}>
        <div style={{ flex: 1 }}>
          <Console diagnostics={diagnostics} />
        </div>

        <div style={{ width: 100 }}>
          <AssemblerControls onAssemble={completeAssemble} />
        </div>
      </div>

      <div style={{ display: "flex", gap: 16 }}>
        <div style={{ flex: 1 }}>
          <MemoryView code={code} />
        </div>

        <div style={{ width: 100 }}>
          <ExecutionControls />
          <ExecutionStats />
        </div>
      </div>
    </AppLayout>
  );
}
