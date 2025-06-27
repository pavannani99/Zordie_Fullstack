"use client";

import React, { useState, DragEvent, ChangeEvent } from "react";
import { Bell } from "lucide-react";
import Link from 'next/link';
// import { LayoutDashboard } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

import {
  LayoutDashboard,
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

// Sidebar Item component
function SidebarItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center space-x-3 cursor-pointer px-3 py-2 rounded-md transition duration-300 hover:bg-gradient-to-r hover:from-[#2563eb] hover:to-[#60a5fa] hover:text-white">
      <div className="text-orange-500 group-hover:text-white">{icon}</div>
      <span className="font-medium">{label}</span>
    </div>
  );
}

// Sample Data
const hiringFunnelData = [
  { month: "Jan", applications: 450, hired: 20 },
  { month: "Feb", applications: 520, hired: 25 },
  { month: "Mar", applications: 380, hired: 18 },
  { month: "Apr", applications: 610, hired: 30 },
  { month: "May", applications: 490, hired: 24 },
  { month: "Jun", applications: 550, hired: 28 },
];

const performanceMetrics = [
  { metric: "Technical Skills", engineering: 8.5, hr: 6.8 },
  { metric: "Communication", engineering: 7.2, hr: 9.0 },
  { metric: "Leadership", engineering: 6.8, hr: 8.2 },
  { metric: "Problem Solving", engineering: 9.0, hr: 7.2 },
  { metric: "Teamwork", engineering: 8.2, hr: 8.8 },
];

const resources = [
  { title: "Auto-graded Quiz", type: "Quiz", date: "21 June", color: "#FF4B00" },
  { title: "Course Material", type: "PDF", date: "18 June", color: "#FFA500" },
];

const todoList = [
  { title: "Human Interaction Designs", date: "Tue, 30 June 2024" },
  { title: "Design systems", date: "Mon, 24 June 2024" },
  { title: "Intro to UI", date: "Tue, 10 June 2024" },
  { title: "Basics of Figma", date: "Fri, 6 June 2024" },
];

const enrolledTasks = [
  {
    title: "User Experience (UX) Design",
    duration: "6:30hrs",
    lessons: "05 Lessons",
  },
  {
    title: "Visual Design and Branding",
    duration: "4:00hrs",
    lessons: "03 Lessons",
  },
];

const upcomingLessons = [
  { title: "UX Design Fundamentals", time: "5:30pm" },
  { title: "Interaction Design", time: "9:00pm" },
];

