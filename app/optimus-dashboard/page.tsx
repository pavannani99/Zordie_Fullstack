"use client";

import React from "react";
import { Bell, Calendar, FileText, LayoutDashboard, Users, CheckCircle, DollarSign, ClipboardList, Activity } from "lucide-react";
import Link from "next/link";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const SidebarItem = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex items-center space-x-3 cursor-pointer px-3 py-2 rounded-md transition duration-300 hover:bg-gradient-to-r hover:from-[#2563eb] hover:to-[#60a5fa] hover:text-white">
    <span>{icon}</span>
    <span className="font-medium text-sm">{label}</span>
  </div>
);

const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

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
  { title: "Software Developer", type: "Full-time", location: "Remote", salary: "$70K-$90K", applicants: 120 },
  { title: "Graphic Designer", type: "Part-time", location: "Hybrid", salary: "$40K-$55K", applicants: 75 },
  { title: "Sales Manager", type: "Full-time", location: "On-site", salary: "$65K-$80K", applicants: 70 },
  { title: "HR Coordinator", type: "Contract", location: "Remote", salary: "$50K-$60K", applicants: 60 },
];

const tasks = [
  { title: "Resume Screening", date: "May 17, 2025" },
  { title: "Interview Scheduling", date: "May 20, 2025" },
  { title: "Candidate Communication", date: "May 23, 2025" },
  { title: "Offer Management", date: "May 25, 2025" },
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
      <aside className="w-64 bg-white shadow-md p-4">
        <Link href="/">
          <div className="flex items-center space-x-2 mb-6">
            <img src="/assets/zordie-logo.png" alt="Zordie Logo" className="w-10 h-10" />
            <h2 className="text-orange-600 font-bold text-xl">Zordie</h2>
          </div>
        </Link>
        <nav className="space-y-2">
 <Link href="/">
  <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" />
</Link>
          <SidebarItem icon={<FileText size={20} />} label="Inbox" />
          <SidebarItem icon={<Calendar size={20} />} label="Calendar" />
          <SidebarItem icon={<FileText size={20} />} label="Jobs" />
          <SidebarItem icon={<Users size={20} />} label="Candidates" />
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

      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search candidates, vacancy, etc"
                className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-md text-sm focus:outline-orange-500"
              />
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2.5a7.5 7.5 0 010 14.15z" />
                </svg>
              </span>
            </div>
            <Bell className="text-gray-500 w-5 h-5 cursor-pointer hover:text-orange-600" />
            <img src="https://ui-avatars.com/api/?name=Andrew+Sebastian" className="w-8 h-8 rounded-full" alt="User Avatar" />
          </div>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          {["Applications", "Shortlisted", "Hired", "Rejected"].map((title, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-gray-500 text-sm">{title}</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{Math.floor(Math.random() * 2000)}</p>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-sm text-gray-500 mb-2 font-semibold">Applications Overview</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={appChartData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="applied" fill="#8884d8" />
                <Bar dataKey="shortlisted" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-sm text-gray-500 mb-2 font-semibold">Application by Department</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={appDeptData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                  {appDeptData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-sm text-gray-500 mb-2 font-semibold">Applicant Resources</h2>
            <p className="text-center mt-8 font-bold text-xl">1,000</p>
            <p className="text-sm text-center text-gray-500">Total Applicants</p>
          </div>
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-sm font-semibold text-gray-600 mb-2">Current Vacancies</h2>
            {vacancies.map((v, i) => (
              <div key={i} className="border-b py-2">
                <p className="font-medium text-gray-800">{v.title}</p>
                <p className="text-sm text-gray-500">{v.type} - {v.location}</p>
                <p className="text-sm text-gray-600">{v.salary} • {v.applicants} Applicants</p>
              </div>
            ))}
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-sm font-semibold text-gray-600 mb-2">Tasks</h2>
            {tasks.map((t, i) => (
              <div key={i} className="border-b py-2">
                <p className="font-medium text-gray-800">{t.title}</p>
                <p className="text-sm text-gray-500">{t.date}</p>
              </div>
            ))}
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-sm font-semibold text-gray-600 mb-2">Recent Activity</h2>
            {activities.map((a, i) => (
              <p key={i} className="text-sm text-gray-700 mb-1">{a}</p>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-sm font-semibold text-gray-600 mb-2">Applicants List</h2>
            {applicants.map((a, i) => (
              <div key={i} className="border-b py-2">
                <p className="font-medium text-gray-800">{a.name} - {a.role}</p>
                <p className="text-sm text-gray-500">Applied on {a.date} • {a.type}</p>
                <p className="text-sm text-orange-600 font-semibold">{a.status}</p>
              </div>
            ))}
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-sm font-semibold text-gray-600 mb-2">More Insights</h2>
            <p className="text-sm text-gray-500">You can add more widgets here...</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default OptimusDashboard;
