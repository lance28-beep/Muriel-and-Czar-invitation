"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Section } from "@/components/section";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "When and where is the wedding?",
    answer:
      "The wedding ceremony will be held on Sunday, January 11, 2026, at 4:00 PM at Camp Edgar Garden, Nature's Village Resort, Talisay City, Negros Occidental 6115, Philippines.\n\nThe reception will follow at Padre Pio BC, Nature's Village Resort, same location.",
  },
  {
    question: "What is the dress code?",
    answer:
      "Principal Sponsors (Men): Black suit, white dress shirt, tie, black dress pants, and black dress shoes\nPrincipal Sponsors (Women): Pastel-colored gowns\n\nGuests (Men): Long-sleeved formal shirt (with or without a jacket) in muted tones such as light grey, beige, taupe, champagne, or soft brown, dress pants, and dress shoes\nGuests (Women): Formal wear in pastel shades\n\nPlease strictly follow the dress code indicated on your invitation.",
  },
  {
    question: "When is the RSVP deadline?",
    answer:
      "Please confirm by January 1, 2025. We have reserved seats for you, and we look forward to celebrating with you! Your response helps us finalize our guest list and seating arrangements.\n\n[RSVP_LINK]Click here to RSVP[/RSVP_LINK]",
  },
  {
    question: "Can I bring a plus one?",
    answer:
      "Due to limited space, we are unable to accommodate additional guests beyond those named on your invitation. Please do not bring plus ones unless specifically included in your invitation. Thank you for your understanding!",
  },
  {
    question: "Are children allowed?",
    answer:
      "This is an adults-only event. We appreciate your understanding that children are not included, with the exception of those specifically invited from our immediate family.",
  },
  {
    question: "What if I have dietary restrictions or allergies?",
    answer:
      "Please mention any dietary restrictions, allergies, or special meal requirements in the message field when you submit your RSVP.",
  },
  {
    question: "Important: Scent-free event",
    answer:
      "The bride has a sensitivity to fragrances. We kindly ask all guests to refrain from wearing perfume, cologne, or any scented products. Your cooperation is greatly appreciated!",
  },
  {
    question: "Do you have a gift registry?",
    answer:
      "Your presence is the greatest gift! However, if you wish to honor us with a gift, we would gratefully accept monetary contributions as we prepare for our new journey together and our migration to Canada.",
  },
  {
    question: "Is there parking available?",
    answer:
      "Yes! Nature's Village Resort has parking facilities. We recommend arriving 15-20 minutes early to secure a spot and get settled comfortably.",
  },
  {
    question: "Can I take photos during the ceremony?",
    answer:
      "We have a professional photographer and videographer to capture our special moments. However, you're more than welcome to take photos! We'll also have a dedicated time for group photos after the ceremony.",
  },
  {
    question: "How do I get to the venue?",
    answer:
      "Nature's Village Resort is located in Talisay City, Negros Occidental. You can use the 'Get Directions' button in the Event Details section to open Google Maps for easy navigation to both the ceremony (Camp Edgar Garden) and reception (Padre Pio BC) venues.",
  },
  {
    question: "What should I do if I need to cancel my RSVP?",
    answer:
      "Please contact us as soon as possible if your plans change. You can update your RSVP by searching for your name in the RSVP section.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section
      id="faq"
      className="relative bg-[#E8DCC8]/80 py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden"
    >
      {/* Section Header */}
      <div className="relative z-10 text-center mb-12 sm:mb-16 md:mb-20 px-4 sm:px-6">
        <h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-crimson)] font-normal text-white mb-6 sm:mb-8 uppercase tracking-[0.12em] sm:tracking-[0.15em]"
          style={{
            textShadow:
              "0 0 20px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          Frequently Asked Questions
        </h2>

        <p
          className="text-base sm:text-lg md:text-xl font-[family-name:var(--font-crimson)] text-white font-light max-w-xl mx-auto leading-relaxed tracking-wide px-4"
          style={{
            textShadow:
              "0 0 15px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          Everything you need to know
        </p>
      </div>

      {/* FAQ content */}
      <div className="relative z-10 max-w-4xl mx-auto px-3 sm:px-4 md:px-6">
        {/* Main card */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-br from-[#1A1A1A]/20 to-[#1A1A1A]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />

          <div className="relative bg-white backdrop-blur-sm border-2 border-[#1A1A1A]/40 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-[#1A1A1A]/60 overflow-hidden">
            {/* FAQ items */}
            <div className="space-y-3 sm:space-y-4">
              {faqItems.map((item, index) => {
                const isOpen = openIndex === index;
                const contentId = `faq-item-${index}`;
                return (
                  <div
                    key={index}
                    className="rounded-lg sm:rounded-xl border border-[#1A1A1A]/20 bg-white hover:bg-[#E8DCC8]/10 transition-all duration-300 hover:shadow-md hover:border-[#1A1A1A]/30 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className="group w-full px-4 sm:px-5 md:px-6 py-4 sm:py-5 flex items-center justify-between text-left outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A]/50 focus-visible:ring-offset-2 transition-colors"
                      aria-expanded={isOpen}
                      aria-controls={contentId}
                    >
                      <span className="font-[family-name:var(--font-crimson)] font-semibold text-[#1A1A1A] pr-4 text-sm sm:text-base md:text-lg leading-relaxed group-hover:text-[#3C3C3C] transition-colors duration-200">
                        {item.question}
                      </span>
                      <ChevronDown
                        size={20}
                        className={`text-[#1A1A1A] flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""} sm:w-5 sm:h-5`}
                        aria-hidden
                      />
                    </button>

                    <div
                      id={contentId}
                      role="region"
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-4 sm:px-5 md:px-6 py-3 sm:py-4 md:py-5 bg-[#E8DCC8]/20 border-t border-[#1A1A1A]/20">
                          {item.answer.includes("[RSVP_LINK]") ? (
                            <p className="text-[#1A1A1A]/80 leading-relaxed text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] whitespace-pre-line">
                              {item.answer.split("[RSVP_LINK]")[0]}
                              <a
                                href="#guest-list"
                                className="text-[#1A1A1A] underline font-semibold hover:text-[#3C3C3C] transition-colors"
                                onClick={(e) => {
                                  e.preventDefault();
                                  document
                                    .getElementById("guest-list")
                                    ?.scrollIntoView({ behavior: "smooth" });
                                }}
                              >
                                {
                                  item.answer.match(
                                    /\[RSVP_LINK\](.*?)\[\/RSVP_LINK\]/,
                                  )?.[1]
                                }
                              </a>
                              {item.answer.split("[/RSVP_LINK]")[1]}
                            </p>
                          ) : (
                            <p className="text-[#1A1A1A]/80 leading-relaxed text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] whitespace-pre-line">
                              {item.answer}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
