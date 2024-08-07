import * as z from 'zod'

export const LoginSchema = z.object({
    email: z.string().email({ message: "Email is required" }),
    password: z.string().min(1, { message: "Password is required" }),
})

const SEX = ['male', 'female'] as const

export const RegisterSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: "Email is required" }),
    password: z.string().min(6, { message: "Minimum 6 characters required" }),
    sex: z.optional(z.enum(SEX), { message: "Invalid value" }),
    birthdate: z.optional(z.date(), { message: "Invalid value" })
})