import { z } from 'zod'

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6, 'Password needs to be more than 6 characters')
})

export const signUpSchema = z.object({
    email: z.email(),
    password: z.string().min(6, 'Your password must be a minimum of 6 characters'),
    username: z.string().min(6, 'Username needs to be a minimum of 6 characters')
})


