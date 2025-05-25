import asyncio
from datetime import datetime
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import async_session
from app.models.job import Job, JobStatus, JobType, ExperienceLevel
from app.models.user import User
from app.crud.crud_user import crud_user

# Sample job data
SAMPLE_JOBS = [
    {
        "title": "Senior Frontend Developer",
        "company": "TechCorp",
        "location": "Remote",
        "description": "We are looking for a Senior Frontend Developer to join our team. You will be responsible for building and maintaining our web applications.",
        "requirements": "- 5+ years of experience with React\n- Strong TypeScript skills\n- Experience with state management libraries\n- Good understanding of web performance optimization",
        "salary_min": 100000,
        "salary_max": 150000,
        "status": JobStatus.ACTIVE.value,
        "job_type": JobType.FULL_TIME.value,
        "experience_level": ExperienceLevel.SENIOR.value
    },
    {
        "title": "Backend Engineer",
        "company": "DataSystems Inc.",
        "location": "New York, NY",
        "description": "Join our backend team to build scalable and reliable APIs and services.",
        "requirements": "- 3+ years of experience with Python\n- Experience with FastAPI or Django\n- Database design and optimization\n- Knowledge of containerization and deployment",
        "salary_min": 90000,
        "salary_max": 130000,
        "status": JobStatus.ACTIVE.value,
        "job_type": JobType.FULL_TIME.value,
        "experience_level": ExperienceLevel.MID.value
    },
    {
        "title": "DevOps Engineer",
        "company": "CloudTech Solutions",
        "location": "Seattle, WA",
        "description": "Help us build and maintain our cloud infrastructure and CI/CD pipelines.",
        "requirements": "- Experience with AWS or Azure\n- Knowledge of Kubernetes and Docker\n- Infrastructure as Code (Terraform, CloudFormation)\n- CI/CD pipeline setup and maintenance",
        "salary_min": 110000,
        "salary_max": 160000,
        "status": JobStatus.ACTIVE.value,
        "job_type": JobType.FULL_TIME.value,
        "experience_level": ExperienceLevel.SENIOR.value
    },
    {
        "title": "UI/UX Designer",
        "company": "CreativeMinds",
        "location": "San Francisco, CA",
        "description": "Design beautiful and intuitive user interfaces for our web and mobile applications.",
        "requirements": "- Portfolio showcasing UI/UX work\n- Proficiency in Figma or Adobe XD\n- Understanding of user-centered design principles\n- Experience with design systems",
        "salary_min": 85000,
        "salary_max": 120000,
        "status": JobStatus.ACTIVE.value,
        "job_type": JobType.FULL_TIME.value,
        "experience_level": ExperienceLevel.MID.value
    },
    {
        "title": "Data Scientist",
        "company": "AnalyticsAI",
        "location": "Boston, MA",
        "description": "Apply machine learning and statistical techniques to solve complex business problems.",
        "requirements": "- MS or PhD in a quantitative field\n- Experience with Python, R, or Julia\n- Knowledge of machine learning frameworks\n- Strong mathematical and statistical background",
        "salary_min": 120000,
        "salary_max": 180000,
        "status": JobStatus.ACTIVE.value,
        "job_type": JobType.FULL_TIME.value,
        "experience_level": ExperienceLevel.SENIOR.value
    },
    {
        "title": "Mobile Developer (iOS)",
        "company": "AppWorks",
        "location": "Austin, TX",
        "description": "Develop and maintain iOS applications for our clients.",
        "requirements": "- 2+ years of Swift development\n- Experience with UIKit and SwiftUI\n- Understanding of iOS app lifecycle\n- Knowledge of App Store submission process",
        "salary_min": 80000,
        "salary_max": 120000,
        "status": JobStatus.ACTIVE.value,
        "job_type": JobType.FULL_TIME.value,
        "experience_level": ExperienceLevel.MID.value
    },
    {
        "title": "Product Manager",
        "company": "InnovateNow",
        "location": "Chicago, IL",
        "description": "Lead the development of new products from conception to launch.",
        "requirements": "- 3+ years of product management experience\n- Strong analytical and problem-solving skills\n- Excellent communication and leadership abilities\n- Technical background preferred",
        "salary_min": 100000,
        "salary_max": 150000,
        "status": JobStatus.ACTIVE.value,
        "job_type": JobType.FULL_TIME.value,
        "experience_level": ExperienceLevel.SENIOR.value
    },
    {
        "title": "QA Engineer",
        "company": "QualitySoft",
        "location": "Denver, CO",
        "description": "Ensure the quality of our software products through manual and automated testing.",
        "requirements": "- Experience with test automation frameworks\n- Knowledge of QA methodologies\n- Strong attention to detail\n- Experience with bug tracking systems",
        "salary_min": 70000,
        "salary_max": 100000,
        "status": JobStatus.ACTIVE.value,
        "job_type": JobType.FULL_TIME.value,
        "experience_level": ExperienceLevel.JUNIOR.value
    },
    {
        "title": "Technical Writer",
        "company": "DocuTech",
        "location": "Remote",
        "description": "Create clear and concise technical documentation for our software products.",
        "requirements": "- Strong writing and editing skills\n- Ability to understand and explain technical concepts\n- Experience with documentation tools\n- Knowledge of API documentation standards",
        "salary_min": 60000,
        "salary_max": 90000,
        "status": JobStatus.ACTIVE.value,
        "job_type": JobType.FULL_TIME.value,
        "experience_level": ExperienceLevel.MID.value
    },
    {
        "title": "Internship - Software Development",
        "company": "TechStart",
        "location": "Multiple Locations",
        "description": "Learn and grow as a software developer in our 3-month internship program.",
        "requirements": "- Currently pursuing a degree in Computer Science or related field\n- Basic programming knowledge\n- Eagerness to learn and grow\n- Good problem-solving skills",
        "salary_min": 20000,
        "salary_max": 30000,
        "status": JobStatus.ACTIVE.value,
        "job_type": JobType.INTERNSHIP.value,
        "experience_level": ExperienceLevel.ENTRY.value
    }
]

async def init_job_data(db: AsyncSession) -> None:
    """Initialize the database with sample job data"""
    print("Initializing job data...")
    
    # Get or create admin user to associate with jobs
    admin_user = await crud_user.get_by_email(db, email="admin@example.com")
    if not admin_user:
        print("Admin user not found, skipping job data initialization")
        return
    
    # Create jobs
    for job_data in SAMPLE_JOBS:
        # Check if job with same title and company already exists
        result = await db.execute(
            "SELECT id FROM job WHERE title = :title AND company = :company",
            {"title": job_data["title"], "company": job_data["company"]}
        )
        existing_job = result.scalar_one_or_none()
        
        if not existing_job:
            job = Job(
                **job_data,
                user_id=admin_user.id,
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow()
            )
            db.add(job)
            print(f"Created job: {job_data['title']} at {job_data['company']}")
    
    # Commit the changes
    await db.commit()
    print("Job data initialization completed")

async def main() -> None:
    """Main function to initialize job data"""
    async with async_session() as session:
        await init_job_data(session)

if __name__ == "__main__":
    asyncio.run(main())
