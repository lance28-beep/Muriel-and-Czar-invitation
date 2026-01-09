"use client"

import Link from "next/link"
import { useEffect } from "react"

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Hide the global navbar while on /gallery
    const navbar = document.querySelector("nav") as HTMLElement | null
    if (navbar) navbar.style.display = "none"
    return () => {
      if (navbar) navbar.style.display = ""
    }
  }, [])

  return (
    <div 
      className="min-h-screen bg-[#9B4719]"
      style={{
        backgroundImage: `
          repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.03) 0px,
            transparent 1px,
            transparent 2px,
            rgba(0, 0, 0, 0.03) 3px
          ),
          repeating-linear-gradient(
            90deg,
            rgba(0, 0, 0, 0.05) 0px,
            transparent 1px,
            transparent 2px,
            rgba(255, 255, 255, 0.02) 3px,
            transparent 4px,
            rgba(0, 0, 0, 0.03) 5px
          ),
          linear-gradient(
            90deg,
            rgba(0, 0, 0, 0.1) 0%,
            transparent 20%,
            transparent 80%,
            rgba(0, 0, 0, 0.1) 100%
          )
        `,
        backgroundSize: '100% 4px, 8px 100%, 100% 100%',
        backgroundPosition: '0 0, 0 0, 0 0',
      }}
    >
      {/* Simple top bar with only Back link */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-[#9B4719]/95 border-b border-[#EFD2AA]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 sm:h-14 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#EFD2AA] font-[family-name:var(--font-crimson)] font-semibold text-sm sm:text-base px-3 sm:px-4 py-1.5 sm:py-2 rounded-sm border border-[#EFD2AA]/50 hover:bg-[#EFD2AA]/10 hover:border-[#EFD2AA] transition-all duration-200"
          >
            ← Back to main page
          </Link>
          <div className="text-xs text-[#EFD2AA]/60 font-[family-name:var(--font-crimson)]">Gallery</div>
        </div>
      </div>
      {children}
    </div>
  )
}






