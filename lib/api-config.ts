// API Configuration for DS Team Integration

export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "https://your-ds-api.com/api",
  API_KEY: process.env.NEXT_PUBLIC_API_KEY || "",
  TIMEOUT: 30000, // 30 seconds
}

// API Response Types that your DS team should implement
export interface DSTeamAPIResponse {
  success: boolean
  data?: AnalysisResult
  error?: string
  message?: string
}

export interface AnalysisResult {
  jobId: string
  totalResumes: number
  strongMatches: number
  averageScore: number
  recommendedCandidates: number
  candidates: CandidateMatch[]
  skillsDistribution: {
    perfectMatch: number
    goodMatch: number
    partialMatch: number
    noMatch: number
  }
  processingTime: number
  analysisDate: string
}

export interface CandidateMatch {
  id: string
  name: string
  email: string
  phone?: string
  matchScore: number
  skillsMatch: number
  experienceMatch: number
  educationMatch: number
  overallRating: "Excellent" | "Good" | "Average" | "Poor"
  keySkills: string[]
  experience: string
  strengths: string[]
  weaknesses: string[]
  resumeUrl?: string
}

// API Endpoints your DS team should implement
export const API_ENDPOINTS = {
  ANALYZE_RESUMES: "/analyze-resumes",
  SUBMIT_ANALYSIS: "/submit-analysis",
  CHECK_STATUS: "/analysis-status/:jobId",
  GET_RESULTS: "/analysis-results/:jobId",
}
