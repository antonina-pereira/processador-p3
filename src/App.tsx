import { useState } from "react";
import heroImg from "./assets/hero.png";
import "./App.css";
import { AppLayout } from "./ui/AppLayout";
import { Header } from "./ui/Header";

import { AssemblyEditor } from "./ui/AssemblyEditor";
import { emulatorSession } from "./emulator-session";
import type { ConsoleMessage } from "./ui/console-message";
import { Console } from "./ui/Console";
import { ExecutionControls } from "./ui/ExecutionControls";
import { CpuStatePanel } from "./ui/CpuStatePanel";
import { ProgramView } from "./ui/ProgramView";
import { MemoryView } from "./ui/MemoryView";

export default function App() {
  const [source, setSource] = useState(`MOV R1, 2`);
  const [state, setState] = useState(emulatorSession.getState());

  const [consoleMessages, setConsoleMessages] = useState<ConsoleMessage[]>([]);

  const [assembled, setAssembled] = useState(false);

  const handleAssemble = () => {
    try {
      const result = emulatorSession.assemble(source);

      const messages: ConsoleMessage[] = result.diagnostics.map((d) => ({
        type: "error",
        text: d.message,
        line: d.line,
      }));
      if (result.diagnostics.length === 0) {
        messages.push({
          type: "info",
          text: "Assembly successful.",
        });
        setConsoleMessages(messages);
        setAssembled(true);
      }

      emulatorSession.load(result.code);
      setState(emulatorSession.getState());
    } catch (error) {
      console.error(error);
    }
  };

  const handleStep = () => {
    emulatorSession.step();
    const s = emulatorSession.getState();
    console.log("STATE", s);
    console.log("REGISTERS", s.registers);
    setState(s);
  };

  const handleRun = () => {
    emulatorSession.run();
    setState(emulatorSession.getState());
  };

  const handleReset = () => {
    emulatorSession.reset();
    setConsoleMessages([
      {
        type: "info",
        text: "System reset.",
      },
    ]);
    setState(emulatorSession.getState());
  };

  return (
    <AppLayout>
      <Header />
      <AssemblyEditor source={source} onChange={setSource} />
      <ExecutionControls
        assembled={assembled}
        onAssemble={handleAssemble}
        onStep={handleStep}
        onRun={handleRun}
        onReset={handleReset}
      />
      <Console messages={consoleMessages} />
      <CpuStatePanel registers={state.registers} flags={state.flags} />
      <ProgramView state={state} />
      <MemoryView state={state} />
    </AppLayout>
  );
}
