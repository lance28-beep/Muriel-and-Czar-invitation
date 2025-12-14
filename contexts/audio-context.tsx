"use client"

import { createContext, useContext, ReactNode } from "react"

interface AudioContextType {
  // Add audio-related state/methods here if needed
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export function AudioProvider({ children }: { children: ReactNode }) {
  return (
    <AudioContext.Provider value={{}}>
      {children}
    </AudioContext.Provider>
  )
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider")
  }
  return context
}

