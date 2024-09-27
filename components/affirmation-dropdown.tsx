import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { BiSolidFlame } from "react-icons/bi";
import { Affirmation } from "@/lib/types";
import { Dispatch, SetStateAction } from "react";

type Option = {
    label: string
    affirmations: Affirmation[]
}

interface AffirmationDropdownProps {
    options: Option[]
    setCategory: Dispatch<SetStateAction<string>>
}

const AffirmationDropdown = ({ options, setCategory }: AffirmationDropdownProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size={"lg"} className="bg-orange-600/80  hover:bg-orange-600/90 text-white text-xl hover:cursor-pointer">
                    <BiSolidFlame className="mr-3" />
                    Affirmations
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuSeparator />
                {options.length > 0 ?
                    (options.map((affirmation) => (
                        <DropdownMenuRadioGroup key={affirmation.label} value={affirmation.label} onValueChange={setCategory}>
                            <DropdownMenuItem>
                                {affirmation.label}
                            </DropdownMenuItem>
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

export default AffirmationDropdown