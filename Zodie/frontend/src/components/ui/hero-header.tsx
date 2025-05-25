import { Button } from "@/components/ui/button"
import { Component } from "@/components/ui/dropdown"
import {Bolt,CopyPlus,Layers2,Files} from 'lucide-react'
export default function HeroSection() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-primary/10 via-background to-background relative overflow-hidden">
      {/* Background geometric elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 border border-secondary/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-40 w-64 h-64 border border-primary/20 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 border border-secondary/10 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8">
            {/* AI Badge */}
            <div className="flex items-center gap-2">
                          <Component
  item={{
    label: "Agents",
    agents: [
      { label: "Maxxi", to: "/maxxi", icon: <Bolt size={16} className="opacity-60" /> },
      { label: "Nova", to: "/nova", icon: <CopyPlus size={16} className="opacity-60" /> },
      { label: "Stratus", to: "/stratus", icon: <Layers2 size={16} className="opacity-60" /> },
      { label: "Docs", to: "/docs", icon: <Files size={16} className="opacity-60" /> },
    ],
  }}
/>


            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-6xl lg:text-7xl font-bold text-foreground leading-tight">Phenom AI</h1>

              {/* Description */}
              <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                Help candidates find and choose you faster, employees evolve, recruiters become more productive, and
                managers build better teams. All with AI.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button
                size="lg"
                className="bg-secondary  hover:bg-secondary/90 text-secondary-foreground px-8 py-6 text-lg font-semibold rounded-full"
              >
                Book a Demo
              </Button>
            </div>
          </div>

          {/* Right Visualization */}
          <div className="relative">
            <div className="relative w-full h-[600px] flex items-center justify-center">
              {/* Central hexagon structure */}
              <div className="relative">
                {/* Main hexagon */}
                <div className="w-80 h-80 relative">
                  <svg viewBox="0 0 400 400" className="w-full h-full">
                    {/* Hexagon outline */}
                    <polygon
                      points="200,50 350,125 350,275 200,350 50,275 50,125"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-secondary/40"
                    />

                    {/* Inner connections */}
                    <g className="text-primary/30" strokeWidth="1">
                      <line x1="200" y1="50" x2="200" y2="200" stroke="currentColor" />
                      <line x1="350" y1="125" x2="200" y2="200" stroke="currentColor" />
                      <line x1="350" y1="275" x2="200" y2="200" stroke="currentColor" />
                      <line x1="200" y1="350" x2="200" y2="200" stroke="currentColor" />
                      <line x1="50" y1="275" x2="200" y2="200" stroke="currentColor" />
                      <line x1="50" y1="125" x2="200" y2="200" stroke="currentColor" />
                    </g>

                    {/* Nodes */}
                    <circle cx="200" cy="50" r="4" fill="currentColor" className="text-secondary" />
                    <circle cx="350" cy="125" r="4" fill="currentColor" className="text-primary" />
                    <circle cx="350" cy="275" r="4" fill="currentColor" className="text-secondary" />
                    <circle cx="200" cy="350" r="4" fill="currentColor" className="text-primary" />
                    <circle cx="50" cy="275" r="4" fill="currentColor" className="text-secondary" />
                    <circle cx="50" cy="125" r="4" fill="currentColor" className="text-primary" />
                    <circle cx="200" cy="200" r="6" fill="currentColor" className="text-primary" />
                  </svg>
                </div>

                {/* Floating labels */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                  <span className="text-sm font-medium text-muted-foreground bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full border">
                    Explainable AI
                  </span>
                </div>

                <div className="absolute top-16 -right-20">
                  <span className="text-sm font-medium text-muted-foreground bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full border">
                    Human-in-the-loop
                  </span>
                </div>

                <div className="absolute bottom-16 -right-24">
                  <span className="text-sm font-medium text-muted-foreground bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full border">
                    Enterprise Talent Graph
                  </span>
                </div>

                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                  <span className="text-sm font-medium text-muted-foreground bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full border">
                    Bias Detection
                  </span>
                </div>

                <div className="absolute bottom-16 -left-24">
                  <span className="text-sm font-medium text-muted-foreground bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full border">
                    Pre-trained Models
                  </span>
                </div>

                <div className="absolute top-16 -left-20">
                  <span className="text-sm font-medium text-muted-foreground bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full border">
                    Skill Framework
                  </span>
                </div>
              </div>

              {/* Animated particles */}
              <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-primary/40 rounded-full animate-pulse"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: `${2 + Math.random() * 2}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
