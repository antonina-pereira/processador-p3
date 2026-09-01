interface CpuStatePanelProps {
  registers: Record<string, number>;
  flags: Record<string, boolean>;
}

export function CpuStatePanel({ registers, flags }: CpuStatePanelProps) {
  return (
    <div className="border rounded p-3">
      <h3>Flags</h3>

      <div>
        {Object.entries(flags).map(([name, value]) => (
          <div key={name}>
            <strong>{name}</strong>: {value ? "true" : "false"}
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: "1rem" }}>Registers</h3>

      <div>
        {Object.entries(registers).map(([name, value]) => (
          <div key={name}>
            <strong>{name}</strong>: 0x
            {value.toString(16).toUpperCase().padStart(4, "0")}
          </div>
        ))}
      </div>
    </div>
  );
}
