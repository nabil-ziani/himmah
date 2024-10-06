import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useTransition } from "react";
import { BsExclamationCircleFill } from "react-icons/bs";
import { Button } from "./ui/button";
import { deleteAccount } from "@/actions/delete-account";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

interface DeleteAccountModalProps {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

const DeleteAccountModal = ({ isOpen, setIsOpen }: DeleteAccountModalProps) => {

    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const handleDelete = () => {
        startTransition(() => {
            deleteAccount().then((data) => {
                if (data.error) {
                    toast.error(data.error)
                }

                if (data.success) {
                    toast.success(data.success)
                }

                router.replace('/')
            })
        })
    }

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
                        className="bg-gray-100 text-[#303030] py-8 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
                    >
                        <div className="relative z-10">
                            <div className="flex flex-col justify-center items-center gap-3 mb-4">
                                <BsExclamationCircleFill aria-hidden="true" className="h-10 w-10 text-red-400" />
                                <h3 className="text-2xl font-bold text-center mb-2">
                                    Delete your account?
                                </h3>
                            </div>
                            <div className="flex gap-x-5 justify-center text-2xl">
                                <Button size={"lg"} className="bg-gray-300/70" onClick={() => setIsOpen(false)}>
                                    No, bring me back!
                                </Button>
                                <Button size={"lg"} onClick={handleDelete} className="text-white bg-red-400">
                                    {isPending ? <Loader className="mr-2 h-6 w-6 animate-spin" /> : "Yes, I'm sure!"}
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )
            }
        </AnimatePresence >
    );
};

export default DeleteAccountModal;