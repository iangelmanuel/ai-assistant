import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import type { Chat } from '@/types'

type Props = {
  data: Chat
  contentChunk: string
}

export function ChatPanel({ data, contentChunk }: Props) {
  return (
    <article
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
        <AvatarFallback>YOU</AvatarFallback>
      </Avatar>

      <div className="w-[500px]">
        <p
          className={`${data.role === 'user' ? 'bg-sky-600 dark:bg-primary text-white text-end' : 'bg-gray-300 dark:bg-secondary'} py-2 px-5 rounded-xl`}
        >
          {data.content ? data.content : contentChunk}
        </p>
      </div>
    </article>
  )
}
