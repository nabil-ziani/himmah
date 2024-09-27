import { Button } from "./ui/button"
import { CirclePlay, Loader2 } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuPortal,
    DropdownMenuSubContent
} from "@/components/ui/dropdown-menu"
import { RiLeafFill } from "react-icons/ri";
import { Dispatch, SetStateAction } from "react"

type AudioFile = {
    name: string
    url: string
}

type AudioOption = {
    label: string
    files: AudioFile[]
}

interface AudioDropdownProps {
    title: string,
    audioOptions: AudioOption[],
    setAudio: Dispatch<SetStateAction<string>>
}

const AudioDropdown = ({ title, audioOptions, setAudio }: AudioDropdownProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size={"lg"} className="bg-green-600/80  hover:bg-green-600/90 text-white text-xl hover:cursor-pointer">
                    <RiLeafFill className="mr-3" />
                    {title}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuSeparator />
                {audioOptions.length > 0 ?
                    (audioOptions.map((audio) => (
                        <DropdownMenuRadioGroup key={audio.label} value={audio.label} onValueChange={setAudio}>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                    {audio.label}
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        {audio.files.map((file) => {
                                            return (
                                                <DropdownMenuRadioItem key={file.name} value={file.url}>
                                                    {file.name}
                                                </DropdownMenuRadioItem>
                                            )
                                        })}
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                        </DropdownMenuRadioGroup>
                    ))) :
                    (
                        <div className="flex justify-center items-center">
                            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                        </div>
                    )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default AudioDropdown