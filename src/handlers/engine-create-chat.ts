import type { Chat } from '@/types'
import type { MLCEngine } from '@mlc-ai/web-llm'
import { toast } from 'sonner'

type EngineCreteChatType = {
  engine: MLCEngine | undefined
  chatData: Chat[]
}

export async function engineCreateChat({
  engine,
  chatData
}: EngineCreteChatType) {
  try {
    if (!engine) return

    const reply = await engine.chat.completions.create({
      messages: chatData
    })
    const result = reply.choices[0].message.content
    return result
  } catch (error) {
    toast.error('An error has ocurred', {
      description: 'No choices were found',
      duration: 5000,
      position: 'top-right'
    })
  }
}
