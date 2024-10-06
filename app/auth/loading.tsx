import { Loader } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex w-full h-[100vh] justify-center items-center">
            <Loader className="mr-2 h-6 w-6 animate-spin text-[#303030]" />
        </div>
    )
}