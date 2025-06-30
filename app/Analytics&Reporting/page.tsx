"use client";

import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Users,
  CheckCircle,
  DollarSign,
  Award,
  Settings,
  Bell,
  User,
  Clock,
  Brain,
  Bot,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function SidebarItem({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="group flex items-center space-x-3 cursor-pointer px-3 py-2 rounded-md transition duration-300 hover:bg-gradient-to-r hover:from-[#2563eb] hover:to-[#60a5fa] hover:text-white">
      <div className="text-orange-500 group-hover:text-white">{icon}</div>
      <span className="text-base font-medium">{label}</span>
    </div>
  );
}

const statusCards = [
  { text: "Query Resolution Slowing", color: "#ffcccc" },
  { text: "Hiring Spike in Sales", color: "#cce5ff" },
  { text: "Time-to-hire Increasing", color: "#fff0b3" },
  { text: "Payroll Accuracy Improved", color: "#d9f7be" },
];

const helpQueries = [
  { day: "Mon", queries: 20 },
  { day: "Tue", queries: 30 },
  { day: "Wed", queries: 45 },
  { day: "Thu", queries: 35 },
  { day: "Fri", queries: 25 },
  { day: "Sat", queries: 15 },
  { day: "Sun", queries: 12 },
];

const recruitmentFunnel = [
  { stage: "Applications", value: 2847 },
  { stage: "Shortlisted", value: 892 },
  { stage: "Interviewed", value: 234 },
  { stage: "Hired", value: 67 },
];

const queryTypes = [
  { name: "Technical", value: 25 },
  { name: "Benefits", value: 20 },
  { name: "Payroll", value: 25 },
  { name: "Recruitment", value: 30 },
];

const queryStatus = [
  { name: "Resolved", value: 40 },
  { name: "Open", value: 30 },
  { name: "In Progress", value: 30 },
];

const COLORS = ["#FF4B00", "#FFA500", "#00C49F", "#0088FE"];

const topAgents = [
  { name: "Prime HR", role: "General Purpose Agent", votes: 100 },
  { name: "Optimus", role: "Management Agent", votes: 95 },
  { name: "Maxi", role: "Payroll and Finance Agent", votes: 80 },
  { name: "Medina", role: "Document & Asset Manager", votes: 75 },
];

const recentReports = [
  {
    name: "Monthly Recruitment Summary",
    type: "Recruitment",
    date: "Dec 19, 2024",
  },
  { name: "Payroll Analysis Q4", type: "Payroll", date: "Dec 10, 2024" },
  { name: "Help Desk Performance", type: "Support", date: "Dec 6, 2024" },
];

