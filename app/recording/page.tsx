"use client";

import React from "react";
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
  Settings,
  Bell,
} from "lucide-react";

const recordings = [
  {
    title: "Color styles - 02",
    duration: "1:30 Hrs",
    lessons: 2,
    image: "/assets/Color styles.png",
  },
  {
    title: "Design Thinking",
    duration: "2:30 Hrs",
    lessons: 1,
    image: "/assets/Design Thinking.png",
  },

  {
    title: "Curiosity for terminology",
    duration: "4:00 Hrs",
    lessons: 2,
    image: "/assets/Curiosity for terminology.png",
  },
  {
    title: "Color styles - 01",
    duration: "2:30 Hrs",
    lessons: 2,
    image: "/assets/Color styles.png",
  },
];

export default function RecordingsPage() {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-4">
        <Link href="/">
          <div className="flex items-center space-x-2 mb-6 cursor-pointer">
            <img
              src="/assets/zordie-logo.png"
              alt="Zordie Logo"
              className="w-13 h-12"
            />
            <h2 className="text-black-600 font-bold text-xl">ZORDIE</h2>
          </div>
        </Link>
        <div className="space-y-2 text-gray-700 font-medium">
          {[{ icon: FileText, label: "Workspace", href: "/workspace" },
            { icon: Calendar, label: "Schedule", href: "/CalendarPage" },
            // { icon: PlayCircle, label: "Recordings"},
            { icon: MessageSquare, label: "Discussions" },
            { icon: BookOpen, label: "Notes" },
            { icon: Users, label: "Agents" },
             { icon: GraduationCap, label: "Classes", href: "/recording" },
            { icon: CheckCircle, label: "Courses" },
            { icon: DollarSign, label: "Payments" },
            { icon: Settings, label: "Settings" }].map(({ icon: Icon, label, active }) => (
            <div
              key={label}
              className={`flex items-center space-x-3 cursor-pointer px-3 py-2 rounded-md transition duration-300 ${
                active
                  ? "bg-gradient-to-r from-[#2563eb] to-[#60a5fa] text-white"
                  : "hover:bg-gradient-to-r hover:from-[#2563eb] hover:to-[#60a5fa] hover:text-white"
              }`}
            >
              <Icon size={20} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Class Recordings</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-full border-2 border-orange-500 rounded-md text-sm bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
                />
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recordings.map((rec, index) => (
            <div
              key={index}
              className="bg-white border rounded-lg shadow hover:shadow-lg transition p-4"
            >
              <img src={rec.image} alt={rec.title} className="rounded mb-3 w-full h-32 object-cover" />
              <h3 className="font-semibold text-lg text-gray-800 mb-1">{rec.title}</h3>
              <div className="text-sm text-gray-500 mb-3">
                ⏱ {rec.duration} | 📚 {rec.lessons} Lessons
              </div>
              <div className="flex space-x-2">
                <button className="bg-orange-500 text-white px-3 py-1 rounded-md text-sm hover:bg-orange-600">
                  ▶ Watch Now
                </button>
                <button className="bg-gray-100 text-orange-600 px-3 py-1 rounded-md text-sm border hover:bg-orange-100">
                  ⬇ Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
