'use client'

import { useEffect, useState } from "react"
import { Tables } from "@/database.types"
import toast from "react-hot-toast"
import { useStore } from "@/hooks/useStore"
import Image from "next/image"
import { CircleChevronRight, CircleX, Loader2 } from "lucide-react"

interface SetBackgroundDialogProps {
    allBackgrounds: Tables<'backgrounds'>[]
    isLoading: boolean
    error: Error | null
}

interface Subcategory {
    name: string
    images: { name: string, url: string }[]
}

interface Category {
    name: string;
    subcategories: Subcategory[];
}

const SetBackgroundDialog = ({ allBackgrounds, isLoading, error }: SetBackgroundDialogProps) => {
    const [categories, setCategories] = useState<Category[]>([])
    const [activeCategory, setActiveCategory] = useState('')
    const [activeSubcategory, setActiveSubcategory] = useState<Subcategory | undefined>(undefined)

    const { backgroundModalOpen, setBackgroundModalOpen, selectedBackgrounds, setSelectedBackgrounds, } = useStore()

    // Fetch backgrounds
    useEffect(() => {
        if (allBackgrounds.length > 0) {
            const categoriesMap: { [key: string]: Category } = {}

            allBackgrounds.forEach(bg => {
                const { category, subcategory, url, name } = bg

                if (!categoriesMap[category]) {
                    categoriesMap[category] = { name: category, subcategories: [] }
                }

                const subcatIndex = categoriesMap[category].subcategories.findIndex(s => s.name === subcategory);
                if (subcategory) {
                    if (subcatIndex !== -1) {
                        // Subcategorie bestaat al, voeg de afbeelding toe
                        categoriesMap[category].subcategories[subcatIndex].images.push({ url, name });
                    } else {
                        // Nieuwe subcategorie, maak deze aan
                        categoriesMap[category].subcategories.push({
                            name: subcategory,
                            images: [{ url, name }] // Voeg afbeelding toe
                        });
                    }
                } else {
                    // Geen subcategorie, voeg afbeelding direct toe aan de hoofdcategorie
                    categoriesMap[category].subcategories.push({
                        name: category,
                        images: [{ url, name }] // Voeg afbeelding toe
                    })
                }
            })

            const categoriesList = Object.keys(categoriesMap).map(category => categoriesMap[category]);
            setCategories(categoriesList);
        }
    }, [allBackgrounds])

    if (isLoading) {
        return (
            <div className="flex justify-center items-center">
                <Loader2 className="mr-2 h-6 w-6 animate-spin" />
            </div>
        )
    }

    if (error) {
        toast.error(error.message)
    }

    const handleCategoryChange = (categoryLabel: string) => {
        setActiveCategory(categoryLabel);
        setActiveSubcategory(undefined);
    }

    const handleSubcategoryChange = (subcategory: Subcategory) => {
        setActiveSubcategory(subcategory);
    }

    const handleSelectBackground = (img: { name: string, url: string }) => {
        setSelectedBackgrounds(img.url)
    }

    return (
        <>
            {backgroundModalOpen && (
                <div className="inset-0 z-50 grid place-items-center absolute">
                    <div className="flex z-100 w-[100%] h-[100%] bg-white shadow-xl rounded-2xl relative">
                        <CircleX className="absolute top-5 right-5 text-[#303030]/50 cursor-pointer" onClick={() => setBackgroundModalOpen(false)} />

                        <section id="categories" className=" flex h-full w-fit flex-col justify-between bg-[#303030] text-white max-sm:hidden lg:w-[300px] rounded-bl-2xl rounded-l-2xl">
                            <div className='flex flex-col gap-4'>
                                <h3 className="text-3xl font-bold p-8">
                                    Backgrounds
                                </h3>
                                {categories.length > 0 ?
                                    categories.map((category) => {
                                        const isActive = category.name === activeCategory

                                        return (
                                            <p key={category.name} className={`mx-4 p-4 text-lg font-semibold max-lg:hidden rounded-lg cursor-pointer hover:bg-white/15 ${isActive ? 'bg-white/15' : ''}`} onClick={() => handleCategoryChange(category.name)}>
                                                {category.name}
                                            </p>
                                        )
                                    })
                                    :
                                    <div className="flex justify-center items-center">
                                        <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                                    </div>
                                }
                            </div>
                        </section>

                        {/* Check if subcategories is not empty (as is the case for "Objects")  */}
                        {activeCategory && categories.find(c => c.name === activeCategory)!.subcategories.length > 0 && (
                            <>
                                <section id="subcategories" className=" flex h-full w-fit flex-col justify-start pt-28 bg-[#303030]/90 text-white max-sm:hidden lg:w-[350px] relative">
                                    <CircleChevronRight className="absolute top-10 -left-2" />
                                    <div className='flex flex-col gap-4'>
                                        {categories.find(c => c.name === activeCategory)!.subcategories.map((subcategory) => {
                                            const isActive = subcategory.name === activeSubcategory?.name

                                            return (
                                                <p key={subcategory.name} className={`mx-4 p-4 text-lg font-semibold max-lg:hidden rounded-lg cursor-pointer hover:bg-white/15 ${isActive ? 'bg-white/15' : ''}`} onClick={() => handleSubcategoryChange(subcategory)}>
                                                    {subcategory.name}
                                                </p>
                                            )
                                        })}
                                    </div>
                                </section>
                                {activeSubcategory && (
                                    <section id="image-grid" className=" flex h-full w-full flex-col text-[#303030] max-sm:hidden rounded-r-2xl scroll-pb-10">
                                        <h3 className="text-3xl font-bold p-8 text-center">
                                            {activeSubcategory.name}
                                        </h3>
                                        <div className="grid grid-cols-3 px-5 overflow-y-auto max-h-[70vh]">
                                            {activeSubcategory.images.map(img => (
                                                <div className={`relative cursor-pointer`} key={img.name} >
                                                    <Image
                                                        className={`m-2 object-cover h-64 w-120 rounded-2xl ${selectedBackgrounds.includes(img.url) ? 'border-4 border-[#FF5C5C]' : ''}`}
                                                        src={img.url}
                                                        alt={img.name}
                                                        width={400}
                                                        height={200}
                                                        quality={75}
                                                        priority={true}
                                                        onClick={() => handleSelectBackground(img)}
                                                    />
                                                    <div className={`${selectedBackgrounds.includes(img.url) ? 'bg-[#FF5C5C]' : 'bg-white '} h-6 w-6 absolute top-5 left-5 rounded-md`}></div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default SetBackgroundDialog