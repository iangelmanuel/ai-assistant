import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import type { ChatForm } from '@/types'
import type { FieldErrors, UseFormRegister } from 'react-hook-form'

type Props = {
  register: UseFormRegister<ChatForm>
  errors: FieldErrors<ChatForm>
  isProgress: boolean
}

export function ChatInput({ register, errors, isProgress }: Props) {
  return (
    <CardContent className="flex gap-x-2">
      <Textarea
        placeholder="Type your message here."
        {...register('content', { required: 'Message is required' })}
        className={cn(errors.content && 'border-red-500')}
      />
      <Button
        variant="default"
        type="submit"
        disabled={isProgress}
      >
        Send
      </Button>
    </CardContent>
  )
}