export default function AnalyticsAndReporting() {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-4">
        <Link href="/">
          <div className="flex items-center space-x-2 mb-6 cursor-pointer">
            <img src="/assets/zordie-logo.png" alt="Logo" className="w-13 h-12" />
            <h2 className="text-black font-bold text-2xl">ZORDIE</h2>
          </div>
        </Link>
        <div className="space-y-2">
          <Link href="/">
            <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" />
          </Link>
          <Link href="/AIChatBot">
  <SidebarItem icon={<Bot size={20} />} label="Prime Copilot" />
</Link>
         <Link href="/RBACRoleManager">
  <SidebarItem icon={<CheckCircle size={20} />} label="RBAC Role Manager" />
</Link>
          <SidebarItem icon={<Users size={20} />} label="Agent Management" />
          {/* <SidebarItem icon={<FileText size={20} />} label="Analytics & Reporting" /> */}
         <Link href="/CalendarPage">
  <div>
    <SidebarItem icon={<Calendar size={20} />} label="Schedule" />
  </div>
</Link>
          <SidebarItem icon={<Award size={20} />} label="Compliance & Audit" />
          <Link href="/Nova">
  <SidebarItem icon={<DollarSign size={20} />} label="Nova Document Hub" />
</Link>
         <Link href="/Support">
  <SidebarItem icon={<Award size={20} />} label="Support" />
</Link>
          <SidebarItem icon={<Settings size={20} />} label="System Settings" />
        </div>

        {/* Active Agents */}
        <div className="mt-6">
          <h3 className="text-sm text-gray-500 font-semibold mb-2">Active Agents</h3>
          <ul className="space-y-1 text-sm">
            <li className="flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition duration-300 hover:bg-gradient-to-r hover:from-[#2563eb] hover:to-[#60a5fa] hover:text-white text-blue-600">
<Link href="/optimus-dashboard">
  <div className="flex items-center gap-2">
    <User size={16} /> Optimus
  </div>
</Link>
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
      </div>

      {/* Main */}
      <div className="flex-1 p-6">
        {/* Top Bar */}
        <div className="flex justify-between mb-6 items-center">
          <h1 className="text-2xl font-bold">Analytics & Reports</h1>
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search..."
                className="pl-3 pr-4 py-2 w-full border-2 border-orange-500 rounded-md text-sm bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
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

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {statusCards.map((card, idx) => (
            <div
              key={idx}
              className="p-3 rounded-md text-sm font-medium"
              style={{ backgroundColor: card.color }}
            >
              {card.text}
            </div>
          ))}
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-md shadow">
            <p className="text-gray-500 text-xs mb-1">Total Candidates</p>
            <h2 className="text-xl font-bold">2,847</h2>
            <ResponsiveContainer width="100%" height={50}>
              <BarChart data={[{ value: 2847 }]}>
                <Bar dataKey="value" fill="#FF4B00" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-4 rounded-md shadow">
            <p className="text-gray-500 text-xs mb-1">Avg Time to Hire</p>
            <h2 className="text-xl font-bold">18.5</h2>
            <ResponsiveContainer width="100%" height={50}>
              <BarChart data={[{ value: 18.5 }]}>
                <Bar dataKey="value" fill="#FFA500" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-4 rounded-md shadow">
            <p className="text-gray-500 text-xs mb-1">Payroll Accuracy</p>
            <h2 className="text-xl font-bold">99.7%</h2>
            <ResponsiveContainer width="100%" height={50}>
              <BarChart data={[{ value: 99.7 }]}>
                <Bar dataKey="value" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Help Queries Chart */}
        <div className="bg-white p-4 rounded-md shadow mb-6">
          <h3 className="text-md font-semibold mb-2">Help Queries Over Time</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={helpQueries}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="queries" stroke="#2563eb" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recruitment Funnel & Top Agents */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Recruitment Funnel */}
          <div className="bg-white p-4 rounded-md shadow">
            <h3 className="text-md font-semibold mb-2">Recruitment Funnel</h3>
            {recruitmentFunnel.map((stage, idx) => (
              <div key={idx} className="mb-2">
                <p className="text-xs text-gray-500">{stage.stage}</p>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full"
                    style={{ width: `${(stage.value / 2847) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Top Performing Agents */}
          <div className="bg-white p-4 rounded-md shadow">
            <h3 className="text-md font-semibold mb-2">Top Performing Agents</h3>
            <ul className="divide-y text-sm">
              {topAgents.map((agent, idx) => (
                <li key={idx} className="py-2 flex justify-between">
                  <div>
                    <p className="font-semibold">{agent.name}</p>
                    <p className="text-xs text-gray-500">{agent.role}</p>
                  </div>
                  <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                    {agent.votes} votes
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Query Types & Query Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-4 rounded-md shadow">
            <h3 className="text-md font-semibold mb-2">Query Types</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={queryTypes}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  label
                >
                  {queryTypes.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-4 rounded-md shadow">
            <h3 className="text-md font-semibold mb-2">Query Status</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={queryStatus}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  label
                >
                  {queryStatus.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="bg-white p-4 rounded-md shadow">
          <h3 className="text-md font-semibold mb-2">Recent Reports</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="py-2">Report Name</th>
                <th className="py-2">Type</th>
                <th className="py-2">Generated On</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentReports.map((report, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-2">{report.name}</td>
                  <td className="py-2">{report.type}</td>
                  <td className="py-2">{report.date}</td>
                  <td className="py-2 space-x-2">
                    <button className="text-blue-500 hover:underline">View</button>
                    <button className="text-green-500 hover:underline">Export</button>
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

