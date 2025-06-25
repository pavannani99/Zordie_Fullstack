"use client";

import React, { useState, DragEvent, ChangeEvent } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from "recharts";

// Sidebar Item component
function SidebarItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-orange-100 cursor-pointer transition">
      <span>{icon}</span>
      <span className="font-medium">{label}</span>
    </div>
  );
}

// --- Sample Data ---

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

// --- Main Dashboard Component ---
export default function WorkspaceDashboard() {
  const [currentView, setCurrentView] = useState<"dashboard" | "processing" | "results">("dashboard");
  const [uploadedResumes, setUploadedResumes] = useState<File[]>([]);
  const [jobDescription, setJobDescription] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
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
        <h2 className="text-orange-600 font-bold text-xl mb-6">ZORDIE</h2>
        <div className="space-y-2">
          <SidebarItem icon="📊" label="Dashboard" />
          <SidebarItem icon="📁" label="Assignments" />
          <SidebarItem icon="📅" label="Schedule" />
          <SidebarItem icon="📹" label="Recordings" />
          <SidebarItem icon="💬" label="Discussions" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Hello Richa 👋</h1>
        <p className="text-gray-500 mb-6">Let’s learn something new today!</p>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
        </div>
      </div>
    </div>
  );
}
