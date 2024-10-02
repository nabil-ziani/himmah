'use client'

import FeedbackForm from "../forms/feedback-form"

const Contact = () => {
    return (
        <>
            <section id='contact' className="flex w-full h-[calc(100vh-9rem)] flex-col items-center justify-center">
                <h2 className="text-6xl font-bold text-center mb-20 text-[#303030]">
                    Send us a message 💬
                </h2>
                <FeedbackForm />
            </section>
        </>
    )
}

export default Contact