"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, Clock, TrendingUp, Zap, Settings } from "lucide-react"

const features = [
  {
    id: "management",
    title: "Smart Management System",
    description: "Effortlessly organize and track all your interactions, documents and data in one place.",
    image: "https://framerusercontent.com/images/BAmgCkL3WCAMTbXfMPK1kqYJg3w.png?scale-down-to=1024",
    icon: Target,
  },
  {
    id: "tracking",
    title: "Real-Time Talent & Task Tracking",
    description: "Save time by automating repetitive tasks and streamlining team workflows.",
    image: "https://framerusercontent.com/images/CM73WRAQoCV8Re342SeYL4xBY.png?scale-down-to=1024",
    icon: Clock,
  },
  {
    id: "intelligence",
    title: "Performance & Growth Intelligence",
    description: "Gain actionable insights with customizable reports and real-time data visualization.",
    image: "https://framerusercontent.com/images/Vyb5msDEpKDMnjb9xVj8l9a3gPI.png?scale-down-to=1024",
    icon: TrendingUp,
  },
  {
    id: "interviews",
    title: "AI Voice and Culture fit Interviews",
    description: "Connect with tools like Slack, Mailchimp, and Google Analytics for a unified experience.",
    image: "https://framerusercontent.com/images/obL7O0JUdgAiPWg9C5OTgvSt224.svg",
    icon: Zap,
  },
  {
    id: "screening",
    title: "Advanced ATS with Smart Screening",
    description: "Tailor your workspace to focus on the metrics and activities that matter most to you.",
    image: "https://framerusercontent.com/images/HigOTB4NtzyDfPbugQ62qcTOj4.png?scale-down-to=1024",
    icon: Settings,
  },
]

export default function ZordieFeatures1() {
  const [activeFeature, setActiveFeature] = useState("management")
  const currentFeature = features.find((f) => f.id === activeFeature) || features[0]

  return (
    <section className="min-h-screen bg-gray-50 py-16 px-4"> 
      <div className="max-w-7xl mx-auto">
        <Badge variant="outline" className="mb-4 text-sm font-medium">
          ✨ Features
        </Badge>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl mb-4">
          Designed to simplify your workflow and maximize efficiency
        </h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left sidebar with feature buttons */}
        <div className="space-y-4">
          {features.map((feature) => {
            const IconComponent = feature.icon
            const isActive = activeFeature === feature.id

            return (
              <Card
                key={feature.id}
                className={`p-6 cursor-pointer transition-all duration-200 border-2 ${
                  isActive
                    ? "border-blue-200 bg-blue-50/50 shadow-sm"
                    : "border-gray-100 hover:border-gray-200 hover:shadow-sm"
                }`}
                onClick={() => setActiveFeature(feature.id)}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${isActive ? "bg-blue-100" : "bg-gray-100"}`}>
                    <IconComponent className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-gray-600"}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold mb-2 ${isActive ? "text-blue-900" : "text-gray-900"}`}>
                      {feature.title}
                    </h3>
                    {isActive && <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>}
                  </div>
                </div>
              </Card>
            )
          })}

          <div className="pt-4">
            <Button className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-full">
              Learn more features
            </Button>
          </div>
        </div>

        {/* Right side with dynamic image */}
        <div className="lg:sticky lg:top-8">
          <Card className="p-0 overflow-hidden shadow-lg">
            <div className="aspect-[4/3] w-full">
              <img
                src={currentFeature.image || "/placeholder.svg"}
                alt={currentFeature.title}
                className="w-full h-full object-cover transition-opacity duration-300"
                crossOrigin="anonymous"
              />
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
