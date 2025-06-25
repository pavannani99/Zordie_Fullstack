"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, BarChart3 } from "lucide-react"
import i1 from '@/assets/agentic/image1.png'
import i2 from '@/assets/agentic/image2.png'

export default function Insights() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            <span className="text-gray-500 text-sm">Live Oversight</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Comprehensive Insights</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Track every campaign and customer interaction to refine engagement strategies
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Real-Time Insights Card */}
          <Card className="bg-white shadow-lg border-0 rounded-3xl overflow-hidden">
            <CardContent className="p-8">
              {/* Chart img */}
              <div className="mb-8">
                <img
                  src={i1}
                  alt="Total Spent Chart"
                  width={400}
                  height={200}
                  className="w-full h-auto"
                />
              </div>

              {/* Card Footer */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Real-Time Insights</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Monitor your campaigns in real time to ensure maximum effectiveness and identify areas for
                    improvement
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actionable Data Card */}
          <Card className="bg-white shadow-lg border-0 rounded-3xl overflow-hidden">
            <CardContent className="p-8">
              {/* Chart Image */}
              <div className="mb-8">
                <img
                  src={i2}
                  alt="Balance Chart"
                  width={400}
                  height={200}
                  className="w-full h-auto"
                />
              </div>

              {/* Card Footer */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Actionable Data</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Leverage analytics to enhance workflows, boost engagement, and make informed marketing decisions
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
