export function MemoryView() {
  const mockMemory = Array.from({ length: 16 }, (_, i) => i * 3)

  return (
    <div style={{ border: '1px solid #ccc', padding: 12 }}>
      <h3>Memory</h3>
      {mockMemory.map((v, i) => (
        <div key={i}>0x{i.toString(16).padStart(4, '0')}: {v}</div>
      ))}
    </div>
  )
}
