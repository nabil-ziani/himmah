import React from 'react'

const Preview = () => {
    return (
        <>
            <section id='preview' className="flex w-full h-[100vh] flex-col items-center justify-center">
                <h2 className="text-6xl font-bold text-center mb-20 text-[#303030]">
                    Preview
                </h2>
                <div className='mx-auto max-w-3xl border-l-4 border-[#303030] pl-8'>
                    <p className='text-lg'>
                        Display of the different tools we provide
                    </p>
                </div>
            </section>
        </>
    )
}

export default Preview