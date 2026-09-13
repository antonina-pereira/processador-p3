interface AppLayoutProps {
  editor: React.ReactNode;
  controls: React.ReactNode;
  console: React.ReactNode;
  state: React.ReactNode;
  program: React.ReactNode;
  memory: React.ReactNode;
}

export function AppLayout({
  editor,
  controls,
  console,
  state,
  program,
  memory,
}: AppLayoutProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateAreas: `
          "editor controls state program"
          "editor memory memory memory"
          "console memory memory memory"
        `,
        gridTemplateColumns: "2fr 1fr 2fr 1fr",
        gridTemplateRows: "2fr 6fr 1fr",
        boxSizing: "border-box",
        gap: "16px",
        padding: "16px",
        height: "90vh",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          gridArea: "editor",
          overflow: "auto",
          minWidth: 0,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          border: "1px solid #3700fe",
          borderRadius: "8px",
        }}
      >
        {editor}
      </div>
      <div
        style={{
          gridArea: "controls",
          overflow: "auto",
          minHeight: 0,
          minWidth: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {controls}
      </div>
      <div
        style={{
          gridArea: "console",
          overflow: "auto",
          minHeight: 0,
          minWidth: 0,
          border: "1px solid #3700fe",
          borderRadius: "8px",
          padding: 8,
        }}
      >
        {console}
      </div>
      <div
        style={{
          gridArea: "state",
          overflow: "auto",
          minHeight: 0,
          minWidth: 0,
          border: "1px solid #3700fe",
          borderRadius: "8px",
          padding: 6,
        }}
      >
        {state}
      </div>
      <div
        style={{
          gridArea: "program",
          overflow: "auto",
          minHeight: 0,
          minWidth: 0,
          border: "1px solid #3700fe",
          borderRadius: "8px",
          padding: 8,
        }}
      >
        {program}
      </div>
      <div
        style={{
          gridArea: "memory",
          overflow: "auto",
          minWidth: 0,
          minHeight: 0,
          border: "1px solid #3700fe",
          borderRadius: "8px",
          padding: 8,
        }}
      >
        {memory}
      </div>
    </div>
  );
}
