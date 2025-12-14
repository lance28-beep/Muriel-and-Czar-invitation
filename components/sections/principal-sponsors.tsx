"use client"

import React from "react"
import { useEffect, useMemo, useState } from "react"
import { Section } from "@/components/section"
import { Loader2, Users } from "lucide-react"

interface PrincipalSponsor {
  MalePrincipalSponsor: string
  FemalePrincipalSponsor: string
}

export function PrincipalSponsors() {
  // Helper component for elegant section titles
  const SectionTitle = ({
    children,
    align = "center",
    className = "",
  }: {
    children: React.ReactNode
    align?: "left" | "center" | "right"
    className?: string
  }) => {
    const textAlign =
      align === "right" ? "text-right" : align === "left" ? "text-left" : "text-center"
    return (
      <h3 className={`text-xs sm:text-sm md:text-base lg:text-lg font-[family-name:var(--font-crimson)] font-semibold uppercase text-[#800A06] mb-2 sm:mb-3 md:mb-4 tracking-[0.1em] sm:tracking-[0.12em] ${textAlign} ${className}`}>
        {children}
      </h3>
    )
  }

  // Helper component for name items with alignment
  const NameItem = ({ name, align = "center" }: { name: string, align?: "left" | "center" | "right" }) => {
    const containerAlign =
      align === "right" ? "items-end" : align === "left" ? "items-start" : "items-center"
    const textAlign =
      align === "right" ? "text-right" : align === "left" ? "text-left" : "text-center"
    return (
      <div className={`flex flex-col ${containerAlign} justify-center py-0.5 sm:py-1 md:py-1.5 w-full`}>
        <p className={`text-[#800A06] text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] font-medium leading-tight sm:leading-snug break-words ${textAlign}`}>{name}</p>
      </div>
    )
  }

  // Remote data state
  const [sponsors, setSponsors] = useState<PrincipalSponsor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSponsors = async () => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/principal-sponsor", { cache: "no-store" })
      if (!res.ok) throw new Error("Failed to load principal sponsors")
      const data: PrincipalSponsor[] = await res.json()
      setSponsors(data)
    } catch (e: any) {
      console.error(e)
      setError(e?.message || "Failed to load principal sponsors")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSponsors()

    // Set up auto-refresh listener for dashboard updates
    const handleSponsorsUpdate = () => {
      setTimeout(() => {
        fetchSponsors()
      }, 1000)
    }

    window.addEventListener("sponsorsUpdated", handleSponsorsUpdate)

    return () => {
      window.removeEventListener("sponsorsUpdated", handleSponsorsUpdate)
    }
  }, [])

  // Keep sponsors as pairs to ensure alignment
  const sponsorPairs = useMemo(() => 
    sponsors.filter(s => s.MalePrincipalSponsor || s.FemalePrincipalSponsor),
    [sponsors]
  )

  return (
    <Section
      id="sponsors"
      className="relative py-8 sm:py-12 md:py-16 lg:py-20"
    >
      {/* Semi-transparent overlay for better text readability */}
      <div className="absolute inset-0 bg-[#EFCA93] backdrop-blur-sm pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center mb-6 sm:mb-10 md:mb-12 px-3 sm:px-4 md:px-6">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="h-[1px] w-12 sm:w-16 md:w-24 bg-gradient-to-r from-transparent via-[#9F8650] to-transparent" />
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[family-name:var(--font-crimson)] font-normal text-[#800A06] mb-3 sm:mb-4 md:mb-6 uppercase tracking-[0.1em] sm:tracking-[0.12em] md:tracking-[0.15em] elegant-text-shadow">
          Principal Sponsors
        </h2>
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="h-[1px] w-12 sm:w-16 md:w-24 bg-gradient-to-r from-transparent via-[#9F8650] to-transparent" />
        </div>
        <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-[#800A06]/80 font-light max-w-xl mx-auto leading-relaxed tracking-wide px-2 sm:px-4">
          Our Beloved Godparents
        </p>
      </div>

      {/* Central Card Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-4 md:px-6">
        {/* Main card with elegant styling */}
        <div className="relative group">
          {/* Subtle earth tone glow on hover */}
          <div className="absolute -inset-1 bg-gradient-to-br from-[#9F8650]/20 to-[#800A06]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />
          
          <div className="relative elegant-card rounded-xl sm:rounded-2xl overflow-hidden border border-[#9F8650]/30 premium-shadow hover:border-[#9F8650]/50 transition-all duration-300">
            {/* Card content */}
            <div className="relative p-4 sm:p-6 md:p-8 lg:p-10">
              {isLoading ? (
                <div className="flex items-center justify-center py-12 sm:py-16 md:py-24">
                  <div className="flex flex-col items-center gap-3 sm:gap-4">
                    <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 animate-spin text-[#800A06]" />
                    <span className="text-[#800A06]/70 font-[family-name:var(--font-crimson)] text-sm sm:text-base md:text-lg">
                      Loading sponsors...
                    </span>
                  </div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center py-12 sm:py-16 md:py-24">
                  <div className="text-center">
                    <p className="text-red-600 font-[family-name:var(--font-crimson)] text-sm sm:text-base md:text-lg mb-3 sm:mb-4">{error}</p>
                    <button
                      onClick={fetchSponsors}
                      className="text-[#800A06] hover:text-[#800A06]/70 font-[family-name:var(--font-crimson)] underline transition-colors duration-300 text-sm sm:text-base"
                    >
                      Try again
                    </button>
                  </div>
                </div>
              ) : sponsorPairs.length === 0 ? (
                <div className="text-center py-12 sm:py-16 md:py-24">
                  <Users className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-[#800A06]/30 mx-auto mb-3 sm:mb-4" />
                  <p className="text-[#800A06]/70 font-[family-name:var(--font-crimson)] text-sm sm:text-base md:text-lg">
                    No sponsors yet
                  </p>
                </div>
              ) : (
                <div className="mb-3 sm:mb-5 md:mb-7 lg:mb-9">
                  <div className="grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-1.5 sm:gap-x-2 md:gap-x-3 mb-2 sm:mb-2.5 md:mb-3.5">
                    <SectionTitle align="right" className="pr-2 sm:pr-3 md:pr-4">Male Principal Sponsors</SectionTitle>
                    <SectionTitle align="left" className="pl-2 sm:pl-3 md:pl-4">Female Principal Sponsors</SectionTitle>
                  </div>
                  <div className="grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-1.5 sm:gap-x-2 md:gap-x-3 gap-y-1 sm:gap-y-1.5 md:gap-y-2 items-stretch">
                    {sponsorPairs.map((pair, idx) => (
                      <React.Fragment key={`sponsor-pair-${idx}`}>
                        <div key={`male-${idx}-${pair.MalePrincipalSponsor || 'empty'}`} className="px-2 sm:px-3 md:px-4">
                          {pair.MalePrincipalSponsor ? (
                            <NameItem name={pair.MalePrincipalSponsor} align="right" />
                          ) : (
                            <div className="py-0.5 sm:py-1 md:py-1.5" />
                          )}
                        </div>
                        <div key={`female-${idx}-${pair.FemalePrincipalSponsor || 'empty'}`} className="px-2 sm:px-3 md:px-4">
                          {pair.FemalePrincipalSponsor ? (
                            <NameItem name={pair.FemalePrincipalSponsor} align="left" />
                          ) : (
                            <div className="py-0.5 sm:py-1 md:py-1.5" />
                          )}
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
