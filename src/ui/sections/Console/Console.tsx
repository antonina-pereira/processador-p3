// ui/sections/Console/Console.tsx

function Console({ diagnostics }: { diagnostics: Diagnostic[] }) {
  return (
    <div>
      {diagnostics.length === 0 ? (
        <div>No errors.</div>
      ) : (
        diagnostics.map((d, index) => (
          <div key={index}>
            Line {d.line}: {d.message}
          </div>
        ))
      )}
    </div>
  );
}
