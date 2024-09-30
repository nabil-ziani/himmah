import * as z from 'zod'

export const LoginSchema = z.object({
    email: z.string().email({ message: "Email is required" }),
    password: z.string().min(1, { message: "Password is required" }),
})

const SEX = ['Male', 'Female'] as const

export const RegisterSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }).max(30, { message: 'Maximum characters is 30' }),
    email: z.string().email({ message: "Email is required" }),
    password: z.string().min(6, { message: "Minimum 6 characters required" }),
    sex: z.enum(SEX, { message: "Enter a valid option" }),
    birthDate: z.date({ message: 'Enter a valid date' }).refine((d) => d >= new Date("01-01-1900") && d <= new Date(Date.now()), { message: 'Enter a valid birthdate' })
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

export const UpdateProfileSchema = z.object({
    name: z.optional(z.string().min(1, { message: 'Name is required' }).max(30, { message: 'Maximum characters is 30' })),
    // phone: z.optional(z.string().refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number")),
    email: z.optional(z.string().email({ message: "Email is required" })),
    // password: z.optional(z.string().min(6, { message: "Minimum 6 characters required" })),
    sex: z.optional(z.enum(SEX, { message: "Enter a valid option" })),
    birthdate: z.optional(z.date({ message: 'Enter a valid date' }).refine((d) => d >= new Date("01-01-1900") && d <= new Date(Date.now()), { message: 'Enter a valid birthdate' }))
})

// const TaskStatus = ["new", "active", "completed", "abandoned"] as const
export const CreateTaskSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    description: z.string().min(1, { message: 'Description is required' }),
    focus_time: z.number({ message: 'Focus time must be a number' })
        .positive({ message: 'Focus time must be a positive number' })
        .max(9999, { message: 'Focus time too high!' })
    // status: z.optional(z.enum(TaskStatus, { message: "Enter a valid option" }))
})

export const UpdateTaskSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    description: z.string().min(1, { message: 'Description is required' }),
    focus_time: z.number({ message: 'Focus time must be a number' })
        .positive({ message: 'Focus time must be a positive number' })
        .max(9999, { message: 'Focus time too high!' })
    // status: z.optional(z.enum(TASK_STATUS, { message: "Enter a valid option" }))
})

export const AddFriendSchema = z.object({
    email: z.string().email({ message: "Enter a valid email" })
})

export const UpdateFocusSettingsSchema = z.object({
    affirmations_interval: z.number({ message: 'Affirmations interval must be a number' })
        .positive({ message: 'Affirmations interval must be a positive number' })
        .max(9999, { message: 'Affirmations interval too high!' }),
    backgrounds_interval: z.number({ message: 'Backgrounds interval must be a number' })
        .positive({ message: 'Backgrounds interval must be a positive number' })
        .max(9999, { message: 'Backgrounds interval too high!' })
})