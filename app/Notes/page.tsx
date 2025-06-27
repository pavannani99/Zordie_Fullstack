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
  Plus,
  Filter,
  ListFilter,
} from "lucide-react";

const notes = [
  {
    title: "Product Team Meeting",
    tags: ["Weekly", "Product"],
    content: "This monthly progress agenda is following this items: \n • Introduction to Newest Product Plan \n • Monthly Revenue updates for each",
    author: "Floyd Miles",
    date: "Mar 5 04:25",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    title: "Product Team Meeting",
    tags: ["Monthly", "Business"],
    content: "This monthly progress agenda is following this items: \n • Introduction to Newest Product Plan \n • Monthly Revenue updates for each",
    author: "Dianne Russell",
    date: "Apr 11 18:30",
    avatar: "https://randomuser.me/api/portraits/women/29.jpg",
  },
  {
    title: "HR Interview",
    tags: ["Personal", "Business"],
    content: "This monthly progress agenda is following this items: \n • Introduction to Newest Product Plan \n • Monthly Revenue updates for each",
    author: "Annette Black",
    date: "Jun 23 14:31",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
  },
];

const tagColors: Record<string, string> = {
  Weekly: "bg-green-100 text-green-800",
  Monthly: "bg-blue-100 text-blue-800",
  Product: "bg-indigo-100 text-indigo-800",
  Business: "bg-purple-100 text-purple-800",
  Personal: "bg-orange-100 text-orange-800",
  Badge: "bg-yellow-100 text-yellow-800",
};

export default function NotesPage() {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-4">
        <Link href="/">
          <div className="flex items-center space-x-2 mb-6 cursor-pointer">
            <img
              src="/assets/zordie-logo.png"
              alt="Zordie Logo"
              className="w-12 h-11"
            />
            <h2 className="text-black font-bold text-xl">ZORDIE</h2>
          </div>
        </Link>
        <div className="space-y-2 text-gray-700 font-medium">
        {[
  { icon: FileText, label: "Assignments", href: "/Assignments" },
  { icon: Calendar, label: "Schedule", href: "/CalendarPage" },
  { icon: PlayCircle, label: "Recordings", href: "/Recordings" },
  { icon: MessageSquare, label: "Discussions", href: "/Discussions" },
  { icon: Users, label: "Agents", href: "/Agents" },
  { icon: GraduationCap, label: "Classes", href: "/Classes" },
  { icon: CheckCircle, label: "Courses", href: "/Courses" },
  { icon: DollarSign, label: "Payments", href: "/Payments" },
  { icon: Settings, label: "Settings", href: "/Settings" },
].map(({ icon: Icon, label, href, active }) => (
  <Link href={href} key={label}>
    <div
      className={`flex items-center space-x-3 cursor-pointer px-3 py-2 rounded-md transition duration-300 ${
        active
          ? "bg-gradient-to-r from-[#2563eb] to-[#60a5fa] text-white"
          : "hover:bg-gradient-to-r hover:from-[#2563eb] hover:to-[#60a5fa] hover:text-white"
      }`}
    >
      <Icon size={20} className="text-orange-500" />
      <span>{label}</span>
    </div>
  </Link>
))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-orange-600">Notes</h1>
          <div className="flex space-x-3 items-center">
            <button className="flex items-center space-x-1 border px-3 py-1 rounded-md text-sm text-gray-700 hover:bg-gray-100">
              <ListFilter size={16} /> <span>Sort By</span>
            </button>
            <button className="flex items-center space-x-1 border px-3 py-1 rounded-md text-sm text-gray-700 hover:bg-gray-100">
              <Filter size={16} /> <span>Filter</span>
            </button>
            <button className="flex items-center bg-orange-500 text-white px-3 py-1 rounded-md text-sm hover:bg-orange-600">
              <Plus size={16} className="mr-1" /> Add Notes
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-full max-w-sm">
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
            </svg>
          </div>
          <div className="flex items-center space-x-4 ml-4">
            <Bell className="text-gray-600 w-5 h-5 cursor-pointer hover:text-orange-800" />
            <img
              src="https://ui-avatars.com/api/?name=Richa"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {notes.map((note, idx) => (
            <div key={idx} className="bg-white border rounded-md p-4 shadow-sm hover:shadow-md transition">
              <div className="flex flex-wrap gap-2 mb-2">
                {note.tags.map((tag, i) => (
                  <span
                    key={i}
                    className={`px-2 py-0.5 text-xs font-medium rounded-full ${tagColors[tag]}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="font-semibold text-gray-800 mb-2 text-base">{note.title}</h3>
              <p className="text-sm text-gray-600 whitespace-pre-line mb-3">{note.content}</p>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <div className="flex items-center space-x-2">
                  <img src={note.avatar} alt={note.author} className="w-6 h-6 rounded-full" />
                  <span>{note.author}</span>
                </div>
                <span>{note.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
