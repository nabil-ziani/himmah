import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuRadioItem, DropdownMenuLabel } from "@/components/ui/dropdown-menu"
import { BiSolidFlame } from "react-icons/bi";
import { Dispatch, SetStateAction } from "react";

interface AffirmationDropdownProps {
    setCategory: Dispatch<SetStateAction<string>>
    category: string
}

const AffirmationDropdown = ({ setCategory, category }: AffirmationDropdownProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size={"lg"} className="bg-orange-600/80  hover:bg-orange-600/90 text-white text-xl hover:cursor-pointer">
                    <BiSolidFlame className="mr-3" />
                    Affirmations
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Category</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={category} onValueChange={setCategory}>
                    <DropdownMenuRadioItem value="Allah">Allah</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Certainty">Certainty</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Struggle">Struggle</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Wisdom">Wisdom</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Punishment">Punishment</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Reward">Reward</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default AffirmationDropdown