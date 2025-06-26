"use client";

import React from "react";
import { Bell } from "lucide-react";
import Link from "next/link";
import {
  FileText,
  Calendar,
  PlayCircle,
  MessageSquare,
  BookOpen,
  Users,
  GraduationCap,
  CheckCircle,
  DollarSign,
  Award,
  Settings,
} from "lucide-react";


const helpQueries = [
  {
    name: "Roselle Ehrman",
    subject: "Unable to schedule interviews via Zordie calendar",
    status: "Waiting for Response",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Jane Smith",
    subject: "Discrepancy in monthly salary calculation for May",
    status: "Under Review",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Darron Handler",
    subject: "Access denied to team performance dashboard",
    status: "Resolved",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Leatrice Kulik",
    subject: "Job posting not reflecting on careers page",
    status: "Under Review",
    avatar: "https://randomuser.me/api/portraits/women/78.jpg",
  },
];

const pastQueries = [
  {
    name: "Roselle Ehrman",
    subject: "Candidates not receiving interview invites",
    status: "Resolved",
  },
  {
    name: "Jane Smith",
    subject: "Employee reimbursement still pending after approval",
    status: "Resolved",
  },
  {
    name: "Darron Handler",
    subject: "Task assignments not syncing across departments",
    status: "Resolved",
  },
  {
    name: "Leatrice Kulik",
    subject: "Unable to download Form 16 from the portal",
    status: "Resolved",
  },
];

const statusColors = {
  "Waiting for Response": "bg-blue-100 text-blue-700 border border-blue-300",
  "Under Review": "bg-yellow-100 text-yellow-800 border border-yellow-300",
  Resolved: "bg-green-100 text-green-700 border border-green-300",
};

