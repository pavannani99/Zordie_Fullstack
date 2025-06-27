"use client";
import React, { useState } from "react";
import Link from 'next/link';
import {
  Settings,
  BookOpen,
  FileText,
  Users,
  Clock,
  HelpCircle,
  Mic,
  Paperclip,
  SendHorizonal,
} from "lucide-react";

const AIChatBot = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<{ from: "user" | "bot"; text: string }[]>([]);

  const handleSend = () => {
    if (!message.trim()) return;

    // Add user message
    const updatedChat: { from: "user" | "bot"; text: string }[] = [...chat, { from: "user", text: message }];

    setChat(updatedChat);
    setMessage("");

    // Add fake bot reply
    setTimeout(() => {
      setChat((prev) => [
        ...prev,
        { from: "bot", text: "🤖 Zordie Bot is thinking..." },
      ]);
    }, 1000);
  };

const sidebarItems = [
  { icon: <BookOpen size={18} className="text-orange-500" />, label: "AI Chat" },
  { icon: <FileText size={18} className="text-orange-500" />, label: "Projects" },
  { icon: <Users size={18} className="text-orange-500" />, label: "Community" },
  { icon: <Clock size={18} className="text-orange-500" />, label: "History" },
  { icon: <HelpCircle size={18} className="text-orange-500" />, label: "Help" },
];

  const handleSidebarClick = (label: string) => {
    alert(`You clicked on: ${label}`);
  };

  return (
    <div className="flex h-screen text-gray-800 font-sans bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-4 flex flex-col justify-between">
        <div>
<Link href="/">
  <div className="flex items-center space-x-2 mb-6 cursor-pointer">
    <img src="/assets/zordie-logo.png" alt="Zordie Logo" className="w-12 h-11" />
    <h2 className="text-black font-bold text-xl">ZORDIE</h2>
  </div>
</Link>
          <nav className="space-y-4">
            {sidebarItems.map(({ icon, label }) => (
              <div
                key={label}
                onClick={() => handleSidebarClick(label)}
                className="flex items-center space-x-3 cursor-pointer px-3 py-2 rounded-md transition duration-300 hover:bg-gradient-to-r hover:from-[#2563eb] hover:to-[#60a5fa] hover:text-white"
              >
                {icon} <span>{label}</span>
              </div>
            ))}
          </nav>
        </div>
        <div>
<div
  onClick={() => handleSidebarClick("Settings")}
  className="flex items-center space-x-3 cursor-pointer px-3 py-2 rounded-md transition duration-300 hover:bg-gradient-to-r hover:from-[#2563eb] hover:to-[#60a5fa] hover:text-white"
>
  <Settings size={18} className="text-orange-500" /> <span>Settings</span>
</div>

          <div className="flex items-center gap-3">
            <img
              src="https://ui-avatars.com/api/?name=User"
              className="w-8 h-8 rounded-full"
              alt="User"
            />
            <div>
              <p className="text-sm font-semibold">Emilia Caitlin</p>
              <p className="text-xs text-gray-400">hey@unspace.agency</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Chat */}
      <main className="flex-1 flex flex-col">
        <div className="p-10 overflow-y-auto flex-1">
          <h2 className="text-3xl font-bold mb-2">Welcome to Zordie</h2>
          <p className="text-gray-500 mb-6">
            Get started by Zordie a task and Chat can do the rest. Not sure where to start?
          </p>

<div className="bg-gradient-to-r from-[#2563eb] to-[#60a5fa] p-3 rounded-xl mb-6">
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {["Write copy + ", "Image generation + ", "Create avatar + ", "Write code + "].map((label, i) => (
      <button
        key={i}
        className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 shadow"
      >
        {label}
      </button>
    ))}
  </div>
</div>



          {/* Chat messages */}
          <div className="space-y-3">
            {chat.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg shadow max-w-[80%] ${
                  msg.from === "user" ? "bg-blue-100 ml-auto" : "bg-white"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4 border-t bg-white">
          <div className="flex items-center border rounded-lg px-4 py-2 gap-2 w-full border-2 border-orange-500">
            <input
              type="text"
              className="flex-1 outline-none "
              placeholder="Search or type message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <label className="cursor-pointer">
              <Paperclip size={20} className="text-gray-500" />
              <input type="file" hidden />
            </label>
            <button className="text-gray-500 hover:text-gray-600">
              <Mic size={20} />
            </button>
            <button onClick={handleSend} className="text-blue-500 hover:text-blue-600">
              <SendHorizonal size={20} />
            </button>
          </div>
        </div>
      </main>

      {/* Right panel */}
      <aside className="w-72 bg-white border-l p-4 overflow-y-auto hidden lg:block">
        <h3 className="flex items-center space-x-3 cursor-pointer px-3 py-2 rounded-md transition duration-300 hover:bg-gradient-to-r hover:from-[#FF4B00] hover:to-[#FFA500] hover:text-white">Projects</h3>
        <ul className="space-y-3 text-sm">
          {[
            "New Project",
            "Learning from 100 Years...",
            "Research Officials",
            "What does a lead dev do?",
            "Sweet note to grandma",
            "Meet with cake bakers",
          ].map((item, idx) => (
            <li key={idx} className="p-2 rounded-md hover:bg-gray-100 cursor-pointer">
              {item}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default AIChatBot;
