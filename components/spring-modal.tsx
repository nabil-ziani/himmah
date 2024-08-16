import { AnimatePresence, motion } from "framer-motion";
import { GoGoal } from "react-icons/go";
import { Dispatch, SetStateAction } from "react";
// import { IoCloseCircle } from "react-icons/io5";
import Image from "next/image";

interface SpringModalProps {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>
    title: string
    description: string
    image: string
}

const SpringModal = ({ isOpen, setIsOpen, title, description, image }: SpringModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsOpen(false)}
                    className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
                >
                    <motion.div
                        initial={{ scale: 0, rotate: "12.5deg" }}
                        animate={{ scale: 1, rotate: "0deg" }}
                        exit={{ scale: 0, rotate: "0deg" }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-gradient-to-br to-[#f6ce69] from-[#f86d6d] text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
                    >
                        <GoGoal className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
                        {/* <IoCloseCircle className="text-white/50 text-[30px] absolute top-3 right-3 hover:cursor-pointer" onClick={() => setIsOpen(false)} /> */}
                        <div className="relative z-10">
                            <h3 className="text-4xl font-bold text-center mb-2">
                                {title}
                            </h3>
                            <div className="mb-2 mt-4 rounded-full text-3xl grid place-items-center mx-auto">
                                <Image src={image} alt={title} height={100} width={100} unoptimized />
                            </div>
                            <p className="text-center mt-4 w-[70%] mx-auto">
                                {description}
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SpringModal;