export function AssemblerControls() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }}
      >
      <button>Assemble</button>
      <button>Run</button>
      <button>Download (.exe)</button>
    </div>
  )
}
