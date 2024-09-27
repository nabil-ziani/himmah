import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type BlockquoteProps = {
    children?: React.ReactNode;
    className?: string;
}

const Blockquote = ({ children, className }: BlockquoteProps) => {
    return (
        <motion.div
            className={cn(
                "relative rounded-lg bg-gray-100/75 py-5 pl-16 pr-5 font-sans text-2xl italic leading-relaxed text-[#303030] before:absolute before:left-3 before:top-3 before:font-serif before:text-6xl before:text-gray-700 before:content-['“']",
                className
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}     
            transition={{ duration: 1 }}
        >
            {children}
        </motion.div>
    );
};

const BlockquoteAuthor = ({ children, className }: BlockquoteProps) => {
    return (
        <p className={cn('mt-5 pr-4 text-right font-bold not-italic text-gray-700', className)}>
            {children}
        </p>
    );
};

export { Blockquote, BlockquoteAuthor };