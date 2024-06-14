import { z } from 'zod'

export const ChatScheme = z.object({
  role: z.enum(['user', 'system'], { message: 'El rol es requerido' }),
  content: z
    .string({ message: 'El mensaje es requerido' })
    .min(1, { message: 'El mensaje debe tener minimo 1 caracter' })
    .max(500, { message: 'El mensaje debe tener menos de 500 caracteres' })
})
