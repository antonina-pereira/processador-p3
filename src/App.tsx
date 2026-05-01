import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import { AppLayout } from './ui/layout/AppLayout'
import { Header } from './ui/sections/Header/Header'
import { CodeEditor } from './ui/sections/CodeEditor/CodeEditor'
import { CodeControls } from './ui/sections/CodeEditor/CodeControls'
import { Console } from './ui/sections/Console/Console'
import { AssemblerControls } from './ui/sections/Console/AssemblerControls'
import { MemoryView } from './ui/sections/Memory/MemoryView'
import { ExecutionControls } from './ui/sections/Memory/ExecutionControls'
import { ExecutionStats } from './ui/sections/Memory/ExecutionStats'
import { SensorInput } from './ui/sections/IO/SensorInput'
import { LedOutput } from './ui/sections/IO/LedOutput'
import { CpuDiagram } from './ui/sections/CpuDiagram/CpuDiagram'

export default function App() {
  return (
    <AppLayout>
      <Header />

      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1 }}>
          <CodeEditor />
        </div>

        <div style={{ width: 100 }}>
          <CodeControls />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1 }}>
          <Console />
        </div>

        <div style={{ width: 100 }}>
          <AssemblerControls />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1 }}>
          <MemoryView />
        </div>

        <div style={{ width: 100 }}>
          <ExecutionControls />
          <ExecutionStats />
        </div>
      </div>

      <SensorInput />
      <LedOutput />

      <CpuDiagram />
    </AppLayout>
  )
}
