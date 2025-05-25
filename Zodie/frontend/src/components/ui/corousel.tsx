"use client"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { ChevronLeft, ChevronRight } from "lucide-react"
import dash from '@/components/blocks/Dashboard.png'
import nova from '@/images/nova.png'
import prime from '@/images/prime.png'
import archie from '@/images/archie.png'
import optimus from '@/images/optimus.png'
import onix from '@/images/onix.png'
// Sample data for the carousel
const cardsData = [
  {
    id: 1,
    category: "PRIME HR (The Brain)",
    title: "Central of Control",
    workflows: ["Collect & Verify", "Score & Rank", "Select Top Talent"],
    path: "/prime",
    bgImage:prime
  },
  {
    id: 2,
    category: "OPTIMUS",
    title: "From Resume to Retention, Optimized",
    workflows: ["Understand Needs", "Match & Outreach", "Predict & Act"],
    path: "/optimus",
    bgImage: optimus
  },
  {
    id: 3,
    category: "NOVA",
    title: "Intelligent Interviews. Real-time Insights.",
    workflows: ["Plan & Schedule", "Guide & Analyze", "Summarize & Compare"],
    path: "/nova",
    bgImage: nova
  },
  {
    id: 4,
    category: "ARCHIE",
    title: "Analytics That Speak HR.",
    workflows: ["Track Funnel", "Analyze Patterns", "Report & Recommend"],
    path: "/archie",
    bgImage: archie
  },
  {
    id: 5,
    category: "MAXI",
    title: "From Day One to Day 90, Seamlessly Guided.",
    workflows: ["Personalize Onboarding", "Monitor Progress", "Support & Retain"],
    path: "/maxi",
    bgImage: dash
  },
  {
    id:6,
    category: "ONIX",
    title: "Compliance, Ethics, and Integrity—Automated.",
    workflows: ["Verify & Screen", "Detect & Alert", "Audit & Report"],
    path: "/onix",
    bgImage: onix
  }
]

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [visibleCards, setVisibleCards] = useState(4)

  // Update visible cards based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1)
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2)
      } else if (window.innerWidth < 1280) {
        setVisibleCards(3)
      } else {
        setVisibleCards(4)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const totalSlides = cardsData.length - visibleCards + 1

  const nextSlide = () => {
    if (currentIndex < totalSlides - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${currentIndex * (100 / visibleCards)}%)`
    }
  }, [currentIndex, visibleCards])

  return (
    <div className="relative w-full overflow-hidden  py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          <div
            ref={carouselRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{ width: `${(cardsData.length / visibleCards) * 100}%` }}
          >
            {cardsData.map((card) => (
              <div key={card.id} className="px-2" style={{ width: `${100 / cardsData.length}%` }}>
                <div className="bg-cyan-300 opacity-70 rounded-lg overflow-hidden h-full flex flex-col">
                  <div className={`h-32 relative overflow-hidden bg-cover bg-center`}
                  style={{ backgroundImage: `url(${card.bgImage})` }}>
                    <div className="absolute inset-0 opacity-30">
                      <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0,100 C150,200 250,0 400,100 L400,0 L0,0 Z" fill="white" />
                      </svg>
                    </div>
                    <div className="absolute bottom-3 left-4">
                      <span className="text-xs font-medium text-white/80 bg-black/30 px-2 py-1 rounded">
                        {card.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 flex-grow">
                    <Link to={card.path} className="block mb-2">
                      <h3 className="text-xl font-bold text-white hover:text-primary transition-colors">
                        {card.title}
                      </h3>
                    </Link>
                    <div className="mt-2">
                      <p className="text-xs font-bold text-white mb-2">WORKFLOWS</p>
                      <ul className="space-y-2">
                        {card.workflows.map((workflow, index) => (
                          <li
                            key={index}
                            className="text-sm text-gray-300 bg-gray-900 rounded px-3 py-2 hover:bg-gray-700 transition-colors"
                          >
                            {workflow}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 z-10 ${
              currentIndex === 0 ? "opacity-30 cursor-not-allowed" : "opacity-100"
            }`}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextSlide}
            disabled={currentIndex === totalSlides - 1}
            className={`absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 z-10 ${
              currentIndex === totalSlides - 1 ? "opacity-30 cursor-not-allowed" : "opacity-100"
            }`}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  )
}
