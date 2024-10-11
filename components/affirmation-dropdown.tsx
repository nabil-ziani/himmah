import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuRadioItem, DropdownMenuLabel } from "@/components/ui/dropdown-menu"
import { useStore } from "@/hooks/useStore";
import { BiSolidFlame } from "react-icons/bi";

const AffirmationDropdown = () => {
    const { affirmationCategory, setAffirmationCategory } = useStore()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size={"lg"} className="bg-orange-600/80  hover:bg-orange-600/90 text-white text-xl hover:cursor-pointer">
                    <BiSolidFlame />
                    <span className="hidden lg:block ml-3">Affirmations</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white">
                <DropdownMenuLabel>Category</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={affirmationCategory} onValueChange={(category) => setAffirmationCategory(category)}>
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