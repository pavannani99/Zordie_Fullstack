import os
import json
import shutil
import logging
from pathlib import Path
from typing import Dict, Any, Optional, List, Tuple

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Define paths
UPLOAD_DIR = Path("./uploads")
OUTPUT_DIR = Path("./output")
DS_OUTPUT_DIR = Path("../../output")  # Path to the data science output folder

# Ensure directories exist
UPLOAD_DIR.mkdir(exist_ok=True)
OUTPUT_DIR.mkdir(exist_ok=True)


class ResumeAnalyzer:
    """
    Class to handle resume analysis using the data science code.
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
            
            # In a real implementation, you would call your data science code here
            # For example:
            # subprocess.run(["python", "analyze_resume.py", str(resume_path), str(job_desc_path)])
            
            # For now, we'll read the sample output files from the data science output folder
            return ResumeAnalyzer._read_analysis_results()
            
        except Exception as e:
            logger.error(f"Error analyzing resume: {str(e)}")
            raise
    
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
