import { initProgressCallback } from '@/config/mlc-ai'
import { ChatScheme } from '@/scheme'
import type { Chat } from '@/types'
import type { MLCEngineConfig } from '@mlc-ai/web-llm'
import { toast } from 'sonner'

export async function sendMessageHandler(
  data: Chat,
  initProgressConfig: MLCEngineConfig
) {
  const result = ChatScheme.safeParse(data)
  if (!result.success) {
    const errorsMessage = result.error.issues.map((issue) => issue.message)
    toast.error('An error has ocurred', {
      description: errorsMessage.join(', '),
      position: 'top-right',
      duration: 5000
    })
    return { ok: false }
  }

  try {
    const newEngine = await initProgressCallback(initProgressConfig)
    if (!newEngine) {
      return { ok: false }
    }
    return { ok: true, engine: newEngine }
  } catch (error) {
    return { ok: false }
  }
}