export default function HelpdeskSupport() {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-4">
        <Link href="/">
          <div className="flex items-center space-x-2 mb-6 cursor-pointer">
            <img src="/assets/zordie-logo.png" alt="Zordie Logo" className="w-12 h-11" />
            <h2 className="text-orange-600 font-bold text-xl">ZORDIE</h2>
          </div>
        </Link>
<div className="space-y-2 text-gray-700 font-medium">
  <div className="flex items-center space-x-3 cursor-pointer px-3 py-2 rounded-md transition duration-300 hover:bg-gradient-to-r hover:from-[#2563eb] hover:to-[#60a5fa] hover:text-white">
    <FileText size={20} />
    <span>Assignments</span>
  </div>
  <div className="flex items-center space-x-3 cursor-pointer px-3 py-2 rounded-md transition duration-300 hover:bg-gradient-to-r hover:from-[#2563eb] hover:to-[#60a5fa] hover:text-white">
    <Calendar size={20} />
    <span>Schedule</span>
  </div>
  <div className="flex items-center space-x-3 cursor-pointer px-3 py-2 rounded-md transition duration-300 hover:bg-gradient-to-r hover:from-[#2563eb] hover:to-[#60a5fa] hover:text-white">
    <PlayCircle size={20} />
    <span>Recordings</span>
  </div>
  <div className="flex items-center space-x-3 cursor-pointer px-3 py-2 rounded-md transition duration-300 hover:bg-gradient-to-r hover:from-[#2563eb] hover:to-[#60a5fa] hover:text-white">
    <MessageSquare size={20} />
    <span>Discussions</span>
  </div>
  <div className="flex items-center space-x-3 cursor-pointer px-3 py-2 rounded-md transition duration-300 hover:bg-gradient-to-r hover:from-[#2563eb] hover:to-[#60a5fa] hover:text-white">
    <BookOpen size={20} />
    <span>Notes</span>
  </div>
  <div className="flex items-center space-x-3 cursor-pointer px-3 py-2 rounded-md transition duration-300 hover:bg-gradient-to-r hover:from-[#2563eb] hover:to-[#60a5fa] hover:text-white">
    <Users size={20} />
    <span>Agents</span>
  </div>
  <div className="flex items-center space-x-3 cursor-pointer px-3 py-2 rounded-md transition duration-300 hover:bg-gradient-to-r hover:from-[#2563eb] hover:to-[#60a5fa] hover:text-white">
    <GraduationCap size={20} />
    <span>Classes & Courses</span>
  </div>
  <div className="flex items-center space-x-3 cursor-pointer px-3 py-2 rounded-md transition duration-300 hover:bg-gradient-to-r hover:from-[#2563eb] hover:to-[#60a5fa] hover:text-white">
    <CheckCircle size={20} />
    <span>RBAC Role Manager</span>
  </div>
  <div className="flex items-center space-x-3 cursor-pointer px-3 py-2 rounded-md transition duration-300 hover:bg-gradient-to-r hover:from-[#2563eb] hover:to-[#60a5fa] hover:text-white">
    <DollarSign size={20} />
    <span>Nova Document Hub</span>
  </div>
  {/* <div className="flex items-center space-x-3 cursor-pointer px-3 py-2 rounded-md bg-gradient-to-r from-[#2563eb] to-[#60a5fa] text-white font-bold">
    <Award size={20} />
    <span>Support</span>
  </div> */}
  <div className="flex items-center space-x-3 cursor-pointer px-3 py-2 rounded-md transition duration-300 hover:bg-gradient-to-r hover:from-[#2563eb] hover:to-[#60a5fa] hover:text-white">
    <Settings size={20} />
    <span>Settings</span>
  </div>
</div>
</div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Top Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Get the help you need</h1>
 <div className="flex items-center space-x-4">
   <div className="relative">
     <input
       type="text"
       placeholder="Search..."
       className="pl-9 pr-3 py-1 w-64 border-2 border-orange-500 rounded-md text-sm bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200"
     />
     <svg
       className="absolute left-2 top-1/2 transform -translate-y-1/2 text-orange-500 w-4 h-4"
       fill="none"
       stroke="currentColor"
       strokeWidth={2}
       viewBox="0 0 24 24"
     >
       <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
     </svg>
   </div>
   <Bell className="text-gray-600 w-5 h-5 cursor-pointer hover:text-orange-800" />
   <img
     src="https://ui-avatars.com/api/?name=Aiden+Max"
     alt="Profile"
     className="w-8 h-8 rounded-full"
   />
 
          </div>
        </div>

        {/* Query Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            "Getting Started",
            "Security and Protection",
            "Troubleshooting & Support",
          ].map((title) => (
            <div
              key={title}
              className="bg-white rounded-lg shadow-md p-6 text-center border hover:shadow-lg transition duration-300"
            >
              <div className="text-4xl mb-2 text-blue-600">👤</div>
              <h3 className="font-semibold text-lg mb-1">{title}</h3>
              <button className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                View All
              </button>
            </div>
          ))}
        </div>

        {/* Help Queries */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-xl">Help Queries</h2>
            <button className="bg-cyan-600 text-white px-4 py-1 rounded-md hover:bg-cyan-700">
              New Help Query
            </button>
          </div>
          <table className="w-full text-sm">
            <thead className="text-left text-gray-600 border-b">
              <tr>
                <th className="py-2">Names</th>
                <th>Subject</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {helpQueries.map((query, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="py-3 flex items-center space-x-3">
                    <img src={query.avatar} alt={query.name} className="w-8 h-8 rounded-full" />
                    <span className="font-medium">{query.name}</span>
                  </td>
                  <td>{query.subject}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold inline-block ${statusColors[query.status]}`}
                    >
                      {query.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Past Queries */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-xl">Past Help Queries</h2>
            <button className="text-sm text-orange-500 hover:underline">Export</button>
          </div>
          <table className="w-full text-sm">
            <thead className="text-left text-gray-600 border-b">
              <tr>
                <th className="py-2">Names</th>
                <th>Subject</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {pastQueries.map((query, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="py-3 font-medium">{query.name}</td>
                  <td>{query.subject}</td>
                  <td>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold border border-green-300">
                      {query.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}