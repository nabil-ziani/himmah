import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import FriendsForm from "./forms/friends-form";

interface FriendsModalProps {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

const FriendsModal = ({ isOpen, setIsOpen }: FriendsModalProps) => {
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
                        className="bg-gray-500 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
                    >
                        {/* <GrTask className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-10 -left-10" /> */}
                        <div className="relative z-10">
                            <h3 className="text-3xl font-bold text-center mb-4">
                                Add Friend ❤️
                            </h3>
                            <FriendsForm setIsOpen={setIsOpen} />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FriendsModal;