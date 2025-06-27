"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  LayoutDashboard,
  Search,
} from "lucide-react";

const events = [
  { date: "2025-05-05", title: "Meeting", time: "11:30 - 13:00", color: "bg-yellow-100", text: "text-yellow-800" },
  { date: "2025-05-08", title: "Design Review", color: "bg-red-100", text: "text-red-800" },
  { date: "2025-05-09", title: "Design Review", time: "10:00 - 11:00", color: "bg-red-100", text: "text-red-800" },
  { date: "2025-05-09", title: "Discussion", time: "10:00 - 11:00", color: "bg-indigo-100", text: "text-indigo-800" },
  { date: "2025-05-14", title: "Market Research", color: "bg-green-100", text: "text-green-800" },
  { date: "2025-05-14", title: "Discussion", color: "bg-indigo-100", text: "text-indigo-800" },
  { date: "2025-05-19", title: "Design Review", color: "bg-red-100", text: "text-red-800" },
  { date: "2025-05-19", title: "New Deals", color: "bg-purple-100", text: "text-purple-800" },
  { date: "2025-05-22", title: "Meeting", color: "bg-yellow-100", text: "text-yellow-800" },
  { date: "2025-05-22", title: "Design Review", color: "bg-red-100", text: "text-red-800" },
  { date: "2025-05-28", title: "Meeting", color: "bg-yellow-100", text: "text-yellow-800" },
  { date: "2025-05-28", title: "Design Review", color: "bg-red-100", text: "text-red-800" },
  { date: "2025-05-28", title: "New Deals", color: "bg-purple-100", text: "text-purple-800" },
  { date: "2025-05-28", title: "Discussion", color: "bg-indigo-100", text: "text-indigo-800" },
  { date: "2025-05-30", title: "Meeting", color: "bg-yellow-100", text: "text-yellow-800" },
  { date: "2025-05-30", title: "Design Review", color: "bg-red-100", text: "text-red-800" },
  { date: "2025-05-30", title: "New Deals", color: "bg-purple-100", text: "text-purple-800" },
  { date: "2025-05-30", title: "Discussion", color: "bg-indigo-100", text: "text-indigo-800" },
];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date("2025-05-01"));

  const handleToday = () => setCurrentDate(new Date("2025-05-01"));
  const handlePrev = () => {
    const prev = new Date(currentDate);
    prev.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(prev);
  };
  const handleNext = () => {
    const next = new Date(currentDate);
    next.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(next);
  };

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = getDaysInMonth(year, month);

    const blanks = Array(firstDay).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const fullDays = [...blanks, ...days];

    return (
      <div className="grid grid-cols-7 gap-1 text-sm">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => (
          <div key={idx} className="font-semibold text-center text-gray-700 mb-2">{day}</div>
        ))}
        {fullDays.map((day, idx) => {
          const dateStr = day
            ? `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
            : null;
          return (
            <div key={idx} className="border min-h-[80px] p-1 text-xs relative rounded-sm overflow-y-auto max-h-28">
              {day && <div className="font-medium text-gray-700 mb-1">{day}</div>}
              <div className="space-y-1">
                {events
                  .filter((e) => e.date === dateStr)
                  .map((event, i) => (
                    <div key={i} className={`${event.color} ${event.text} rounded px-1`}>
                      {event.title}
                      {event.time && <span className="block text-[10px]">{event.time}</span>}
                    </div>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

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
        <div className="space-y-2">
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer px-3 py-2 rounded-md transition duration-300 hover:bg-gradient-to-r hover:from-[#2563eb] hover:to-[#60a5fa] hover:text-white">
              <LayoutDashboard size={20} /> <span>Dashboard</span>
            </div>
          </Link>
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer px-3 py-2 rounded-md transition duration-300 hover:bg-gradient-to-r hover:from-[#2563eb] hover:to-[#60a5fa] hover:text-white">
              <Calendar size={20} /> <span>Schedule</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Top Controls */}
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-1/3">
            <span className="absolute inset-y-0 left-3 flex items-center text-orange-500">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-full border-2 border-orange-500 rounded-md text-sm bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200"
            />
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center px-2 py-1 border rounded text-sm text-gray-600">
              <Filter className="w-4 h-4 mr-1" /> Filter
            </button>
            <button className="bg-orange-500 text-white text-sm px-3 py-1 rounded flex items-center hover:bg-orange-600">
              <Plus className="w-4 h-4 mr-1" /> Add Event
            </button>
          </div>
        </div>

        {/* Header: Month & Controls */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-semibold text-gray-700">
            {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
          </div>
          <div className="space-x-2">
            <button onClick={handlePrev} className="p-1 rounded hover:bg-gray-200"><ChevronLeft /></button>
            <button onClick={handleNext} className="p-1 rounded hover:bg-gray-200"><ChevronRight /></button>
            <button onClick={handleToday} className="px-2 py-1 text-sm bg-orange-100 text-orange-700 rounded">Today</button>
          </div>
        </div>

        {/* Calendar */}
        {renderCalendar()}
      </div>
    </div>
  );
}
