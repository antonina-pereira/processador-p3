import type { CpuState } from "../emulator/cpu/cpu-state";

interface MemoryViewProps {
  state: CpuState;
}

export function MemoryView({ state }: MemoryViewProps) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: 8,
        minHeight: 300,
        overflowY: "auto",
      }}
    >
      <h3>Memory</h3>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th align="left">Address</th>
            <th align="left">Value</th>
          </tr>
        </thead>

        <tbody>
          {state.memory.map((value, address) => (
            <tr key={address}>
              <td>{address}</td>
              <td>{value.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
