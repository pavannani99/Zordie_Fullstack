"use client"

import Carousel from "@/components/ui/corousel"
import { Button } from "@/components/ui/button"


  <div className="max-w-4xl mx-auto p-8">
    <h1 className="text-3xl font-bold text-orange-500 mb-6">Interview Scheduler AI Agent</h1>
    <p className="text-lg mb-4">This page contains detailed information about our Interview Scheduler AI Agent.</p>
    <Button className="bg-orange-500 hover:bg-orange-600">Learn More</Button>
  </div>


export default function Home() {
  return (
      <div className="min-h-screen text-white">
        <header className="py-6">
          <div className="max-w-7xl mx-auto px-4">
          </div>
        </header>

        <main>
          <div className="max-w-7xl mx-auto px-4 py-8">
            <Carousel />
          </div>

          {/* <div className="mt-8">
            <Routes>
              <Route
                path="/"
                element={
                  <div className="max-w-4xl mx-auto p-8 text-center">
                    <h2 className="text-2xl font-bold mb-4">Select an AI Agent from the carousel above</h2>
                    <p>Click on any agent title to view more details</p>
                  </div>
                }
              />
              <Route path="/customer-service" element={<CustomerService />} />
              <Route path="/data-extraction" element={<DataExtraction />} />
              <Route path="/email-triage" element={<EmailTriage />} />
              <Route path="/appointment-management" element={<AppointmentManagement />} />
              <Route path="/interview-scheduler" element={<InterviewScheduler />} />
            </Routes>
          </div> */}
        </main>
      </div>
  )
}
