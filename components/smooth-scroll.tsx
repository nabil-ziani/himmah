'use client'

import { ReactLenis } from 'lenis/dist/lenis-react'
import { ReactNode } from 'react'

interface SmoothScrollingProps {
    children: ReactNode
}

const SmoothScrolling = ({ children }: SmoothScrollingProps) => {
    return (
        <ReactLenis root options={{ lerp: 0.1, duration: 1, smoothWheel: true }}>
            {children}
        </ReactLenis>
    )
}

export default SmoothScrolling