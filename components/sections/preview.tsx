import React from 'react'

const Preview = () => {
    return (
        <>
            <section id='about' className="flex max-w-[90vw] flex-col items-center justify-center">
                <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-bold text-center bg-clip-text mt-4">
                    Preview
                </h2>
                <div className='mx-auto max-w-3xl border-l-4 border-primary pl-8'>
                    <p>
                        Display of the different tools we provide
                    </p>
                </div>
            </section>
        </>
    )
}

export default Preview