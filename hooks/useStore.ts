'use client'

import { create } from 'zustand'

interface FocusState {
    mode: 'timer' | 'stopwatch'
    toggleMode: () => void
    selectedBackgrounds: string[]
    setSelectedBackgrounds: (bg: string[]) => void
    audio: string
    setAudio: (audio: string) => void
    affirmations: any[]
    setAffirmations: (affirmations: any[]) => void
    affirmationCategory: string
    setAffirmationCategory: (category: string) => void
    backgroundDialog: boolean
    setBackgroundDialog: (isOpen: boolean) => void
}

export const useStore = create<FocusState>((set) => ({
    mode: 'timer',
    toggleMode: () => set((state) => ({ mode: state.mode === 'timer' ? 'stopwatch' : 'timer' })),
    selectedBackgrounds: [],
    setSelectedBackgrounds: (bg) => set({ selectedBackgrounds: bg }),
    audio: '',
    setAudio: (audio) => set({ audio }),
    affirmations: [],
    setAffirmations: (affirmations) => set({ affirmations }),
    affirmationCategory: 'Allah',
    setAffirmationCategory: (category) => set({ affirmationCategory: category }),
    backgroundDialog: false,
    setBackgroundDialog: (isOpen) => set({ backgroundDialog: isOpen }),
}))