export default function WorkspaceDashboard() {
  const [currentView, setCurrentView] = useState<"dashboard" | "processing" | "results">("dashboard");
  const [uploadedResumes, setUploadedResumes] = useState<File[]>([]);
  const [jobDescription, setJobDescription] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      setUploadedResumes((prev) => [...prev, ...files]);
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setUploadedResumes((prev) => [...prev, ...files]);
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-4">

<Link href="/">
  <div className="flex items-center space-x-2 mb-6 cursor-pointer">
    <img src="/assets/zordie-logo.png" alt="Zordie Logo" className="w-12 h-11" />
    <h2 className="text-black font-bold text-xl">ZORDIE</h2>
  </div>
</Link>

        <div className="space-y-2">
<Link href="/">
  <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" />
</Link>
          <SidebarItem icon={<FileText size={20} />} label="Assignments" />
          <Link href="/CalendarPage">
            <div>
              <SidebarItem icon={<Calendar size={20} />} label="Schedule" />
            </div>
          </Link>
          <Link href="/recording">
  <SidebarItem icon={<PlayCircle size={20} />} label="Recordings" />
</Link>
          <SidebarItem icon={<MessageSquare size={20} />} label="Discussions" />
          <Link href="/Notes">
  <SidebarItem icon={<BookOpen size={20} />} label="Notes" />
</Link>
          <SidebarItem icon={<Users size={20} />} label="Agents" />
          {/* <SidebarItem icon={<GraduationCap size={20} />} label="Classes & Courses" /> */}
          <SidebarItem icon={<CheckCircle size={20} />} label="RBAC Role Manager" />
          <SidebarItem icon={<DollarSign size={20} />} label="Nova Document Hub" />
          <SidebarItem icon={<Award size={20} />} label="Support" />
          <SidebarItem icon={<Settings size={20} />} label="Settings" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Top Right Icons */}
        <div className="flex justify-end mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative w-64 md:w-80">
              <span className="absolute inset-y-0 left-3 flex items-center text-orange-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2.5a7.5 7.5 0 010 14.15z"
                  />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-full border-2 border-orange-500 rounded-md text-sm bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200"
              />
            </div>
            <Bell className="text-gray-600 w-5 h-5 cursor-pointer hover:text-orange-800" />
            <img
              src="https://ui-avatars.com/api/?name=Aiden+Max"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">Hello Richa 👋</h1>
        <p className="text-gray-500 mb-6">Let’s learn something new today!</p>

        {/* Section 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Recent Enrolled Course */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-2">Recent Enrolled Course</h3>
            <div className="bg-orange-100 p-4 rounded-md flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-700">Product Design Course</p>
                <p className="text-sm text-gray-500">1420+ users</p>
              </div>
              <div className="bg-orange-600 text-white text-sm px-2 py-1 rounded-md">New</div>
            </div>
          </div>

          {/* Your Resources */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-2">Your Resources</h3>
            {resources.map((res, idx) => (
              <div key={idx} className="flex justify-between items-center py-1 border-b">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: res.color }}></div>
                  <p className="text-sm">{res.title}</p>
                </div>
                <p className="text-xs text-gray-500">{res.date}</p>
              </div>
            ))}
            <div className="text-orange-500 text-sm mt-2 cursor-pointer">See more</div>
          </div>

          {/* Calendar */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-2">Calendar</h3>
            <div className="text-sm text-gray-500">June 2024</div>
            <div className="grid grid-cols-7 gap-1 mt-2 text-center text-xs text-gray-600">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <div key={i} className="font-semibold">{d}</div>
              ))}
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className={`p-1 rounded-full ${i === 29 ? "bg-orange-500 text-white" : ""}`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
          {/* Bar Chart */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Hiring Funnel</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={hiringFunnelData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="applications" fill="#FF4B00" />
                <Bar dataKey="hired" fill="#FFA500" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Radar Chart */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Performance Metrics</h3>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart outerRadius={90} data={performanceMetrics}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <PolarRadiusAxis />
                <Radar name="Engineering" dataKey="engineering" stroke="#FF4B00" fill="#FF4B00" fillOpacity={0.6} />
                <Radar name="HR" dataKey="hr" stroke="#FFA500" fill="#FFA500" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Performance Grade */}
          <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-2">Performance</h3>
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 rounded-full border-8 border-orange-400 border-t-white animate-spin-slow"></div>
              <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-orange-600">
                8.966
              </div>
            </div>
            <p className="text-sm mt-2 text-gray-600">Your Grade</p>
          </div>
        </div>

        {/* Section 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* To-do List */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-2">To-do List</h3>
            <ul className="space-y-2">
              {todoList.map((item, idx) => (
                <li key={idx} className="flex justify-between text-sm text-gray-700">
                  <span>{item.title}</span>
                  <span className="text-gray-400">{item.date}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Enrolled Tasks */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-2">Recent Enrolled Tasks</h3>
            <div className="space-y-3">
              {enrolledTasks.map((task, idx) => (
                <div key={idx} className="border border-orange-200 p-3 rounded-md">
                  <p className="font-semibold text-orange-500">{task.title}</p>
                  <p className="text-sm text-gray-600">{task.duration} | {task.lessons}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Lessons */}
        <div className="bg-white rounded-lg shadow-md p-4 mt-6">
          <h3 className="text-lg font-semibold mb-2">Upcoming Lesson</h3>
          <div className="space-y-3">
            {upcomingLessons.map((lesson, idx) => (
              <div key={idx} className="flex justify-between items-center border p-2 rounded-md">
                <div>
                  <p className="font-medium">{lesson.title}</p>
                  <p className="text-sm text-gray-500">{lesson.time}</p>
                </div>
                <button className="bg-orange-500 text-white px-3 py-1 rounded-md text-sm hover:bg-orange-600">
                  Join
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
