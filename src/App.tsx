import { INITIAL_PROGRESS_VALUES } from '@/const/initials-values'
import { initEngine } from '@/handlers/init-engine'
import type { InitProgressReport, MLCEngine } from '@mlc-ai/web-llm'
import React from 'react'
import { Chat } from './components/chat/chat'
import { Footer } from './components/footer'
import { Header } from './components/header'

export default function App() {
  const [loading, setLoading] = React.useState(true)
  const [progress, setProgress] = React.useState<InitProgressReport>(
    INITIAL_PROGRESS_VALUES
  )
  const [engine, setEngine] = React.useState<MLCEngine | undefined>(undefined)

  React.useEffect(() => {
    const initSessionEngine = async () => {
      const engineResult = await initEngine({
        initProgressCallback: (progress) => {
          setProgress(progress)
        }
      })
      setEngine(engineResult)
      setLoading(false)
    }
    initSessionEngine()
  }, [])

  return (
    <>
      <Header />
      <main className="w-full h-[100dvh]">
        <Chat
          loading={loading}
          progress={progress}
          engine={engine}
        />
      </main>
      <Footer />
    </>
  )
}
