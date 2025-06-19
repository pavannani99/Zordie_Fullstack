"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const features = [
  {
    id: 1,
    title: "All-in-One Dashboard",
    description:
      "Access and manage all HR tasks — from Hiring to performance tracking to payroll — through a single, intuitive interface.",
  },
  {
    id: 2,
    title: "Smart Hiring System",
    description:
      "Automate the full hiring workflow from JD generation to onboarding with just one-click execution and AI orchestration and Verify GitHub projects, certifications (Coursera, NPTEL, etc.), and portfolios using intelligent crawling and authenticity checks.",
  },
  {
    id: 3,
    title: "Agents That Automate Everything",
    description:
      "Every function is handled by specialized AI agents (Optimus, Maxi, Onix) that evolve and adapt — delivering scalable, autonomous HR ops.",
  },
  {
    id: 4,
    title: "Compliance Made Easy",
    description:
      "Ensure compliance with local and global labor laws through built-in compliance checks and reporting tools."
    }
]

export default function ZordieFeatures() {
  const [expandedItem, setExpandedItem] = useState<number | null>(null)

  const toggleItem = (id: number) => {
    setExpandedItem(expandedItem === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Why Choose Zordie AI</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Empowering businesses with seamless customer management and actionable insights.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Features */}
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-2 h-2 bg-gray-800 rotate-45"></div>
              <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">Features</span>
            </div>

            <h2 className="text-4xl font-bold text-gray-900 mb-8 leading-tight">
              Powerful Features to
              <br />
              Simplify HR Management
            </h2>

            <p className="text-lg text-gray-600 mb-12">
              Our platform offers tools designed to streamline HR processes, boost efficiency, and enhance the employee
              experience.
            </p>

            {/* Accordion */}
            <div className="space-y-4">
              {features.map((feature) => (
                <div key={feature.id} className="border-b border-gray-200">
                  <button
                    onClick={() => toggleItem(feature.id)}
                    className="w-full py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-medium text-gray-500">[{feature.id}]</span>
                      <span className="text-xl font-semibold text-gray-900">{feature.title}</span>
                    </div>
                  </button>

                  {expandedItem === feature.id && (
                    <div className="pb-6 pl-12 pr-8">
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Video */}
          <div className="lg:sticky lg:top-8">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white">
              <div className="aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/Vz8mNnltlAI"
                  title="Zordie AI Demo Video"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
