import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "@/hooks/useStore";
import FocusSettingsForm from "./forms/focus-settings-form";


const FocusSettingsModal = () => {

    const { focusSettingsModalOpen, setFocusSettingsModalOpen } = useStore()

    return (
        <AnimatePresence>
            {focusSettingsModalOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setFocusSettingsModalOpen(false)}
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
                                Focus Settings ⚙️
                            </h3>
                            <FocusSettingsForm />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FocusSettingsModal;