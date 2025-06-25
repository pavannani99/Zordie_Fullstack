import React from "react";
import sphere from '@/assets/agentic/Sphere.gif'
export default function PrimeFeatures() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(180deg, #394fe3 0%, rgb(212, 180, 180) 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Features Badge */}
        <div className="mb-8">
          <span className="inline-block bg-white/20 text-white border border-white/30 px-4 py-2 text-sm font-medium rounded-full">
            ✨ Features
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          What Prime Does ?
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-white/90 mb-16 max-w-2xl mx-auto">
          Discover how Prime HR optimizes workforce management and boosts operational efficiency.
        </p>

        {/* Features Grid with Central Animation */}
        <div className="relative">
          {/* Connecting Lines - Behind cards */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 transform -translate-y-1/2"></div>
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-300 transform -translate-x-1/2"></div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 max-w-4xl mx-auto relative z-10">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl">
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                Coordinates all agent activities with intelligent task distribution and priority management.
              </p>
            </div>
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl">
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                Maintains enterprise-grade security protocols and access controls across all HR systems.
              </p>
            </div>
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl">
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                Dynamically allocates system resources and manages auto-scaling based on demand.
              </p>
            </div>
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl">
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                Advanced decision-making algorithms that learn from organizational patterns and optimize processes.
              </p>
            </div>
          </div>

          {/* Central Animated Sphere */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <div className="bg-white rounded-full p-4 shadow-2xl">
              <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden">
                <img
                  src={sphere}
                  alt="Animated sphere"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
