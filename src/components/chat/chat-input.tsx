import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
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
    <CardContent className="flex">
      <Input
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
