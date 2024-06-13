import type { ChatForm } from '@/types'
import type { InitProgressReport } from '@mlc-ai/web-llm'
import { CrossCircledIcon } from '@radix-ui/react-icons'
import type { FieldErrors } from 'react-hook-form'
import { CardFooter } from '../ui/card'

type Props = {
  errors: FieldErrors<ChatForm>
  progress: InitProgressReport
}

export const ChatErrors = ({ errors, progress }: Props) => {
  return (
    <CardFooter className="flex justify-between items-center">
      {progress && (
        <div className="flex items-center">
          <p className="text-xs text-gray-400">{progress.text}</p>
        </div>
      )}
      {errors.content && (
        <div className="flex gap-1 items-center">
          <CrossCircledIcon className="w-4 h-4 text-red-500" />
          <p className="text-xs text-red-500">{errors.content?.message}</p>
        </div>
      )}
    </CardFooter>
  )
}
