import React from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

const HRAutomationSection: React.FC = () => {
  // Chart data for visualization
  const chartData = [
    { height: 20, value: 45 },
    { height: 25, value: 52 },
    { height: 45, value: 78 },
    { height: 35, value: 65 },
    { height: 50, value: 85 },
    { height: 40, value: 72 },
    { height: 55, value: 92 },
    { height: 30, value: 58 },
    { height: 60, value: 95 }
  ];

  // Generate trend line points
  const generateTrendLine = () => {
    const points = chartData.map((item, index) => {
      const x = (index / (chartData.length - 1)) * 100;
      const y = 100 - (item.value / 100) * 80; // Scale to fit chart
      return `${x},${y}`;
    }).join(' ');
    
    return points;
  };

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto space-y-32">
      {/* Header Badge */}
      <div className="text-center mb-16">
        <span className="inline-block px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-full shadow-lg">
          Built-in Useful Features
        </span>
      </div>

      {/* Main Heading */}
      <div className="text-center mb-20">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
          Simplify Your Workflow
          <br />
          With <span className="text-blue-600">Our Powerful Tools</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Experience the competitive advantages that set
          <br />
          Zordie AI apart from traditional HR solutions
        </p>
      </div>

      {/* First Section - HR Automation with Chart */}
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Chart Visualization */}
        <div className="relative">
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 transform hover:scale-[1.02] transition-transform duration-300">
            <div className="relative h-80 flex items-end justify-center space-x-3">
              {/* Chart Bars */}
              {chartData.map((bar, index) => (
                <div
                  key={index}
                  className="relative bg-gradient-to-t from-gray-700 to-gray-600 rounded-t-lg transition-all duration-1000 ease-out hover:from-blue-600 hover:to-blue-500"
                  style={{
                    height: `${bar.height * 4}px`,
                    width: '24px',
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <div className="animate-pulse absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full opacity-0 animate-ping" 
                       style={{ animationDelay: `${index * 200 + 1000}ms`, animationDuration: '2s' }}></div>
                </div>
              ))}
              
              {/* Trend Line SVG Overlay */}
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="trendGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.9"/>
                  </linearGradient>
                </defs>
                <polyline
                  points={generateTrendLine()}
                  fill="none"
                  stroke="url(#trendGradient)"
                  strokeWidth="0.8"
                  className="drop-shadow-sm"
                  style={{
                    strokeDasharray: '200',
                    strokeDashoffset: '200',
                    animation: 'drawLine 2s ease-out 1s forwards'
                  }}
                />
                {/* Trend line dots */}
                {chartData.map((item, index) => {
                  const x = (index / (chartData.length - 1)) * 100;
                  const y = 100 - (item.value / 100) * 80;
                  return (
                    <circle
                      key={index}
                      cx={x}
                      cy={y}
                      r="1"
                      fill="#3B82F6"
                      className="opacity-0"
                      style={{
                        animation: `fadeInDot 0.5s ease-out ${1.5 + index * 0.1}s forwards`
                      }}
                    />
                  );
                })}
              </svg>
            </div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full animate-bounce opacity-70"></div>
          <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-orange-500 rounded-full animate-pulse"></div>
        </div>

        {/* Content Section */}
        <div className="space-y-8">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300">
            <ArrowUpRight className="w-8 h-8 text-white" />
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Complete End-to-End
            <br />
            <span className="text-gray-700">HR Automation</span>
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
            Unprecedented automation across the entire HR lifecycle, 
            eliminating silos and reducing administrative overhead by 
            up to 90%.
          </p>

          {/* Learn More Button */}
          <button className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-orange-500 text-orange-600 font-semibold rounded-xl hover:bg-orange-50 transition-all duration-300 hover:shadow-lg hover:border-orange-600">
            <span>Learn More</span>
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300 ease-out" />
          </button>
        </div>
      </div>

      {/* Second Section - Candidate Verification with Image */}
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Content Section */}
        <div className="space-y-8">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300">
            <ArrowUpRight className="w-8 h-8 text-white" />
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            360° Candidate
            <br />
            <span className="text-gray-700">Verification Excellence</span>
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
            Advanced verification system cross-validating resumes, 
            analyzing GitHub repositories, and authenticating credentials 
            through official channels.
          </p>

          {/* Learn More Button */}
          <button className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-blue-500 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 hover:shadow-lg hover:border-blue-600">
            <span>Learn More</span>
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300 ease-out" />
          </button>
        </div>

        {/* Image Section */}
        <div className="relative">
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 transform hover:scale-[1.02] transition-transform duration-300">
            <div className="relative">
              <img 
                src="https://framerusercontent.com/images/tzsnYDutJYFuBORdEeYKQzGKQo.png" 
                alt="HR Automation Dashboard Interface" 
                className="w-full h-auto rounded-2xl"
              />
            </div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full animate-bounce opacity-70"></div>
          <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-orange-500 rounded-full animate-pulse"></div>
        </div>
      </div>
      {/* 3rd section */}
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Chart Visualization */}
        <div className="relative">
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 transform hover:scale-[1.02] transition-transform duration-300">
             <div className="relative">
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 transform hover:scale-[1.02] transition-transform duration-300">
            <div className="relative">
              <img 
                src="https://framerusercontent.com/images/5o2uBZKILf5rPh6LebfDhiqOcs4.png" 
                alt="HR Automation Dashboard Interface" 
                className="w-full h-auto rounded-2xl"
              />
            </div>
          </div>
          
          
        </div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full animate-bounce opacity-70"></div>
          <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-orange-500 rounded-full animate-pulse"></div>
        </div>

        {/* Content Section */}
        <div className="space-y-8">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300">
            <ArrowUpRight className="w-8 h-8 text-white" />
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Gamified Intelligence Assessment
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
            Innovative assessment experiences that reveal true candidate potential through interactive challenges and immersive scenarios.
          </p>

          {/* Learn More Button */}
          <button className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-orange-500 text-orange-600 font-semibold rounded-xl hover:bg-orange-50 transition-all duration-300 hover:shadow-lg hover:border-orange-600">
            <span>Learn More</span>
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300 ease-out" />
          </button>
        </div>
      </div>
      {/* 4th section */}
         {/* Second Section - Candidate Verification with Image */}
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Content Section */}
        <div className="space-y-8">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300">
            <ArrowUpRight className="w-8 h-8 text-white" />
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Real-Time 
            <br />
            <span className="text-gray-700">Strategic Analytics</span>
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
            Innovative assessment experiences that reveal true candidate potential 
            through interactive challenges and immersive scenarios.
          </p>

          {/* Learn More Button */}
          <button className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-blue-500 text-blue-600 font-semibold rounded-xl hover:bg-purple-50 transition-all duration-300 hover:shadow-lg hover:border-blue-600">
            <span>Learn More</span>
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300 ease-out" />
          </button>
        </div>

        {/* Image Section */}
        <div className="relative">
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 transform hover:scale-[1.02] transition-transform duration-300">
            <div className="relative">
              <img 
                src="https://framerusercontent.com/images/cT88VF84y02Hl1guDYPV6jtMQ.png" 
                alt="HR Automation Dashboard Interface" 
                className="w-full h-auto rounded-2xl"
              />
            </div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full animate-bounce opacity-70"></div>
          <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-orange-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HRAutomationSection;