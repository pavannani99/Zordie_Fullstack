"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  MoreHorizontal,
  Upload,
  X,
  Settings
} from "lucide-react";

export default function HomePage() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const maxSizeMB = 10;

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(
      (file) => file.size <= maxSizeMB * 1024 * 1024
    );
    setSelectedFiles(validFiles);
  };

  const openFileDialog = () => {
    document.getElementById("fileUpload").click();
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="flex items-center space-x-2 p-4">
          <img
            src="/assets/zordie-logo.png"
            alt="Zordie Logo"
            className="w-12 h-11"
          />
          <h1 className="text-2xl font-bold text-black">ZORDIE</h1>
        </div>

<nav className="flex-1 px-4 py-6 space-y-3 text-gray-700">
  <Link href="/">
    <div className="flex items-center space-x-3 cursor-pointer px-3 py-2 rounded-md transition duration-300 hover:bg-gradient-to-r hover:from-[#2563eb] hover:to-[#60a5fa] hover:text-white">
      <LayoutDashboard size={20} className="text-orange-500" />
      <span>Dashboard</span>
    </div>
  </Link>
  <Link href="/workspace">
    <div className="flex items-center space-x-3 cursor-pointer px-3 py-2 rounded-md transition duration-300 hover:bg-gradient-to-r hover:from-[#2563eb] hover:to-[#60a5fa] hover:text-white">
      <FileText size={20} className="text-orange-500" />
      <span>Workspace</span>
    </div>
  </Link>
  <Link href="/CalendarPage">
    <div className="flex items-center space-x-3 cursor-pointer px-3 py-2 rounded-md transition duration-300 hover:bg-gradient-to-r hover:from-[#2563eb] hover:to-[#60a5fa] hover:text-white">
      <Calendar size={20} className="text-orange-500" />
      <span>Projects & Calendar</span>
    </div>
  </Link>
          <Link href="/settings">
<div
  onClick={() => handleSidebarClick("Settings")}
  className="flex items-center space-x-3 cursor-pointer px-3 py-2 rounded-md transition duration-300 hover:bg-gradient-to-r hover:from-[#2563eb] hover:to-[#60a5fa] hover:text-white"
>
  <Settings size={18} className="text-orange-500" />
  <span>Settings</span>
</div>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-6">
        {/* Upload Button */}
        <div className="flex justify-end">
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition"
            onClick={() => setModalOpen(true)}
          >
            Upload File
          </button>
        </div>

        {/* Search Bar */}
<div className="mt-6 mb-4">
  <input
    type="text"
    placeholder="Search files..."
    className="w-full border border-orange-500 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
  />
</div>

{/* Recently Modified */}
<div className="mb-6">
  <h2 className="text-lg font-semibold text-gray-800 mb-2">Recently modified</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="flex items-center bg-white border border-gray-200 rounded-md p-3 shadow-sm">
      <FileText className="text-gray-500 mr-3" size={24} />
      <div>
        <p className="font-medium text-gray-700">Campaign Analysis - Q3.docx</p>
        <p className="text-sm text-gray-400">2.7 MB • Document</p>
      </div>
    </div>
    <div className="flex items-center bg-white border border-gray-200 rounded-md p-3 shadow-sm">
      <img src="/assets/rebrand_mockup.png" alt="" className="w-6 h-6 mr-3" />
      <div>
        <p className="font-medium text-gray-700">Rebrand Mockup</p>
        <p className="text-sm text-gray-400">1.2 MB • Image</p>
      </div>
    </div>
  </div>
</div>

{/* Filters */}
<div className="flex items-center space-x-4 mb-4">
  <div className="flex items-center space-x-1">
    <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
    <span className="text-sm text-gray-600">Documents</span>
  </div>
  <div className="flex items-center space-x-1">
    <div className="w-4 h-4 bg-purple-500 rounded-sm"></div>
    <span className="text-sm text-gray-600">Image</span>
  </div>
  <div className="flex items-center space-x-1">
    <div className="w-4 h-4 bg-yellow-500 rounded-sm"></div>
    <span className="text-sm text-gray-600">Video</span>
  </div>
</div>

{/* All Files */}
<div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-x-auto">
  <table className="min-w-full text-sm">
    <thead>
      <tr className="bg-gray-100 text-gray-600 uppercase text-xs">
        <th className="px-4 py-2 text-left">Name</th>
        <th className="px-4 py-2 text-left">Size</th>
        <th className="px-4 py-2 text-left">Type</th>
      </tr>
    </thead>
    <tbody className="text-gray-700">
      <tr className="border-t">
        <td className="px-4 py-2 flex items-center">
          <FileText className="text-gray-500 mr-2" size={18} />
          Campaign Analysis - Q3.docx
        </td>
        <td className="px-4 py-2">2.7 MB</td>
        <td className="px-4 py-2">Document</td>
      </tr>
      <tr className="border-t">
        <td className="px-4 py-2 flex items-center">
          <img src="/assets/rebrand_mockup.png" alt="" className="w-4 h-4 mr-2" />
          rebrand_mockup_v2.png
        </td>
        <td className="px-4 py-2">1.2 MB</td>
        <td className="px-4 py-2">Image</td>
      </tr>
      <tr className="border-t">
        <td className="px-4 py-2 flex items-center">
          <FileText className="text-gray-500 mr-2" size={18} />
          proposal_new_product.docx
        </td>
        <td className="px-4 py-2">3.1 MB</td>
        <td className="px-4 py-2">Document</td>
      </tr>
    </tbody>
  </table>
</div>


        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl p-0 overflow-hidden">
              {/* Upload File Header */}
              <div className="flex justify-between items-center px-6 py-4 border-b">
                <h1 className="text-xl font-bold text-gray-800">Upload file</h1>
                <button
                  className="text-gray-400 hover:text-red-500"
                  onClick={() => setModalOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Dropzone */}
              <div
                className="m-6 border-2 border-dashed border-purple-400 rounded-lg p-10 text-center bg-purple-50 hover:bg-purple-100 cursor-pointer transition"
                onClick={openFileDialog}
              >
                <Upload className="mx-auto mb-3 text-purple-600" size={36} />
                <p className="text-gray-600">
                  Drop your files here, or{" "}
                  <span className="text-purple-700 font-medium underline">
                    click to browse
                  </span>
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Supported files: .docx, .png, .webp, .csv, .txt, .zip | Max
                  size: 10MB
                </p>
                <input
                  id="fileUpload"
                  type="file"
                  className="hidden"
                  multiple
                  accept=".docx,.png,.webp,.csv,.txt,.zip"
                  onChange={handleFileChange}
                />
              </div>

              {/* Selected Files */}
              {selectedFiles.length > 0 && (
                <div className="px-6">
                  <h2 className="text-sm font-semibold text-gray-700 mb-2">
                    Files selected:
                  </h2>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {selectedFiles.map((file, idx) => (
                      <li key={idx}>
                        {file.name} (
                        {(file.size / (1024 * 1024)).toFixed(2)} MB)
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Continue Button */}
              <div className="px-6 py-4 border-t">
                <button
                  className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-md transition ${
                    selectedFiles.length === 0
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={selectedFiles.length === 0}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
