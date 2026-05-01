export function ExecutionStats() {
  const mockStats = {
    clockSpeed: "1 MHz",
    instructionsExecuted: 128,
    cycles: 512,
    ipc: 0.25, // instructions per cycle
    uptime: "00:00:12"
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: 8 }}>
      <h4>Execution Stats</h4>
      <div>Clock Speed: {mockStats.clockSpeed}</div>
      <div>Instructions Executed: {mockStats.instructionsExecuted}</div>
      <div>Cycles: {mockStats.cycles}</div>
      <div>IPC: {mockStats.ipc}</div>
      <div>Uptime: {mockStats.uptime}</div>
    </div>
  )
}
