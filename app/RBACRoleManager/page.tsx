"use client";

import React from "react";
import { Bell, FileText, Calendar, PlayCircle, MessageSquare, BookOpen, Users, Settings, Shield,Bot,ChartBar } from "lucide-react";
import Link from "next/link";
import { User, Clock, Brain } from "lucide-react";


export default function RBACRoleManager() {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <Link href="/">
          <div className="flex items-center space-x-2 mb-6 cursor-pointer">
            <img src="/assets/zordie-logo.png" alt="Zordie Logo" className="w-13 h-12" />
            <h2 className="text-black font-bold text-2xl">ZORDIE</h2>
          </div>
        </Link>

<nav className="space-y-2 text-gray-700 font-medium">
  {[
    { icon: FileText, label: "Dashboard", href: "/" },
    { icon: Bot, label: "Prime Copilot", href: "/AIChatBot" }, // ✅ This is the key update
    { icon: Users, label: "Agent Management" },
    { icon: ChartBar, label: "Analytics & Reporting", href:"/Analytics&Reporting" },
    { icon: Calendar, label: "Projects & Calendar", href:"/CalendarPage" },
    { icon: BookOpen, label: "Compliance & Audit" },
    { icon: FileText, label: "Nova Document Hub",href:"/Nova" },
    { icon: Shield, label: "Helpdesk & Support",href:"/Support" },
    { icon: Settings, label: "System Settings" },
  ].map(({ icon: Icon, label, active, href }) => {
const content = (
  <div
    className={`group flex items-center space-x-3 px-3 py-2 rounded-md cursor-pointer transition duration-300 ${
      active
        ? "bg-gradient-to-r from-[#2563eb] to-[#60a5fa] text-white font-semibold"
        : "hover:bg-gradient-to-r hover:from-[#2563eb] hover:to-[#60a5fa] hover:text-white"
    }`}
  >
    <Icon size={20} className="text-orange-500 group-hover:text-white" />
    <span>{label}</span>
  </div>
);


    return href ? (
      <Link href={href} key={label}>
        {content}
      </Link>
    ) : (
      <div key={label}>{content}</div>
    );
  })}
</nav>

        {/* Active Agents */}
{/* Active Agents */}
<div className="mt-6">
  <h3 className="text-sm text-gray-500 font-semibold mb-2">Active Agents</h3>
  <ul className="space-y-1 text-sm">
    <li className="flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition duration-300 hover:bg-gradient-to-r hover:from-[#2563eb] hover:to-[#60a5fa] hover:text-white text-blue-600">
      <div className="flex items-center gap-2">
        <User size={16} /> Optimus
      </div>
      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
    </li>
    <li className="flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition duration-300 hover:bg-gradient-to-r hover:from-[#2563eb] hover:to-[#60a5fa] hover:text-white text-red-500">
      <div className="flex items-center gap-2">
        <Clock size={16} /> Maxi
      </div>
      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
    </li>
    <li className="flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition duration-300 hover:bg-gradient-to-r hover:from-[#2563eb] hover:to-[#60a5fa] hover:text-white text-yellow-500">
      <div className="flex items-center gap-2">
        <FileText size={16} /> Laxmi
      </div>
      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
    </li>
    <li className="flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition duration-300 hover:bg-gradient-to-r hover:from-[#2563eb] hover:to-[#60a5fa] hover:text-white text-purple-600">
      <div className="flex items-center gap-2">
        <Brain size={16} /> Nova
      </div>
      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
    </li>
  </ul>
</div>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-gray-800">RBAC Role Manager</h1>

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

        {/* Title & Filters */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Manage Roles. Control Access.</h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-4">
            Easily assign, customize, and monitor access levels to keep your data secure and your teams aligned
          </p>
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
              <option>All Departments</option>
              <option>HR</option>
              <option>Tech</option>
            </select>
            <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
              <option>All Access Levels</option>
              <option>Admin</option>
              <option>Editor</option>
              <option>Viewer</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
              + Create New Role
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
