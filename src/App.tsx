import { Chat } from './components/chat/chat'
import { Footer } from './components/footer'
import { Header } from './components/header'

export default function App() {
  return (
    <>
      <Header />
      <main className="grid grid-cols-1 max-w-screen-xl mx-auto place-content-center w-full h-[100dvh]">
        <Chat />
      </main>
      <Footer />
    </>
  )
}
