import { useState } from "react";

import "./App.css";

import { emulatorSession } from "./emulator-session";

import { AppLayout } from "./ui/AppLayout";
import { Header } from "./ui/Header";
import { AssemblyEditor } from "./ui/AssemblyEditor";
import type { ConsoleMessage } from "./ui/console-message";
import { Console } from "./ui/Console";
import { ExecutionControls } from "./ui/ExecutionControls";
import { CpuStatePanel } from "./ui/CpuStatePanel";
import { ProgramView } from "./ui/ProgramView";
import { MemoryView } from "./ui/MemoryView";

export default function App() {
  const [source, setSource] = useState(`MOV R1, 2\nMOV R2, 3\nADD R1, R2`); // preloaded assembly program

  const [state, setState] = useState(emulatorSession.getState());

  const [consoleMessages, setConsoleMessages] = useState<ConsoleMessage[]>([]);

  const [assembled, setAssembled] = useState(false);

  // For the Assemble button in the UI
  const handleAssemble = () => {
    try {
      const result = emulatorSession.assemble(source);

      const messages: ConsoleMessage[] = result.diagnostics.map((d) => ({
        type: "error",
        text: d.message,
        line: d.line,
      }));

      console.log("Diagnostics:", result.diagnostics);

      if (result.diagnostics.length > 0) {
        setConsoleMessages(messages);
        setAssembled(false);
        return;
      }

      messages.push({
        type: "info",
        text: "Assembly successful.",
      });

      setConsoleMessages(messages);

      emulatorSession.load(result.code);
      setState(emulatorSession.getState());
      setAssembled(true);
    } catch (error) {
      console.error(error);
    }
  };

  // For the Step button in the UI
  const handleStep = () => {
    emulatorSession.step();
    const s = emulatorSession.getState();
    console.log("STATE", s);
    console.log("REGISTERS", s.registers);
    setState(s);
  };

  // For the Run button in the UI
  const handleRun = () => {
    emulatorSession.run();
    setState(emulatorSession.getState());
  };

  // For the Reset button in the UI
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
    <>
      <Header />
      <AppLayout
        // Assembly code editor
        editor={<AssemblyEditor source={source} onChange={setSource} />}
        controls={
          <ExecutionControls
            assembled={assembled}
            onAssemble={handleAssemble}
            onStep={handleStep}
            onRun={handleRun}
            onReset={handleReset}
          />
        }
        // Console to convey messages to the user
        console={<Console messages={consoleMessages} />}
        // Panel to show the state of the registers and flags
        state={
          <CpuStatePanel
            registers={state.registers}
            flags={state.flags}
            emulatorSession={emulatorSession}
            refreshState={() => setState(emulatorSession.getState())}
          />
        }
        // View of the program instructions
        program={<ProgramView state={state} />}
        // View of the memory addresses
        memory={
          <MemoryView
            memory={state.memory}
            emulatorSession={emulatorSession}
            setState={setState}
          />
        }
      />
    </>
  );
}
