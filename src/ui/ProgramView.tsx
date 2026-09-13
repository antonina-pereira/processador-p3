import type { CpuState } from "../emulator/cpu/cpu-state";
import type { ProgramLine } from "../emulator/program-line";

interface EmulatorState extends CpuState {
  listing: ProgramLine[];
}

interface ProgramViewProps {
  state: EmulatorState;
}

// Shows the list of instructions of the assembled program
// Updates 3 markers to show the previously executed instrcution, the current instruction and the next instruction
// To be reviewed by the user when clicking step
export function ProgramView({ state }: ProgramViewProps) {
  const { listing } = state; // User written instructions
  const pc = state.registers.PC; // Program counter

  const nextIndex = listing.findIndex((line) => line.address === pc);
  let currentIndex = -1;

  for (let i = 0; i < listing.length; i++) {
    const current = listing[i];
    const next = listing[i + 1];

    if (pc >= current.address && (!next || pc < next.address)) {
      currentIndex = i;
      break;
    }
  }

  return (
    <div className="rounded border p-2">
      <h3>Program</h3>

      <div className="font-mono text-sm">
        {listing.map((line, index) => {
          const isCurrent = index === currentIndex;
          const isNext = index === nextIndex;
          const isExecuted = nextIndex !== -1 && index < currentIndex;

          let marker = " ";

          if (isExecuted) marker = "✓";
          else if (isCurrent) marker = "▶";
          if (isNext && !isCurrent) marker = "→";

          return (
            <div
              key={`${line.address}-${index}`}
              className={`flex gap-2 px-2 py-1 rounded ${
                isCurrent
                  ? "bg-blue-600 text-white"
                  : isNext
                    ? "bg-yellow-100"
                    : isExecuted
                      ? "text-gray-500"
                      : ""
              }`}
            >
              <span className="w-4">{marker}</span>
              <span className="w-12 text-right">
                {line.address.toString(16).toUpperCase().padStart(4, "0")}
              </span>
              <span className="w-4 text-center">: </span> 
              <span className="flex-1">{line.source}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
