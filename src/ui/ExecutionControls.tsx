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
        display: "flex",
        gap: 8,
      }}
    >
      <button onClick={onAssemble}>Assemble</button>

      <button onClick={onRun} disabled={!assembled}>
        Run
      </button>

      <button onClick={onStep} disabled={!assembled}>
        Step
      </button>

      <button onClick={onReset} disabled={!assembled}>
        Reset
      </button>
    </div>
  );
}
