import { ChatScheme } from '@/scheme'
import { z } from 'zod'

export type Chat = z.infer<typeof ChatScheme>
export type ChatForm = Pick<Chat, 'content'>
