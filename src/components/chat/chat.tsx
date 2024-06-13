import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { INITIAL_VALUES } from '@/const/form-default-value'
import { INITIAL_PROGRESS_VALUES } from '@/const/initial-progress-values'
import { sendMessageHandler } from '@/handlers/send-message-handler'
import { cn } from '@/lib/utils'
import type { ChatForm, Chat as ChatType } from '@/types'
import type { InitProgressReport, MLCEngine } from '@mlc-ai/web-llm'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { ChatErrors } from './chat-errors'
import { ChatField } from './chat-field'
import { ChatInput } from './chat-input'

export function Chat() {
  const [chatData, setChatData] = React.useState<ChatType[]>([])
  const [engine, setEngine] = React.useState<MLCEngine | undefined>(undefined)
  const [progress, setProgress] = React.useState<InitProgressReport>(
    INITIAL_PROGRESS_VALUES
  )
  const [contentChunk, setContentChunk] = React.useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ChatForm>({
    defaultValues: INITIAL_VALUES
  })

  const sendMessage = async (formData: ChatForm) => {
    const data: ChatType = {
      role: 'user',
      content: formData.content
    }
    setChatData([...chatData, data])
    reset()
    await engineHandler(data)
  }

  const engineHandler = async (data: ChatType) => {
    if (!engine) {
      const result = await sendMessageHandler(data, {
        initProgressCallback: (initProgress) => setProgress(initProgress)
      })
      if (result.ok && result.engine) {
        setEngine(result.engine)
        toast.success('Engine loaded', {
          description: 'Engine loaded successfully.',
          duration: 5000,
          position: 'top-right'
        })
      } else {
        toast.error('Error loading engine', {
          description:
            'Something went wrong loading the engine, please try again later.',
          duration: 5000,
          position: 'top-right'
        })
      }
    } else {
      setContentChunk('')
      const messages = chatData.map((message) => ({
        role: message.role,
        content: message.content
      }))

      const reply = await engine?.chat.completions.create({ messages })

      reply.choices.forEach((choice) => {
        const content = choice.message.content ?? ''
        setContentChunk(content)
      })

      /* for await (const chunk of chunks) {
        const choice = chunk.choices[0]
        const content = choice?.delta?.content ?? ''
        setContentChunk((prevState) => [...prevState, content])
      } */

      const botMessage: ChatType = {
        role: 'system',
        content: contentChunk
      }
      setChatData([...chatData, botMessage])
    }
  }
  const isProgress =
    progress.text.startsWith('Loading') ||
    progress.text.startsWith('Start to fetch')

  return (
    <section>
      <form onSubmit={handleSubmit(sendMessage)}>
        <Card className={cn(errors.content && 'border-red-500')}>
          <ChatField
            chatData={chatData}
            contentChunk={contentChunk}
          />

          <ChatInput
            register={register}
            errors={errors}
            isProgress={isProgress}
          />

          <ChatErrors
            errors={errors}
            progress={progress}
          />
        </Card>
      </form>

      <div className="grid grid-cols-2 gap-2 mt-2">
        <Button
          disabled={isProgress}
          onClick={() => {
            const botMessage: ChatType = {
              role: 'system',
              content: 'Hello, you press the button! How can I help you?'
            }
            setChatData([...chatData, botMessage])
          }}
        >
          Add ia message
        </Button>
        <Button
          variant="destructive"
          disabled={isProgress}
          onClick={() => setChatData([])}
        >
          Delete Chat
        </Button>
      </div>
    </section>
  )
}
