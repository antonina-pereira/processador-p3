export function CodeControls() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }}
      >
      <button>Upload a file</button>
      <button>Select a demo</button>
      <button>Download as Text (.as)</button>
    </div>
  )
}
