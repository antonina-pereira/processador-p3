import type { CpuState } from "../emulator/cpu/cpu-state";

interface ProgramViewProps {
  state: CpuState;
}

export function ProgramView({ state }: ProgramViewProps) {
  const currentPc = state.registers.PC;

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: 8,
        minHeight: 300,
        overflowY: "auto",
      }}
    >
      <h3>Program</h3>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th align="left">Addr</th>
            <th align="left">Instruction</th>
          </tr>
        </thead>

        <tbody>
          {state.listing.map((line, index) => (
            <tr
              key={index}
              style={{
                backgroundColor:
                  line.address === currentPc ? "#fff3cd" : "transparent",
                fontWeight: line.address === currentPc ? "bold" : "normal",
              }}
            >
              <td>{line.address}</td>
              <td>{line.source}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
