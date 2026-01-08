"use client"

import { useState, useEffect, useRef } from "react"
import { Section } from "@/components/section"
import {
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Mail,
  MessageSquare,
  RefreshCw,
  X,
  Heart,
  Sparkles,
  Phone,
  Users,
} from "lucide-react"
import { Cormorant_Garamond } from "next/font/google"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
})

interface Guest {
  Name: string
  Email: string
  RSVP: string
  Guest: string
  Message: string
}

export function GuestList() {
  const [guests, setGuests] = useState<Guest[]>([])
  const [filteredGuests, setFilteredGuests] = useState<Guest[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [modalStep, setModalStep] = useState<'search' | 'form' | 'request'>('search')
  const [hasResponded, setHasResponded] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    RSVP: "",
    Guest: "1",
    Message: "",
  })

  // Request to Join form state
  const [requestFormData, setRequestFormData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Guest: "1",
    Message: "",
  })

  const searchRef = useRef<HTMLDivElement>(null)

  // Fetch all guests on component mount
  useEffect(() => {
    fetchGuests()
  }, [])

  // Filter guests based on search query
  // Strict sequence matching: only show suggestions after 4 characters
  // Must match from the start of the name (not substring in middle)
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.trim().length < 4) {
      setFilteredGuests([])
      setIsSearching(false)
      return
    }

    const query = searchQuery.toLowerCase().trim()
    
    // Strict sequence matching from the start
    const filtered = guests.filter((guest) => {
      const guestName = guest.Name.toLowerCase()
      // Check if guest name starts with the query sequence
      return guestName.startsWith(query)
    })

    setFilteredGuests(filtered)
    setIsSearching(filtered.length > 0)
  }, [searchQuery, guests])

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearching(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const fetchGuests = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/guests")
      if (!response.ok) {
        throw new Error("Failed to fetch guests")
      }
      const data = await response.json()
      setGuests(data)
    } catch (error) {
      console.error("Error fetching guests:", error)
      setError("Failed to load guest list")
      setTimeout(() => setError(null), 5000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearchSelect = (guest: Guest) => {
    setSelectedGuest(guest)
    setSearchQuery(guest.Name)
    setIsSearching(false)
    
    // Set form data with existing guest info
    setFormData({
      Name: guest.Name,
      Email: guest.Email && guest.Email !== "Pending" ? guest.Email : "",
      RSVP: guest.RSVP || "",
      Guest: guest.Guest && guest.Guest !== "" ? guest.Guest : "1",
      Message: guest.Message || "",
    })
    
    // Check if guest has already responded
    setHasResponded(!!(guest.RSVP && guest.RSVP.trim() !== ""))
  }
  
  const handleConfirmRSVP = () => {
    if (!selectedGuest) return
    setModalStep('form')
  }

  const handleRequestToJoin = () => {
    // Pre-fill name from search query if available
    if (searchQuery.trim()) {
      setRequestFormData(prev => ({ ...prev, Name: searchQuery.trim() }))
    }
    setModalStep('request')
  }

  const handleRequestFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setRequestFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitRequest = async () => {
    if (!requestFormData.Name.trim()) {
      setError("Please enter your full name")
      setTimeout(() => setError(null), 5000)
      return
    }

    if (!requestFormData.Guest || requestFormData.Guest === "0") {
      setError("Please select number of guests")
      setTimeout(() => setError(null), 5000)
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch("/api/guest-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Name: requestFormData.Name.trim(),
          Email: requestFormData.Email.trim() || "",
          Phone: requestFormData.Phone.trim() || "",
          RSVP: "",
          Guest: requestFormData.Guest,
          Message: requestFormData.Message.trim() || "",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit request")
      }

      setSuccess("Your request has been submitted! We'll review it and get back to you soon.")
      
      setTimeout(() => {
        setShowModal(false)
        setModalStep('search')
        setSearchQuery("")
        setRequestFormData({
          Name: "",
          Email: "",
          Phone: "",
          Guest: "1",
          Message: "",
        })
        setSuccess(null)
      }, 3000)
    } catch (error: any) {
      console.error("Error submitting request:", error)
      setError(error?.message || "Failed to submit request. Please try again.")
      setTimeout(() => setError(null), 5000)
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleOpenModal = () => {
    setShowModal(true)
    setModalStep('search')
  }

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitRSVP = async () => {
    if (!selectedGuest) return

    if (!formData.RSVP) {
      setError("Please select if you can attend")
      setTimeout(() => setError(null), 5000)
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch("/api/guests", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "update",
          originalName: selectedGuest.Name,
          Name: formData.Name,
          Email: formData.Email || "Pending",
          RSVP: formData.RSVP,
          Guest: formData.RSVP === "Yes" ? (formData.Guest || "1") : "0",
          Message: formData.Message,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit RSVP")
      }

      // Show success and close modal after delay
      setSuccess("Thank you for your response!")
      setHasResponded(true)
      
      // Trigger event to refresh Book of Guests
      window.dispatchEvent(new Event("rsvpUpdated"))
      
      // Close modal and reset after showing success
      setTimeout(() => {
        setShowModal(false)
        setModalStep('search')
        setSearchQuery("")
        setSelectedGuest(null)
        setSuccess(null)
        fetchGuests()
      }, 3000)
    } catch (error) {
      console.error("Error submitting RSVP:", error)
      setError("Failed to submit RSVP. Please try again.")
      setTimeout(() => setError(null), 5000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setModalStep('search')
    setSelectedGuest(null)
    setSearchQuery("")
    setFormData({ Name: "", Email: "", RSVP: "", Guest: "1", Message: "" })
    setRequestFormData({ Name: "", Email: "", Phone: "", Guest: "1", Message: "" })
    setHasResponded(false)
    setError(null)
    setIsSearching(false)
  }

  return (
    <Section id="guest-list" className="relative z-30 py-6 sm:py-10 md:py-12 lg:py-16 overflow-hidden">
      {/* Corner Decorations - All 4 Corners */}
      <div className="absolute top-0 left-0 z-[1] pointer-events-none">
        <img 
          src="/decoration/top-right-corner-automleaves.png" 
          alt="Autumn leaves decoration"
          className="w-32 sm:w-40 md:w-48 lg:w-56 xl:w-64 h-auto opacity-60 scale-x-[-1]"
        />
      </div>
      <div className="absolute top-0 right-0 z-[1] pointer-events-none">
        <img 
          src="/decoration/top-right-corner-automleaves.png" 
          alt="Autumn leaves decoration"
          className="w-32 sm:w-40 md:w-48 lg:w-56 xl:w-64 h-auto opacity-60"
        />
      </div>
      <div className="absolute bottom-0 left-0 z-[1] pointer-events-none">
        <img 
          src="/decoration/top-right-corner-automleaves.png" 
          alt="Autumn leaves decoration"
          className="w-32 sm:w-40 md:w-48 lg:w-56 xl:w-64 h-auto opacity-60 scale-x-[-1] scale-y-[-1]"
        />
      </div>
      <div className="absolute bottom-0 right-0 z-[1] pointer-events-none">
        <img 
          src="/decoration/top-right-corner-automleaves.png" 
          alt="Autumn leaves decoration"
          className="w-32 sm:w-40 md:w-48 lg:w-56 xl:w-64 h-auto opacity-60 scale-y-[-1]"
        />
      </div>

      {/* Glass Effect Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="relative backdrop-blur-xl bg-[#BDCBCB] border border-[#434F39]/30 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 lg:p-12">
          {/* Header */}
          <div className="relative z-10 text-center">
            <h2
              className="font-[family-name:var(--font-crimson)] font-normal text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] xl:text-[36px] leading-[28px] text-[#85562A] mb-3 sm:mb-4 md:mb-5 uppercase"
            >
              WE RESERVED SEATS FOR YOU!
            </h2>
            
            <p className={`${cormorant.className} text-sm sm:text-base md:text-lg text-[#85562A] font-light max-w-2xl mx-auto leading-relaxed px-2 mb-3 sm:mb-4`}>
              We have chosen to have a small and intimate wedding ceremony.<br />
              Only those closest to us will be in attendance.
            </p>
            
            <p className={`${cormorant.className} text-xs sm:text-sm md:text-base text-[#85562A] font-medium max-w-xl mx-auto px-2 mb-4 sm:mb-5`}>
              Kindly confirm your presence on or before:<br />
              <span className="font-[family-name:var(--font-crimson)] font-light text-base sm:text-lg md:text-xl text-[#85562A]">November 15, 2025</span>
            </p>
            
            {/* Decorative element */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-4 sm:mb-5 md:mb-6">
              <div className="w-6 sm:w-8 md:w-12 lg:w-16 h-px bg-gradient-to-r from-transparent via-[#434F39] to-transparent" />
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#434F39]/50 rounded-full" />
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/85 rounded-full" />
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#434F39]/50 rounded-full" />
              <div className="w-6 sm:w-8 md:w-12 lg:w-16 h-px bg-gradient-to-l from-transparent via-[#434F39] to-transparent" />
            </div>
            
            {/* RSVP Button */}
            <div className="flex justify-center">
              <button
                onClick={handleOpenModal}
                className="bg-[#434F39] hover:bg-[#434F39]/90 active:bg-[#434F39]/95 text-white px-8 sm:px-10 md:px-12 py-3 sm:py-3.5 md:py-4 rounded-full text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] font-semibold shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-100 flex items-center justify-center gap-2"
              >
                <Heart className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" />
                RSVP
              </button>
            </div>
          </div>
        </div>
      </div>


      {/* RSVP Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-1 sm:p-2 md:p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="relative w-full max-w-md sm:max-w-lg mx-1 sm:mx-2 md:mx-4 bg-white rounded-xl sm:rounded-2xl shadow-2xl border-2 border-[#434F39]/30 overflow-hidden animate-in zoom-in-95 duration-300 max-h-[95vh] flex flex-col">
              
              {/* Step 1: Guest Search */}
              {modalStep === 'search' && (
                <>
                  {/* Modal Header */}
                  <div className="relative bg-[#434F39] p-3 sm:p-4 md:p-5 lg:p-6 flex-shrink-0">
                    <div className="relative flex items-start justify-between gap-1.5 sm:gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 mb-1 sm:mb-1.5 md:mb-2">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <Search className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 text-white" />
                          </div>
                          <h3 className="font-[family-name:var(--font-crimson)] font-normal text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] xl:text-[36px] leading-[28px] text-white uppercase">
                            FIND YOUR NAME
                          </h3>
                        </div>
                      </div>
                      <button
                        onClick={handleCloseModal}
                        className="text-white/80 hover:text-white transition-colors p-0.5 sm:p-1 md:p-2 hover:bg-white/20 rounded-full flex-shrink-0"
                      >
                        <X className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Modal Content - Search */}
                  <div className="p-3 sm:p-4 md:p-5 lg:p-6 overflow-y-auto flex-1 min-h-0">
                    <div className="mb-4 sm:mb-5 md:mb-6">
                      <p className="text-xs sm:text-sm md:text-base text-[#434F39] mb-2 leading-relaxed font-[family-name:var(--font-crimson)]">
                        Please search for your name and confirm your RSVP.
                      </p>
                      <p className="text-[10px] sm:text-xs md:text-sm text-[#434F39]/70 font-[family-name:var(--font-crimson)]">
                        Type at least 4 characters to search. If your name doesn't appear, you can request to join our celebration.
                      </p>
                    </div>

                    <div ref={searchRef} className="relative mb-4 sm:mb-5 md:mb-6">
                      <label className="block text-xs sm:text-sm font-normal text-[#434F39] mb-1.5 sm:mb-2 font-[family-name:var(--font-crimson)]">
                        Search Name
                      </label>
                      <div className="relative">
                        <Search className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#434F39]/60 pointer-events-none transition-colors duration-200" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Type at least 4 characters..."
                          className="w-full pl-8 sm:pl-10 pr-2.5 sm:pr-3 py-2.5 sm:py-3 md:py-3.5 border-2 border-[#434F39]/30 focus:border-[#434F39] rounded-lg text-xs sm:text-sm font-[family-name:var(--font-crimson)] text-[#434F39] placeholder:text-[#434F39]/50 transition-all duration-300 hover:border-[#434F39]/50 focus:ring-2 focus:ring-[#434F39]/20 bg-white shadow-sm focus:shadow-md"
                        />
                      </div>
                      
                      {/* Autocomplete dropdown */}
                      {isSearching && filteredGuests.length > 0 && (
                        <div className="absolute z-[9999] w-full mt-1 sm:mt-1.5 md:mt-2 bg-white border-2 border-[#434F39]/20 rounded-lg shadow-xl max-h-48 sm:max-h-60 overflow-y-auto">
                          {filteredGuests.map((guest, index) => (
                            <button
                              key={index}
                              onClick={() => handleSearchSelect(guest)}
                              className="w-full px-2.5 sm:px-3 py-2.5 sm:py-3 text-left hover:bg-[#BDCBCB]/30 active:bg-[#BDCBCB]/40 transition-all duration-200 flex items-center gap-2 sm:gap-3 border-b border-[#434F39]/10 last:border-b-0 group"
                            >
                              <div className="relative flex-shrink-0">
                                <div className="bg-[#434F39] p-1 sm:p-1.5 rounded-full shadow-sm group-hover:shadow-md transition-all duration-300">
                                  <User className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white" />
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-[family-name:var(--font-crimson)] font-semibold text-xs sm:text-sm text-[#434F39] group-hover:text-[#434F39]/80 transition-colors duration-200 truncate">
                                  {guest.Name}
                                </div>
                              </div>
                              <div className="text-[#434F39]/50 group-hover:text-[#434F39] group-hover:translate-x-1 transition-all duration-200 flex-shrink-0">
                                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                      
                      {searchQuery.length >= 4 && filteredGuests.length === 0 && !isSearching && (
                        <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-[#434F39]/10 border border-[#434F39]/20 rounded-lg">
                          <div className="flex items-start gap-2 sm:gap-3">
                            <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#434F39] flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-xs sm:text-sm text-[#434F39] font-[family-name:var(--font-crimson)] font-medium mb-1">
                                Name not found in our guest list
                              </p>
                              <p className="text-[10px] sm:text-xs text-[#434F39]/70 font-[family-name:var(--font-crimson)]">
                                Don't worry! You can request to join our celebration.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4">
                      <button
                        onClick={handleCloseModal}
                        className="flex-1 bg-white border-2 border-[#434F39]/30 text-[#434F39] py-2.5 sm:py-3 md:py-3.5 rounded-lg text-xs sm:text-sm font-[family-name:var(--font-crimson)] font-semibold transition-all duration-300 hover:bg-[#434F39]/5 hover:border-[#434F39]/50 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        Cancel
                      </button>
                      {searchQuery.length >= 4 && filteredGuests.length === 0 && !isSearching ? (
                        <button
                          onClick={handleRequestToJoin}
                          disabled={isLoading || !searchQuery.trim()}
                          className="flex-1 bg-[#434F39] hover:bg-[#434F39]/90 active:bg-[#434F39]/95 text-white py-2.5 sm:py-3 md:py-3.5 rounded-lg text-xs sm:text-sm font-[family-name:var(--font-crimson)] font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                        >
                          {isLoading ? (
                            <>
                              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              Submitting...
                            </>
                          ) : (
                            <>
                              <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="currentColor" />
                              Request to Join
                            </>
                          )}
                        </button>
                      ) : (
                        <button
                          onClick={handleConfirmRSVP}
                          disabled={!selectedGuest || isLoading}
                          className="flex-1 bg-[#434F39] hover:bg-[#434F39]/90 active:bg-[#434F39]/95 text-white py-2.5 sm:py-3 md:py-3.5 rounded-lg text-xs sm:text-sm font-[family-name:var(--font-crimson)] font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                        >
                          {isLoading ? (
                            <>
                              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              Loading...
                            </>
                          ) : (
                            <>
                              <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                              Confirm RSVP
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* Step 2: RSVP Form */}
              {modalStep === 'form' && (
                <>
                  {/* Modal Header */}
                  <div className="relative bg-[#434F39] p-3 sm:p-4 md:p-5 lg:p-6 flex-shrink-0">
                    <div className="relative flex items-start justify-between gap-1.5 sm:gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 mb-1 sm:mb-1.5 md:mb-2 lg:mb-3">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <Heart className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 text-white" fill="white" />
                          </div>
                          <h3 className="font-[family-name:var(--font-crimson)] font-normal text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] xl:text-[36px] leading-[28px] text-white uppercase">
                            YOU'RE INVITED!
                          </h3>
                        </div>
                        <p className="text-white/95 text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg font-[family-name:var(--font-crimson)] leading-tight sm:leading-normal">
                          Hello <span className="font-extrabold text-white drop-shadow-[0_1px_6px_rgba(255,255,255,0.55)]">{selectedGuest?.Name}</span>, you are invited to our wedding!
                        </p>
                      </div>
                      {!hasResponded && (
                        <button
                          onClick={handleCloseModal}
                          className="text-white/80 hover:text-white transition-colors p-0.5 sm:p-1 md:p-2 hover:bg-white/20 rounded-full flex-shrink-0"
                        >
                          <X className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Modal Content */}
                  <div className="p-2.5 sm:p-3 md:p-4 lg:p-5 xl:p-6 overflow-y-auto flex-1 min-h-0">
                {hasResponded ? (
                  // Thank you message for guests who already responded
                  <div className="text-center py-3 sm:py-4 md:py-6">
                    <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-[#F7E6CA] rounded-full mb-2 sm:mb-3 md:mb-4">
                      <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-[#D2A4A4]" />
                    </div>
                    <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-serif font-bold text-[#243127] mb-1.5 sm:mb-2 md:mb-3">
                      Thank You for Responding!
                    </h4>
                    <p className="text-[#E0B4B1] text-[10px] sm:text-xs md:text-sm mb-2 sm:mb-3 md:mb-4 px-2">
                      We've received your RSVP and look forward to celebrating with you!
                    </p>
                    <div className="bg-[#F0F0EE]/40 rounded-lg p-2.5 sm:p-3 md:p-4 border border-[#F7E6CA]/70 space-y-2 sm:space-y-2.5 md:space-y-3">
                      <div className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 mb-1.5 sm:mb-2">
                        {selectedGuest?.RSVP === "Yes" && (
                          <>
                            <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-green-600" />
                            <span className="text-xs sm:text-sm md:text-base font-semibold text-green-600">
                              You're Attending!
                            </span>
                          </>
                        )}
                        {selectedGuest?.RSVP === "No" && (
                          <>
                            <XCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-red-600" />
                            <span className="text-xs sm:text-sm md:text-base font-semibold text-red-600">
                              Unable to Attend
                            </span>
                          </>
                        )}
                      </div>
                      {selectedGuest?.RSVP === "Yes" && selectedGuest?.Guest && (
                        <div className="bg-[#F0F0EE]/60 rounded-lg p-2 sm:p-2.5 md:p-3 border border-[#F7E6CA]/80">
                          <div className="text-center">
                            <p className="text-[10px] sm:text-xs text-[#E0B4B1] mb-1 font-medium">Number of Guests</p>
                            <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#243127]">
                              {selectedGuest.Guest || "1"}
                            </p>
                          </div>
                        </div>
                      )}
                      {selectedGuest && selectedGuest.Message && selectedGuest.Message.trim() !== "" && (
                        <div className="pt-1.5 sm:pt-2 border-t border-[#F7E6CA]/70">
                          <p className="text-[10px] sm:text-xs text-[#E0B4B1] italic px-1">
                            "{selectedGuest.Message}"
                          </p>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={handleCloseModal}
                      className="mt-3 sm:mt-4 md:mt-6 !bg-[#D2A4A4] hover:!bg-[#E0B4B1] text-white px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  // RSVP Form for guests who haven't responded
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleSubmitRSVP()
                    }}
                    className="space-y-2.5 sm:space-y-3 md:space-y-4"
                  >
                    {/* Can you attend? */}
                    <div>
                    <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-normal text-[#434F39] mb-1.5 sm:mb-2 font-[family-name:var(--font-crimson)]">
                        <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#434F39] flex-shrink-0" />
                        <span>Can you attend? *</span>
                      </label>
                      <div className="grid grid-cols-2 gap-1.5 sm:gap-2 md:gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, RSVP: "Yes", Guest: "1" }))
                          }
                          className={`relative p-2.5 sm:p-3 md:p-3.5 lg:p-4 rounded-lg border-2 transition-all duration-300 ${
                            formData.RSVP === "Yes"
                              ? "border-green-600 bg-green-50 shadow-md scale-105"
                              : "border-[#434F39]/30 bg-white hover:border-[#434F39]/50 hover:shadow-sm hover:bg-[#BDCBCB]/10"
                          }`}
                        >
                          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                            <CheckCircle
                              className={`h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 ${
                                formData.RSVP === "Yes" ? "text-green-700" : "text-[#434F39]/50"
                              }`}
                            />
                            <span
                              className={`text-xs sm:text-sm font-[family-name:var(--font-crimson)] font-bold ${
                                formData.RSVP === "Yes" ? "text-green-700" : "text-[#434F39]"
                              }`}
                            >
                              Yes!
                            </span>
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, RSVP: "No" }))}
                          className={`relative p-2.5 sm:p-3 md:p-3.5 lg:p-4 rounded-lg border-2 transition-all duration-300 ${
                            formData.RSVP === "No"
                              ? "border-red-500 bg-red-50 shadow-md scale-105"
                              : "border-[#434F39]/30 bg-white hover:border-[#434F39]/50 hover:shadow-sm hover:bg-[#BDCBCB]/10"
                          }`}
                        >
                          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                            <XCircle
                              className={`h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 ${
                                formData.RSVP === "No" ? "text-red-600" : "text-[#434F39]/50"
                              }`}
                            />
                            <span
                              className={`text-xs sm:text-sm font-[family-name:var(--font-crimson)] font-bold ${
                                formData.RSVP === "No" ? "text-red-600" : "text-[#434F39]"
                              }`}
                            >
                              Sorry, No
                            </span>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Number of Guests - Only show if attending */}
                    {formData.RSVP === "Yes" && (
                      <div>
                        <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-[#434F39] mb-1.5 sm:mb-2 font-[family-name:var(--font-crimson)]">
                          <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#434F39] flex-shrink-0" />
                          <span>Number of Guests *</span>
                        </label>
                        <select
                          name="Guest"
                          value={formData.Guest}
                          onChange={handleFormChange}
                          required
                          className="w-full px-2.5 sm:px-3 py-2 sm:py-2.5 border-2 border-[#434F39]/30 focus:border-[#434F39] rounded-lg text-xs sm:text-sm font-[family-name:var(--font-crimson)] text-[#434F39] transition-all duration-300 focus:ring-2 focus:ring-[#434F39]/20 bg-white"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <option key={num} value={num.toString()}>
                              {num}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Message to the couple */}
                    <div>
                    <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-normal text-[#434F39] mb-1.5 sm:mb-2 font-[family-name:var(--font-crimson)] flex-wrap">
                      <MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#434F39] flex-shrink-0" />
                        <span>Your Message to the Couple</span>
                      <span className="text-[10px] sm:text-xs font-normal text-[#434F39]/60">(Optional)</span>
                      </label>
                      <textarea
                        name="Message"
                        value={formData.Message}
                        onChange={handleFormChange}
                        placeholder="Share your excitement..."
                        rows={3}
                      className="w-full px-2.5 sm:px-3 py-2 sm:py-2.5 border-2 border-[#434F39]/30 focus:border-[#434F39] rounded-lg text-xs sm:text-sm font-[family-name:var(--font-crimson)] text-[#434F39] placeholder:text-[#434F39]/50 transition-all duration-300 focus:ring-2 focus:ring-[#434F39]/20 resize-none bg-white"
                      />
                    </div>

                    {/* Email */}
                    <div>
                    <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-normal text-[#434F39] mb-1.5 sm:mb-2 font-[family-name:var(--font-crimson)] flex-wrap">
                        <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#434F39] flex-shrink-0" />
                        <span>Your Email Address</span>
                        <span className="text-[10px] sm:text-xs font-normal text-[#434F39]/60">(Optional)</span>
                      </label>
                      <input
                        type="email"
                        name="Email"
                        value={formData.Email}
                        onChange={handleFormChange}
                        placeholder="your.email@example.com"
                        className="w-full px-2.5 sm:px-3 py-2 sm:py-2.5 border-2 border-[#434F39]/30 focus:border-[#434F39] rounded-lg text-xs sm:text-sm font-[family-name:var(--font-crimson)] text-[#434F39] placeholder:text-[#434F39]/50 transition-all duration-300 focus:ring-2 focus:ring-[#434F39]/20 bg-white"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2 sm:pt-3">
                      <button
                        type="submit"
                        disabled={isLoading || !formData.RSVP}
                        className="w-full bg-[#434F39] hover:bg-[#434F39]/90 active:bg-[#434F39]/95 text-white py-2.5 sm:py-3 md:py-3.5 rounded-lg text-xs sm:text-sm font-[family-name:var(--font-crimson)] font-semibold shadow-md transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <>
                            <RefreshCw className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" />
                            <span className="text-xs sm:text-sm">Submitting...</span>
                          </>
                        ) : (
                          <>
                            <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="currentColor" />
                            <span className="text-xs sm:text-sm">Submit RSVP</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
                  </div>
                </>
              )}

              {/* Step 3: Request to Join Form */}
              {modalStep === 'request' && (
                <>
                  {/* Modal Header */}
                  <div className="relative bg-[#434F39] p-3 sm:p-4 md:p-5 lg:p-6 flex-shrink-0">
                    <div className="relative flex items-start justify-between gap-1.5 sm:gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 mb-1 sm:mb-1.5 md:mb-2 lg:mb-3">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <Users className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 text-white" />
                          </div>
                          <h3 className="font-[family-name:var(--font-crimson)] font-normal text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] xl:text-[36px] leading-[28px] text-white uppercase">
                            REQUEST TO JOIN
                          </h3>
                        </div>
                        <p className="text-white/95 text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg font-[family-name:var(--font-crimson)] leading-tight sm:leading-normal">
                          Hi <span className="font-extrabold text-white">{requestFormData.Name || 'there'}</span> — want to celebrate with us? Send a request!
                        </p>
                      </div>
                      <button
                        onClick={handleCloseModal}
                        className="text-white/80 hover:text-white transition-colors p-0.5 sm:p-1 md:p-2 hover:bg-white/20 rounded-full flex-shrink-0"
                      >
                        <X className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Modal Content - Request Form */}
                  <div className="p-2.5 sm:p-3 md:p-4 lg:p-5 xl:p-6 overflow-y-auto flex-1 min-h-0">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                        handleSubmitRequest()
                      }}
                      className="space-y-2.5 sm:space-y-3 md:space-y-4"
                    >
                      {/* Full Name */}
                      <div>
                        <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-normal text-[#434F39] mb-1.5 sm:mb-2 font-[family-name:var(--font-crimson)]">
                          <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#434F39] flex-shrink-0" />
                          <span>Full Name *</span>
                        </label>
                        <input
                          type="text"
                          name="Name"
                          value={requestFormData.Name}
                          onChange={handleRequestFormChange}
                          placeholder="Enter your full name"
                          required
                          className="w-full px-2.5 sm:px-3 py-2 sm:py-2.5 border-2 border-[#434F39]/30 focus:border-[#434F39] rounded-lg text-xs sm:text-sm font-[family-name:var(--font-crimson)] text-[#434F39] placeholder:text-[#434F39]/50 transition-all duration-300 focus:ring-2 focus:ring-[#434F39]/20 bg-white"
                        />
                      </div>

                      {/* Email Address */}
                      <div>
                        <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-normal text-[#434F39] mb-1.5 sm:mb-2 font-[family-name:var(--font-crimson)] flex-wrap">
                          <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#434F39] flex-shrink-0" />
                          <span>Email Address</span>
                          <span className="text-[10px] sm:text-xs font-normal text-[#434F39]/60">(Optional)</span>
                        </label>
                        <input
                          type="email"
                          name="Email"
                          value={requestFormData.Email}
                          onChange={handleRequestFormChange}
                          placeholder="your.email@example.com"
                          className="w-full px-2.5 sm:px-3 py-2 sm:py-2.5 border-2 border-[#434F39]/30 focus:border-[#434F39] rounded-lg text-xs sm:text-sm font-[family-name:var(--font-crimson)] text-[#434F39] placeholder:text-[#434F39]/50 transition-all duration-300 focus:ring-2 focus:ring-[#434F39]/20 bg-white"
                        />
                      </div>

                      {/* Phone Number */}
                      <div>
                        <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-normal text-[#434F39] mb-1.5 sm:mb-2 font-[family-name:var(--font-crimson)] flex-wrap">
                          <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#434F39] flex-shrink-0" />
                          <span>Phone Number</span>
                          <span className="text-[10px] sm:text-xs font-normal text-[#434F39]/60">(Optional)</span>
                        </label>
                        <input
                          type="tel"
                          name="Phone"
                          value={requestFormData.Phone}
                          onChange={handleRequestFormChange}
                          placeholder="+1 (555) 123-4567"
                          className="w-full px-2.5 sm:px-3 py-2 sm:py-2.5 border-2 border-[#434F39]/30 focus:border-[#434F39] rounded-lg text-xs sm:text-sm font-[family-name:var(--font-crimson)] text-[#434F39] placeholder:text-[#434F39]/50 transition-all duration-300 focus:ring-2 focus:ring-[#434F39]/20 bg-white"
                        />
                      </div>

                      {/* Number of Guests */}
                      <div>
                        <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-normal text-[#434F39] mb-1.5 sm:mb-2 font-[family-name:var(--font-crimson)]">
                          <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#434F39] flex-shrink-0" />
                          <span>Number of Guests *</span>
                        </label>
                        <select
                          name="Guest"
                          value={requestFormData.Guest}
                          onChange={handleRequestFormChange}
                          required
                          className="w-full px-2.5 sm:px-3 py-2 sm:py-2.5 border-2 border-[#434F39]/30 focus:border-[#434F39] rounded-lg text-xs sm:text-sm font-[family-name:var(--font-crimson)] text-[#434F39] transition-all duration-300 focus:ring-2 focus:ring-[#434F39]/20 bg-white"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <option key={num} value={num.toString()}>
                              {num}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-normal text-[#434F39] mb-1.5 sm:mb-2 font-[family-name:var(--font-crimson)] flex-wrap">
                          <MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#434F39] flex-shrink-0" />
                          <span>Message</span>
                          <span className="text-[10px] sm:text-xs font-normal text-[#434F39]/60">(Optional)</span>
                        </label>
                        <textarea
                          name="Message"
                          value={requestFormData.Message}
                          onChange={handleRequestFormChange}
                          placeholder="Share why you'd like to join..."
                          rows={3}
                          className="w-full px-2.5 sm:px-3 py-2 sm:py-2.5 border-2 border-[#434F39]/30 focus:border-[#434F39] rounded-lg text-xs sm:text-sm font-[family-name:var(--font-crimson)] text-[#434F39] placeholder:text-[#434F39]/50 transition-all duration-300 focus:ring-2 focus:ring-[#434F39]/20 resize-none bg-white"
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="pt-2 sm:pt-3">
                        <button
                          type="submit"
                          disabled={isLoading || !requestFormData.Name.trim()}
                          className="w-full bg-[#434F39] hover:bg-[#434F39]/90 active:bg-[#434F39]/95 text-white py-2.5 sm:py-3 md:py-3.5 rounded-lg text-xs sm:text-sm font-[family-name:var(--font-crimson)] font-semibold shadow-md transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                          {isLoading ? (
                            <>
                              <RefreshCw className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" />
                              <span className="text-xs sm:text-sm">Sending Request...</span>
                            </>
                          ) : (
                            <>
                              <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="currentColor" />
                              <span className="text-xs sm:text-sm">Send Request</span>
                            </>
                          )}
                        </button>
                      </div>
                    </form>

                    {/* Error Message */}
                    {error && !success && (
                      <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-start gap-2 sm:gap-3">
                          <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <span className="text-red-600 font-[family-name:var(--font-crimson)] font-semibold text-[10px] sm:text-xs md:text-sm">{error}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Enhanced Success Overlay - for RSVP form */}
              {success && modalStep === 'form' && (
                <div className="absolute inset-0 bg-[#434F39]/98 backdrop-blur-md flex items-center justify-center z-50 animate-in fade-in duration-300 p-2 sm:p-3 md:p-4">
                  <div className="text-center p-3 sm:p-4 md:p-5 lg:p-6 max-w-sm mx-auto">
                    {/* Enhanced Icon Circle */}
                    <div className="relative inline-flex items-center justify-center mb-3 sm:mb-4">
                      {/* Animated rings */}
                      <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping" />
                      <div className="absolute inset-0 rounded-full border-2 border-white/30" />
                      {/* Icon container */}
                      <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-white rounded-full flex items-center justify-center shadow-xl">
                        <CheckCircle className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-10 lg:w-10 text-[#434F39]" strokeWidth={2.5} />
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-[family-name:var(--font-crimson)] font-bold text-white mb-2 sm:mb-3">
                      RSVP Confirmed!
                    </h4>
                    
                    {/* Message based on RSVP response */}
                    {formData.RSVP === "Yes" && (
                      <div className="space-y-1 sm:space-y-1.5 mb-2 sm:mb-3">
                        <p className="text-white/95 text-xs sm:text-sm font-[family-name:var(--font-crimson)] font-medium">
                          We're thrilled you'll be joining us!
                        </p>
                        <p className="text-white/80 text-[10px] sm:text-xs font-[family-name:var(--font-crimson)]">
                          Your response has been recorded
                        </p>
                      </div>
                    )}
                    {formData.RSVP === "No" && (
                      <p className="text-white/90 text-xs sm:text-sm mb-2 sm:mb-3 font-[family-name:var(--font-crimson)]">
                        We'll miss you, but thank you for letting us know.
                      </p>
                    )}
                    {!formData.RSVP && (
                      <p className="text-white/90 text-xs sm:text-sm mb-2 sm:mb-3 font-[family-name:var(--font-crimson)]">
                        Thank you for your response!
                      </p>
                    )}
                    
                    {/* Subtle closing indicator */}
                    <div className="flex items-center justify-center gap-1 sm:gap-1.5 mt-2 sm:mt-3">
                      <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white/60 rounded-full animate-pulse" />
                      <p className="text-white/70 text-[10px] sm:text-xs font-[family-name:var(--font-crimson)]">
                        This will close automatically
                      </p>
                      <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white/60 rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>
              )}

              {/* Enhanced Success Overlay - for Request form */}
              {success && modalStep === 'request' && (
                <div className="absolute inset-0 bg-[#800A06]/98 backdrop-blur-md flex items-center justify-center z-50 animate-in fade-in duration-300 p-2 sm:p-3 md:p-4">
                  <div className="text-center p-3 sm:p-4 md:p-5 lg:p-6 max-w-sm mx-auto">
                    {/* Enhanced Icon Circle */}
                    <div className="relative inline-flex items-center justify-center mb-3 sm:mb-4">
                      {/* Animated rings */}
                      <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping" />
                      <div className="absolute inset-0 rounded-full border-2 border-white/30" />
                      {/* Icon container */}
                      <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-white rounded-full flex items-center justify-center shadow-xl">
                        <CheckCircle className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-10 lg:w-10 text-[#800A06]" strokeWidth={2.5} />
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-[family-name:var(--font-crimson)] font-bold text-white mb-2 sm:mb-3">
                      Request Submitted!
                    </h4>
                    
                    <p className="text-white/90 text-xs sm:text-sm mb-2 sm:mb-3 font-[family-name:var(--font-crimson)]">
                      We'll review your request and get back to you soon.
                    </p>
                    
                    {/* Subtle closing indicator */}
                    <div className="flex items-center justify-center gap-1 sm:gap-1.5 mt-2 sm:mt-3">
                      <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white/60 rounded-full animate-pulse" />
                      <p className="text-white/70 text-[10px] sm:text-xs font-[family-name:var(--font-crimson)]">
                        This will close automatically
                      </p>
                      <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white/60 rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>
              )}

              {/* Error message */}
              {error && !success && (
                <div className="px-2 sm:px-2.5 md:px-4 lg:px-6 xl:px-8 pb-2 sm:pb-2.5 md:pb-4 lg:pb-6">
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-2 sm:p-2.5 md:p-3 lg:p-4">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <AlertCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-red-600 flex-shrink-0" />
                      <span className="text-red-600 font-[family-name:var(--font-crimson)] font-semibold text-[10px] sm:text-xs md:text-sm">{error}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      {/* Floating Status Messages (outside modals) */}
      {success && !showModal && (
        <div className="fixed top-16 sm:top-20 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-2 sm:mx-4">
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-2 sm:p-3 md:p-4 shadow-lg animate-in slide-in-from-top">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-green-600" />
              <span className="text-green-600 font-semibold text-xs sm:text-sm md:text-base">{success}</span>
            </div>
          </div>
        </div>
      )}
    </Section>
  )
}