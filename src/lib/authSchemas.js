import { z } from 'zod'

export const signupSchema = z.object({
  name: z.string().min(2, 'Please enter your full name.'),
  email: z.string().email('Enter a valid email address.'),
  password: z.string()
    .min(8, 'Use at least 8 characters.')
    .regex(/[a-z]/, 'Include a lowercase letter.')
    .regex(/[A-Z]/, 'Include an uppercase letter.')
    .regex(/\d/, 'Include a number.'),
  confirm: z.string(),
}).refine(data => data.password === data.confirm, {
  path: ['confirm'],
  message: 'Passwords do not match.',
})

export const loginSchema = z.object({
  email: z.string().email('Enter a valid email address.'),
  password: z.string().min(1, 'Enter your password.'),
})
