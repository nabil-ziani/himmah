'use client'

import { getCategories, getBackgrounds } from "@/lib/utils"
import { createClient } from "@/utils/supabase/client"
import { CircleX } from "lucide-react"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

interface SetBackgroundDialogProps {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>
    setBackground: Dispatch<SetStateAction<string>>
}

type Option =
    {
        label: string;
        subcategories: never[];
        images: {
            name: string;
            url: string;
        }[];
    } | {
        label: string;
        subcategories: {
            name: string;
            images: {
                name: string;
                url: string;
            }[];
        }[];
        images?: undefined;
    }

const SetBackgroundDialog = ({ isOpen, setIsOpen }: SetBackgroundDialogProps) => {
    const [categories, setCategories] = useState<Option[]>([])
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedSubcategory, setSelectedSubcategory] = useState('')

    const supabase = createClient()

    useEffect(() => {
        const fetchBackgroundOptions = async () => {
            const categoriesList = [
                { label: 'Animals' },
                { label: 'Artificial' },
                { label: 'Cities' },
                { label: 'Colors' },
                { label: 'Flora' },
                { label: 'Food' },
                { label: 'Landscapes' },
                { label: 'Lighting' },
                { label: 'Natural' },
                { label: 'Objects' },
                { label: 'Structures' }
            ];

            const options = await Promise.all(
                categoriesList.map(async (categoryObj) => {
                    if (categoryObj.label === 'Objects') {
                        const images = await getBackgrounds(supabase, 'Objects');
                        return { label: 'Objects', subcategories: [], images };
                    } else {
                        const subcategories = await getCategories(supabase, categoryObj.label);

                        const subcategoriesWithImages = await Promise.all(
                            subcategories.map(async (subcategory) => {
                                const images = await getBackgrounds(supabase, `${categoryObj.label}/${subcategory.name}`);
                                return {
                                    name: subcategory.name,
                                    images
                                };
                            })
                        );

                        return { label: categoryObj.label, subcategories: subcategoriesWithImages };
                    }
                })
            );

            setCategories(options);
        };

        fetchBackgroundOptions();
    }, []);

    return (
        <>
            {isOpen && (
                <div className="inset-0 z-50 grid place-items-center absolute">
                    <div className="z-100 w-[100%] h-[100%] bg-white shadow-xl rounded-2xl relative">
                        <CircleX className="absolute top-5 right-5 text-[#303030] cursor-pointer" onClick={() => setIsOpen(false)} />

                        <section className=" flex h-full w-fit flex-col justify-between bg-[#303030] text-white max-sm:hidden lg:w-[300px] rounded-bl-2xl rounded-l-2xl">
                            <div className='flex flex-col gap-4'>
                                <h3 className="text-3xl font-bold p-8">
                                    Backgrounds
                                </h3>
                                {categories.map((category) => {
                                    return (
                                        <p className={`mx-4 p-4 text-lg font-semibold max-lg:hidden rounded-lg cursor-pointer hover:bg-white/15`}>
                                            {category.label}
                                        </p>
                                    )
                                })}
                            </div>

                        </section>
                    </div>
                </div>
            )}
        </>
    )
}

export default SetBackgroundDialog