"use client"
import { useState } from "react"
import type React from "react"
import {  Bell } from "lucide-react";
import Link from 'next/link'
import { LayoutDashboard } from 'lucide-react';


// import { Bot } from 'lucide-react';



import {
  Plus,
  MoreHorizontal,
  BarChart3,
  Upload,
  FileText,
  Users,
  CheckCircle,
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Clock,
  DollarSign,
  Target,
  Award,
  Filter,
  Calendar,
  Settings,
  User,
  Bot,
  UserPlus,
  Wallet,
} from "lucide-react"
import {
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts"


function SidebarItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center space-x-3 cursor-pointer px-3 py-2 rounded-md transition duration-300 hover:bg-gradient-to-r hover:from-[#2563eb] hover:to-[#60a5fa] hover:text-white">
      <div className="text-orange-500 group-hover:text-white">{icon}</div>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
// Agent Component with status dot
function Agent({ icon, name, dotColor }) {
  return (
    <div className="flex items-center space-x-3 cursor-pointer px-3 py-2 rounded-md transition duration-300 hover:bg-gradient-to-r hover:from-[#2563eb] hover:to-[#60a5fa] hover:text-white">
      <div className="w-4">{icon}</div>
      <span className="text-sm font-medium">{name}</span>
      <span className={`w-2 h-2 rounded-full ${dotColor} ml-auto`}></span>
    </div>
  );
}


// Complex HR Analytics Data
const hiringFunnelData = [
  { month: "Jan", applications: 450, screened: 180, interviewed: 90, offered: 25, hired: 20 },
  { month: "Feb", applications: 520, screened: 210, interviewed: 105, offered: 30, hired: 25 },
  { month: "Mar", applications: 380, screened: 150, interviewed: 75, offered: 20, hired: 18 },
  { month: "Apr", applications: 610, screened: 240, interviewed: 120, offered: 35, hired: 30 },
  { month: "May", applications: 490, screened: 195, interviewed: 98, offered: 28, hired: 24 },
  { month: "Jun", applications: 550, screened: 220, interviewed: 110, offered: 32, hired: 28 },
]

const timeToHireData = [
  { department: "Engineering", avgDays: 45, target: 30, positions: 25 },
  { department: "Sales", avgDays: 28, target: 25, positions: 18 },
  { department: "Marketing", avgDays: 35, target: 30, positions: 12 },
  { department: "HR", avgDays: 40, target: 35, positions: 8 },
  { department: "Finance", avgDays: 50, target: 40, positions: 6 },
  { department: "Operations", avgDays: 32, target: 28, positions: 15 },
]

const sourceEffectivenessData = [
  { source: "LinkedIn", applications: 1200, hires: 45, cost: 15000, quality: 8.5 },
  { source: "Indeed", applications: 2100, hires: 38, cost: 8000, quality: 6.2 },
  { source: "Referrals", applications: 450, hires: 52, cost: 5000, quality: 9.1 },
  { source: "Company Website", applications: 800, hires: 28, cost: 2000, quality: 7.8 },
  { source: "Glassdoor", applications: 650, hires: 22, cost: 6000, quality: 7.2 },
  { source: "Recruiters", applications: 320, hires: 35, cost: 25000, quality: 8.8 },
]

const diversityData = [
  { category: "Gender", male: 58, female: 40, other: 2 },
  { category: "Age", under30: 35, age30to50: 45, over50: 20 },
  { category: "Experience", junior: 30, mid: 45, senior: 25 },
]

const salaryAnalyticsData = [
  { role: "Software Engineer", min: 80000, avg: 120000, max: 160000, market: 115000 },
  { role: "Product Manager", min: 90000, avg: 140000, max: 180000, market: 135000 },
  { role: "Data Scientist", min: 95000, avg: 145000, max: 190000, market: 150000 },
  { role: "UX Designer", min: 70000, avg: 105000, max: 140000, market: 100000 },
  { role: "Sales Manager", min: 75000, avg: 110000, max: 150000, market: 108000 },
]

const performanceMetrics = [
  { metric: "Technical Skills", engineering: 8.5, sales: 6.2, marketing: 7.1, hr: 6.8 },
  { metric: "Communication", engineering: 7.2, sales: 9.1, marketing: 8.8, hr: 9.0 },
  { metric: "Leadership", engineering: 6.8, sales: 8.5, marketing: 7.9, hr: 8.2 },
  { metric: "Problem Solving", engineering: 9.0, sales: 7.8, marketing: 7.5, hr: 7.2 },
  { metric: "Teamwork", engineering: 8.2, sales: 8.0, marketing: 8.5, hr: 8.8 },
]

const retentionData = [
  { quarter: "Q1 2023", newHires: 45, left: 12, retention: 89.2 },
  { quarter: "Q2 2023", newHires: 52, left: 8, retention: 91.5 },
  { quarter: "Q3 2023", newHires: 38, left: 15, retention: 87.1 },
  { quarter: "Q4 2023", newHires: 41, left: 9, retention: 90.8 },
  { quarter: "Q1 2024", newHires: 48, left: 7, retention: 92.3 },
]

const interviewSuccessData = [
  { stage: "Phone Screen", passed: 75, total: 100 },
  { stage: "Technical", passed: 60, total: 75 },
  { stage: "Behavioral", passed: 50, total: 60 },
  { stage: "Final", passed: 42, total: 50 },
  { stage: "Offer", passed: 38, total: 42 },
]

export default function HRDashboard() {
  const [currentView, setCurrentView] = useState<"dashboard" | "upload" | "processing" | "results" | "error">(
    "dashboard",
  )
  const [uploadedResumes, setUploadedResumes] = useState<File[]>([])
  const [jobDescription, setJobDescription] = useState("")
  const [dragActive, setDragActive] = useState(false)
  const [selectedTimeRange, setSelectedTimeRange] = useState("6M")
  const [selectedDepartment, setSelectedDepartment] = useState("All")

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files)
      setUploadedResumes((prev) => [...prev, ...files])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setUploadedResumes((prev) => [...prev, ...files])
    }
  }

  const handleAnalyze = () => {
    if (uploadedResumes.length > 0 && jobDescription.trim()) {
      setCurrentView("processing")
      setTimeout(() => {
        setCurrentView("results")
      }, 3000)
    }
  }

  const renderDashboard = () => (
    <div className="p-6 bg-green-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Filters and Controls */}
        <div className="mb-6 bg-white rounded-lg p-4 shadow-sm border border-green-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={selectedTimeRange}
                  onChange={(e) => setSelectedTimeRange(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-1 text-sm"
                >
                  <option value="1M">Last Month</option>
                  <option value="3M">Last 3 Months</option>
                  <option value="6M">Last 6 Months</option>
                  <option value="1Y">Last Year</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-gray-500" />
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-1 text-sm"
                >
                  <option value="All">All Departments</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Sales">Sales</option>
                  <option value="Marketing">Marketing</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                </select>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>Updated: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Key Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Total Applications</p>
                <p className="text-2xl font-bold text-gray-900">3,247</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-xs text-green-600">+12.5%</span>
                </div>
              </div>
              <FileText className="h-6 w-6 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Hires This Month</p>
                <p className="text-2xl font-bold text-gray-900">28</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-xs text-green-600">+8.2%</span>
                </div>
              </div>
              <Users className="h-6 w-6 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Avg Time to Hire</p>
                <p className="text-2xl font-bold text-gray-900">38d</p>
                <div className="flex items-center mt-1">
                  <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                  <span className="text-xs text-red-600">-2.1d</span>
                </div>
              </div>
              <Clock className="h-6 w-6 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Cost per Hire</p>
                <p className="text-2xl font-bold text-gray-900">$4.2K</p>
                <div className="flex items-center mt-1">
                  <TrendingDown className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-xs text-green-600">-$320</span>
                </div>
              </div>
              <DollarSign className="h-6 w-6 text-orange-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Offer Accept Rate</p>
                <p className="text-2xl font-bold text-gray-900">89%</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-xs text-green-600">+3.1%</span>
                </div>
              </div>
              <Target className="h-6 w-6 text-indigo-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Quality Score</p>
                <p className="text-2xl font-bold text-gray-900">8.4</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-xs text-green-600">+0.3</span>
                </div>
              </div>
              <Award className="h-6 w-6 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* First Row - Hiring Funnel and Time to Hire */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Hiring Funnel */}
          <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm border border-green-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Hiring Funnel Analysis</h3>
              <button className="p-1 hover:bg-gray-100 rounded">
                <MoreHorizontal className="h-4 w-4 text-gray-500" />
              </button>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={hiringFunnelData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
                  <XAxis dataKey="month" className="text-gray-600" fontSize={12} />
                  <YAxis className="text-gray-600" fontSize={12} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="applications" fill="#3b82f6" name="Applications" />
                  <Bar dataKey="screened" fill="#10b981" name="Screened" />
                  <Bar dataKey="interviewed" fill="#f59e0b" name="Interviewed" />
                  <Line type="monotone" dataKey="hired" stroke="#ef4444" strokeWidth={3} name="Hired" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Time to Hire by Department */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-green-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Time to Hire by Department</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timeToHireData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" fontSize={12} />
                  <YAxis dataKey="department" type="category" fontSize={10} width={80} />
                  <Tooltip />
                  <Bar dataKey="avgDays" fill="#8b5cf6" name="Avg Days" />
                  <Bar dataKey="target" fill="#e5e7eb" name="Target" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Second Row - Source Effectiveness and Diversity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Source Effectiveness Scatter Plot */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-green-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Source Effectiveness (Quality vs Cost)</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart data={sourceEffectivenessData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="cost" name="Cost" unit="$" fontSize={12} />
                  <YAxis dataKey="quality" name="Quality" domain={[0, 10]} fontSize={12} />
                  <Tooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload
                        return (
                          <div className="bg-white p-3 border rounded shadow">
                            <p className="font-semibold">{data.source}</p>
                            <p>Quality: {data.quality}/10</p>
                            <p>Cost: ${data.cost.toLocaleString()}</p>
                            <p>Hires: {data.hires}</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Scatter dataKey="quality" fill="#10b981" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Diversity Metrics */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-green-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Diversity Metrics</h3>
            <div className="space-y-6">
              {diversityData.map((item, index) => (
                <div key={index}>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">{item.category}</h4>
                  <div className="space-y-2">
                    {Object.entries(item)
                      .filter(([key]) => key !== "category")
                      .map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </span>
                          <div className="flex items-center space-x-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${value}%` }}></div>
                            </div>
                            <span className="text-sm font-semibold text-gray-800 w-8">{value}%</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Third Row - Salary Analytics and Performance Radar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Salary Analytics */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-green-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Salary Analytics vs Market</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={salaryAnalyticsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="role" fontSize={10} angle={-45} textAnchor="end" height={80} />
                  <YAxis fontSize={12} />
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  <Bar dataKey="avg" fill="#3b82f6" name="Our Average" />
                  <Line type="monotone" dataKey="market" stroke="#ef4444" strokeWidth={2} name="Market Rate" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Performance Radar Chart */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-green-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Department Performance Comparison</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={performanceMetrics}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" fontSize={10} />
                  <PolarRadiusAxis angle={90} domain={[0, 10]} fontSize={10} />
                  <Radar name="Engineering" dataKey="engineering" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
                  <Radar name="Sales" dataKey="sales" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
                  <Radar name="Marketing" dataKey="marketing" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Fourth Row - Retention and Interview Success */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Retention Trends */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-green-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Retention Trends</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={retentionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" fontSize={12} />
                  <YAxis yAxisId="left" fontSize={12} />
                  <YAxis yAxisId="right" orientation="right" fontSize={12} />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="newHires" fill="#10b981" name="New Hires" />
                  <Bar yAxisId="left" dataKey="left" fill="#ef4444" name="Left" />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="retention"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    name="Retention %"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Interview Success Funnel */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-green-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Interview Success Funnel</h3>
            <div className="space-y-4">
              {interviewSuccessData.map((stage, index) => {
                const percentage = (stage.passed / stage.total) * 100
                return (
                  <div key={index} className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{stage.stage}</span>
                      <span className="text-sm text-gray-600">
                        {stage.passed}/{stage.total} ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-8 relative overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-green-500 h-8 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
                        {stage.passed} candidates
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 flex items-center justify-between bg-white rounded-lg p-4 shadow-sm border border-green-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
              <Plus className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-700">AI Resume Analyzer</span>
          </div>
          <div className="text-sm text-gray-600">Last Analysis: 2 hours ago</div>
        </div>

        {/* Create Your Own Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => setCurrentView("upload")}
            className="px-8 py-3 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition-colors"
          >
            Start AI Analysis →
          </button>
        </div>
      </div>
    </div>
  )

  const renderUploadForm = () => (
    <div className="p-6 bg-green-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => setCurrentView("dashboard")}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to HR Dashboard
          </button>
          <h1 className="text-2xl font-bold text-gray-900">AI Resume Analysis</h1>
          <p className="text-gray-600">Upload resumes and job description for advanced HR analytics</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Resume Upload */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-green-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Upload Candidate Resumes</h3>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive ? "border-green-400 bg-green-50" : "border-gray-300 hover:border-gray-400"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-sm font-medium text-gray-900 mb-2">Drop PDF files here or click to browse</p>
              <p className="text-xs text-gray-500 mb-4">Supports PDF files up to 10MB each</p>
              <input
                type="file"
                multiple
                accept=".pdf"
                onChange={handleFileInput}
                className="hidden"
                id="resume-upload"
              />
              <label
                htmlFor="resume-upload"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
              >
                <Upload className="h-4 w-4 mr-2" />
                Choose Files
              </label>
            </div>

            {uploadedResumes.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Uploaded Resumes ({uploadedResumes.length})</h4>
                {uploadedResumes.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{file.name}</span>
                    </div>
                    <span className="text-xs text-green-600">Ready</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Job Description */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-green-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Job Description & Requirements</h3>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste your detailed job description here...

Include:
- Role responsibilities
- Required skills and experience
- Preferred qualifications
- Company culture fit
- Compensation range

Example:
Senior HR Business Partner
5+ years HR experience, SHRM certification preferred, expertise in employee relations, performance management, and organizational development..."
              className="w-full h-64 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <div className="mt-2 text-xs text-gray-500">{jobDescription.length} characters</div>
          </div>
        </div>

        {/* Analysis Options */}
        <div className="mt-6 bg-white rounded-lg p-6 shadow-sm border border-green-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Analysis Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Skills Matching</h4>
              <p className="text-sm text-gray-600">AI-powered skill extraction and matching against job requirements</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Experience Analysis</h4>
              <p className="text-sm text-gray-600">Career progression and experience relevance evaluation</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Cultural Fit</h4>
              <p className="text-sm text-gray-600">Personality and culture alignment assessment</p>
            </div>
          </div>
        </div>

        {/* Analyze Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleAnalyze}
            disabled={uploadedResumes.length === 0 || !jobDescription.trim()}
            className="px-8 py-3 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Start Advanced Analysis →
          </button>
          {(uploadedResumes.length === 0 || !jobDescription.trim()) && (
            <p className="text-sm text-gray-500 mt-2">Please upload resumes and add job description to continue</p>
          )}
        </div>
      </div>
    </div>
  )

  const renderProcessing = () => (
    <div className="p-6 bg-green-50 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 shadow-sm border border-green-200 text-center max-w-md">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto mb-4"></div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">HR Analytics in Progress</h3>
        <p className="text-gray-600 mb-4">Our AI is performing comprehensive candidate analysis...</p>
        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center justify-center">
            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
            Extracting candidate information
          </div>
          <div className="flex items-center justify-center">
            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
            Analyzing skills and experience
          </div>
          <div className="flex items-center justify-center">
            <div className="h-4 w-4 border-2 border-gray-300 border-t-green-500 rounded-full animate-spin mr-2"></div>
            Generating HR insights
          </div>
        </div>
      </div>
    </div>
  )

  const renderResults = () => {
    // Sample analysis results data
    const analysisResults = {
      totalResumes: uploadedResumes.length,
      strongMatches: Math.floor(uploadedResumes.length * 0.3),
      averageScore: 76,
      recommendedCandidates: Math.floor(uploadedResumes.length * 0.2),
      processingTime: 12.5,
    }

    const candidateResults = [
      {
        id: "1",
        name: "Sarah Chen",
        email: "sarah.chen@email.com",
        matchScore: 94,
        skillsMatch: 96,
        experienceMatch: 92,
        educationMatch: 90,
        overallRating: "Excellent" as const,
        keySkills: ["React", "TypeScript", "Leadership", "Agile"],
        experience: "8 years",
        strengths: ["Strong technical leadership", "Excellent communication", "Team building"],
        weaknesses: ["Limited domain experience in fintech"],
      },
      {
        id: "2",
        name: "Michael Rodriguez",
        email: "m.rodriguez@email.com",
        matchScore: 89,
        skillsMatch: 88,
        experienceMatch: 90,
        educationMatch: 85,
        overallRating: "Excellent" as const,
        keySkills: ["Python", "Machine Learning", "Data Analysis", "SQL"],
        experience: "6 years",
        strengths: ["Advanced analytics skills", "Problem-solving", "Innovation"],
        weaknesses: ["Needs improvement in presentation skills"],
      },
      {
        id: "3",
        name: "Emily Johnson",
        email: "emily.j@email.com",
        matchScore: 84,
        skillsMatch: 85,
        experienceMatch: 82,
        educationMatch: 88,
        overallRating: "Good" as const,
        keySkills: ["Project Management", "Scrum", "Stakeholder Management"],
        experience: "5 years",
        strengths: ["Excellent project delivery", "Cross-functional collaboration"],
        weaknesses: ["Limited technical depth"],
      },
      {
        id: "4",
        name: "David Kim",
        email: "david.kim@email.com",
        matchScore: 78,
        skillsMatch: 80,
        experienceMatch: 75,
        educationMatch: 82,
        overallRating: "Good" as const,
        keySkills: ["UI/UX Design", "Figma", "User Research", "Prototyping"],
        experience: "4 years",
        strengths: ["Creative problem solving", "User-centered design"],
        weaknesses: ["Limited experience with enterprise products"],
      },
      {
        id: "5",
        name: "Alex Thompson",
        email: "alex.t@email.com",
        matchScore: 72,
        skillsMatch: 75,
        experienceMatch: 70,
        educationMatch: 78,
        overallRating: "Average" as const,
        keySkills: ["Sales", "CRM", "Customer Relations", "Negotiation"],
        experience: "3 years",
        strengths: ["Strong interpersonal skills", "Results-driven"],
        weaknesses: ["Lacks senior-level experience", "Limited industry knowledge"],
      },
    ]

    const skillsDistributionData = [
      { name: "Perfect Match", value: 25, fill: "#10b981" },
      { name: "Good Match", value: 45, fill: "#f59e0b" },
      { name: "Partial Match", value: 25, fill: "#ef4444" },
      { name: "No Match", value: 5, fill: "#6b7280" },
    ]

    const matchTrendsData = [
      { category: "Technical Skills", score: 85 },
      { category: "Experience Level", score: 78 },
      { category: "Education", score: 82 },
      { category: "Cultural Fit", score: 88 },
      { category: "Leadership", score: 75 },
      { category: "Communication", score: 90 },
    ]

    const departmentFitData = [
      { department: "Engineering", candidates: 8, avgScore: 87 },
      { department: "Product", candidates: 5, avgScore: 82 },
      { department: "Design", candidates: 3, avgScore: 79 },
      { department: "Sales", candidates: 4, avgScore: 74 },
      { department: "Marketing", candidates: 2, avgScore: 76 },
    ]

    return (
      <div className="p-6 bg-green-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <button
              onClick={() => setCurrentView("dashboard")}
              className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to HR Dashboard
            </button>
            <h1 className="text-2xl font-bold text-gray-900">AI Analysis Results</h1>
            <p className="text-gray-600">
              Comprehensive candidate analysis completed • Processed in {analysisResults.processingTime}s
            </p>
          </div>

          {/* Results KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Resumes Analyzed</p>
                  <p className="text-3xl font-bold text-gray-900">{analysisResults.totalResumes}</p>
                  <p className="text-xs text-green-600 mt-1">100% processed</p>
                </div>
                <FileText className="h-8 w-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Strong Matches</p>
                  <p className="text-3xl font-bold text-gray-900">{analysisResults.strongMatches}</p>
                  <p className="text-xs text-green-600 mt-1">Score ≥ 80%</p>
                </div>
                <Users className="h-8 w-8 text-green-500" />
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Match Score</p>
                  <p className="text-3xl font-bold text-gray-900">{analysisResults.averageScore}%</p>
                  <p className="text-xs text-green-600 mt-1">Above industry avg</p>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-500" />
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Recommended for Interview</p>
                  <p className="text-3xl font-bold text-gray-900">{analysisResults.recommendedCandidates}</p>
                  <p className="text-xs text-green-600 mt-1">Top performers</p>
                </div>
                <CheckCircle className="h-8 w-8 text-orange-500" />
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Skills Distribution */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-green-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Skills Match Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={skillsDistributionData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${value}%`}
                    >
                      {skillsDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Match Categories */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-green-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Match Categories Analysis</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={matchTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" fontSize={10} angle={-45} textAnchor="end" height={80} />
                    <YAxis domain={[0, 100]} fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="score" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Department Fit */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-green-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Department Fit Analysis</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={departmentFitData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" fontSize={10} />
                    <YAxis yAxisId="left" fontSize={12} />
                    <YAxis yAxisId="right" orientation="right" fontSize={12} />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="candidates" fill="#10b981" name="Candidates" />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="avgScore"
                      stroke="#ef4444"
                      strokeWidth={2}
                      name="Avg Score"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Top Candidates */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-green-200 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Top Candidate Matches</h3>
            <div className="space-y-4">
              {candidateResults.map((candidate, index) => (
                <div
                  key={candidate.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h4 className="text-lg font-semibold text-gray-900">{candidate.name}</h4>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            candidate.overallRating === "Excellent"
                              ? "bg-green-100 text-green-800"
                              : candidate.overallRating === "Good"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {candidate.overallRating}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Contact</p>
                          <p className="text-sm font-medium text-gray-900">{candidate.email}</p>
                          <p className="text-sm text-gray-600">{candidate.experience} experience</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Key Skills</p>
                          <div className="flex flex-wrap gap-1">
                            {candidate.keySkills.map((skill, skillIndex) => (
                              <span key={skillIndex} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-600">Skills Match</p>
                          <div className="flex items-center space-x-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${candidate.skillsMatch}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-semibold text-gray-800">{candidate.skillsMatch}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Experience</p>
                          <div className="flex items-center space-x-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-500 h-2 rounded-full"
                                style={{ width: `${candidate.experienceMatch}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-semibold text-gray-800">{candidate.experienceMatch}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Education</p>
                          <div className="flex items-center space-x-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-purple-500 h-2 rounded-full"
                                style={{ width: `${candidate.educationMatch}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-semibold text-gray-800">{candidate.educationMatch}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Overall</p>
                          <div className="flex items-center space-x-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-orange-500 h-2 rounded-full"
                                style={{ width: `${candidate.matchScore}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-semibold text-gray-800">{candidate.matchScore}%</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-green-700 mb-1">Strengths</p>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {candidate.strengths.map((strength, strengthIndex) => (
                              <li key={strengthIndex} className="flex items-start">
                                <span className="text-green-500 mr-2">•</span>
                                {strength}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-orange-700 mb-1">Areas for Development</p>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {candidate.weaknesses.map((weakness, weaknessIndex) => (
                              <li key={weaknessIndex} className="flex items-start">
                                <span className="text-orange-500 mr-2">•</span>
                                {weakness}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="text-right ml-6">
                      <div
                        className={`text-3xl font-bold mb-1 ${
                          candidate.matchScore >= 90
                            ? "text-green-600"
                            : candidate.matchScore >= 80
                              ? "text-blue-600"
                              : candidate.matchScore >= 70
                                ? "text-yellow-600"
                                : "text-red-600"
                        }`}
                      >
                        {candidate.matchScore}%
                      </div>
                      <div className="text-xs text-gray-500 mb-3">Match Score</div>
                      <div className="space-y-2">
                        <button className="w-full px-4 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600">
                          Schedule Interview
                        </button>
                        <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50">
                          View Resume
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setCurrentView("upload")}
              className="px-6 py-3 border border-green-500 text-green-600 rounded-full font-semibold hover:bg-green-50 transition-colors"
            >
              Analyze More Resumes
            </button>
            <button className="px-6 py-3 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition-colors">
              Export HR Report
            </button>
            <button className="px-6 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors">
              Schedule Interviews
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
  <div className="flex min-h-screen bg-gray-100">
    {/* SIDEBAR */}
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
<div className="flex items-center space-x-2">
  <img
    src="/assets/zordie-logo.png"
    alt="Zordie Logo"
    className="w-12 h-11"
  />
  <h1 className="text-2xl font-bold text-black-600">ZORDIE</h1>
</div>

      <nav className="flex-1 px-4 py-6 space-y-3 text-gray-700">
<Link href="/">
  <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" />
</Link>
<Link href="/AIChatBot">
  <SidebarItem icon={<Bot size={20} />} label="Prime Copilot" />
</Link>

<Link href="/workspace">
  <div>
    <SidebarItem icon={<FileText size={20} />} label="Workspace" />
  </div>
</Link>
<Link href="/RBACRoleManager">
  <SidebarItem icon={<CheckCircle size={20} />} label="RBAC Role Manager" />
</Link>
      <SidebarItem icon={<User size={20} />} label="Agent Management" />
<Link href="/CalendarPage">
  <div>
    <SidebarItem icon={<Calendar size={20} />} label="Schedule" />
  </div>
</Link>
      <SidebarItem icon={<Clock size={20} />} label="Compliance & Audit" />
 <Link href="/Nova">
  <SidebarItem icon={<DollarSign size={20} />} label="Nova Document Hub" />
</Link>
<Link href="/Support">
  <SidebarItem icon={<Award size={20} />} label="Support" />
</Link>
<div
  onClick={() => handleSidebarClick("Settings")}
  className="flex items-center space-x-3 cursor-pointer px-3 py-2 rounded-md transition duration-300 hover:bg-gradient-to-r hover:from-[#2563eb] hover:to-[#60a5fa] hover:text-white"
>
  <Settings size={18} className="text-orange-500" /> <span>Settings</span>
</div>

       {/* Active Agents Section */}
<div className="mt-6">
        <h4 className="text-sm font-semibold text-gray-600 mb-3">Active Agents</h4>
<Link href="/optimus-dashboard">
  <div>
    <Agent
      icon={<UserPlus size={16} className="text-blue-600" />}
      name="Optimus"
      dotColor="bg-green-500"
    />
  </div>
</Link>
        <Agent icon={<Clock size={16} className="text-red-500" />} name="Maxi" dotColor="bg-green-500" />
        <Agent icon={<Wallet size={16} className="text-amber-700" />} name="Laxmi" dotColor="bg-orange-400" />
        <Agent icon={<FileText size={16} className="text-purple-600" />} name="Nova" dotColor="bg-red-500" />
      </div>
      </nav>
    </aside>

    {/* MAIN SECTION */}
    <div className="flex-1 flex flex-col">
      {/* TOP BAR */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            {currentView === "dashboard"
              ? "HR Analytics Dashboard"
              : currentView === "upload"
              ? "AI Resume Analysis"
              : currentView === "processing"
              ? "Processing Analysis"
              : "Analysis Results"}
          </h1>
          <p className="text-sm text-gray-500">
            {currentView === "dashboard"
              ? "Comprehensive HR Metrics & Analytics"
              : "Advanced Candidate Matching"}
          </p>
        </div>

        {/* Search + Bell + Profile */}   
<div className="flex items-center space-x-4">
  <div className="relative">
    <input
      type="text"
      placeholder="Search..."
      className="pl-9 pr-3 py-1 w-64 border-2 border-orange-500 rounded-md text-sm bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200"
    />
    <svg
      className="absolute left-2 top-1/2 transform -translate-y-1/2 text-orange-500 w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
    </svg>
  </div>
  <Bell className="text-gray-600 w-5 h-5 cursor-pointer hover:text-orange-800" />
  <img
    src="https://ui-avatars.com/api/?name=Aiden+Max"
    alt="Profile"
    className="w-8 h-8 rounded-full"
  />
</div>

      </header>

      {/* ORIGINAL CONTENT RENDERING */}
      <main className="flex-1 overflow-y-auto">
{currentView === "dashboard" && (
  <div className="p-6">
    {renderDashboard()}
  </div>
)}

        {currentView === "upload" && <div className="p-6">Upload Section</div>}
        {currentView === "processing" && <div className="p-6">Processing...</div>}
        {currentView === "results" && <div className="p-6">Results</div>}
      </main>
    </div>
  </div>
)
}