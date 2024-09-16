'use client'

import { getCategories, getBackgrounds } from "@/lib/utils"
import { createClient } from "@/utils/supabase/client"
import { CircleChevronRight, CircleX } from "lucide-react"
import Image from "next/image"
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

type Subcategory = {
    name: string;
    images: {
        name: string;
        url: string;
    }[];
}

const SetBackgroundDialog = ({ isOpen, setIsOpen }: SetBackgroundDialogProps) => {
    const [categories, setCategories] = useState<Option[]>([])
    const [activeCategory, setActiveCategory] = useState('')
    const [activeSubcategory, setActiveSubcategory] = useState<Subcategory>()

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

    console.log(categories)

    return (
        <>
            {isOpen && (
                <div className="inset-0 z-50 grid place-items-center absolute">
                    <div className="flex z-100 w-[100%] h-[100%] bg-white shadow-xl rounded-2xl relative">
                        <CircleX className="absolute top-5 right-5 text-[#303030]/50 cursor-pointer" onClick={() => setIsOpen(false)} />

                        <section id="categories" className=" flex h-full w-fit flex-col justify-between bg-[#303030] text-white max-sm:hidden lg:w-[300px] rounded-bl-2xl rounded-l-2xl">
                            <div className='flex flex-col gap-4'>
                                <h3 className="text-3xl font-bold p-8">
                                    Backgrounds
                                </h3>
                                {categories.map((category) => {
                                    const isActive = category.label === activeCategory

                                    return (
                                        <p key={category.label} className={`mx-4 p-4 text-lg font-semibold max-lg:hidden rounded-lg cursor-pointer hover:bg-white/15 ${isActive ? 'bg-white/15' : ''}`} onClick={() => setActiveCategory(category.label)}>
                                            {category.label}
                                        </p>
                                    )
                                })}
                            </div>
                        </section>

                        {/* Check if subcategories is not empty (as is the case for "Objects")  */}
                        {activeCategory && categories.find(c => c.label === activeCategory)!.subcategories.length > 0 && (
                            <>
                                <section id="subcategories" className=" flex h-full w-fit flex-col justify-start pt-28 bg-[#303030]/90 text-white max-sm:hidden lg:w-[350px] relative">
                                    <CircleChevronRight className="absolute top-10 -left-2" />
                                    <div className='flex flex-col gap-4'>
                                        {categories.find(c => c.label === activeCategory)!.subcategories.map((subcategory) => {
                                            const isActive = subcategory.name === activeSubcategory?.name

                                            return (
                                                <p key={subcategory.name} className={`mx-4 p-4 text-lg font-semibold max-lg:hidden rounded-lg cursor-pointer hover:bg-white/15 ${isActive ? 'bg-white/15' : ''}`} onClick={() => setActiveSubcategory(subcategory)}>
                                                    {subcategory.name}
                                                </p>
                                            )
                                        })}
                                    </div>
                                </section>
                                <section id="image-grid" className=" flex h-full w-full flex-col text-[#303030] max-sm:hidden rounded-r-2xl">
                                    <h3 className="text-3xl font-bold p-8 text-center">
                                        {activeSubcategory?.name}
                                    </h3>
                                    <div className="grid grid-cols-3 px-5 overflow-y-scroll">
                                        {activeSubcategory?.images.map(img => (
                                            <Image
                                                className="p-2"
                                                src={img.url}
                                                alt={img.name}
                                                width={400}
                                                height={200}
                                            />
                                        ))}
                                    </div>
                                </section>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default SetBackgroundDialog