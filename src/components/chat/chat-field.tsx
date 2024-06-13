import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CardHeader } from '@/components/ui/card'
import { Chat } from '@/types'

type Props = {
  chatData: Chat[]
  contentChunk: string
}

export function ChatField({ chatData, contentChunk }: Props) {
  return (
    <CardHeader className="space-y-5 h-[800px] max-h-[800px] overflow-y-auto">
      <div className="flex items-center gap-2 pb-1">
        <Avatar>
          <AvatarImage
            src="https://cdn.icon-icons.com/icons2/1371/PNG/512/robot02_90810.png"
            alt="Avatar"
          />
          <AvatarFallback>USER</AvatarFallback>
        </Avatar>
        <h2 className="font-bold">AI Assistant</h2>
      </div>

      {chatData.map((data, i) => (
        <article
          key={`messages-${i}-${data.role}-${data.content}`}
          className={`flex flex-col gap-y-2 ${data.role === 'user' ? 'items-end' : 'items-start'}`}
        >
          <Avatar>
            <AvatarImage
              src={
                data.role === 'user'
                  ? 'https://github.com/iangelmanuel.png'
                  : 'https://cdn.icon-icons.com/icons2/1371/PNG/512/robot02_90810.png'
              }
              alt="Avatar"
            />
            <AvatarFallback>USER</AvatarFallback>
          </Avatar>

          <div className="w-[800px]">
            <p
              className={`${data.role === 'user' ? 'bg-sky-600 dark:bg-primary text-white text-end' : 'bg-gray-300 dark:bg-secondary'} py-2 px-5 rounded-xl`}
            >
              {data.content ? data.content : contentChunk}
            </p>
          </div>
        </article>
      ))}
    </CardHeader>
  )
}
