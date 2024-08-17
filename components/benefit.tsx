interface BenefitProps {
    alignment: string
    text: string
    icon: string
    color: string
}

const Benefit = ({ alignment, text, icon, color }: BenefitProps) => {
    return (
        <div className={`flex flex-col ${alignment == 'left' ? 'items-start' : 'items-end'} w-[70%] absolute top-64`}>
            <div className='flex flex-col justify-center items-center'>
                <p className='text-2xl text-center leading-relaxed w-[600px] max-w-[90%]'>
                    {text}
                </p>
                <div className={`rounded-full w-52 h-52 flex justify-center mt-10 items-center bg-${color}-200`}>
                    <img alt="" src={icon} className="mx-auto h-20 w-20 rounded-full hover:cursor-pointer" />
                </div>
            </div >
        </div >
    )
}

export default Benefit