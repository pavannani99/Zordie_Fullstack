"use client"
import background from '@/assets/agentic/systemBG.png'
import { Shield, Calendar, Rocket, Settings, Cloud, Network, ShieldCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Calendar,
    title: "Orchestration",
    description: "Dynamically manages and connects Optimus, Monica, Emma, Onix, Maxi, and Laxmi.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: Rocket,
    title: "Workflow Construction",
    description: "Builds workflows via chat input—no need for drag-and-drop. Manual override available.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Settings,
    title: "Agent Supervision",
    description: "Detects conflicts, hallucinations, or failures, and overrides the responsible agent.",
    color: "bg-gray-100 text-gray-600",
  },
  {
    icon: Cloud,
    title: "System Copilot",
    description:
      'Converts simple commands (e.g., "Hire 5 designers") into a multi-agent hiring-to-onboarding pipeline.',
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: Network,
    title: "Offer Letter & Docs",
    description: "Drafts, verifies, and dispatches documents like offers, NDAs, and HR policies.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: ShieldCheck,
    title: "Context Keeper",
    description: "Maintains memory across agents and workflows via MCP (Model Context Protocol).",
    color: "bg-gray-100 text-gray-600",
  },
]

const marqueeItems = [
  "AI-Powered Onboarding & Retention",
  "Intelligent Interview & Assessment Tools",
  "Self-Healing Systems",
  "Autonomous Workflow Execution",
  "Smart Candidate Matching",
  "Predictive Analytics for HR",
  "Automated Performance Reviews",
  "AI-Driven Talent Acquisition",
  "Dynamic Resource Allocation",
  "Intelligent Compliance Monitoring",
]

export default function System() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Section with Background Image */}
      <div
        className="relative bg-cover bg-center bg-no-repeat py-16 overflow-hidden"
        style={{
          backgroundImage: '@/assets/agentic/systemBG.png'
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="flex-1 mb-8 lg:mb-0">
              <Badge variant="outline" className="mb-6 border-gray-600 text-gray-300 bg-black/50">
                <Shield className="w-4 h-4 mr-2" />
                Currently in stealth mode
              </Badge>

              <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                PRIME HR System
              </h1>

              <p className="text-xl text-gray-300 max-w-md">
                Role-based access control, task delegation, escalation flows
              </p>
            </div>

            {/* Central Shield Icon */}
            <div className="flex-shrink-0">
              <div className="relative">
              
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/20 to-transparent rounded-3xl blur-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section with Black Background */}
      <div className="container mx-auto px-4 py-16">
        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-white/95 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Floating Marquee Buttons */}
        <div className="relative overflow-hidden">
          <div className="flex space-x-4 animate-marquee">
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 text-sm font-medium text-white hover:bg-white/20 transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
