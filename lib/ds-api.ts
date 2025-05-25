// API utility functions for DS team integration

import { API_CONFIG, type AnalysisResult, type DSTeamAPIResponse } from "./api-config"

export class DSTeamAPI {
  private static async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${API_CONFIG.BASE_URL}${endpoint}`

    const defaultHeaders = {
      Authorization: `Bearer ${API_CONFIG.API_KEY}`,
      ...options.headers,
    }

    const response = await fetch(url, {
      ...options,
      headers: defaultHeaders,
      signal: AbortSignal.timeout(API_CONFIG.TIMEOUT),
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${response.statusText}`)
    }

    return response.json() as Promise<DSTeamAPIResponse>
  }

  // Direct analysis (for quick processing)
  static async analyzeResumes(resumes: File[], jobDescription: string): Promise<AnalysisResult> {
    const formData = new FormData()

    resumes.forEach((file, index) => {
      formData.append(`resume_${index}`, file)
    })
    formData.append("job_description", jobDescription)
    formData.append("analysis_type", "comprehensive")

    const response = await this.makeRequest("/analyze-resumes", {
      method: "POST",
      body: formData,
    })

    if (!response.success || !response.data) {
      throw new Error(response.error || "Analysis failed")
    }

    return response.data
  }

  // Submit job for background processing
  static async submitAnalysisJob(resumes: File[], jobDescription: string): Promise<string> {
    const formData = new FormData()

    resumes.forEach((file, index) => {
      formData.append(`resume_${index}`, file)
    })
    formData.append("job_description", jobDescription)

    const response = await this.makeRequest("/submit-analysis", {
      method: "POST",
      body: formData,
    })

    if (!response.success || !response.data) {
      throw new Error(response.error || "Failed to submit analysis job")
    }

    return response.data.jobId
  }

  // Check analysis status
  static async checkAnalysisStatus(jobId: string): Promise<{
    status: "pending" | "processing" | "completed" | "failed"
    message?: string
    result?: AnalysisResult
    error?: string
  }> {
    const response = await this.makeRequest(`/analysis-status/${jobId}`)

    if (!response.success) {
      throw new Error(response.error || "Failed to check status")
    }

    return response.data
  }

  // Get analysis results
  static async getAnalysisResults(jobId: string): Promise<AnalysisResult> {
    const response = await this.makeRequest(`/analysis-results/${jobId}`)

    if (!response.success || !response.data) {
      throw new Error(response.error || "Failed to get results")
    }

    return response.data
  }
}
