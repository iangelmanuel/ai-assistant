import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { INITIAL_VALUES } from '@/const/initials-values'
import { engineCreateChat } from '@/handlers/engine-create-chat'
import { cn } from '@/lib/utils'
import { ChatScheme } from '@/scheme'
import type { ChatForm, Chat as ChatType } from '@/types'
import type { InitProgressReport, MLCEngine } from '@mlc-ai/web-llm'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { ChatErrors } from './chat-errors'
import { ChatField } from './chat-field'
import { ChatInput } from './chat-input'

type Props = {
  engine: MLCEngine | undefined
  loading: boolean
  progress: InitProgressReport
}

export function Chat({ engine, loading, progress }: Props) {
  const [chatData, setChatData] = React.useState<ChatType[]>([])
  const [contentChunk, setContentChunk] = React.useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ChatForm>({
    defaultValues: INITIAL_VALUES
  })

  const onSendMessage = async (formData: ChatForm) => {
    const data: ChatType = {
      role: 'user',
      content: formData.content
    }
    reset()
    const result = ChatScheme.safeParse(data)

    if (!result.success) {
      toast.error('An error has ocurred', {
        description: result.error.issues
          .map((issue) => issue.message)
          .join(', '),
        position: 'top-right',
        duration: 5000
      })
      return
    }
    setChatData([...chatData, result.data])

    const sendDataToEngine = {
      engine,
      chatData
    }
    const reply = await engineCreateChat(sendDataToEngine)

    if (!reply) return
    setContentChunk(reply)
    const botMessage: ChatType = {
      role: 'system',
      content: contentChunk
    }
    setChatData((prevState) => [...prevState, botMessage])
  }

  const isProgress =
    progress.text.startsWith('Loading') ||
    progress.text.startsWith('Start to fetch')

  return (
    <section className="max-w-screen-sm mx-auto my-5">
      <form onSubmit={handleSubmit(onSendMessage)}>
        <Card className={cn(errors.content && 'border-red-500')}>
          <ChatField
            chatData={chatData}
            contentChunk={contentChunk}
            loading={loading}
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
