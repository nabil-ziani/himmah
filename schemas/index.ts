import * as z from 'zod'

export const LoginSchema = z.object({
    email: z.string().email({ message: "Email is required" }),
    password: z.string().min(1, { message: "Password is required" }),
})

const SEX = ['Male', 'Female'] as const

export const RegisterSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: "Email is required" }),
    password: z.string().min(6, { message: "Minimum 6 characters required" }),
    sex: z.optional(z.enum(SEX), { message: "Invalid value" }),
    birthDate: z.optional(z.date(), { message: "Invalid value" })
})

export const ResetPasswordSchema = z.object({
    email: z.string().email({ message: "Email is required" }),
})

export const UpdatePasswordSchema = z.object({
    password: z.string().min(6, { message: "Minimum 6 characters required" }),
    passwordConfirm: z.string()
}).refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match!",
    path: ["passwordConfirm"],
})