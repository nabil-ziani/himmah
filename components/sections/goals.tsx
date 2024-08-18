import { goals } from "@/constants"
// import { motion } from "framer-motion"
// import SpringModal from "../spring-modal"
// import { useState } from "react"

// type ModalContent = {
//     title: string,
//     description: string,
//     image: string
// }

const Goals = () => {
    // const [isOpen, setIsOpen] = useState(false);
    // const [content, setContent] = useState<ModalContent>({ title: '', description: '', image: '' })

    return (
        <>
            <section id='goals' className="flex w-full h-[100vh] flex-col items-center justify-center">
                <h2 className="text-6xl font-bold text-center mb-20 text-[#303030]">
                    Our Goals 🎯
                </h2>
                <ul
                    role="list"
                    className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-20  sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-5"
                >
                    {goals.map((goal) => (
                        <li key={goal.title}>
                            <img alt="" src={goal.image} className="mx-auto h-40 w-40 rounded-full" />
                            <h3 className="mt-6 text-3xl text-center font-semibold leading-7 tracking-tight text-gray-900">
                                {goal.title}
                            </h3>
                            <p className="text-md max-w-64 text-center text-slate-500 mt-2" >
                                {goal.description}
                            </p>
                        </li>
                    ))}
                </ul>
                {/* <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} title={content.title} description={content.description} image={content.image} /> */}
            </section>
        </>
    )
}

export default Goals