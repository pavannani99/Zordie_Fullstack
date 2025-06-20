// @ts-nocheck
"use client"

import { useState, useEffect } from "react"
import {
  CheckCircle,
  TrendingUp,
  Users,
  Calendar,
  BarChart3,
  Settings,
  Brain,
  Clock,
  Send,
  Activity,
} from "lucide-react"
import i1 from "@/assets/prime/imag1.png"
import i2 from "@/assets/prime/i2.png"
import i3 from "@/assets/prime/i3.png"
import i4 from "@/assets/prime/i4.png"
import i5 from "@/assets/prime/i5.png"
import i6 from "@/assets/prime/i6.png"

// Animated AI Chat Component
const AnimatedAIChat = () => {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

  const messages = [
    "What can I help with?",
    "Schedule a meeting for tomorrow",
    "Generate monthly report",
    "Send welcome email to new hire",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(true)
      setTimeout(() => {
        setCurrentMessage((prev) => (prev + 1) % messages.length)
        setIsTyping(false)
      }, 1500)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gray-900 border-0 p-6 rounded-2xl shadow-2xl">
      <div className="flex items-center justify-center mb-6">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center animate-pulse">
          <Brain className="w-8 h-8 text-white animate-bounce" />
        </div>
      </div>
      <div className="text-center mb-6">
        <h3 className="text-white text-lg font-semibold mb-2">AI Assistant</h3>
        <div className="text-gray-400 text-sm h-12 flex items-center justify-center">
          {isTyping ? (
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            </div>
          ) : (
            <span className="animate-fade-in">{messages[currentMessage]}</span>
          )}
        </div>
      </div>
      <div className="space-y-3">
        {["Schedule", "Add document", "Analyze → Generate Report"].map((item, index) => (
          <div
            key={item}
            className={`bg-gray-800 rounded-lg p-3 transition-all duration-500 ${
              currentMessage === index ? "bg-blue-800 transform scale-105" : ""
            }`}
          >
            <p className="text-white text-sm">{item}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// Animated Analytics Chart
const AnimatedAnalytics = () => {
  const [data, setData] = useState(Array.from({ length: 12 }, () => Math.random() * 60 + 20))
  const [salesGrowth, setSalesGrowth] = useState(25)

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => prev.map(() => Math.random() * 60 + 20))
      setSalesGrowth((prev) => 20 + Math.random() * 15)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gray-900 border-0 p-6 rounded-2xl shadow-2xl">
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-500 animate-pulse"></div>
            <span className="text-gray-400 text-sm">Direct</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
            <span className="text-gray-400 text-sm">Organic search</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500 animate-pulse"></div>
            <span className="text-gray-400 text-sm">Referral</span>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-2 mb-4">
          {data.map((height, i) => (
            <div key={i} className="space-y-1">
              <div
                className="bg-blue-500 rounded-sm transition-all duration-1000 ease-in-out"
                style={{ height: `${height}px` }}
              ></div>
              <div
                className="bg-orange-500 rounded-sm transition-all duration-1000 ease-in-out"
                style={{ height: `${height * 0.6}px` }}
              ></div>
              <div
                className="bg-gray-600 rounded-sm transition-all duration-1000 ease-in-out"
                style={{ height: `${height * 0.3}px` }}
              ></div>
            </div>
          ))}
        </div>
        <div className="text-gray-400 text-xs flex justify-between">
          <span>Jan</span>
          <span>Mar</span>
          <span>May</span>
          <span>Jul</span>
          <span>Sep</span>
          <span>Nov</span>
          <span>Dec</span>
        </div>
      </div>
      <div className="bg-blue-900 border-0 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-white text-2xl font-bold transition-all duration-500">{Math.round(salesGrowth)}%</div>
            <div className="text-blue-300 text-sm">Average Sales growth</div>
          </div>
          <div className="flex items-center text-green-400 text-sm animate-bounce">
            <TrendingUp className="w-4 h-4 mr-1" />
            9.2%
          </div>
        </div>
      </div>
    </div>
  )
}

// Animated Email Interface
const AnimatedEmailInterface = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  const steps = [
    { name: "Mike Tylor", status: "Composing...", color: "bg-yellow-500" },
    { name: "Mike Tylor", status: "Sending...", color: "bg-blue-500" },
    { name: "Mike Tylor", status: "Delivered", color: "bg-green-500" },
    { name: "Sarah Chen", status: "Composing...", color: "bg-yellow-500" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(0)
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval)
            setTimeout(() => {
              setCurrentStep((prev) => (prev + 1) % steps.length)
            }, 500)
            return 100
          }
          return prev + 2
        })
      }, 50)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const currentStepData = steps[currentStep]

  return (
    <div className="bg-gray-900 border-0 p-6 rounded-2xl shadow-2xl">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">E-mail Sending</h3>
          <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center animate-spin">
            <Send className="w-4 h-4 text-white" />
          </div>
        </div>
        <div className="flex gap-2 mb-4">
          <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs animate-pulse">LinkedIn</span>
          <span className="bg-gray-700 text-white px-2 py-1 rounded text-xs">IT services</span>
          <span className="bg-gray-700 text-white px-2 py-1 rounded text-xs">Founders</span>
        </div>
      </div>
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
            <Users className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-white text-sm font-medium">{currentStepData.name}</div>
            <div className="text-gray-400 text-xs">Founder</div>
          </div>
          <div className="ml-auto">
            <span className={`${currentStepData.color} text-white text-xs px-2 py-1 rounded animate-pulse`}>
              {currentStepData.status}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-xs mb-3">
          <div>
            <div className="text-gray-400">E-mail</div>
            <div className="text-white">mike@Oryx.com</div>
          </div>
          <div>
            <div className="text-gray-400">Company</div>
            <div className="text-white">ORYX LLC</div>
          </div>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

// Animated Performance Chart
const AnimatedPerformanceChart = () => {
  const [usage, setUsage] = useState(120)
  const [paths, setPaths] = useState([
    "M0,80 Q50,60 100,50 T200,30 T300,20",
    "M0,90 Q50,85 100,75 T200,65 T300,60",
    "M0,95 Q50,90 100,85 T200,80 T300,75",
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setUsage((prev) => 100 + Math.random() * 50)
      setPaths([
        `M0,${80 + Math.random() * 10} Q50,${60 + Math.random() * 10} 100,${50 + Math.random() * 10} T200,${30 + Math.random() * 10} T300,${20 + Math.random() * 10}`,
        `M0,${90 + Math.random() * 5} Q50,${85 + Math.random() * 5} 100,${75 + Math.random() * 5} T200,${65 + Math.random() * 5} T300,${60 + Math.random() * 5}`,
        `M0,${95 + Math.random() * 3} Q50,${90 + Math.random() * 3} 100,${85 + Math.random() * 3} T200,${80 + Math.random() * 3} T300,${75 + Math.random() * 3}`,
      ])
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gray-900 border-0 p-6 rounded-2xl shadow-2xl">
      <div className="mb-6">
        <div className="text-gray-400 text-xs flex justify-between mb-4">
          <span>Jan</span>
          <span>Mar</span>
          <span>May</span>
          <span>Jul</span>
          <span>Sep</span>
          <span>Nov</span>
          <span>Dec</span>
        </div>
        <div className="relative h-32 mb-6">
          <svg className="w-full h-full" viewBox="0 0 300 100">
            <path d={paths[0]} stroke="#8b5cf6" strokeWidth="2" fill="none" className="transition-all duration-2000">
              <animate
                attributeName="d"
                values={`${paths[0]};M0,${80 + Math.random() * 10} Q50,${60 + Math.random() * 10} 100,${50 + Math.random() * 10} T200,${30 + Math.random() * 10} T300,${20 + Math.random() * 10};${paths[0]}`}
                dur="4s"
                repeatCount="indefinite"
              />
            </path>
            <path d={paths[1]} stroke="#3b82f6" strokeWidth="2" fill="none" className="transition-all duration-2000">
              <animate
                attributeName="d"
                values={`${paths[1]};M0,${90 + Math.random() * 5} Q50,${85 + Math.random() * 5} 100,${75 + Math.random() * 5} T200,${65 + Math.random() * 5} T300,${60 + Math.random() * 5};${paths[1]}`}
                dur="4s"
                repeatCount="indefinite"
              />
            </path>
            <path d={paths[2]} stroke="#06b6d4" strokeWidth="2" fill="none" className="transition-all duration-2000">
              <animate
                attributeName="d"
                values={`${paths[2]};M0,${95 + Math.random() * 3} Q50,${90 + Math.random() * 3} 100,${85 + Math.random() * 3} T200,${80 + Math.random() * 3} T300,${75 + Math.random() * 3};${paths[2]}`}
                dur="4s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>
      </div>
      <div className="bg-blue-900 border-0 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-white text-2xl font-bold transition-all duration-500">{Math.round(usage)}hr+</div>
            <div className="text-blue-300 text-sm">Last week usage</div>
          </div>
          <div className="flex items-center text-green-400 text-sm">
            <Activity className="w-4 h-4 mr-1 animate-pulse" />
            9.2%
          </div>
        </div>
      </div>
    </div>
  )
}

// Animated Task Manager
const AnimatedTaskManager = () => {
  const [tasks, setTasks] = useState([
    { name: "Payroll management", status: "pending", icon: Settings, color: "text-orange-500" },
    { name: "Employee Tracking", status: "completed", icon: Users, color: "text-green-500" },
    { name: "Social media post", status: "cancelled", icon: BarChart3, color: "text-red-500" },
    { name: "Lead list", status: "in-progress", icon: Calendar, color: "text-blue-500" },
  ])

  const [currentTask, setCurrentTask] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTask((prev) => (prev + 1) % tasks.length)
      setTasks((prev) =>
        prev.map((task, index) => {
          if (index === (currentTask + 1) % tasks.length) {
            const statuses = ["pending", "in-progress", "completed"]
            const colors = ["text-orange-500", "text-blue-500", "text-green-500"]
            const newStatusIndex = Math.floor(Math.random() * statuses.length)
            return { ...task, status: statuses[newStatusIndex], color: colors[newStatusIndex] }
          }
          return task
        }),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [currentTask])

  return (
    <div className="bg-gray-900 border-0 p-6 rounded-2xl shadow-2xl">
      <div className="mb-4">
        <div className="flex gap-4 mb-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded text-sm animate-pulse">All Tasks</span>
          <span className="border border-gray-600 text-gray-400 px-3 py-1 rounded text-sm">Waiting for approval</span>
        </div>
        <p className="text-gray-400 text-sm mb-4">sort to selected clients</p>
      </div>
      <div className="space-y-3">
        {tasks.map((task, index) => {
          const IconComponent = task.icon
          return (
            <div
              key={task.name}
              className={`flex items-center gap-3 p-3 bg-gray-800 rounded-lg transition-all duration-500 ${
                index === currentTask ? "bg-gray-700 transform scale-105 shadow-lg" : ""
              }`}
            >
              <IconComponent className={`w-5 h-5 ${task.color} ${index === currentTask ? "animate-bounce" : ""}`} />
              <div className="flex-1">
                <div className="text-white text-sm font-medium">{task.name}</div>
                <div className="text-gray-400 text-xs">
                  {task.status === "completed"
                    ? "2 days ago"
                    : task.status === "pending"
                      ? "Due on 2nd July"
                      : task.status === "cancelled"
                        ? "Cancelled by user"
                        : "In progress"}
                </div>
              </div>
              {task.status === "completed" && <CheckCircle className="w-4 h-4 text-green-500 animate-pulse" />}
              {task.status === "pending" && <Clock className="w-4 h-4 text-orange-500 animate-pulse" />}
              {task.status === "in-progress" && <Activity className="w-4 h-4 text-blue-500 animate-spin" />}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Animated Project Dashboard
const AnimatedProjectDashboard = () => {
  const [progress, setProgress] = useState(90)
  const [currentDay, setCurrentDay] = useState(15)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (Math.random() - 0.5) * 5
        return Math.max(85, Math.min(100, newProgress))
      })
      setCurrentDay((prev) => (prev % 30) + 1)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gray-900 border-0 p-6 rounded-2xl shadow-2xl">
      <div className="mb-4">
        <div className="text-white font-semibold mb-2 animate-pulse">Hey Dave!</div>
        <div className="text-gray-400 text-sm mb-4">Here's your Custom project & schedule</div>
      </div>
      <div className="space-y-4">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            <span className="text-white text-sm font-medium">On going project:</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white text-sm">Customer Support Chatbot</div>
              <div className="text-gray-400 text-xs transition-all duration-500">{Math.round(progress)}% Finished</div>
            </div>
            <div className="relative w-8 h-8">
              <div className="w-8 h-8 rounded-full border-2 border-gray-600"></div>
              <div
                className="absolute top-0 left-0 w-8 h-8 rounded-full border-2 border-orange-500 transition-all duration-500"
                style={{
                  background: `conic-gradient(#f97316 ${progress * 3.6}deg, transparent ${progress * 3.6}deg)`,
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-gray-400 animate-pulse" />
            <span className="text-white text-sm font-medium">Schedule</span>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
              <div key={day} className="text-center text-gray-400 text-xs p-1">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className={`text-center text-xs p-1 rounded transition-all duration-300 ${
                  i + 15 === currentDay ? "bg-blue-500 text-white animate-pulse" : "text-gray-400"
                }`}
              >
                {i + 15}
              </div>
            ))}
          </div>
          <div className="text-gray-400 text-xs mt-2">{currentDay === 20 ? "Meeting at 2 PM" : "No meeting today"}</div>
        </div>
      </div>
    </div>
  )
}

// Badge Component
const Badge = ({ children, className = "", variant = "default" }) => {
  const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
  const variantClasses = {
    default: "bg-blue-100 text-blue-800",
    secondary: "bg-gray-100 text-gray-800",
    outline: "border border-gray-300 text-gray-700",
  }

  return <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>{children}</span>
}

// Main Component
export default function PrimeFeature() {
  const [isVisible, setIsVisible] = useState({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }))
        })
      },
      { threshold: 0.1 },
    )

    document.querySelectorAll("[id]").forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out;
        }
        
        .section-animate {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease-out;
        }
        
        .section-animate.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {/* Hero Section */}
      <section
        id="hero"
        className={`section-animate ${isVisible.hero ? "visible" : ""} relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-orange-50 py-20 px-4`}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in">
            Introducing Prime
            <br />
            <span className="bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
              The Self-Evolving AI That Works For You
            </span>
          </h1>
          <p
            className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            We design, develop, and implement automation tools that help you work smarter, not harder
          </p>
        </div>
      </section>

      {/* AI Assistant Section */}
      <section
        id="ai-assistant"
        className={`section-animate ${isVisible["ai-assistant"] ? "visible" : ""} py-20 px-4 bg-gradient-to-r from-orange-50 to-blue-50`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100 mb-4">AI Assistant</Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">One Command, Infinite Actions</h2>
              <p className="text-lg text-gray-600 mb-8">
                From managing calendars to drafting emails and summarizing meetings etc, AI assistants work around the
                clock to keep your business running smarter and faster.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="bg-gray-900 text-white hover:bg-gray-800">
                  Summaries
                </Badge>
                <Badge variant="secondary" className="bg-gray-900 text-white hover:bg-gray-800">
                  Scheduling
                </Badge>
                <Badge variant="secondary" className="bg-gray-900 text-white hover:bg-gray-800">
                  Many more
                </Badge>
              </div>
            </div>
            <div className="animate-slide-in-right">
            <img src={i1} alt="AI Assistant" className="w-full h-auto rounded-xl shadow-lg" />

            </div>
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section id="analytics" className={`section-animate ${isVisible.analytics ? "visible" : ""} py-20 px-4 bg-white`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
            <img src={i2} alt="Analytics Engine" className="w-full h-auto rounded-xl shadow-lg" />
            </div>
            <div className="animate-slide-in-right">
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 mb-4">AI Driven Decisions</Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">AI-Powered Analytics Engine</h2>
              <p className="text-lg text-gray-600 mb-8">
                Track everything across HR and business: hiring efficiency, payroll flow, performance, learning
                outcomes, attrition risks. Auto-generates insights and recommends decisions.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="bg-gray-900 text-white hover:bg-gray-800">
                  Insights
                </Badge>
                <Badge variant="secondary" className="bg-gray-900 text-white hover:bg-gray-800">
                  HR Metrics
                </Badge>
                <Badge variant="secondary" className="bg-gray-900 text-white hover:bg-gray-800">
                  Performance
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Onboarding Section */}
      <section
        id="onboarding"
        className={`section-animate ${isVisible.onboarding ? "visible" : ""} py-20 px-4 bg-gradient-to-r from-blue-50 to-orange-50`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100 mb-4">Onboarding</Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Automated Onboarding Journeys</h2>
              <p className="text-lg text-gray-600 mb-8">
                Drafts and sends offer letters, welcome mails, collects docs, assigns tools & training and manages the
                entire join journey
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="bg-gray-900 text-white hover:bg-gray-800">
                  Leads
                </Badge>
                <Badge variant="secondary" className="bg-gray-900 text-white hover:bg-gray-800">
                  Content
                </Badge>
                <Badge variant="secondary" className="bg-gray-900 text-white hover:bg-gray-800">
                  Social post
                </Badge>
              </div>
            </div>
            <div className="animate-slide-in-right">
            <img src={i3} alt="Analytics Engine" className="w-full h-auto rounded-xl shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Control Section */}
      <section id="workflow" className={`section-animate ${isVisible.workflow ? "visible" : ""} py-20 px-4 bg-white`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
            <img src={i4} alt="Analytics Engine" className="w-full h-auto rounded-xl shadow-lg" />
            </div>
            <div className="animate-slide-in-right">
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 mb-4">Workflow Control</Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Your Control Room for Everything</h2>
              <p className="text-lg text-gray-600 mb-8">
                Monitors the performance of all agents, tracks bottlenecks, and auto-corrects actions or adjusts
                internal systems (e.g., leave flow, hiring journey, training loop) by detecting inefficiencies and
                adapting flows in real-time or raises alerts and provide detailed reports when needed.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="bg-gray-900 text-white hover:bg-gray-800">
                  Automation
                </Badge>
                <Badge variant="secondary" className="bg-gray-900 text-white hover:bg-gray-800">
                  Live Reports
                </Badge>
                <Badge variant="secondary" className="bg-gray-900 text-white hover:bg-gray-800">
                  System Insights
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Task Automation Section */}
      <section
        id="tasks"
        className={`section-animate ${isVisible.tasks ? "visible" : ""} py-20 px-4 bg-gradient-to-r from-orange-50 to-blue-50`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100 mb-4">Workflow Automation</Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Automate repetitive tasks</h2>
              <p className="text-lg text-gray-600 mb-8">
                We help you streamline internal operations by automating manual workflows like data entry, reporting,
                and approval chains saving time and cutting down errors.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="bg-gray-900 text-white hover:bg-gray-800">
                  Internal Task Bots
                </Badge>
                <Badge variant="secondary" className="bg-gray-900 text-white hover:bg-gray-800">
                  100+ Automations
                </Badge>
              </div>
            </div>
            <div className="animate-slide-in-right">
            <img src={i5} alt="Analytics Engine" className="w-full h-auto rounded-xl shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Project Management Section */}
      <section id="projects" className={`section-animate ${isVisible.projects ? "visible" : ""} py-20 px-4 bg-white`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
            <img src={i6} alt="Analytics Engine" className="w-full h-auto rounded-xl shadow-lg" />
            </div>
            <div className="animate-slide-in-right">
              <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100 mb-4">Custom Projects</Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Build Smarter Systems</h2>
              <p className="text-lg text-gray-600 mb-8">
                Whether you're starting from scratch or enhancing an existing system, Prime breaks down goals, delegates
                tasks to the right agents, and oversees execution aligned to your needs.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="bg-gray-900 text-white hover:bg-gray-800">
                  Strategy
                </Badge>
                <Badge variant="secondary" className="bg-gray-900 text-white hover:bg-gray-800">
                  Custom AI
                </Badge>
                <Badge variant="secondary" className="bg-gray-900 text-white hover:bg-gray-800">
                  Consulting
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
