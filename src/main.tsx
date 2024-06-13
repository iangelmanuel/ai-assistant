import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/providers'
import '@/styles/index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
    <Toaster richColors />
  </React.StrictMode>
)
