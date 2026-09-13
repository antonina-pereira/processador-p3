// ExecutionControls.tsx

interface ExecutionControlsProps {
  assembled: boolean;
  onAssemble: () => void;
  onStep: () => void;
  onRun: () => void;
  onReset: () => void;
}

export function ExecutionControls({
  assembled,
  onAssemble,
  onStep,
  onRun,
  onReset,
}: ExecutionControlsProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 8,
        height: "100%",
        width: "100%",
      }}
    >
      <button
        onClick={onAssemble}
        style={{ height: "100%", width: "100%", fontSize: "20px" }}
      >
        Assemble
      </button>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          height: "100%",
        }}
      >
        <button
          onClick={onRun}
          disabled={!assembled}
          style={{ flex: 1, fontSize: "20px" }}
        >
          Run
        </button>

        <button
          onClick={onStep}
          disabled={!assembled}
          style={{ flex: 1, fontSize: "20px" }}
        >
          Step
        </button>

        <button
          onClick={onReset}
          disabled={!assembled}
          style={{ flex: 1, fontSize: "20px" }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
