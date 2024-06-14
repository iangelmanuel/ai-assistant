import type { Chat } from '@/types'
import type { MLCEngine } from '@mlc-ai/web-llm'
import { toast } from 'sonner'

type EngineCreteChatType = {
  engine: MLCEngine | undefined
  data: Chat
  chatData: Chat[]
}

export async function engineCreateChat({
  engine,
  data,
  chatData
}: EngineCreteChatType) {
  if (!engine) return

  try {
    const reply = await engine.chat.completions.create({
      messages: [...chatData, data]
    })
    return reply.choices[0].message.content
  } catch (error) {
    console.log(error)
    return toast.error('An error has ocurred', {
      description: 'Error creating chat',
      duration: 5000,
      position: 'top-right'
    })
  }
}
