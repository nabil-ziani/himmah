'use client'

import FeedbackForm from "../forms/feedback-form"

const Contact = () => {
    return (
        <>
            <section id='contact' className="flex w-full h-[calc(100vh-9rem)] flex-col items-center justify-center">
                <h2 className="text-4xl sm:text-6xl font-bold text-center mb-3 text-[#303030]">
                    Get in touch 💬
                </h2>
                <p className="text-sm sm:text-lg text-gray-500 text-center w-[80vw] mb-10 sm:mb-20">Let us know if you find issues or have suggestions.</p>
                <FeedbackForm />
            </section>
        </>
    )
}

export default Contact