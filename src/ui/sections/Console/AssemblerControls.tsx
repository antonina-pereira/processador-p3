// AssemblerCOntrols.tsx
// Assembles source code into machine code

interface AssemblerControlsProps {
  onAssemble: () => void;
  assembling?: boolean;
}

export function AssemblerControls({
  onAssemble,
  assembling = false,
}: AssemblerControlsProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <button onClick={onAssemble} disabled={assembling}>
        {assembling ? "Assembling..." : "Assemble"}
      </button>
    </div>
  );
}
