import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import FeedbackForm from "./forms/feedback-form";

interface FeedbackModalProps {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

const FeedbackModal = ({ isOpen, setIsOpen }: FeedbackModalProps) => {

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
                        <div className="relative z-10">
                            <h3 className="text-3xl font-bold text-center mb-4">
                                Feedback 💬
                            </h3>
                            <FeedbackForm textAreaClassName="shad-textArea" label="Message" setIsOpen={setIsOpen} />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FeedbackModal;