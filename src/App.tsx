import { Chat } from './components/chat/chat'
import { Footer } from './components/footer'
import { Header } from './components/header'

export default function App() {
  return (
    <>
      <Header />
      <main className="w-full h-[100dvh]">
        <Chat />
      </main>
      <Footer />
    </>
  )
}
