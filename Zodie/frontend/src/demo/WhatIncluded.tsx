"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, Linkedin, CheckCircle, XCircle } from "lucide-react"

const accordionData = {
  "fit-score": {
    title: "Fit Score",
    description:
      "Spend less time scanning hundreds of resumes and profiles, and more time connecting with the right candidates. Quickly qualify talent based on skills, experience, and location with an AI-generated fit score.",
    image: {
      type: "candidate-profile",
      data: {
        name: "Anna Johns",
        title: "Sales Manager at Selina",
        source: "LinkedIn",
        avatar: "/placeholder.svg?height=60&width=60",
        fitScore: "A",
        criteria: [
          { label: "Distance", value: "5-20 mi", status: "pass" },
          { label: "Experience", value: "3-5 Years", status: "fail" },
          { label: "Job Title", value: "70% Match", status: "pass" },
          { label: "Required skills", value: "8/10", status: "pass" },
        ],
      },
    },
  },
  personalization: {
    title: "Personalization",
    description:
      "Deliver personalized experiences for every candidate and employee with AI-powered recommendations tailored to their unique profile, preferences, and career goals.",
    image: {
      type: "personalization-dashboard",
      data: {
        recommendations: [
          { title: "Software Engineer", match: "95%", company: "TechCorp" },
          { title: "Frontend Developer", match: "88%", company: "StartupXYZ" },
          { title: "Full Stack Developer", match: "82%", company: "InnovateLab" },
        ],
      },
    },
  },
  "ai-discovery": {
    title: "AI Discovery",
    description:
      "Uncover hidden talent pools and discover candidates you might have missed with intelligent search algorithms that go beyond keyword matching.",
    image: {
      type: "discovery-results",
      data: {
        totalCandidates: "2,847",
        newFinds: "156",
        categories: ["Software Development", "Product Management", "Data Science"],
      },
    },
  },
  "intelligent-automation": {
    title: "Intelligent Automation",
    description:
      "Automate repetitive tasks and streamline your workflow with smart automation that learns from your hiring patterns and preferences.",
    image: {
      type: "automation-workflow",
      data: {
        automatedTasks: 24,
        timeSaved: "15 hours/week",
        workflows: ["Resume Screening", "Interview Scheduling", "Follow-up Messages"],
      },
    },
  },
  "ai-insights": {
    title: "AI Insights",
    description:
      "Get actionable insights and analytics powered by AI to make data-driven hiring decisions and optimize your recruitment strategy.",
    image: {
      type: "insights-dashboard",
      data: {
        metrics: [
          { label: "Time to Hire", value: "18 days", trend: "down" },
          { label: "Quality Score", value: "8.7/10", trend: "up" },
          { label: "Candidate Satisfaction", value: "94%", trend: "up" },
        ],
      },
    },
  },
}

function CandidateProfile({ data }: { data: any }) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <img
              src={data.avatar || "/placeholder.svg"}
              alt={data.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">{data.name}</h3>
                <Linkedin className="w-4 h-4 text-secondary" />
              </div>
              <p className="text-sm text-muted-foreground">{data.title}</p>
              <p className="text-xs text-muted-foreground">Source: {data.source}</p>
            </div>
          </div>
          <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">Add to job</Button>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-foreground">Fit Score</h4>
          {data.criteria.map((criterion: any, index: number) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{criterion.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{criterion.value}</span>
                {criterion.status === "pass" ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500" />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-end">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Fit score</span>
            <Badge
              variant="secondary"
              className={`${
                data.fitScore === "A"
                  ? "bg-green-100 text-green-800"
                  : data.fitScore === "B"
                    ? "bg-primary/10 text-primary"
                    : "bg-red-100 text-red-800"
              }`}
            >
              {data.fitScore}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function PersonalizationDashboard({ data }: { data: any }) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <h3 className="font-semibold text-foreground mb-4">Recommended Jobs</h3>
        <div className="space-y-3">
          {data.recommendations.map((rec: any, index: number) => (
            <div key={index} className="p-3 border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-sm">{rec.title}</h4>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {rec.match}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{rec.company}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function DiscoveryResults({ data }: { data: any }) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <h3 className="font-semibold text-foreground mb-4">Discovery Results</h3>
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{data.totalCandidates}</div>
            <p className="text-sm text-muted-foreground">Total Candidates Found</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary">{data.newFinds}</div>
            <p className="text-sm text-muted-foreground">New Discoveries</p>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2">Top Categories</h4>
            {data.categories.map((category: string, index: number) => (
              <Badge key={index} variant="outline" className="mr-2 mb-2">
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function AutomationWorkflow({ data }: { data: any }) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <h3 className="font-semibold text-foreground mb-4">Automation Stats</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{data.automatedTasks}</div>
              <p className="text-sm text-muted-foreground">Tasks Automated</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">{data.timeSaved}</div>
              <p className="text-sm text-muted-foreground">Time Saved</p>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2">Active Workflows</h4>
            {data.workflows.map((workflow: string, index: number) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">{workflow}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function InsightsDashboard({ data }: { data: any }) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <h3 className="font-semibold text-foreground mb-4">Key Insights</h3>
        <div className="space-y-3">
          {data.metrics.map((metric: any, index: number) => (
            <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <p className="text-sm font-medium">{metric.label}</p>
                <p className="text-lg font-bold text-primary">{metric.value}</p>
              </div>
              <div className={`text-sm ${metric.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                {metric.trend === "up" ? "↗" : "↘"}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function WhatsIncludedSection() {
  const [activeItem, setActiveItem] = useState("fit-score")

  const renderRightContent = () => {
    const currentData = accordionData[activeItem as keyof typeof accordionData]

    switch (currentData.image.type) {
      case "candidate-profile":
        return <CandidateProfile data={currentData.image.data} />
      case "personalization-dashboard":
        return <PersonalizationDashboard data={currentData.image.data} />
      case "discovery-results":
        return <DiscoveryResults data={currentData.image.data} />
      case "automation-workflow":
        return <AutomationWorkflow data={currentData.image.data} />
      case "insights-dashboard":
        return <InsightsDashboard data={currentData.image.data} />
      default:
        return <CandidateProfile data={currentData.image.data} />
    }
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">What's Included</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left side - Accordion */}
          <div className="space-y-4">
            <Accordion
              type="single"
              value={activeItem}
              onValueChange={(value) => value && setActiveItem(value)}
              className="space-y-4"
            >
              {Object.entries(accordionData).map(([key, item]) => (
                <AccordionItem key={key} value={key} className="border border-border border-blue-400 rounded-lg px-6 py-2">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="text-lg font-semibold text-foreground">{item.title}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 pb-2">
                    <p className="text-muted-foreground leading-relaxed mb-4">{item.description}</p>
                    <button className="flex items-center gap-2 text-secondary hover:text-secondary/80 font-medium">
                      Learn more
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Right side - Dynamic content */}
          <div className="lg:sticky lg:top-8">{renderRightContent()}</div>
        </div>
      </div>
    </section>
  )
}
