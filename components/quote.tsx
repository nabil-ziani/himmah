import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type BlockquoteProps = {
    children?: React.ReactNode
    className?: string
}

const Blockquote = ({ children, className }: BlockquoteProps) => {
    return (
        <motion.div
            className={cn(
                "relative rounded-lg bg-white/60 py-5 pl-14 pr-5 text-xl italic backdrop-blur-lg backdrop-filter leading-relaxed text-[#303030] before:absolute before:left-3 before:top-3 before:font-serif before:text-6xl before:text-gray-700 before:content-['“']",
                className
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            {children}
        </motion.div>
    )
}

const BlockquoteAuthor = ({ children, className }: BlockquoteProps) => {
    return (
        <p className={cn('pr-4 text-right font-bold not-italic text-gray-700', className)}>
            {children}
        </p>
    )
}

export { Blockquote, BlockquoteAuthor }