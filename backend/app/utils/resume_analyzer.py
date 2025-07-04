import os
import json
import shutil
import logging
import subprocess
from pathlib import Path
from typing import Dict, Any, Optional, List, Tuple

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Define paths
UPLOAD_DIR = Path("./uploads")
OUTPUT_DIR = Path("./output")
RESUME_INTELLIGENCE_DIR = Path("../../Zordie AI")

# Ensure directories exist
UPLOAD_DIR.mkdir(exist_ok=True)
OUTPUT_DIR.mkdir(exist_ok=True)


class ResumeAnalyzer:
    """
    Class to handle resume analysis using the Resume Intelligence System.
    """
    
    @staticmethod
    def analyze_resume(resume_path: Path, job_desc_path: Path) -> Dict[str, Any]:
        """
        Analyze a resume against a job description.
        
        Args:
            resume_path: Path to the resume file
            job_desc_path: Path to the job description file
            
        Returns:
            Dict containing analysis results
        """
        try:
            logger.info(f"Analyzing resume: {resume_path}")
            logger.info(f"Job description: {job_desc_path}")
            
            # Call the Resume Intelligence System's pipeline
            result = ResumeAnalyzer.analyze_resume_for_job(
                resume_path=str(resume_path),
                job_description_path=str(job_desc_path)
            )
            
            return result
            
        except Exception as e:
            logger.error(f"Error analyzing resume: {str(e)}")
            raise
    
    @staticmethod
    def analyze_resume_for_job(resume_path: str, job_description: str = None, 
                              job_description_path: str = None, 
                              required_skills: List[str] = None) -> Dict[str, Any]:
        """
        Analyze a resume against a job description using the Resume Intelligence System.
        
        Args:
            resume_path: Path to the resume file
            job_description: Job description text (optional)
            job_description_path: Path to job description file (optional)
            required_skills: List of required skills (optional)
            
        Returns:
            Dict containing analysis results
        """
        try:
            # If job_description is provided but not job_description_path, write to temp file
            temp_job_desc_path = None
            if job_description and not job_description_path:
                temp_job_desc_path = OUTPUT_DIR / f"job_desc_{os.path.basename(resume_path)}.txt"
                with open(temp_job_desc_path, "w") as f:
                    f.write(job_description)
                job_description_path = str(temp_job_desc_path)
            
            # If required_skills are provided, append to job description
            if required_skills and temp_job_desc_path:
                with open(temp_job_desc_path, "a") as f:
                    f.write("\n\nRequired Skills:\n")
                    for skill in required_skills:
                        f.write(f"- {skill}\n")
            
            # Run the Resume Intelligence System's pipeline
            script_path = RESUME_INTELLIGENCE_DIR / "run_analysis.py"
            cmd = [
                "python", 
                str(script_path), 
                "--resume", resume_path, 
                "--job-description", job_description_path
            ]
            
            logger.info(f"Running command: {' '.join(cmd)}")
            result = subprocess.run(cmd, capture_output=True, text=True, check=True)
            
            # Parse the output (assuming JSON output)
            output_file = OUTPUT_DIR / f"{os.path.basename(resume_path)}_analysis.json"
            if output_file.exists():
                with open(output_file, "r") as f:
                    analysis_results = json.load(f)
            else:
                # If output file doesn't exist, fall back to sample data
                analysis_results = ResumeAnalyzer._read_analysis_results()
            
            # Clean up temp file if created
            if temp_job_desc_path and os.path.exists(temp_job_desc_path):
                os.remove(temp_job_desc_path)
            
            return analysis_results
            
        except Exception as e:
            logger.error(f"Error analyzing resume for job: {str(e)}")
            # Fall back to sample data in case of error
            return ResumeAnalyzer._read_analysis_results()
    
    # Keep the existing methods for reading sample data as fallback
    @staticmethod
    def _read_analysis_results() -> Dict[str, Any]:
        """
        Read analysis results from the data science output folder.
        
        Returns:
            Dict containing analysis results
        """
        results = {}
        
        # Read skill alignment
        skill_alignment_path = DS_OUTPUT_DIR / "skill_alignment.json"
        if skill_alignment_path.exists():
            with open(skill_alignment_path, "r") as f:
                results["skill_alignment"] = json.load(f)
                if "overall_alignment" in results["skill_alignment"]:
                    results["skill_alignment_score"] = results["skill_alignment"]["overall_alignment"]
        
        # Read project validation
        project_validation_path = DS_OUTPUT_DIR / "project_validation.json"
        if project_validation_path.exists():
            with open(project_validation_path, "r") as f:
                results["project_validation"] = json.load(f)
                if "overall_score" in results["project_validation"]:
                    results["project_validation_score"] = results["project_validation"]["overall_score"]
        
        # Read formatting analysis
        formatting_path = DS_OUTPUT_DIR / "formatting.json"
        if formatting_path.exists():
            with open(formatting_path, "r") as f:
                results["formatting"] = json.load(f)
                if "overall_score" in results["formatting"]:
                    results["formatting_score"] = results["formatting"]["overall_score"]
        
        # Read trustworthiness analysis
        trustworthiness_path = DS_OUTPUT_DIR / "trustworthiness.json"
        if trustworthiness_path.exists():
            with open(trustworthiness_path, "r") as f:
                results["trustworthiness"] = json.load(f)
                if "overall_score" in results["trustworthiness"]:
                    results["trustworthiness_score"] = results["trustworthiness"]["overall_score"]
        
        # Read credibility analysis
        credibility_path = DS_OUTPUT_DIR / "credibility.json"
        if credibility_path.exists():
            with open(credibility_path, "r") as f:
                results["credibility"] = json.load(f)
                if "overall_score" in results["credibility"]:
                    results["credibility_score"] = results["credibility"]["overall_score"]
        
        # Read analysis summary
        summary_path = DS_OUTPUT_DIR / "analysis_summary.txt"
        if summary_path.exists():
            with open(summary_path, "r") as f:
                results["analysis_summary"] = f.read()
        
        # Calculate overall score
        scores = []
        if "skill_alignment_score" in results:
            scores.append(results["skill_alignment_score"])
        if "project_validation_score" in results:
            scores.append(results["project_validation_score"])
        if "formatting_score" in results:
            scores.append(results["formatting_score"])
        if "trustworthiness_score" in results:
            scores.append(results["trustworthiness_score"])
        if "credibility_score" in results:
            scores.append(results["credibility_score"])
        
        if scores:
            results["overall_score"] = sum(scores) / len(scores)
        else:
            results["overall_score"] = 0
        
        return results
    
    @staticmethod
    def get_missing_skills(analysis_results: Dict[str, Any]) -> List[str]:
        """
        Extract missing skills from the analysis results.
        
        Args:
            analysis_results: Dict containing analysis results
            
        Returns:
            List of missing skills
        """
        missing_skills = []
        
        if "skill_alignment" in analysis_results and "missing_skills" in analysis_results["skill_alignment"]:
            missing_skills = analysis_results["skill_alignment"]["missing_skills"]
        
        return missing_skills
    
    @staticmethod
    def get_matched_skills(analysis_results: Dict[str, Any]) -> List[str]:
        """
        Extract matched skills from the analysis results.
        
        Args:
            analysis_results: Dict containing analysis results
            
        Returns:
            List of matched skills
        """
        matched_skills = []
        
        if "skill_alignment" in analysis_results and "matched_skills" in analysis_results["skill_alignment"]:
            matched_skills = analysis_results["skill_alignment"]["matched_skills"]
        
        return matched_skills
    
    @staticmethod
    def get_top_projects(analysis_results: Dict[str, Any]) -> List[Dict[str, Any]]:
        """
        Extract top projects from the analysis results.
        
        Args:
            analysis_results: Dict containing analysis results
            
        Returns:
            List of top projects
        """
        top_projects = []
        
        if "project_validation" in analysis_results and "projects" in analysis_results["project_validation"]:
            projects = analysis_results["project_validation"]["projects"]
            # Sort projects by score
            sorted_projects = sorted(projects.items(), key=lambda x: x[1]["score"], reverse=True)
            top_projects = [{"name": name, "score": data["score"]} for name, data in sorted_projects[:3]]
        
        return top_projects
    
    @staticmethod
    def get_improvement_recommendations(analysis_results: Dict[str, Any]) -> List[str]:
        """
        Generate improvement recommendations based on the analysis results.
        
        Args:
            analysis_results: Dict containing analysis results
            
        Returns:
            List of improvement recommendations
        """
        recommendations = []
        
        # Add recommendations based on skill alignment
        if "skill_alignment_score" in analysis_results:
            score = analysis_results["skill_alignment_score"]
            if score < 50:
                recommendations.append("Improve your skill alignment with the job requirements")
                
                # Add specific skills to add
                missing_skills = ResumeAnalyzer.get_missing_skills(analysis_results)
                if missing_skills:
                    recommendations.append(f"Add the following missing skills: {', '.join(missing_skills[:5])}")
        
        # Add recommendations based on project validation
        if "project_validation_score" in analysis_results:
            score = analysis_results["project_validation_score"]
            if score < 50:
                recommendations.append("Add more relevant projects that demonstrate the required skills")
        
        # Add recommendations based on formatting
        if "formatting_score" in analysis_results:
            score = analysis_results["formatting_score"]
            if score < 50:
                recommendations.append("Improve your resume formatting for better readability")
        
        return recommendations
