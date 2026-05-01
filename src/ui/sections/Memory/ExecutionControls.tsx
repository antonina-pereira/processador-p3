export function ExecutionControls() {
  return (
    <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }}
    >
      <button>Run</button>
      <button>Step</button>
      <button>Stop</button>
      <button>Reset</button>
    </div>
  )
}
