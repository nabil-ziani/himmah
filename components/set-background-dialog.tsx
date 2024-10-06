'use client'

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Tables } from "@/database.types"
import { useStore } from "@/hooks/useStore"
import Image from "next/image"
import { Loader } from "lucide-react"
import { TbSquareRoundedChevronsRightFilled } from "react-icons/tb";
import { AnimatePresence, motion } from "framer-motion"

interface SetBackgroundDialogProps {
    allBackgrounds: Tables<'backgrounds'>[]
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

interface Subcategory {
    name: string
    images: { name: string, url: string }[]
}

interface Category {
    name: string;
    subcategories: Subcategory[];
}

const SetBackgroundDialog = ({ allBackgrounds, isOpen, setIsOpen }: SetBackgroundDialogProps) => {
    const [categories, setCategories] = useState<Category[]>([])
    const [activeCategory, setActiveCategory] = useState('')
    const [activeSubcategory, setActiveSubcategory] = useState<Subcategory | undefined>(undefined)

    const { selectedBackgrounds, setSelectedBackgrounds, } = useStore()
    const [localSelected, setLocalSelected] = useState(selectedBackgrounds)

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

    const handleCategoryChange = (categoryLabel: string) => {
        setActiveCategory(categoryLabel)
        setActiveSubcategory(undefined)
    }

    const handleSubcategoryChange = (subcategory: Subcategory) => {
        setActiveSubcategory(subcategory);
    }

    const handleSelectBackground = (img: { name: string, url: string }) => {
        const isSelected = localSelected.includes(img.url);

        if (isSelected) {
            setLocalSelected(localSelected.filter(url => url !== img.url))
        } else {
            setLocalSelected(prev => [...prev, img.url])
        }
    }

    const handleCloseModal = () => {
        setSelectedBackgrounds(localSelected)
        setIsOpen(false)
    }

    useEffect(() => {
        if (allBackgrounds.length > 0) {
            // Log om te zien wat er wordt opgehaald
            console.log(allBackgrounds);

            // ... rest van je logica
        }
    }, [allBackgrounds]);

    return (
        <>
            {isOpen && (
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleCloseModal}
                        className="bg-slate-900/20 backdrop-blur fixed inset-0 z-50 grid place-items-center cursor-pointer"
                    >
                        <motion.div
                            initial={{ scale: 0, rotate: "12.5deg" }}
                            animate={{ scale: 1, rotate: "0deg" }}
                            exit={{ scale: 0, rotate: "0deg" }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex w-[85vw] bg-white rounded-2xl shadow-xl cursor-default">
                                <section id="categories" className="flex flex-col  w-fit justify-between bg-[#303030] text-white rounded-bl-2xl rounded-l-2xl h-[70vh] overflow-y-scroll">
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
                                                <Loader className="mr-2 h-6 w-6 animate-spin" />
                                            </div>
                                        }
                                    </div>
                                </section>

                                {activeCategory && categories.find(c => c.name === activeCategory)!.subcategories.length > 0 && (
                                    <div className="flex flex-grow relative h-[70vh]">
                                        <motion.div
                                            className="absolute top-9 -left-3"
                                            initial={{ x: -100, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{
                                                type: 'spring',
                                                stiffness: 300,
                                                damping: 20,
                                            }}
                                        >
                                            <TbSquareRoundedChevronsRightFilled size={30} color="white" />
                                        </motion.div>

                                        <motion.section
                                            id="subcategories"
                                            className="flex w-fit justify-start pt-28 bg-[#303030]/90 text-white sm:w-[300px] no-scrollbar overflow-y-scroll"
                                            initial={{ x: '-100vw' }}
                                            animate={{ x: 0 }}
                                            exit={{ x: '100vw' }}
                                            transition={{ type: 'tween', duration: 0.5 }}
                                        >
                                            <div className='flex flex-col gap-4'>
                                                {categories.find(c => c.name === activeCategory)!.subcategories.map((subcategory) => {
                                                    const isActive = subcategory.name === activeSubcategory?.name

                                                    return (
                                                        <p key={subcategory.name} className={`mx-4 p-4 w-full text-lg font-semibold max-lg:hidden rounded-lg cursor-pointer hover:bg-white/15 ${isActive ? 'bg-white/15' : ''}`} onClick={() => handleSubcategoryChange(subcategory)}>
                                                            {subcategory.name}
                                                        </p>
                                                    )
                                                })}
                                            </div>
                                        </motion.section>

                                        {activeSubcategory && (
                                            <motion.section
                                                id="image-grid"
                                                className=" flex flex-col flex-grow bg-white text-[#303030] rounded-r-2xl px-3"
                                                key={activeSubcategory.name}
                                                initial={{ x: '100vw' }}
                                                animate={{ x: 0 }}
                                                exit={{ x: '-100vw' }}
                                                transition={{ type: 'tween', duration: 0.5 }}
                                            >
                                                <h3 className="text-3xl font-bold p-8 text-center">
                                                    {activeSubcategory.name}
                                                </h3>
                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 no-scrollbar overflow-y-auto pb-5">
                                                    {activeSubcategory.images.map(img => (
                                                        <div className={`relative cursor-pointer w-full h-56`} key={img.name}>
                                                            <Image
                                                                className={`object-cover bg-gray-300 animate-pulse h-full w-full rounded-2xl transition-opacity opacity-0 duration-2000 ${localSelected.includes(img.url) ? 'border-4 border-[#FF5C5C]' : ''}`}
                                                                src={img.url}
                                                                alt={img.name}
                                                                width={400}
                                                                height={200}
                                                                quality={75}
                                                                onLoadingComplete={(img) => img.classList.remove('opacity-0', 'animate-pulse')}
                                                                onClick={() => handleSelectBackground(img)}
                                                            />
                                                            <div className={`${localSelected.includes(img.url) ? 'bg-[#FF5C5C]' : 'bg-white '} h-6 w-6 absolute top-3 left-3 rounded-md`}></div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </motion.section>
                                        )}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            )}
        </>
    )
}

export default SetBackgroundDialog