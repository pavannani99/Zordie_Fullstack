import requests
import json

# === CONFIG ===
BASE_URL = "http://localhost:8000/api/v1"
TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTEwMTk0NjMsInN1YiI6IjQiLCJ0eXBlIjoiYWNjZXNzIn0.watf2wS_0_hkP_SpqlP-84hy3HkQAk53h527BBMmjgo"
HEADERS_JSON = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json"
}
HEADERS_FORM = {
    "Authorization": f"Bearer {TOKEN}"
}

# === STEP 1: CREATE A JOB ===
job_payload = {
    "title": "AI Engineer",
    "company": "Zodie Inc.",
    "location": "Remote",
    "description": "Work on cutting-edge LLMs, API integration, and backend engineering.",
    "requirements": "Python, FastAPI, ML models, REST APIs, team leadership",
    "salary_min": 120000,
    "salary_max": 180000,
    "status": "active",
    "job_type": "full_time",
    "experience_level": "senior"
}

job_resp = requests.post(f"{BASE_URL}/jobs/", headers=HEADERS_JSON, json=job_payload)

if job_resp.status_code != 200:
    print("❌ Job creation failed:", job_resp.text)
    exit()

job_data = job_resp.json()
job_id = job_data.get("id")
print(f"✅ Job Created: ID = {job_id}")

# === STEP 2: ANALYZE RESUME (submit text) ===
resume_text = """
Pavan Kumar is an experienced software engineer with strong expertise in Python, FastAPI, and LLM integration.
He has worked on backend APIs, resume analyzers, and scalable job platforms like Zodie.
Led ML projects with TensorFlow and LangChain. Good team player, clear communicator, and passionate about AI.
"""

resume_payload = {
    "resume": resume_text,
    "job_id": job_id
}

resume_resp = requests.post(f"{BASE_URL}/resume-analysis/analyze", headers=HEADERS_FORM, data=resume_payload)

if resume_resp.status_code != 200:
    print("❌ Resume analysis failed:", resume_resp.text)
    exit()

print("✅ Resume analyzed successfully")

# === STEP 3: RUN OPTIMUS ANALYSIS ===
optimus_resp = requests.post(
    f"{BASE_URL}/optimus/analyze-resume?job_description={job_id}",
    headers=HEADERS_FORM
)

if optimus_resp.status_code != 200:
    print("❌ Optimus analysis failed:", optimus_resp.text)
    exit()

analysis_data = optimus_resp.json()
analysis = analysis_data["analysis"]
overall_score = analysis["overall_score"]
recommendations = analysis_data.get("recommendations", [])

# === STEP 4: ONIX DECISION LOGIC ===
if overall_score < 50:
    decision = "reject"
    message_template = "polite_decline"
    ghosting_risk = "high"
elif overall_score < 70:
    decision = "re-engage"
    message_template = "warm_nudge"
    ghosting_risk = "medium"
else:
    decision = "invite_to_interview"
    message_template = "confirmation"
    ghosting_risk = "low"

# === STEP 5: BUILD ONIX PAYLOAD ===
onix_payload = {
    "name": "Pavan Kumar",
    "email": "new@example.com",
    "status": "Screened",
    "overall_score": round(overall_score, 2),
    "score_breakdown": analysis,
    "recommendations": recommendations,
    "decision": decision,
    "message_template": message_template,
    "ghosting_risk": ghosting_risk,
    "next_step": "Send to Monica" if decision == "invite_to_interview" else "Flag for Review"
}

# === STEP 6: OUTPUT TO FILE ===
with open("onix_result.json", "w") as f:
    json.dump(onix_payload, f, indent=2)

print("\n📦 Final ONIX Result:\n")
print(json.dumps(onix_payload, indent=2))
print("\n✅ Result saved as 'onix_result.json'")
