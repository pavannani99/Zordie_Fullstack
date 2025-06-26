"use client";

import React, { useState } from "react";
import { Upload, X } from "lucide-react";

export default function NovaFileUpload() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const maxSizeMB = 10;

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => file.size <= maxSizeMB * 1024 * 1024);
    setSelectedFiles(validFiles);
  };

  const openFileDialog = () => {
    document.getElementById("fileUpload").click();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Upload Button */}
      <div className="flex justify-end">
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition"
          onClick={() => setModalOpen(true)}
        >
          Upload File
        </button>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl p-0 overflow-hidden">
            {/* Upload File Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h1 className="text-xl font-bold text-gray-800">Upload file</h1>
              <button className="text-gray-400 hover:text-red-500" onClick={() => setModalOpen(false)}>
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
                Drop your files here, or <span className="text-purple-700 font-medium underline">click to browse</span>
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Supported files: .docx, .png, .webp, .csv, .txt, .zip | Max size: 10MB
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
                <h2 className="text-sm font-semibold text-gray-700 mb-2">Files selected:</h2>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {selectedFiles.map((file, idx) => (
                    <li key={idx}>{file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Continue Button */}
            <div className="px-6 py-4 border-t">
              <button
                className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-md transition ${selectedFiles.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={selectedFiles.length === 0}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
