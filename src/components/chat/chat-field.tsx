import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CardHeader } from '@/components/ui/card'
import { Chat } from '@/types'
import { Spinner } from '../spinner'
import { ChatPanel } from './chat-panel'

type Props = {
  chatData: Chat[]
  contentChunk: string
  loading: boolean
}

export function ChatField({ chatData, contentChunk, loading }: Props) {
  return (
    <CardHeader className="space-y-5 h-[700px] max-h-[700px] overflow-y-auto">
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
            contentChunk={contentChunk}
          />
        ))
      )}
    </CardHeader>
  )
}
