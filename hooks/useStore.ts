'use client'

import { create } from 'zustand'

interface FocusState {
    mode: 'timer' | 'stopwatch'
    toggleMode: () => void
    selectedBackgrounds: string[]
    setSelectedBackgrounds: (bg: string) => void
    audio: string
    setAudio: (audio: string) => void
    affirmations: any[]
    setAffirmations: (affirmations: any[]) => void
    affirmationCategory: string
    setAffirmationCategory: (category: string) => void
    backgroundModalOpen: boolean
    setBackgroundModalOpen: (isOpen: boolean) => void
    focusSettingsModalOpen: boolean
    setFocusSettingsModalOpen: (isOpen: boolean) => void
    affirmationsInterval: number
    setAffirmationsInterval: (interval: number) => void
    backgroundsInterval: number
    setBackgroundsInterval: (interval: number) => void
}

export const useStore = create<FocusState>((set) => ({
    mode: 'timer',
    toggleMode: () => set((state) => ({ mode: state.mode === 'timer' ? 'stopwatch' : 'timer' })),
    selectedBackgrounds: [],
    setSelectedBackgrounds: (newBackground) => set((state) => {
        const isSelected = state.selectedBackgrounds.includes(newBackground);

        if (isSelected) {
            return { selectedBackgrounds: state.selectedBackgrounds.filter((bg: string) => bg !== newBackground) }
        } else {
            return { selectedBackgrounds: [...state.selectedBackgrounds, newBackground] }
        }
    }),
    audio: '',
    setAudio: (audio) => set({ audio }),
    affirmations: [],
    setAffirmations: (affirmations) => set({ affirmations }),
    affirmationCategory: 'Allah',
    setAffirmationCategory: (category) => set({ affirmationCategory: category }),
    backgroundModalOpen: false,
    setBackgroundModalOpen: (isOpen) => set({ backgroundModalOpen: isOpen }),
    focusSettingsModalOpen: false,
    setFocusSettingsModalOpen: (isOpen) => set({ focusSettingsModalOpen: isOpen }),
    affirmationsInterval: 5,
    setAffirmationsInterval: (interval) => set({ affirmationsInterval: interval }),
    backgroundsInterval: 5,
    setBackgroundsInterval: (interval) => set({ backgroundsInterval: interval })
}))
