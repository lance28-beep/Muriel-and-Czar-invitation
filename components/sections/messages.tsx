"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import { MessageCircle, Heart, Sparkles } from "lucide-react"
import { Section } from "@/components/section"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import MessageWallDisplay from "./message-wall-display"

interface Message {
  timestamp: string
  name: string
  message: string
}

interface MessageFormProps {
  onSuccess?: () => void
  onMessageSent?: () => void
}

function MessageForm({ onSuccess, onMessageSent }: MessageFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [nameValue, setNameValue] = useState("")
  const [messageValue, setMessageValue] = useState("")
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const message = formData.get("message") as string

    const googleFormData = new FormData()
    googleFormData.append("entry.405401269", name)
    googleFormData.append("entry.893740636", message)

    try {
      await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLSdwDIAcDQRyR1UUxwwT0MMubrvzV8_IdU4hWzsTE3-K9RlYqg/formResponse",
        {
          method: "POST",
          mode: "no-cors",
          body: googleFormData,
        }
      )

      toast({
        title: "Message Sent! 💌",
        description: "Your heartfelt wishes have been delivered",
        duration: 3000,
      })

      setIsSubmitted(true)
      setNameValue("")
      setMessageValue("")
      formRef.current?.reset()
      
      // Reset submitted state after animation
      setTimeout(() => setIsSubmitted(false), 1000)
      
      if (onSuccess) onSuccess()
      if (onMessageSent) onMessageSent()
    } catch (error) {
      toast({
        title: "Unable to send message",
        description: "Please try again in a moment",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative w-full max-w-lg mx-auto px-4 sm:px-0">
      {/* Clean decorative background elements */}
      <div className="absolute -top-3 -left-3 w-6 h-6 bg-[#434F39]/10 rounded-full blur-sm sm:w-8 sm:h-8 sm:-top-4 sm:-left-4"></div>
      <div className="absolute -bottom-3 -right-3 w-8 h-8 bg-[#434F39]/8 rounded-full blur-md sm:w-10 sm:h-10 sm:-bottom-4 sm:-right-4"></div>
      
      <Card className={`relative w-full border-2 border-[#434F39]/25 shadow-lg transition-all duration-300 overflow-hidden rounded-xl ${
        isFocused ? 'border-[#434F39]/40' : 'hover:border-[#434F39]/35'
      } ${isSubmitted ? 'animate-bounce' : ''}`} style={{ backgroundColor: '#BDCBCB' }}>
        
        {/* Success animation overlay */}
        {isSubmitted && (
          <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-green-300/10 flex items-center justify-center z-20 pointer-events-none">
            <div className="flex flex-col items-center gap-2 animate-pulse">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="h-8 w-8 text-white" fill="#9F8650" />
              </div>
              <p className="text-green-600 font-semibold text-lg">Sent!</p>
            </div>
          </div>
        )}
        
        <CardContent className="relative p-4 sm:p-6 md:p-8" style={{ backgroundColor: '#BDCBCB' }}>
          {/* Header with icon */}
          <div className="text-center mb-4 sm:mb-6">
            <div className="relative inline-block mb-2 sm:mb-3">
              <div className="absolute inset-0 bg-[#434F39]/20 rounded-full blur-lg scale-150"></div>
              <div className="relative w-9 h-9 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg border-2 border-[#434F39]/20">
                <MessageCircle className="h-4 w-4 sm:h-6 sm:w-6 text-[#434F39]" />
              </div>
            </div>
            <h3 className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] font-normal text-[#434F39] mb-1.5 sm:mb-2 uppercase tracking-[0.12em]">
              Share Your Love
            </h3>
            <p className="text-xs sm:text-sm text-[#434F39]/80 font-[family-name:var(--font-crimson)] font-light tracking-wide leading-relaxed px-1">
              Your message will be treasured forever
            </p>
          </div>

          <form 
            ref={formRef} 
            onSubmit={handleSubmit} 
            className="space-y-3 sm:space-y-4 md:space-y-5"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            {/* Name Field */}
            <div className="space-y-2 sm:space-y-2.5">
              <label className="block text-xs sm:text-sm font-[family-name:var(--font-crimson)] font-semibold text-[#434F39] uppercase tracking-wider">
                Your Name
              </label>
              <div className="relative">
                <Input
                  name="name"
                  required
                  value={nameValue}
                  onChange={(e) => setNameValue(e.target.value)}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your name"
                  className={`w-full border border-[#434F39]/30 rounded py-2 sm:py-2.5 px-3 sm:px-4 text-sm sm:text-base font-[family-name:var(--font-crimson)] text-[#434F39] placeholder:text-[#434F39]/40 transition-all duration-200 bg-white focus:outline-none ${
                    focusedField === 'name' 
                      ? 'border-[#434F39] shadow-sm' 
                      : 'hover:border-[#434F39]/50'
                  }`}
                />
              </div>
            </div>

            {/* Message Field */}
            <div className="space-y-2 sm:space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs sm:text-sm font-[family-name:var(--font-crimson)] font-semibold text-[#434F39] uppercase tracking-wider">
                  Your Message
                </label>
                {messageValue && (
                  <span className={`text-xs font-[family-name:var(--font-crimson)] transition-colors ${
                    messageValue.length > 500 ? 'text-red-500' : 'text-[#434F39]/50'
                  }`}>
                    {messageValue.length}/500
                  </span>
                )}
              </div>
              <div className="relative">
                <Textarea
                  name="message"
                  required
                  value={messageValue}
                  onChange={(e) => {
                    if (e.target.value.length <= 500) {
                      setMessageValue(e.target.value)
                    }
                  }}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Share your love, memories, or well wishes..."
                  className={`w-full border border-[#434F39]/30 rounded min-h-[100px] sm:min-h-[120px] text-sm sm:text-base font-[family-name:var(--font-crimson)] text-[#434F39] placeholder:text-[#434F39]/40 transition-all duration-200 resize-none bg-white py-2 sm:py-2.5 px-3 sm:px-4 focus:outline-none ${
                    focusedField === 'message' 
                      ? 'border-[#434F39] shadow-sm' 
                      : 'hover:border-[#434F39]/50'
                  }`}
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting || !nameValue.trim() || !messageValue.trim()}
              className="w-full bg-[#85562A] hover:bg-[#85562A]/90 active:bg-[#85562A]/95 text-white py-2.5 sm:py-3 px-6 sm:px-8 text-xs sm:text-sm font-[family-name:var(--font-crimson)] font-semibold shadow-md transition-all duration-300 hover:scale-105 active:scale-100 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none border border-[#85562A] tracking-wider uppercase"
              style={{ backgroundColor: '#85562A', color: 'white', borderColor: '#85562A' }}
            >
              
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" fill="white" />
                  Send Message
                </span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export function Messages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

  const fetchMessages = useCallback(() => {
    setLoading(true)
    fetch(
      "https://script.google.com/macros/s/AKfycbzSyYo4BGOc3TvRTQOk_J-OjLAvUl1MfG7ggipWhDLxHBpiyUufihBs6r7l1jVHReFPQw/exec"
    )
      .then((res) => res.json())
      .then((data) => {
        const rows: string[][] = data.GoogleSheetData
        const [header, ...entries] = rows
        const idxName = header.findIndex((h: string) => h.toLowerCase().includes("name"))
        const idxMsg = header.findIndex((h: string) => h.toLowerCase().includes("message"))
        const idxTime = header.findIndex((h: string) => h.toLowerCase().includes("timestamp"))
        const parsed = entries
          .map((row: string[]) => ({
            timestamp: row[idxTime],
            name: row[idxName],
            message: row[idxMsg],
          }))
          .reverse()
        setMessages(parsed)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Failed to fetch messages:", error)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  return (
    <Section id="messages" className="relative py-10 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
         <div className="text-center mb-8 sm:mb-12 md:mb-16">
           <div className="flex items-center justify-center gap-2 mb-4">
             <div className="h-[1px] w-12 sm:w-16 md:w-24 bg-gradient-to-r from-transparent via-white to-transparent" />
           </div>
           <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[family-name:var(--font-crimson)] font-normal text-white mb-4 sm:mb-6 uppercase tracking-[0.1em] sm:tracking-[0.12em] elegant-text-shadow">
             Love Messages
           </h2>
           <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
             <div className="h-[1px] w-12 sm:w-16 md:w-24 bg-gradient-to-r from-transparent via-white to-transparent" />
           </div>
          
          <div className="max-w-4xl mx-auto">
            <h3 className="text-base sm:text-lg md:text-xl font-[family-name:var(--font-ephesis)] text-white mb-2 sm:mb-3 md:mb-4">
              Share Your Heartfelt Wishes
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-white/90 font-[family-name:var(--font-crimson)] font-light leading-relaxed max-w-2xl mx-auto px-2 sm:px-4 tracking-wide">
              Your messages of love and joy will be treasured forever. 
              Share your memories, well wishes, and congratulations for the happy couple.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="flex justify-center mb-10 sm:mb-14 md:mb-20">
          <div className="relative max-w-2xl w-full">
            {/* Card halo */}
            <div className="absolute -inset-3 bg-gradient-to-br from-[#434F39]/15 via-[#434F39]/10 to-transparent rounded-3xl blur-2xl opacity-70" />
            <div className="absolute -inset-1 bg-gradient-to-br from-[#434F39]/8 via-transparent to-transparent rounded-3xl blur-md opacity-80" />
            <MessageForm onMessageSent={fetchMessages} />
          </div>
        </div>

        {/* Messages Display Section */}
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          {/* Top corner accents */}
          <div className="absolute -top-3 -left-3 w-4 h-4 bg-[#434F39]/40 rounded-full blur-sm opacity-70" />
          <div className="absolute -top-3 -right-3 w-4 h-4 bg-[#434F39]/40 rounded-full blur-sm opacity-70" />
          <div className="text-center mb-6 sm:mb-10 md:mb-14">
            <div className="relative inline-block mb-3 sm:mb-5">
              <div className="absolute inset-0 bg-[#434F39]/15 rounded-full blur-xl scale-150"></div>
              <div className="relative w-10 h-10 sm:w-14 sm:h-14 bg-[#434F39] rounded-full flex items-center justify-center mx-auto shadow-lg">
                <Heart className="h-5 w-5 sm:h-7 sm:w-7 text-white" />
              </div>
            </div>
            <h3 className="text-base sm:text-lg md:text-xl font-[family-name:var(--font-crimson)] text-white mb-2 sm:mb-3">
              Messages from Loved Ones
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-white/90 font-[family-name:var(--font-crimson)] font-light max-w-2xl mx-auto px-2 sm:px-4 tracking-wide">
              Read the beautiful messages shared by family and friends
            </p>
          </div>
          
          <MessageWallDisplay messages={messages} loading={loading} />
        </div>

      </div>
    </Section>
  )
}
