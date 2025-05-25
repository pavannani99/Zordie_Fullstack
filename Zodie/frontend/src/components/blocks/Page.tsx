"use client"

import Carousel from "@/components/ui/corousel"
import { Button } from "@/components/ui/button"

// Sample page components
const CustomerService = () => (
  <div className="max-w-4xl mx-auto p-8">
    <h1 className="text-3xl font-bold text-orange-500 mb-6">Customer Service AI Agent</h1>
    <p className="text-lg mb-4">This page contains detailed information about our Customer Service AI Agent.</p>
    <Button className="bg-orange-500 hover:bg-orange-600">Learn More</Button>
  </div>
)

const DataExtraction = () => (
  <div className="max-w-4xl mx-auto p-8">
    <h1 className="text-3xl font-bold text-blue-500 mb-6">Data Extraction AI Agent</h1>
    <p className="text-lg mb-4">This page contains detailed information about our Data Extraction AI Agent.</p>
    <Button className="bg-blue-500 hover:bg-blue-600">Learn More</Button>
  </div>
)

const EmailTriage = () => (
  <div className="max-w-4xl mx-auto p-8">
    <h1 className="text-3xl font-bold text-orange-500 mb-6">Email Triage AI Agent</h1>
    <p className="text-lg mb-4">This page contains detailed information about our Email Triage AI Agent.</p>
    <Button className="bg-orange-500 hover:bg-orange-600">Learn More</Button>
  </div>
)

const AppointmentManagement = () => (
  <div className="max-w-4xl mx-auto p-8">
    <h1 className="text-3xl font-bold text-blue-500 mb-6">Appointment Management AI Agent</h1>
    <p className="text-lg mb-4">This page contains detailed information about our Appointment Management AI Agent.</p>
    <Button className="bg-blue-500 hover:bg-blue-600">Learn More</Button>
  </div>
)

const InterviewScheduler = () => (
  <div className="max-w-4xl mx-auto p-8">
    <h1 className="text-3xl font-bold text-orange-500 mb-6">Interview Scheduler AI Agent</h1>
    <p className="text-lg mb-4">This page contains detailed information about our Interview Scheduler AI Agent.</p>
    <Button className="bg-orange-500 hover:bg-orange-600">Learn More</Button>
  </div>
)

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
