import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline } from '@mui/material'

import TaskProvider from './context/TaskProvider.tsx'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TaskProvider>
      <CssBaseline />
      <App />
    </TaskProvider>
  </StrictMode>,
)
