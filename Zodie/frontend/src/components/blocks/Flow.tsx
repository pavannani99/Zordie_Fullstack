"use client"

import { useState } from "react"

import { TrendingUp, Users, Lightbulb } from "lucide-react"

export default function Flow() {
  const [activeTab, setActiveTab] = useState("automate-tasks")

  const tabs = [
    {
      id: "choose-agents",
      label: "Choose Agents",
      icon: Users,
      title: "Choose Agents",
      description: "Pick from a library of ready-to-use AI agents tailored for specific business workflows.",
      image: "/src/images/4417da43e61fb4ef3fd13917fd21a505.gif"
    },
    {
      id: "write-prompt",
      label: "Write a Prompt",
      icon: Lightbulb,
      title: "Write a Prompt",
      description:
        "Easily guide Zordie AI agents by entering a simple prompt—customize tasks like candidate screening, interview questions, or job descriptions in seconds.",
      image: "/src/images/3607fd13fddeb924c0bd732b7b3f3ca6.gif"
    },
    {
      id: "automate-tasks",
      label: "Automate Tasks",
      icon: TrendingUp,
      title: "Automate Tasks",
      description:
        "Let Zordie AI automate repetitive hiring tasks—like resume screening, interview scheduling, follow-ups, and updates—so your team can focus on smarter decisions.",
      image: "/src/images/exciting.jpeg"
    },
  ]

  const activeTabData = tabs.find((tab) => tab.id === activeTab)

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 ">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-black text-white rounded-full text-sm font-medium mb-6">
            Benefits
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            How It Works<span className="text-blue-600">?</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Experience game-changing advantages that boost your productivity, streamline operations, and give you an
            edge over the competition.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-black text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Box */}
        {activeTabData && (
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-black">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Left Content */}
              <div className="space-y-6">
                <div className="flex gap-4 flex-col items-stretch">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                    <activeTabData.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{activeTabData.title}</h3>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">{activeTabData.description}</p>
              </div>

              {/* Right Image */}
              <div className="relative w-full h-full min-h-[300px]">
                <div className="w-full h-full rounded-2xl bg-gray-900 overflow-hidden">
                  <img
                    src={activeTabData.image || "/placeholder.svg"}
                    alt={activeTabData.title}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
