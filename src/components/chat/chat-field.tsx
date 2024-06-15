import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CardHeader } from '@/components/ui/card'
import { Chat } from '@/types'
import React from 'react'
import { Spinner } from '../spinner'
import { ChatPanel } from './chat-panel'

type Props = {
  chatData: Chat[]
  loading: boolean
}

export function ChatField({ chatData, loading }: Props) {
  const scrollRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [chatData])

  return (
    <CardHeader
      className="space-y-5 h-[700px] max-h-[700px] overflow-y-auto"
      ref={scrollRef}
    >
      <article className="flex items-center gap-2 pb-1">
        <Avatar>
          <AvatarImage
            src="https://cdn.icon-icons.com/icons2/1371/PNG/512/robot02_90810.png"
            alt="Avatar"
          />
          <AvatarFallback>USER</AvatarFallback>
        </Avatar>
        <h2 className="font-bold">AI Assistant</h2>
      </article>

      {loading ? (
        <Spinner />
      ) : (
        chatData.map((data, i) => (
          <ChatPanel
            key={i}
            data={data}
          />
        ))
      )}
    </CardHeader>
  )
}
