"use client"

import {
  Zap,
  RefreshCw,
  Clock,
  DollarSign,
  TrendingUp,
  BarChart3,
  Star,
  Target,
  ZapIcon,
  Users,
  Settings,
  Workflow,
  UserCheck,
} from "lucide-react"

const benefitCards = [
  {
    icon: Zap,
    title: "Increased Productivity",
    description: "Gain actionable insights with AI-driven analytics to improve decision-making and strategy.",
  },
  {
    icon: RefreshCw,
    title: "Better Customer Experience",
    description: "Personalized AI interactions improve response times, customer engagement, and overall satisfaction.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description:
      "AI-powered systems operate around the clock, ensuring seamless support and execution without downtime.",
  },
  {
    icon: DollarSign,
    title: "Cost Reduction",
    description:
      "AI automation minimizes manual work, cuts operational costs, and optimizes resource allocation for better profitability.",
  },
  {
    icon: TrendingUp,
    title: "Data-Driven Insights",
    description:
      "Leverage AI to analyze vast data sets, identify trends, and make smarter, faster, and more accurate business decisions.",
  },
  {
    icon: BarChart3,
    title: "Scalability & Growth",
    description:
      "AI adapts to your business needs, allowing you to scale efficiently without increasing workload or costs.",
  },
]

const marqueeFeatures = [
  { icon: Target, text: "Resource Allocation" },
  { icon: ZapIcon, text: "AI-Powered Insight" },
  { icon: Settings, text: "API Integration" },
  { icon: BarChart3, text: "Performance" },
  { icon: Workflow, text: "Automated Workflows" },
  { icon: Users, text: "Complete End-to-End HR Automation" },
  { icon: UserCheck, text: "360° Candidate" },
]

export default function AIBenefitsLanding() {
  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Star className="w-5 h-5 text-gray-800" />
            <span className="text-gray-800 font-medium">Benefits</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            The Key Benefits of AI for
            <br />
            Your Business Growth
          </h1>

          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Discover how AI automation enhances efficiency, reduces costs, and drives business growth with smarter,
            faster processes.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {benefitCards.map((benefit, index) => {
            const IconComponent = benefit.icon
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <IconComponent className="w-8 h-8 mb-4" />
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-blue-100 leading-relaxed">{benefit.description}</p>
              </div>
            )
          })}
        </div>

        {/* Marquee Card */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl p-8 md:p-12 overflow-hidden relative">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              Ease your life with powerful features using Zordie AI
            </h2>
          </div>

          {/* Marquee Container */}
          <div className="relative">
            {/* First Row */}
            <div className="flex animate-marquee mb-6">
              {[...marqueeFeatures, ...marqueeFeatures].map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mx-3 whitespace-nowrap"
                  >
                    <IconComponent className="w-5 h-5 text-white" />
                    <span className="text-white font-medium">{feature.text}</span>
                  </div>
                )
              })}
            </div>

            {/* Second Row (Reverse Direction) */}
            <div className="flex animate-marquee-reverse">
              {[...marqueeFeatures.slice().reverse(), ...marqueeFeatures.slice().reverse()].map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mx-3 whitespace-nowrap"
                  >
                    <IconComponent className="w-5 h-5 text-white" />
                    <span className="text-white font-medium">{feature.text}</span>
                  </div>
                )
              })}
            </div>
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

        @keyframes marquee-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        .animate-marquee {
          animation: marquee 20s linear infinite;
        }

        .animate-marquee-reverse {
          animation: marquee-reverse 25s linear infinite;
        }
      `}</style>
    </div>
  )
}
