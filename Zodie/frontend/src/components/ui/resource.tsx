"use client"

import { useState } from "react"
import { Search, Calendar, Play, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const resources = [
  {
    id: 1,
    title: "Trends Shaping Candidate Screening in Today's Hiring Landscape",
    description:
      "Discover the latest trends and technologies transforming how companies screen candidates in the modern hiring process.",
    category: "Customer Stories",
    type: "Guide",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
    readTime: "5 min read",
    url: "https://hirebee.ai/blog/automated-candidate-screening-with-hirebee/innovations-in-candidate-screening-evaluation-tools-trends-and-tactics/",
    featured: false,
  },
  {
    id: 2,
    title: "The Human Side of HR Tech: Implementation Building Successful Teams",
    description:
      "Learn how to successfully implement HR technology while maintaining the human element in your organization.",
    category: "Talent Experience",
    type: "Whitepaper",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    readTime: "8 min read",
    url: "https://www.aihr.com/blog/hr-technology-strategy/",
    featured: false,
  },
  {
    id: 3,
    title: "Optimize Your Hiring Workflow With Business Process Mapping",
    description:
      "Streamline your recruitment process with effective business process mapping techniques and best practices.",
    category: "Talent Experience",
    type: "Template",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    readTime: "12 min read",
    url: "https://www.cflowapps.com/hr-process-mapping/",
    featured: false,
  },
  {
    id: 4,
    title: "Uncovering Healthcare Hiring Bias: An Executive Interview with Hiring Intelligence",
    description:
      "Explore insights from healthcare executives on identifying and eliminating bias in the hiring process.",
    category: "Customer Stories",
    type: "Interview",
    image: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=400&q=80",
    readTime: "15 min read",
    url: "https://www.linkedin.com/pulse/gender-bias-pharma-biotech-interviews-uncovering-hidden-bryan-blair-hz9be",
    featured: false,
  },
  {
    id: 5,
    title: "What is High-Volume Recruiting and How Do You Manage It?",
    description:
      "Master the art of high-volume recruiting with proven strategies and tools for managing large-scale hiring.",
    category: "Talent Management",
    type: "Guide",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    readTime: "10 min read",
    url: "https://assessment.aon.com/en-us/blog/high-volume-recruiting-guide",
    featured: false,
  },
  {
    id: 6,
    title: "Talent Acquisition Smart Guide for 2024",
    description:
      "Your comprehensive guide to talent acquisition strategies, trends, and best practices for the year ahead.",
    category: "Talent Management",
    type: "Guide",
    image: "https://images.unsplash.com/photo-1461344577544-4e5dc9487184?auto=format&fit=crop&w=400&q=80",
    readTime: "20 min read",
    url: "https://www.aihr.com/blog/hr-technology-trends/",
    featured: false,
  },
  {
    id: 7,
    title: "Implementing the Redesigned Hiring Experience: What Today's Workforce Really Wants",
    description:
      "Understanding modern workforce expectations and redesigning your hiring process to attract top talent.",
    category: "Customer Stories",
    type: "Research",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=400&q=80",
    readTime: "7 min read",
    url: "https://www.aihr.com/blog/hr-technology-strategy/",
    featured: false,
  },
  {
    id: 8,
    title: "Taking Your Team to a Higher Level: Southwest's Direct Sourcing Journey",
    description:
      "Learn how Southwest Airlines transformed their direct sourcing strategy to build a more effective hiring process.",
    category: "Customer Stories",
    type: "Case Study",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
    readTime: "12 min read",
    url: "https://www.aihr.com/blog/hr-technology-trends/",
    featured: false,
  },
  {
    id: 9,
    title: "AI and CRM: Powering the Complete Talent Experience",
    description:
      "Discover how AI and CRM technologies work together to create seamless talent experiences from hire to retire.",
    category: "Customer Stories",
    type: "Whitepaper",
    image: "https://images.unsplash.com/photo-1515168833906-d2a3b82b302a?auto=format&fit=crop&w=400&q=80",
    readTime: "18 min read",
    url: "https://www.aihr.com/blog/hr-technology-trends/",
    featured: false,
  },
]


export default function ResourcePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("All")

  const filterOptions = [
    "All",
    "Free by Type",
    "Free by Topic",
    "Customer Stories",
    "Talent Experience",
    "Talent Management",
  ]

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase())

    let matchesFilter = true
    if (selectedFilter === "Customer Stories") {
      matchesFilter = resource.category === "Customer Stories"
    } else if (selectedFilter === "Talent Experience") {
      matchesFilter = resource.category === "Talent Experience"
    } else if (selectedFilter === "Talent Management") {
      matchesFilter = resource.category === "Talent Management"
    } else if (selectedFilter !== "All" && selectedFilter !== "Free by Type" && selectedFilter !== "Free by Topic") {
      matchesFilter = resource.category === selectedFilter
    }

    return matchesSearch && matchesFilter
  })

  const handleCardClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="min-h-screen gradient-bg">
      {/* Hero Section */}
      <div className="relative overflow-hidden hero-gradient">
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 animate-fade-in tracking-tight">
            Explore Resources
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-16 max-w-3xl mx-auto animate-fade-in-delay leading-relaxed">
            Everything you need to know about intelligent talent experience.
          </p>

          {/* Featured Resource Banner */}
          <div className="max-w-6xl mx-auto mb-20 animate-slide-up">
            <div className="featured-gradient p-1 rounded-2xl shadow-2xl">
              <div className="bg-white rounded-xl overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                  <div className="flex-1 p-12 text-left">
                    <div className="flex items-center gap-3 mb-6">
                      <Badge className="bg-blue-100 text-black-800 px-4 py-2 text-sm font-semibold">
                        HR INNOVATION VIRTUAL EVENT
                      </Badge>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                      MEET THE
                      <br />
                      MOST ADVANCED
                      <br />
                      <span className="bg-gradient-to-r from-blue-400 to-orange-500 bg-clip-text text-transparent">
                        APPLIED AI
                      </span>
                    </h2>
                    <div className="flex items-center gap-4 mb-8">
                      <Calendar className="w-6 h-6 text-gray-600" />
                      <span className="text-lg text-gray-700 font-medium">June 23 - 10AM ET</span>
                    </div>
                    <Button
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                    >
                      Register now
                    </Button>
                  </div>
                  <div className="flex-shrink-0 lg:w-96">
                    <div className="h-full bg-gradient-to-br from-orange-400 via-orange-300 to-orange-400 flex items-center justify-center">
                      <div className="text-white text-center p-8">
                        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Play className="w-12 h-12" />
                        </div>
                        <p className="text-lg font-semibold">Watch Preview</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        {/* Featured Section */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">FEATURED</span>
              <h2 className="text-4xl font-bold text-gray-900 mt-2">
                Meet the Most Advanced Applied AI: Transforming
                <br />
                Hiring, Development & Retention
              </h2>
            </div>
          </div>
          <p className="text-lg text-gray-600 mb-8 max-w-4xl leading-relaxed">
            Introducing the new AI Agents that are solving industry-specific hiring, development, and retention
            challenges – and reshaping how you collaborate with AI. Discover how to bridge the gap between business
            goals and HR strategy.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold">
            Register now
          </Button>
        </div>

        {/* All Resources Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">All Resources</h2>

          {/* Filters and Search */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-12">
            <div className="flex flex-wrap gap-3">
              {filterOptions.map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? "default" : "outline"}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedFilter === filter
                      ? "bg-gray-900 text-white hover:bg-gray-800"
                      : "border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
                  }`}
                >
                  {filter}
                </Button>
              ))}
            </div>

            <div className="relative w-full lg:w-80">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-3 rounded-full border-gray-300 focus:border-gray-400 focus:ring-gray-400 bg-white"
              />
            </div>
          </div>

          {/* Resource Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredResources.map((resource, index) => (
              <Card
                key={resource.id}
                className="fluid-card group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleCardClick(resource.url)}
              >
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={resource.image || "/placeholder.svg"}
                      alt={resource.title}
                      className="card-image w-full h-48 object-cover transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/95 text-gray-800 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                        {resource.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-white transition-colors leading-tight">
                    {resource.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 line-clamp-3 group-hover:text-white/90 transition-colors mb-4 leading-relaxed">
                    {resource.description}
                  </CardDescription>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 group-hover:text-white/80 transition-colors">
                      {resource.readTime}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-3 rounded-full border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-semibold"
            >
              Load more
            </Button>
          </div>
        </div>

        {/* Bottom Featured Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-1 shadow-2xl">
          <div className="bg-white rounded-xl overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="flex-1 p-12">
                <Badge className="bg-blue-100 text-blue-800 px-4 py-2 text-sm font-semibold mb-6">
                  TALENT EXPERIENCE LIVE
                </Badge>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Tune in to Talent Experience Live</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  A weekly live stream exploring the latest in HR, talent acquisition, and workforce innovation.
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold">
                  Watch now
                </Button>
              </div>
              <div className="flex-shrink-0 lg:w-96 h-64 lg:h-auto">
                <img
                  src="/placeholder.svg?height=300&width=400"
                  alt="Talent Experience Live"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
