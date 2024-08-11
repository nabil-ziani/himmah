import React from 'react'

const About = () => {
    return (
        <>
            <section id='about' className="flex w-full h-[80vh] flex-col items-center justify-center">
                <h2 className="text-6xl font-bold text-center mb-20 text-[#303030]">
                    Himmah ✨
                </h2>
                <div className='mx-auto max-w-3xl border-l-4 border-[#303030] pl-8'>
                    <p className='text-lg'>
                        Himmah is a platform for Muslims.
                        It is meant to empower Muslims by increasing their productivity and instilling zeal within them.
                        These goals we aim to achieve by providing Muslims with various tools.
                    </p>
                </div>
            </section>
        </>
    )
}

export default About