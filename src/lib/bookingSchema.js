import { z } from 'zod'

export function formatLocalDate(d = new Date()) {
  const yr = d.getFullYear()
  const mo = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${yr}-${mo}-${day}`
}

export const bookingSchema = z.object({
  date: z.string()
    .min(1, 'Please select a date.')
    .refine(val => {
      const today = new Date()
      today.setHours(0,0,0,0)
      const [y, m, d] = val.split('-').map(Number)
      const chosen = new Date(y, (m ?? 1) - 1, d ?? 1)
      chosen.setHours(0,0,0,0)
      return chosen >= today
    }, 'Date cannot be in the past.'),
  time: z.string().min(1, 'Please select a time.'),
  diners: z.coerce.number()
    .int('Diners must be a whole number.')
    .min(1, 'At least 1 diner.')
    .max(12, 'Maximum 12 diners per table.'),
  request: z.string().max(280, 'Please keep requests under 280 characters.').optional().or(z.literal('')),
})
