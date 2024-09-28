import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"
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
    DropdownMenuSubContent,
    DropdownMenuLabel
} from "@/components/ui/dropdown-menu"
import { RiLeafFill } from "react-icons/ri";
import { Dispatch, SetStateAction } from "react"

interface AudioDropdownProps {
    audio: string
    setAudio: Dispatch<SetStateAction<string>>
}

const AudioDropdown = ({ audio, setAudio }: AudioDropdownProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size={"lg"} className="bg-green-600/80  hover:bg-green-600/90 text-white text-xl hover:cursor-pointer">
                    <RiLeafFill className="mr-3" />
                    White Noise
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>
                    White Noise
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={audio} onValueChange={setAudio}>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            Animals
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent className="bg-white">
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Animals/Cat%201%20(purring).mp3?t=2024-09-27T19%3A43%3A56.115Z`}>
                                    Cat 1 (purring)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Animals/Crickets%201%20(standard).mp3?t=2024-09-27T19%3A47%3A47.390Z`}>
                                    Crickets 1 (standard)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Animals/Crows%201%20(many).mp3?t=2024-09-27T19%3A50%3A58.233Z`}>
                                    Crows 1 (many)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Animals/Frogs%201%20(few).mp3?t=2024-09-27T19%3A51%3A54.143Z`}>
                                    Frogs 1 (few)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Animals/Frogs%202%20(many).mp3?t=2024-09-27T19%3A52%3A01.871Z`}>
                                    Frogs 2 (many)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Animals/Frogs%203%20(too%20many).mp3?t=2024-09-27T19%3A52%3A10.576Z`}>
                                    Frogs 3 (too many)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Animals/Horse%201%20(eating).mp3?t=2024-09-27T19%3A52%3A17.737Z`}>
                                    Horse 1 (eating)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Animals/Owl%201%20(night).mp3?t=2024-09-27T19%3A52%3A23.680Z`}>
                                    Owl 1 (night)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Animals/Wolves%201%20(howling).mp3?t=2024-09-27T19%3A52%3A32.159Z`}>
                                    Wolves 1 (howling)
                                </DropdownMenuRadioItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            City
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent className="bg-white">
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/City/City%201%20(traffic).mp3?t=2024-09-27T19%3A54%3A29.823Z`}>
                                    City 1 (traffic)
                                </DropdownMenuRadioItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            Fire
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent className="bg-white">
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Fire/Fire%201%20(loud).mp3?t=2024-09-27T19%3A55%3A47.970Z`}>
                                    Fire 1 (loud)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Fire/Fire%203%20(calm).mp3?t=2024-09-27T19%3A55%3A53.487Z`}>
                                    Fire 2 (calm)
                                </DropdownMenuRadioItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            Transport
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent className="bg-white">
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Transport/Airplane%201%20(propeller).mp3?t=2024-09-27T20%3A02%3A36.277Z`}>
                                    Airplane 1 (propeller)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Transport/Airplane%202%20(jet).mp3?t=2024-09-27T20%3A02%3A42.707Z`}>
                                    Airplane 2 (jet)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Transport/Airplane%203%20(helicopter).mp3?t=2024-09-27T20%3A02%3A49.963Z`}>
                                    Airplane 3 (helicopter)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Transport/bicycle%201%20(city).mp3?t=2024-09-27T20%3A03%3A01.359Z`}>
                                    Bicycle 1 (city)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Transport/bicycle%202%20(gravel).mp3?t=2024-09-27T20%3A03%3A08.636Z`}>
                                    Bicycle 2 (gravel)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Transport/Boat%201%20(speedboat).mp3?t=2024-09-27T20%3A03%3A16.944Z`}>
                                    Boat 1 (speedboat)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Transport/Boat%202%20(inside).mp3?t=2024-09-27T20%3A03%3A28.199Z`}>
                                    Boat 2 (inside)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Transport/Car%201%20(inside).mp3?t=2024-09-27T20%3A03%3A35.046Z`}>
                                    Car 1 (inside)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Transport/Car%202%20(gravel).mp3?t=2024-09-27T20%3A03%3A41.391Z`}>
                                    Car 2 (gravel)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Transport/Car%203%20(accelerating).mp3?t=2024-09-27T20%3A03%3A48.614Z`}>
                                    Car 3 (accelerating)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Transport/Car%204%20(highway).mp3?t=2024-09-27T20%3A03%3A55.361Z`}>
                                    Car 4 (highway)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Transport/Train%201%20(old).mp3?t=2024-09-27T20%3A04%3A03.087Z`}>
                                    Train 1 (old)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Transport/Train%202%20(freight).mp3?t=2024-09-27T20%3A04%3A10.022Z`}>
                                    Train 2 (freight)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Transport/Walk%201%20(concrete).mp3?t=2024-09-27T20%3A04%3A17.018Z`}>
                                    Walk 1 (concrete)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Transport/Walk%202%20(hallway).mp3?t=2024-09-27T20%3A04%3A24.891Z`}>
                                    Walk 2 (hallway)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Transport/Walk%203%20(wood).mp3?t=2024-09-27T20%3A04%3A31.303Z`}>
                                    Walk 3 (wood)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Transport/Walk%204%20(dirt).mp3?t=2024-09-27T20%3A04%3A37.052Z`}>
                                    Walk 4 (dirt)
                                </DropdownMenuRadioItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            Water
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent className="bg-white">
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Water/Beach%201%20(loud).mp3?t=2024-09-27T20%3A11%3A16.739Z`}>
                                    Beach 1 (loud)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Water/Beach%202%20(moderate).mp3?t=2024-09-27T20%3A11%3A24.861Z`}>
                                    Beach 2 (moderate)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Water/Beach%203%20(calm).mp3?t=2024-09-27T20%3A11%3A30.463Z`}>
                                    Beach 3 (calm)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Water/Dripping%201%20(cave).mp3?t=2024-09-27T20%3A11%3A36.496Z`}>
                                    Dripping 1 (cavel)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Water/Dripping%202%20(leak).mp3?t=2024-09-27T20%3A11%3A43.376Z`}>
                                    Dripping 2 (leak)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Water/Dripping%203%20(quiet).mp3?t=2024-09-27T20%3A11%3A50.179Z`}>
                                    Dripping 3 (quiet)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Water/River%201%20(loud).mp3?t=2024-09-27T20%3A12%3A01.465Z`}>
                                    River 1 (loud)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Water/River%202%20(calm).mp3?t=2024-09-27T20%3A12%3A06.529Z`}>
                                    River 2 (calm)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Water/River%203%20(small).mp3?t=2024-09-27T20%3A12%3A13.030Z`}>
                                    River 3 (small)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Water/Underwater%201.mp3?t=2024-09-27T20%3A12%3A18.413Z`}>
                                    Underwater 1
                                </DropdownMenuRadioItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            Weather
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent className="bg-white">
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Weather/Rain%201%20(sharp).mp3?t=2024-09-27T20%3A21%3A39.824Z`}>
                                    Rain 1 (sharp)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Weather/Rain%202%20(light).mp3?t=2024-09-27T20%3A21%3A44.524Z`}>
                                    Rain 2 (light)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Weather/Rain%203%20(very%20light).mp3?t=2024-09-27T20%3A21%3A51.187Z`}>
                                    Rain 3 (very light)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Weather/Rain%204%20(indoor).mp3?t=2024-09-27T20%3A21%3A56.992Z`}>
                                    Rain 4 (indoor)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Weather/Rain%205%20(window).mp3?t=2024-09-27T20%3A22%3A02.825Z`}>
                                    Rain 5 (window)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Weather/Rain%206%20(inside%20car).mp3?t=2024-09-27T20%3A22%3A07.879Z`}>
                                    Rain 6 (inside car)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Weather/Storm%201%20(thunder%20only,%20extreme).mp3`}>
                                    Storm 1 (thunder only, extreme)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Weather/Storm%202%20(heavy%20rain).mp3?t=2024-09-27T20%3A22%3A43.699Z`}>
                                    Storm 2 (heavy rain)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Weather/Storm%203%20(heavy%20wind).mp3`}>
                                    Storm 3 (heavy wind)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Weather/Storm%204%20(heavy%20thunder).mp3?t=2024-09-27T20%3A23%3A12.156Z`}>
                                    Storm 4 (heavy thunder)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Weather/Storm%205%20(sharp%20heavy%20rain).mp3`}>
                                    Storm 5 (sharp heavy rain)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Weather/Storm%206%20(sharp%20light%20rain).mp3`}>
                                    Storm 6 (sharp light rain)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Weather/Storm%207%20(little%20thunder).mp3?t=2024-09-27T20%3A23%3A44.085Z`}>
                                    Storm 7 (little thunder)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Weather/Storm%208%20(standard).mp3?t=2024-09-27T20%3A23%3A53.611Z`}>
                                    Storm 8 (standard)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Weather/Storm%209%20(sharp%20thunder,%20light%20rain).mp3`}>
                                    Storm 9 (sharp thunder, light rain)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Weather/Storm%2010%20(light%20rain).mp3?t=2024-09-27T20%3A22%3A16.550Z`}>
                                    Storm 10 (light rain)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Weather/Storm%2011%20(very%20light%20rain).mp3?t=2024-09-27T20%3A22%3A25.391Z`}>
                                    Storm 11 (very light rain)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Weather/Wind%201%20(extreme).mp3?t=2024-09-27T20%3A21%3A03.141Z`}>
                                    Wind 1 (extreme)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Weather/Wind%202%20(blizzard).mp3`}>
                                    Wind 2 (blizzard)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Weather/Wind%203%20(howling).mp3?t=2024-09-27T20%3A21%3A20.232Z`}>
                                    Wind 3 (howling)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Weather/Wind%204%20(mountains).mp3?t=2024-09-27T20%3A21%3A26.170Z`}>
                                    Wind 4 (mountains)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/white_noise/Weather/Wind%205%20(forest).mp3?t=2024-09-27T20%3A21%3A30.925Z`}>
                                    Wind 5 (forest)
                                </DropdownMenuRadioItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default AudioDropdown