export function CodeEditor() {
  return (
    <div style={{ border: '1px solid #ccc', padding: 12 }}>
      <h3>Code Editor</h3>
      <textarea style={{ width: '100%', height: 200 }} defaultValue="//write code here" />
    </div>
  )
}
