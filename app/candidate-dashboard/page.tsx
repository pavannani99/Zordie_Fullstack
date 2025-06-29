"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Clock,
  FileText,
} from "lucide-react";

const COLORS = ["#2563eb", "#f97316", "#10b981"];

const pieData = [
  { name: "Technical", value: 60 },
  { name: "Culture", value: 25 },
  { name: "Skills", value: 15 },
];

const CandidateDashboard = () => {
  return (
    <main className="bg-[#f8f6f4] min-h-screen p-4 md:p-8 space-y-6 text-gray-800">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img
            src="/assets/zordie-logo.png"
            alt="Logo"
            className="w-13 h-12"
          />
          <h1 className="font-bold text-xl">ZORDIE</h1>
        </div>
        <h2 className="text-lg font-semibold">Talent Assessment</h2>
      </div>

      {/* PROFILE */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row justify-between items-center"
      >
        <div className="flex items-center space-x-4">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Candidate"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h3 className="font-semibold text-lg">Michael Chen</h3>
            <p className="text-orange-600 text-sm">
              Senior Full Stack Developer
            </p>
            <div className="text-xs text-gray-500 mt-1 flex flex-wrap gap-2">
              <span>Applied: June 10, 2025</span>
              <span>Completed: June 12, 2025</span>
              <span>Response: 8h</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center mt-4 md:mt-0 gap-4">
          <div className="bg-blue-100 text-blue-700 rounded-lg px-4 py-2 text-center">
            <div className="text-2xl font-bold">92</div>
            <div className="text-xs">Total ARC Score</div>
          </div>
          <div className="flex gap-2">
            <button className="bg-green-500 text-white px-3 py-1 rounded text-sm">Accept</button>
            <button className="bg-red-500 text-white px-3 py-1 rounded text-sm">Reject</button>
            <button className="bg-gray-200 px-3 py-1 rounded text-sm">Chat</button>
            <button className="bg-gray-200 px-3 py-1 rounded text-sm">Schedule</button>
          </div>
        </div>
      </motion.div>

      {/* TABS */}
      <div className="flex flex-wrap gap-2">
        {["Overview", "Optimus (Technical)", "Monica (Behavioral)", "Timeline"].map((tab) => (
          <button
            key={tab}
            className="bg-white border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded text-sm font-medium"
          >
            {tab}
          </button>
        ))}
      </div>

      {/* CUMULATIVE SCORES */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-6 rounded-xl shadow"
        >
          <h3 className="font-semibold text-lg mb-4">Cumulative Agent Scores</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-6 rounded-xl shadow flex flex-col items-center justify-center"
        >
          <h3 className="font-semibold text-lg mb-4">Success Prediction</h3>
          <div className="relative w-32 h-32">
            <svg className="w-full h-full">
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                stroke="#e5e7eb"
                strokeWidth="8"
                fill="none"
              />
              <motion.circle
                cx="50%"
                cy="50%"
                r="45%"
                stroke="#2563eb"
                strokeWidth="8"
                fill="none"
                strokeDasharray="283"
                strokeDashoffset="283"
                animate={{ strokeDashoffset: 283 - (283 * 88) / 100 }}
                transition={{ duration: 1 }}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-blue-600">
              88%
            </div>
          </div>
        </motion.div>
      </div>

      {/* SUMMARY */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white p-6 rounded-xl shadow"
      >
        <h3 className="font-semibold text-lg mb-4">Comprehensive Summary</h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <p className="font-medium">Key Strengths</p>
            <ul className="list-disc ml-5 mt-1 text-green-700 space-y-1">
              <li>Exceptional technical problem-solving</li>
              <li>High assessment accuracy</li>
              <li>Strong communication skills</li>
            </ul>
          </div>
          <div>
            <p className="font-medium">Areas for Improvement</p>
            <ul className="list-disc ml-5 mt-1 text-red-700 space-y-1">
              <li>Presentation clarity</li>
              <li>Leadership engagement</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* OPTIMUS */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white p-6 rounded-xl shadow space-y-4"
      >
        <div className="flex justify-between">
          <h3 className="font-semibold text-lg">Optimus - Verified Resume, Skills & Trust</h3>
          <span className="text-orange-600 font-semibold">Score: 91/100</span>
        </div>
        <div className="grid md:grid-cols-3 gap-4 text-center text-sm">
          <div>
            <p>Skill Match</p>
            <p className="mt-1 text-2xl font-bold text-blue-600">95%</p>
          </div>
          <div>
            <p>GitHub Score</p>
            <p className="mt-1 text-2xl font-bold text-blue-600">90%</p>
          </div>
          <div>
            <p>Experience-Role Match</p>
            <p className="mt-1 text-2xl font-bold text-blue-600">85%</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">React Developer Verified</span>
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">AWS Certified</span>
          <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">Google UX Design Pending</span>
        </div>
      </motion.div>

      {/* MONICA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white p-6 rounded-xl shadow"
      >
        <div className="flex justify-between">
          <h3 className="font-semibold text-lg">Monica - Culture Fit & Behavioral Intelligence</h3>
          <span className="text-orange-600 font-semibold">Score: 88/100</span>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mt-4 text-sm">
          <div>
            <p className="font-medium mb-1">Voice Analysis</p>
            <ul className="space-y-1">
              <li>Clarity: 89%</li>
              <li>Confidence: 82%</li>
              <li>Engagement: 85%</li>
              <li>Authenticity: 65%</li>
            </ul>
          </div>
          <div className="flex justify-center items-center">
            <ResponsiveContainer width={150} height={150}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Teamwork", value: 40 },
                    { name: "Core Values", value: 35 },
                    { name: "Leadership", value: 25 },
                  ]}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  label
                >
                  <Cell fill="#2563eb" />
                  <Cell fill="#f97316" />
                  <Cell fill="#10b981" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      {/* TIMELINE */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white p-6 rounded-xl shadow"
      >
        <h3 className="font-semibold text-lg mb-4">Assessment Timeline</h3>
        <ul className="space-y-4">
          {[
            { icon: FileText, title: "Application Received", date: "June 10, 2025" },
            { icon: CheckCircle, title: "Technical Assessment Completed", date: "June 11, 2025" },
            { icon: CheckCircle, title: "Optimus Verification", date: "June 12, 2025" },
            { icon: CheckCircle, title: "Behavioral Assessment Completed", date: "June 12, 2025" },
            { icon: Clock, title: "Final ARC Score Generated", date: "June 12, 2025" },
          ].map((step, i) => (
            <li key={i} className="flex space-x-3 items-start">
              <step.icon className="text-blue-500 mt-1" size={18} />
              <div>
                <p className="font-medium">{step.title}</p>
                <p className="text-xs text-gray-500">{step.date}</p>
              </div>
            </li>
          ))}
        </ul>
      </motion.div>
    </main>
  );
};

export default CandidateDashboard;


