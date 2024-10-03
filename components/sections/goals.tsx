import { goals } from "@/constants"

const Goals = () => {
    return (
        <>
            <section id='goals' className="flex w-full my-20 sm:h-[100vh] flex-col items-center justify-center">
                <h2 className="text-4xl sm:text-6xl font-bold text-center sm:mb-20 text-[#303030]">
                    Our Goals 🎯
                </h2>
                <ul
                    role="list"
                    className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-20  sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-5"
                >
                    {goals.map((goal) => (
                        <li key={goal.title} className="my-5 sm:my-0">
                            <img alt="" src={goal.image} className="mx-auto h-40 w-40 rounded-full" />
                            <h3 className="mt-3 sm:mt-6 text-xl sm:text-3xl text-center font-semibold leading-7 tracking-tight text-gray-900">
                                {goal.title}
                            </h3>
                            <p className="text-sm sm:text-md max-w-64 text-center text-slate-500 mt-2" >
                                {goal.description}
                            </p>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    )
}

export default Goals