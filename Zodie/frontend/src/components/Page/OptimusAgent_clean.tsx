import { Features } from "@/components/blocks/features-11"
import Navbar from "@/components/ui/nav"
import { Footerdemo } from "@/demo/fs"
import { GradientHeadingDemo } from "@/demo/gradientHeadDemo"
import { 
  Upload, 
  ArrowUp, 
  ArrowDown, 
  FileText, 
  Trash2, 
  BarChart3, 
  CheckCircle, 
  MoreHorizontal, 
  RefreshCw, 
  Plus, 
  ExternalLink,
  Users,
  Clock,
  Percent,
  Award,
  Brain
} from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import axios from 'axios'

// Dashboard data interfaces
interface ResumeAnalysis {
  overall_score: number;
  skills_match: number;
  experience_relevance: number;
  education_fit: number;
  communication_skills: number;
  technical_proficiency: number;
  leadership_potential: number;
  cultural_fit: number;
}

interface ResumeUpload {
  name: string;
  size: number;
  type: string;
}

export const OptimusPage = () => {
  // State for resume analysis
  const [activeTab, setActiveTab] = useState("upload");
  const [jobDescription, setJobDescription] = useState("");
  const [uploadedResumes, setUploadedResumes] = useState<ResumeUpload[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ResumeAnalysis | null>(null);
  
  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Handle file upload for resumes
  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files).map(file => ({
        name: file.name,
        size: file.size,
        type: file.type
      }));
      setUploadedResumes(prev => [...prev, ...newFiles]);
    }
  };
  
  // Handle removing a resume from the list
  const handleRemoveResume = (index: number) => {
    setUploadedResumes(prev => prev.filter((_, i) => i !== index));
  };
  
  // Handle job description input
  const handleJobDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription(event.target.value);
  };
  
  // Start the AI analysis process
  const startAnalysis = () => {
    if (uploadedResumes.length === 0) {
      alert("Please upload at least one resume to analyze");
      return;
    }
    
    setAnalyzing(true);
    setAnalysisProgress(0);
    
    // Simulate analysis progress
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setAnalyzing(false);
          setAnalysisComplete(true);
          
          // Mock analysis result
          setAnalysisResult({
            overall_score: 85,
            skills_match: 82,
            experience_relevance: 88,
            education_fit: 90,
            communication_skills: 78,
            technical_proficiency: 86,
            leadership_potential: 75,
            cultural_fit: 89
          });
          
          return 100;
        }
        return prev + 5;
      });
    }, 300);
  };
  
  // Reset the analysis
  const resetAnalysis = () => {
    setUploadedResumes([]);
    setJobDescription("");
    setAnalysisProgress(0);
    setAnalyzing(false);
    setAnalysisComplete(false);
    setAnalysisResult(null);
    setActiveTab("upload");
  };
  
  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  // Helper function to render skill score
  const renderSkillScore = (label: string, score: number) => (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm font-medium">{score}%</span>
      </div>
      <Progress value={score} className="h-2" />
    </div>
  );
  
  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#111111]">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Optimus AI Resume Analyzer</h1>
            <p className="text-muted-foreground mt-1">
              Upload resumes and job descriptions for AI-powered matching and analysis
            </p>
          </div>
          {analysisComplete && (
            <Button variant="outline" onClick={resetAnalysis} className="mt-4 md:mt-0">
              <RefreshCw className="mr-2 h-4 w-4" />
              New Analysis
            </Button>
          )}
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8">
          <Card className="border-none shadow-md">
            <CardHeader className="pb-2">
              <CardTitle>Resume Analysis Dashboard</CardTitle>
              <CardDescription>
                Analyze resumes against job descriptions to find the best candidates
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload" disabled={analyzing}>Upload & Analyze</TabsTrigger>
                  <TabsTrigger value="results" disabled={!analysisComplete}>Results</TabsTrigger>
                </TabsList>
                
                <TabsContent value="upload" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Job Description Section */}
                    <div>
                      <div className="mb-4">
                        <Label htmlFor="job-description" className="text-base font-medium">
                          Job Description
                        </Label>
                        <p className="text-sm text-muted-foreground mb-2">
                          Paste the job description to match against resumes
                        </p>
                        <Textarea
                          id="job-description"
                          placeholder="Enter the job description here..."
                          className="min-h-[200px]"
                          value={jobDescription}
                          onChange={handleJobDescriptionChange}
                          disabled={analyzing}
                        />
                      </div>
                    </div>
                    
                    {/* Resume Upload Section */}
                    <div>
                      <div className="mb-4">
                        <Label className="text-base font-medium">Upload Resumes</Label>
                        <p className="text-sm text-muted-foreground mb-2">
                          Upload resumes in PDF, DOCX, or TXT format
                        </p>
                        
                        <div 
                          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm font-medium">Click to upload or drag and drop</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            PDF, DOCX or TXT (max 10MB)
                          </p>
                          <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept=".pdf,.docx,.doc,.txt"
                            multiple
                            onChange={handleResumeUpload}
                            disabled={analyzing}
                          />
                        </div>
                      </div>
                      
                      {/* Uploaded Resumes List */}
                      {uploadedResumes.length > 0 && (
                        <div className="mt-6">
                          <h3 className="text-sm font-medium mb-2">Uploaded Resumes ({uploadedResumes.length})</h3>
                          <div className="space-y-2">
                            {uploadedResumes.map((file, index) => (
                              <div 
                                key={index} 
                                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                              >
                                <div className="flex items-center">
                                  <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                                  <div>
                                    <p className="text-sm font-medium truncate max-w-[200px]">{file.name}</p>
                                    <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                                  </div>
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => handleRemoveResume(index)}
                                  disabled={analyzing}
                                >
                                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Analysis Button */}
                  <div className="mt-8 flex justify-end">
                    <Button 
                      onClick={startAnalysis} 
                      disabled={analyzing || uploadedResumes.length === 0 || !jobDescription.trim()}
                      className="w-full md:w-auto"
                    >
                      {analyzing ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Brain className="mr-2 h-4 w-4" />
                          Start AI Analysis
                        </>
                      )}
                    </Button>
                  </div>
                  
                  {/* Analysis Progress */}
                  {analyzing && (
                    <div className="mt-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Analyzing resumes...</span>
                        <span className="text-sm font-medium">{analysisProgress}%</span>
                      </div>
                      <Progress value={analysisProgress} className="h-2" />
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="results" className="mt-6">
                  {analysisResult && (
                    <div>
                      {/* Overall Score */}
                      <div className="mb-8 text-center">
                        <div className="inline-flex items-center justify-center p-8 rounded-full bg-primary/10 mb-4">
                          <div className="text-4xl font-bold text-primary">{analysisResult.overall_score}%</div>
                        </div>
                        <h3 className="text-xl font-medium">Overall Match Score</h3>
                        <p className="text-muted-foreground mt-1">
                          Based on job requirements and resume analysis
                        </p>
                      </div>
                      
                      {/* Score Breakdown */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Skills & Experience</CardTitle>
                          </CardHeader>
                          <CardContent>
                            {renderSkillScore("Skills Match", analysisResult.skills_match)}
                            {renderSkillScore("Experience Relevance", analysisResult.experience_relevance)}
                            {renderSkillScore("Education Fit", analysisResult.education_fit)}
                            {renderSkillScore("Technical Proficiency", analysisResult.technical_proficiency)}
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Soft Skills & Potential</CardTitle>
                          </CardHeader>
                          <CardContent>
                            {renderSkillScore("Communication Skills", analysisResult.communication_skills)}
                            {renderSkillScore("Leadership Potential", analysisResult.leadership_potential)}
                            {renderSkillScore("Cultural Fit", analysisResult.cultural_fit)}
                          </CardContent>
                        </Card>
                      </div>
                      
                      {/* Recommendations */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">AI Recommendations</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-start">
                              <CheckCircle className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                              <div>
                                <p className="font-medium">Strong technical skills match</p>
                                <p className="text-sm text-muted-foreground">
                                  The candidate's technical skills align well with the job requirements.
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <CheckCircle className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                              <div>
                                <p className="font-medium">Relevant experience</p>
                                <p className="text-sm text-muted-foreground">
                                  The candidate has experience in similar roles and industries.
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <CheckCircle className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                              <div>
                                <p className="font-medium">Educational background</p>
                                <p className="text-sm text-muted-foreground">
                                  The candidate's education is relevant to the position.
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      {/* Action Buttons */}
                      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-end">
                        <Button variant="outline" onClick={resetAnalysis}>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          New Analysis
                        </Button>
                        <Button>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Export Results
                        </Button>
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <GradientHeadingDemo />
      <Features />
      <Footerdemo />
    </div>
  )
}

// Export the component as default
export default OptimusPage;
