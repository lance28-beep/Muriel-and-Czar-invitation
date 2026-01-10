"use client"

import { Section } from "@/components/section"
import { Shirt, Copy, Check, Navigation, MapPin } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import { QRCodeSVG } from "qrcode.react"

export function Details() {
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set())

  const copyToClipboard = async (text: string, itemId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItems(prev => new Set(prev).add(itemId))
      setTimeout(() => {
        setCopiedItems(prev => {
          const newSet = new Set(prev)
          newSet.delete(itemId)
          return newSet
        })
      }, 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  // Updated venue information
  const ceremonyVenueName = "Buddy-One Camp"
  const ceremonyVenueDetail = "Back Garden of buddy One camp"
  const ceremonyAddress = "Tuba, Benguet"
  const ceremonyVenue = `${ceremonyVenueName}, ${ceremonyAddress}`
  const ceremonyMapsLink = `https://maps.google.com/?q=${encodeURIComponent(ceremonyVenue)}`

  const receptionVenueName = "Buddy-One Camp"
  const receptionVenueDetail = "Function Hall pf Buddy One Camp"
  const receptionAddress = "Tuba, Benguet"
  const receptionVenue = `${receptionVenueName}, ${receptionAddress}`
  const receptionMapsLink = `https://maps.google.com/?q=${encodeURIComponent(receptionVenue)}`

  const openInMaps = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer')
  }


  return (
    <Section id="details" className="relative py-16 sm:py-20 md:py-24 lg:py-28">
      {/* Background matching countdown section */}
      <div 
        className="absolute inset-0 bg-[#9B4719] backdrop-blur-sm pointer-events-none" 
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
      />

      {/* Header */}
      <div className="relative z-10 text-center mb-8 sm:mb-12 md:mb-16 px-4 sm:px-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-[1px] w-12 sm:w-16 md:w-24 bg-gradient-to-r from-transparent via-[#EFD2AA] to-transparent" />
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[family-name:var(--font-crimson)] font-normal text-[#EFD2AA] mb-4 sm:mb-6 uppercase tracking-[0.1em] sm:tracking-[0.12em] elegant-text-shadow">
          Event Details
        </h2>
        <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
          <div className="h-[1px] w-12 sm:w-16 md:w-24 bg-gradient-to-r from-transparent via-[#EFD2AA] to-transparent" />
        </div>
        <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-[#EFD2AA]/80 font-light max-w-xl mx-auto leading-relaxed tracking-wide px-2">
          Everything you need to know about our special day
        </p>
      </div>

      {/* Venue and Event Information */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 mb-8 sm:mb-12 md:mb-16 space-y-6 sm:space-y-10 md:space-y-14">
        
        {/* Ceremony Card */}
        <div className="relative group">
          {/* Subtle glow on hover */}
          <div className="absolute -inset-1 bg-gradient-to-br from-[#9B4719]/20 to-[#9B4719]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />
          
          {/* Main card */}
          <div className="relative elegant-card rounded-xl sm:rounded-2xl overflow-hidden border border-[#9B4719]/30 premium-shadow hover:border-[#9B4719]/50 transition-all duration-300" style={{ backgroundColor: '#EFD2AA' }}>
            {/* Venue Image */}
            <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 overflow-hidden">
              <Image
                src="/Details/Buddy-One Camp.jpg"
                alt="Buddy-One Camp"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1280px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Venue name overlay */}
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 md:bottom-6 md:left-6 right-3 sm:right-4 md:right-6">
                <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-ephesis)] text-white mb-1 sm:mb-2 drop-shadow-lg">
                  Ceremony & Reception
                </p>
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-crimson)] font-normal text-white mb-0.5 sm:mb-1 drop-shadow-lg uppercase tracking-[0.1em] leading-tight">
                  Buddy-One Camp
                </h3>
                <p className="text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] text-white/95 drop-shadow-md tracking-wide">
                  Tuba, Benguet
                </p>
              </div>
            </div>

            {/* Event Details Content */}
            <div className="p-3 sm:p-5 md:p-7 lg:p-9" style={{ backgroundColor: '#EFD2AA' }}>
              {/* Date Section */}
              <div className="text-center mb-5 sm:mb-8 md:mb-10">
                {/* Day name */}
                <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] font-semibold text-[#6A1F08] uppercase tracking-[0.2em] mb-2 sm:mb-3">
                  Friday
                </p>
                
                {/* Month - Script style */}
                <div className="mb-2 sm:mb-4">
                  <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[family-name:var(--font-ephesis)] text-[#6A1F08] leading-none">
                    May
                  </p>
                </div>
                
                {/* Day and Year */}
                <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-7">
                  <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-[family-name:var(--font-crimson)] font-normal text-[#6A1F08] leading-none elegant-text-shadow">
                    29
                  </p>
                  <div className="h-10 sm:h-12 md:h-16 lg:h-20 w-[2px] bg-gradient-to-b from-[#6A1F08] via-[#6A1F08] to-[#6A1F08]" />
                  <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[family-name:var(--font-crimson)] font-light text-[#6A1F08] leading-none">
                    2026
                  </p>
                </div>

                {/* Decorative line */}
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="h-[1px] w-8 sm:w-10 md:w-14 bg-gradient-to-r from-transparent via-[#6A1F08] to-[#6A1F08]" />
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#6A1F08] rounded-full" />
                  <div className="h-[1px] w-8 sm:w-10 md:w-14 bg-gradient-to-l from-transparent via-[#6A1F08] to-[#6A1F08]" />
                </div>

                {/* Time */}
                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-[family-name:var(--font-crimson)] font-semibold text-[#6A1F08] tracking-wide mb-4 sm:mb-6">
                  Ceremony: 2:00 PM
                </p>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-[family-name:var(--font-crimson)] font-semibold text-[#6A1F08] tracking-wide">
                  Reception: 5:30 PM
                </p>
              </div>

              {/* Location Details */}
              <div className="bg-gradient-to-br from-white/40 to-white rounded-xl p-3 sm:p-4 md:p-5 mb-4 sm:mb-6 border border-[#9B4719]/20">
                <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#6A1F08] mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] font-semibold text-[#6A1F08] mb-1.5 sm:mb-2 uppercase tracking-wide">
                      Location
                    </p>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg font-[family-name:var(--font-crimson)] text-[#6A1F08] leading-relaxed">
                      {ceremonyVenueName}
                    </p>
                    {ceremonyVenueDetail && (
                      <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] text-[#6A1F08]/70 leading-relaxed mt-1">
                        {ceremonyVenueDetail}
                      </p>
                    )}
                    <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] text-[#6A1F08]/70 leading-relaxed">
                      {ceremonyAddress}
                    </p>
                  </div>
                  {/* QR Code for Ceremony - Right side */}
                  <div className="flex flex-col items-center gap-1.5 sm:gap-2 flex-shrink-0">
                    <div className="bg-white p-1.5 sm:p-2 md:p-2.5 rounded-lg border border-[#6A1F08]/20 shadow-sm">
                      <QRCodeSVG
                        value={ceremonyMapsLink}
                        size={80}
                        level="M"
                        includeMargin={false}
                        fgColor="#6A1F08"
                        bgColor="#FFFFFF"
                      />
                    </div>
                    <p className="text-[9px] sm:text-[10px] md:text-xs font-[family-name:var(--font-crimson)] text-[#6A1F08]/60 italic text-center max-w-[80px]">
                      Scan for directions
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
                <button
                  onClick={() => openInMaps(ceremonyMapsLink)}
                  className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 md:py-3 bg-[#6A1F08] hover:bg-[#6A1F08]/90 text-[#EFD2AA] rounded-lg font-[family-name:var(--font-crimson)] font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] premium-shadow"
                  aria-label="Get directions to ceremony venue"
                >
                  <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <span>Get Directions</span>
                </button>
                <button
                  onClick={() => copyToClipboard(ceremonyVenue, 'ceremony')}
                  className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 md:py-3 bg-white border-2 border-[#6A1F08]/30 hover:border-[#6A1F08]/50 hover:bg-[#EFD2AA]/50 text-[#6A1F08] rounded-lg font-[family-name:var(--font-crimson)] font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  aria-label="Copy ceremony venue address"
                >
                  {copiedItems.has('ceremony') ? (
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0 text-[#6A1F08]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0 text-[#6A1F08]" />
                  )}
                  <span>{copiedItems.has('ceremony') ? 'Copied!' : 'Copy Address'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Attire Information */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-[1px] w-12 sm:w-16 md:w-24 bg-gradient-to-r from-transparent via-[#EFD2AA] to-transparent" />
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[family-name:var(--font-crimson)] font-normal text-[#EFD2AA] mb-4 sm:mb-6 uppercase tracking-[0.1em] sm:tracking-[0.12em] elegant-text-shadow">
            Attire & Color Palette
          </h3>
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <div className="h-[1px] w-12 sm:w-16 md:w-24 bg-gradient-to-r from-transparent via-[#EFD2AA] to-transparent" />
          </div>
        </div>

        {/* Color Palette Section */}
        <div className="relative group mb-8 sm:mb-10 md:mb-12">
          <div className="relative backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-7 md:p-9 border-2 border-[#9B4719]/30 shadow-lg hover:shadow-xl transition-all duration-300" style={{ backgroundColor: '#EFD2AA' }}>
            <h4 className="text-lg sm:text-xl md:text-2xl font-[family-name:var(--font-crimson)] font-semibold text-[#6A1F08] mb-4 sm:mb-6 uppercase tracking-[0.12em] text-center">
              Color Palette for Guests & Sponsors
            </h4>
            <p className="text-base sm:text-lg md:text-xl font-[family-name:var(--font-crimson)] text-[#6A1F08] leading-relaxed text-center mb-6 sm:mb-8">
              RUSTIC COLOR, TERRACOTTA, ORANGE, NUDE, LIGHT BROWN
            </p>
            <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
              <div className="flex flex-col items-center gap-2 sm:gap-2.5">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full shadow-lg border-2 border-white bg-[#C85A3A] hover:scale-110 hover:shadow-xl transition-all duration-300" />
                <span className="text-xs sm:text-sm font-[family-name:var(--font-crimson)] font-medium text-[#6A1F08]">Rustic</span>
              </div>
              <div className="flex flex-col items-center gap-2 sm:gap-2.5">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full shadow-lg border-2 border-white bg-[#D2691E] hover:scale-110 hover:shadow-xl transition-all duration-300" />
                <span className="text-xs sm:text-sm font-[family-name:var(--font-crimson)] font-medium text-[#6A1F08]">Terracotta</span>
              </div>
              <div className="flex flex-col items-center gap-2 sm:gap-2.5">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full shadow-lg border-2 border-white bg-[#FF8C42] hover:scale-110 hover:shadow-xl transition-all duration-300" />
                <span className="text-xs sm:text-sm font-[family-name:var(--font-crimson)] font-medium text-[#6A1F08]">Orange</span>
              </div>
              <div className="flex flex-col items-center gap-2 sm:gap-2.5">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full shadow-lg border-2 border-white bg-[#E3BC9A] hover:scale-110 hover:shadow-xl transition-all duration-300" />
                <span className="text-xs sm:text-sm font-[family-name:var(--font-crimson)] font-medium text-[#6A1F08]">Nude</span>
              </div>
              <div className="flex flex-col items-center gap-2 sm:gap-2.5">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full shadow-lg border-2 border-white bg-[#D2B48C] hover:scale-110 hover:shadow-xl transition-all duration-300" />
                <span className="text-xs sm:text-sm font-[family-name:var(--font-crimson)] font-medium text-[#6A1F08]">Light Brown</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dress Code Guide Section */}
        <div className="relative group mb-8 sm:mb-10 md:mb-12">
          <div className="relative backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-7 md:p-9 border-2 border-[#9B4719]/30 shadow-lg hover:shadow-xl transition-all duration-300" style={{ backgroundColor: '#EFD2AA' }}>
            <h4 className="text-lg sm:text-xl md:text-2xl font-[family-name:var(--font-crimson)] font-semibold text-[#6A1F08] mb-6 sm:mb-8 uppercase tracking-[0.12em] text-center">
              Dress Code Guide
            </h4>
            
            <div className="space-y-6 sm:space-y-8">
              {/* Principal Sponsors */}
              <div>
                <h5 className="text-base sm:text-lg md:text-xl font-[family-name:var(--font-crimson)] font-semibold text-[#6A1F08] mb-3 sm:mb-4">
                  For Principal Sponsors:
                </h5>
                <div className="space-y-2 sm:space-y-3">
                  <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-[#6A1F08] leading-relaxed">
                    <span className="font-semibold">Men:</span> Formal Barong Tagalog
                  </p>
                  <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-[#6A1F08] leading-relaxed">
                    <span className="font-semibold">Women:</span> Long Gown in Beige, Mocha, or Muted Rose tones
                  </p>
                </div>
              </div>

              {/* Groomsmen & Bridesmaids */}
              <div>
                <h5 className="text-base sm:text-lg md:text-xl font-[family-name:var(--font-crimson)] font-semibold text-[#6A1F08] mb-3 sm:mb-4">
                  For Groomsmen & Bridesmaids:
                </h5>
                <div className="space-y-2 sm:space-y-3">
                  <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-[#6A1F08] leading-relaxed">
                    <span className="font-semibold">Men:</span> White long sleeve with Navy blue pants or slacks
                  </p>
                  <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-[#6A1F08] leading-relaxed">
                    <span className="font-semibold">Women:</span> Long Gown in Terracotta or Dusty Rose
                  </p>
                </div>
              </div>

              {/* Best Man & Maid of Honor */}
              <div>
                <h5 className="text-base sm:text-lg md:text-xl font-[family-name:var(--font-crimson)] font-semibold text-[#6A1F08] mb-3 sm:mb-4">
                  For Best Man & Maid of Honor:
                </h5>
                <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-[#6A1F08] leading-relaxed">
                  Coordinating tones with the entourage, slightly darker or more vibrant
                </p>
              </div>

              {/* Wedding Bearers */}
              <div>
                <h5 className="text-base sm:text-lg md:text-xl font-[family-name:var(--font-crimson)] font-semibold text-[#6A1F08] mb-3 sm:mb-4">
                  For Wedding Bearers:
                </h5>
                <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-[#6A1F08] leading-relaxed">
                  White long sleeve with Navy blue pants or slacks
                </p>
              </div>

              {/* Flower Girls */}
              <div>
                <h5 className="text-base sm:text-lg md:text-xl font-[family-name:var(--font-crimson)] font-semibold text-[#6A1F08] mb-3 sm:mb-4">
                  Flower Girls:
                </h5>
                <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-[#6A1F08] leading-relaxed">
                  Terracotta rustic floral accents
                </p>
              </div>

              {/* Guests */}
              <div>
                <h5 className="text-base sm:text-lg md:text-xl font-[family-name:var(--font-crimson)] font-semibold text-[#6A1F08] mb-3 sm:mb-4">
                  For Guests:
                </h5>
                <div className="space-y-2 sm:space-y-3">
                  <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-[#6A1F08] leading-relaxed">
                    <span className="font-semibold">Men:</span> Long-sleeve polo in neutral or earth tones
                  </p>
                  <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-[#6A1F08] leading-relaxed">
                    <span className="font-semibold">Women:</span> Dress in any earth tones of the theme colors (avoid white or ivory)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Important Reminders Section */}
        <div className="relative group mt-10 sm:mt-14 md:mt-16">
          <div className="absolute -inset-1 bg-gradient-to-br from-[#9B4719]/15 to-[#9B4719]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />
          
          <div className="relative backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-7 md:p-9 border-2 border-[#9B4719]/30 shadow-lg hover:shadow-xl transition-all duration-300" style={{ backgroundColor: '#EFD2AA' }}>
            <h4 className="text-lg sm:text-xl md:text-2xl font-[family-name:var(--font-crimson)] font-semibold text-[#6A1F08] mb-6 sm:mb-7 md:mb-8 uppercase tracking-[0.12em] text-center">
              Important Reminders
            </h4>
            
            {/* Reminders List */}
            <div className="space-y-5 sm:space-y-6 md:space-y-7">
              {/* Attendance Limited */}
              <div className="bg-gradient-to-br from-white/30 via-white/20 to-white rounded-xl p-5 sm:p-6 md:p-7 border border-[#6A1F08]/20">
                <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-[#6A1F08] leading-relaxed">
                  <span className="font-semibold">Invitation Only:</span> As we celebrate this moment with our closest loved ones, we kindly ask that attendance be limited to those named on the invitation.
                </p>
              </div>

              {/* No Boxed Gifts */}
              <div className="bg-gradient-to-br from-white/30 via-white/20 to-white rounded-xl p-5 sm:p-6 md:p-7 border border-[#6A1F08]/20">
                <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-[#6A1F08] leading-relaxed">
                  <span className="font-semibold">Gift Policy:</span> We prefer monetary gift for future use. Gift will be given during the celebration.
                </p>
              </div>

              {/* Adults Only */}
              <div className="bg-gradient-to-br from-white/30 via-white/20 to-white rounded-xl p-5 sm:p-6 md:p-7 border border-[#6A1F08]/20">
                <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-[#6A1F08] leading-relaxed">
                  <span className="font-semibold">Adults-Only Event:</span> We love your little ones, but to keep the celebration intimate, we kindly request an adults-only event. (Children in our family and the entourage are the exception)
                </p>
              </div>

              {/* No Photos */}
              <div className="bg-gradient-to-br from-white/30 via-white/20 to-white rounded-xl p-5 sm:p-6 md:p-7 border border-[#6A1F08]/20">
                <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-[#6A1F08] leading-relaxed">
                  <span className="font-semibold">Photo Policy:</span> We'd love for everyone to be fully present. Please avoid posting photos during the celebration or ahead of time—our photographers will take care of the memories.
                </p>
              </div>

              {/* RSVP Contact */}
              <div className="bg-gradient-to-br from-white/30 via-white/20 to-white rounded-xl p-5 sm:p-6 md:p-7 border border-[#6A1F08]/20">
                <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-[#6A1F08] leading-relaxed">
                  <span className="font-semibold">RSVP Contact:</span> Please reach out to Muriel & Czar (contact information to be updated)
                </p>
              </div>
            </div>

            {/* Thank You Note */}
            <div className="mt-7 sm:mt-8 md:mt-9 pt-6 sm:pt-7 md:pt-8 border-t border-[#6A1F08]/20">
              <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-[#6A1F08] text-center leading-relaxed italic">
                Thank you for your understanding and cooperation. We look forward to celebrating with you!
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

