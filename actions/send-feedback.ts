'use server'

import * as z from 'zod'
import nodemailer from 'nodemailer'
import { FeedbackSchema } from '@/schemas';

export const sendFeedback = async (values: z.infer<typeof FeedbackSchema>) => {
    const validatedFields = FeedbackSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: validatedFields.error.message }
    }

    const { feedback } = validatedFields.data

    const transporter = nodemailer.createTransport({
        host: 'send.one.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.HIMMAH_EMAIL,
            pass: process.env.HIMMAH_PASSWORD
        }
    })

    const mailOptions = {
        from: '<no-reply@himmah.pro>',
        to: 'team@himmah.pro', // Ontvangeradres
        subject: 'Feedback Submission 💬',
        text: feedback,
        html: `<p>${feedback}</p>`
    }

    try {
        await transporter.sendMail(mailOptions)

        return { success: 'Message sent, thank you!' }
    } catch (error) {
        console.error('Error sending feedback:', error)

        return { error: 'Could not send feedback.' }
    }
}