export function AppLayout({ children }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      padding: '16px',
      maxWidth: 1200,
      margin: '0 auto'
    }}>
      {children}
    </div>
  )
}
