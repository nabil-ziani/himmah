import { Button } from "./ui/button"
import { CirclePlay } from "lucide-react"
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
                <Button size={"lg"} className="bg-[#1E90FF]/60  hover:bg-[#1E90FF]/70 text-white text-xl hover:cursor-pointer">
                    <CirclePlay className="mr-3" />
                    {title}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuSeparator />
                {audioOptions.map((audio) => (
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
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default AudioDropdown