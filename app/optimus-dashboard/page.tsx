"use client";

import React from "react";
import {
  Bell,
  Calendar,
  FileText,
  LayoutDashboard,
  Users,
  CheckCircle,
  DollarSign,
} from "lucide-react";
import Link from "next/link";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SidebarItem = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
    <div className="group flex items-center space-x-3 cursor-pointer px-3 py-2 rounded-md transition duration-300 hover:bg-gradient-to-r hover:from-[#2563eb] hover:to-[#60a5fa] hover:text-white">
      <div className="text-orange-500 group-hover:text-white">{icon}</div>
      <span className="text-base font-medium">{label}</span>
    </div>
);

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"]; // Update with image-based colors

const appDeptData = [
  { name: "Engineering", value: 120 },
  { name: "Marketing", value: 110 },
  { name: "Sales", value: 95 },
  { name: "Support", value: 65 },
  { name: "Finance", value: 45 },
];

const appChartData = [
  { date: "13 May", applied: 200, shortlisted: 120 },
  { date: "14 May", applied: 240, shortlisted: 150 },
  { date: "15 May", applied: 180, shortlisted: 100 },
  { date: "16 May", applied: 220, shortlisted: 130 },
  { date: "17 May", applied: 190, shortlisted: 110 },
];

const vacancies = [
  {
    title: "Graphic Designer",
    type: "Part-time",
    location: "Hybrid",
    salary: "$40K-$55K",
    applicants: 75,
    iconBg: "#fde68a",
    icon: (
      <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h2a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm13 0a1 1 0 011-1h2a1 1 0 011 1v16a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
      </svg>
    ),
  },
  {
    title: "Software Developer",
    type: "Full-time",
    location: "Remote",
    salary: "$70K-$90K",
    applicants: 120,
    iconBg: "#e0e7ff",
    icon: (
      <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
      </svg>
    ),
  },
  {
    title: "Sales Manager",
    type: "Full-time",
    location: "On-site",
    salary: "$65K-$80K",
    applicants: 75,
    iconBg: "#bbf7d0",
    icon: (
      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h4" />
      </svg>
    ),
  },
  {
    title: "HR Coordinator",
    type: "Contract",
    location: "Remote",
    salary: "$50K-$60K",
    applicants: 60,
    iconBg: "#fecdd3",
    icon: (
      <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
];


const tasks = [
  { title: "Resume Screening", date: "May 27, 2027", progress: 40, subtitle: "Evaluating" },
  { title: "Interview Scheduling", date: "May 20, 2025", progress: 60 },
  { title: "Candidate Communication", date: "May 23, 2025", progress: 30 },
  { title: "Offer Management", date: "May 25, 2025", progress: 50 },
];

const applicants = [
  { name: "Alex Bob", role: "Software Engineer", date: "Apr 15, 2027", type: "Full-time", status: "Interviewing" },
  { name: "Alice Jenson", role: "HR Specialist", date: "Apr 10, 2027", type: "Contract", status: "Shortlisted" },
  { name: "Bob Lee", role: "Sales Associate", date: "Apr 18, 2025", type: "Temporary", status: "Screening" },
  { name: "Mark Brown", role: "Financial Analyst", date: "Apr 22, 2025", type: "Full-time", status: "Job Offer" },
];

const activities = [
  "Darren Wright viewed 15 candidate profiles.",
  "Corey Smith scheduled interviews with 3 candidates.",
  "Rohit submitted customer feedback report.",
  "Offer letter accepted by candidate Mark Brown."
];

const OptimusDashboard = () => {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <Link href="/">
          <div className="flex items-center space-x-2 mb-6">
            <img src="/assets/zordie-logo.png" alt="Zordie Logo" className="w-12 h-12" />
            <h2 className="text-black font-bold text-xl">Zordie</h2>
          </div>
        </Link>
        <nav className="space-y-2">
          <Link href="/">
            <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" />
          </Link>
          <SidebarItem icon={<FileText size={20} />} label="Inbox" />
          <Link href="/CalendarPage">
            <SidebarItem icon={<Calendar size={20} />} label="Schedule" />
          </Link>
          <SidebarItem icon={<FileText size={20} />} label="Jobs" />
          <Link href="/candidate-dashboard">
            <SidebarItem icon={<Users size={20} />} label="Candidates" />
          </Link>
          <SidebarItem icon={<FileText size={20} />} label="Recruitment Board" />
          <SidebarItem icon={<CheckCircle size={20} />} label="Offers" />
          <SidebarItem icon={<DollarSign size={20} />} label="Onboarding" />
        </nav>
        <div className="mt-6">
          <div className="bg-gradient-to-r from-orange-500 to-orange-300 text-white rounded-md p-4 text-center text-sm">
            <p className="mb-2 font-medium">Elevate Your Recruitment Strategy</p>
            <button className="bg-white text-orange-500 font-semibold px-3 py-1 rounded-md hover:bg-gray-100 text-sm">Upgrade Now</button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-12 pr-4 py-2 w-64 border border-orange-500 rounded-md text-sm focus:outline-orange-500"
              />
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2.5a7.5 7.5 0 010 14.15z" />
                </svg>
              </span>
            </div>
            <Bell className="text-gray-500 w-5 h-5 cursor-pointer hover:text-orange-600" />
            <img src="https://ui-avatars.com/api/?name=Andrew+Sebastian" className="w-8 h-8 rounded-full" alt="User Avatar" />
          </div>
        </div>

        {/* Applications Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
  <div className="p-4 rounded-lg shadow-md" style={{ backgroundColor: '#FF7A43' }}>
    <p className="text-black text-sm">Applications</p>
    <p className="text-2xl font-bold text-black mt-1">1,534</p>
  </div>
          {["Shortlisted", "Hired", "Rejected"].map((title, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-gray-500 text-sm">{title}</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{Math.floor(Math.random() * 2000)}</p>
            </div>
          ))}
        </section>

        {/* Charts Row */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-sm text-gray-500 mb-2 font-semibold">Applications Overview</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={appChartData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="applied" fill="#2563eb" />
                <Bar dataKey="shortlisted" fill="#f97316" />
              </BarChart>
            </ResponsiveContainer>
          </div>

<div className="bg-white p-4 rounded shadow flex flex-col md:flex-row md:items-center">
  <div className="flex-1">
    <h2 className="text-sm text-black mb-2 font-semibold">Application by Department</h2>
    <h3 className="text-2xl font-bold text-black mt-1">525</h3>

    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={appDeptData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
        >
          {appDeptData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>

  {/* Legend */}
  <div className="mt-4 md:mt-0 md:ml-6">
    {appDeptData.map((entry, index) => (
      <div key={`legend-${index}`} className="flex items-center mb-2">
        <div
          className="w-4 h-4 rounded mr-2"
          style={{ backgroundColor: COLORS[index % COLORS.length] }}
        ></div>
        <span className="text-sm text-black">{entry.name}</span>
      </div>
    ))}
  </div>
</div>


<div className="bg-blue-100 p-4 rounded shadow flex flex-col justify-center items-center">
  <h2 className="text-sm text-gray-500 mb-2 font-semibold">Applicant Resources</h2>

  {/* Circle with thick segmented border */}
  <div className="relative w-32 h-32 flex items-center justify-center">
    {/* Thick segmented border using conic-gradient */}
    <div
      className="absolute inset-0 rounded-full"
      style={{
        background: `conic-gradient(
          #FF7A43 0% 33%,
          #FFA560 33% 66%,
          #95A1FF 66% 100%
        )`,
      }}
    ></div>
    {/* Inner white circle */}
    <div className="relative w-24 h-24 bg-white rounded-full flex flex-col items-center justify-center text-center px-1">
      <span className="text-base font-semibold text-gray-700">1,000</span>
      <span className="text-xs text-gray-500">total applications</span>
    </div>
  </div>

  {/* Legends */}
  <div className="mt-3 space-y-1">
    <div className="flex items-center">
      <div className="w-3 h-3 rounded mr-2" style={{ backgroundColor: '#FF7A43' }}></div>
      <span className="text-xs text-gray-600">Category A</span>
    </div>
    <div className="flex items-center">
      <div className="w-3 h-3 rounded mr-2" style={{ backgroundColor: '#FFA560' }}></div>
      <span className="text-xs text-gray-600">Category B</span>
    </div>
    <div className="flex items-center">
      <div className="w-3 h-3 rounded mr-2" style={{ backgroundColor: '#95A1FF' }}></div>
      <span className="text-xs text-gray-600">Category C</span>
    </div>
  </div>

  <p className="text-sm text-gray-500 mt-2">Total Applicants</p>
</div>

        </section>

        {/* Remaining sections same */}


<section className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
  {/* Current Vacancy Card */}
  <div className="bg-white p-4 rounded shadow">
    {/* Header */}
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-base font-semibold text-gray-800">Current Vacancies</h2>
      <div className="flex items-center space-x-2">
        <label htmlFor="sort" className="text-sm text-gray-500">Sort by:</label>
        <select
          id="sort"
          className="border border-gray-300 rounded px-2 py-1 text-sm"
        >
          <option>Popular</option>
          <option>Newest</option>
          <option>Oldest</option>
        </select>
        <button className="text-sm text-blue-600 font-medium hover:underline">
          See All
        </button>
      </div>
    </div>

    {/* 2x2 Grid of 4 Vacancies */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {vacancies.map((v, i) => (
        <div
          key={i}
          className="bg-gray-50 p-3 rounded border border-gray-200 flex flex-col justify-between"
        >
          {/* Top Row */}
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              {/* Icon */}
              <div
                className="p-1 rounded"
                style={{ backgroundColor: v.iconBg }}
              >
                {v.icon}
              </div>
              {/* Title */}
              <h3 className="text-sm font-semibold text-gray-900">
                {v.title}
              </h3>
            </div>
            {/* Dots */}
            <button className="text-gray-400 hover:text-gray-600">
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zm6-2a2 2 0 100 4 2 2 0 000-4zm4 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>
          </div>

          {/* Labels */}
          <div className="flex flex-wrap gap-1 mt-2">
            <span className="bg-gray-200 text-gray-700 text-[10px] px-1.5 py-0.5 rounded">
              {v.type}
            </span>
            <span className="bg-gray-200 text-gray-700 text-[10px] px-1.5 py-0.5 rounded">
              {v.location}
            </span>
          </div>

          {/* Salary + Applicants */}
          <div className="mt-2 flex items-center justify-between">
            <p className="text-xs font-medium text-gray-900">{v.salary}</p>
            <p className="text-[10px] text-gray-500">
              {v.applicants} Applicants
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Tasks */}
<div className="bg-white p-4 rounded shadow font-sans">
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-md font-semibold text-gray-700">Tasks</h2>
    <button className="bg-orange-500 hover:bg-orange-600 text-white rounded p-1">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
      </svg>
    </button>
  </div>

  <div className="space-y-3">
    {tasks.map((task, i) => (
      <div
        key={i}
        className="flex items-center bg-gray-50 rounded p-3"
      >
        {/* Circle progress */}
        <div className="relative w-10 h-10 flex items-center justify-center mr-3">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="20"
              cy="20"
              r="18"
              stroke="#E5E7EB"
              strokeWidth="4"
              fill="transparent"
            />
            <circle
              cx="20"
              cy="20"
              r="18"
              stroke="#A78BFA"
              strokeWidth="4"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 18}
              strokeDashoffset={
                2 * Math.PI * 18 * (1 - task.progress / 100)
              }
            />
          </svg>
          <span className="absolute text-xs text-gray-700">{task.progress}%</span>
        </div>

        {/* Task text */}
        <div>
          <p className="text-sm font-medium text-gray-800">{task.title}</p>
          {task.subtitle && (
            <p className="text-xs text-gray-500">{task.subtitle}</p>
          )}
          <p className="text-xs text-gray-500 mt-0.5">{task.date}</p>
        </div>
      </div>
    ))}
  </div>
</div>

  {/* Schedule */}
<div className="bg-white p-4 rounded shadow font-sans">
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-md font-semibold text-gray-600">Schedule</h2>
    <button className="flex items-center space-x-1 text-sm text-gray-500 border px-2 py-1 rounded">
      <span>Today</span>
      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  </div>
  
  <div className="space-y-4">
    {/* Marketing */}
    <div className="flex items-start">
      <p className="w-16 text-xs text-gray-500 mt-1">1:00PM</p>
      <div className="flex-1 bg-[#FF7A43] text-white p-3 rounded">
        <p className="text-sm font-medium">Marketing Strategy Presentation</p>
        <p className="text-xs mt-1">Marketing</p>
      </div>
    </div>
    {/* HR */}
    <div className="flex items-start">
      <p className="w-16 text-xs text-gray-500 mt-1">2:30PM</p>
      <div className="flex-1 bg-[#FFA560] text-white p-3 rounded">
        <p className="text-sm font-medium">HR Policy Update Session</p>
        <p className="text-xs mt-1">Human Resources</p>
      </div>
    </div>
    {/* Customer Feedback */}
    <div className="flex items-start">
      <p className="w-16 text-xs text-gray-500 mt-1">4:00PM</p>
      <div className="flex-1 bg-[#95A1FF] text-white p-3 rounded">
        <p className="text-sm font-medium">Customer Feedback Analysis</p>
        <p className="text-xs mt-1">Customer Support</p>
      </div>
    </div>
    {/* Financial Reporting */}
    <div className="flex items-start">
      <p className="w-16 text-xs text-gray-500 mt-1">5:30PM</p>
      <div className="flex-1 bg-[#EDF2FE] text-gray-600 p-3 rounded">
        <p className="text-sm font-medium">Financial Reporting Session</p>
        <p className="text-xs mt-1">Finance</p>
      </div>
    </div>
  </div>
</div>

</section>


<section className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
  {/* Applicants List */}
  <div className="col-span-2 bg-white p-4 rounded shadow overflow-x-auto">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-base font-semibold text-gray-800">
        Applicants List <span className="text-gray-500 font-normal">(1,242)</span>
      </h2>
      <div className="flex items-center space-x-2">
        <label htmlFor="sort" className="text-sm text-gray-500">Sort by:</label>
        <select
          id="sort"
          className="border border-gray-300 rounded px-2 py-1 text-sm"
        >
          <option>Name</option>
          <option>Date</option>
          <option>Status</option>
        </select>
        <button className="text-sm text-blue-600 font-medium hover:underline">
          See All
        </button>
      </div>
    </div>

    {/* Filter Tabs */}
    <div className="flex flex-wrap mb-4 space-x-2">
      {["All Applicants", "Screening", "Shortlisted", "Interviewing", "Job Offer"].map((tab, i) => (
        <button
          key={i}
          className={`text-sm px-3 py-1 rounded ${
            i === 0
              ? "bg-orange-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>

    {/* Table */}
    <div className="w-full">
      <table className="min-w-full text-sm text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2 font-medium text-gray-500">Name</th>
            <th className="py-2 font-medium text-gray-500">Role</th>
            <th className="py-2 font-medium text-gray-500">Date</th>
            <th className="py-2 font-medium text-gray-500">Employment Type</th>
            <th className="py-2 font-medium text-gray-500">Resume</th>
            <th className="py-2 font-medium text-gray-500">Status</th>
          </tr>
        </thead>
        <tbody>
          {applicants.map((a, i) => (
            <tr key={i} className="border-b">
              <td className="py-2">
                <div className="flex flex-col">
                  <span className="text-gray-800 font-medium">{a.name}</span>
                  <span className="text-gray-500 text-xs">{a.name.toLowerCase().split(" ").join(".")}@hirezy.com</span>
                </div>
              </td>
              <td className="py-2 text-gray-700">{a.role}</td>
              <td className="py-2 text-gray-700">{a.date}</td>
              <td className="py-2 text-gray-700">{a.type}</td>
              <td className="py-2">
                <button className="flex items-center text-blue-500 hover:underline text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  View Resume
                </button>
              </td>
              <td className="py-2">
                <span
                  className={`flex items-center space-x-1 text-sm ${
                    a.status === "Interviewing"
                      ? "text-blue-600"
                      : a.status === "Shortlisted"
                      ? "text-green-600"
                      : a.status === "Screening"
                      ? "text-yellow-600"
                      : a.status === "Job Offer"
                      ? "text-red-500"
                      : "text-gray-600"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      a.status === "Interviewing"
                        ? "bg-blue-600"
                        : a.status === "Shortlisted"
                        ? "bg-green-600"
                        : a.status === "Screening"
                        ? "bg-yellow-600"
                        : a.status === "Job Offer"
                        ? "bg-red-500"
                        : "bg-gray-400"
                    }`}
                  />
                  <span>{a.status}</span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

  {/* Recent Activity */}
  <div className="bg-white p-4 rounded shadow">
    <h2 className="text-sm font-semibold text-gray-600 mb-4">Recent Activity</h2>
    {activities.map((a, i) => (
      <div key={i} className="mb-3 flex items-start">
        <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center text-white mr-2 text-xs">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-sm text-gray-700">{a}</p>
      </div>
    ))}
  </div>
</section>

      </main>
    </div>
  );
};

export default OptimusDashboard;
