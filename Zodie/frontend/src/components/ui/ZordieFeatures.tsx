"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import dash from "@/assets/Dashboard-1.png";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { AnimatePresence, motion } from "framer-motion";

const features = [
  {
    id: 1,
    title: "All-in-One Dashboard",
    description:
      "Access and manage all HR tasks — from Hiring to performance tracking to payroll — through a single, intuitive interface.",
  },
  {
    id: 2,
    title: "Smart Hiring System",
    description:
      "Automate the full hiring workflow from JD generation to onboarding with just one-click execution and AI orchestration and Verify GitHub projects, certifications (Coursera, NPTEL, etc.), and portfolios using intelligent crawling and authenticity checks.",
  },
  {
    id: 3,
    title: "Agents That Automate Everything",
    description:
      "Every function is handled by specialized AI agents (Optimus, Maxi, Onix) that evolve and adapt — delivering scalable, autonomous HR ops.",
  },
  {
    id: 4,
    title: "Compliance Made Easy",
    description:
      "Ensure compliance with local and global labor laws through built-in compliance checks and reporting tools.",
  },
];

export default function ZordieFeatures() {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Why Choose Zordie AI</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Empowering businesses with seamless customer management and actionable insights.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Features */}
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-2 h-2 bg-gray-800 rotate-45"></div>
              <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">Features</span>
            </div>

            <h2 className="text-4xl font-bold text-gray-900 mb-8 leading-tight">
              Powerful Features to
              <br />
              Simplify HR Management
            </h2>

            <p className="text-lg text-gray-600 mb-12">
              Our platform offers tools designed to streamline HR processes, boost efficiency, and enhance the employee experience.
            </p>

            {/* Accordion */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
  key={feature.id}
  initial={{ opacity: 0, y: 30, scale: 0.95 }}
  whileInView={{ opacity: 1, y: 0, scale: 1 }}
  whileHover={{
    scale: 1.03,
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
  }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: index * 0.2, ease: "easeOut" }}
  className={`border-b border-gray-200 bg-white rounded-xl transition-transform duration-300 cursor-pointer`}
>

                  <button
                    onClick={() => toggleItem(feature.id)}
                    className="w-full py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-medium text-gray-500">[{feature.id}]</span>
                      <span className="text-xl font-semibold text-gray-900">{feature.title}</span>
                    </div>
                    <ChevronDown
                      className={`transition-transform duration-300 ${
                        expandedItem === feature.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {expandedItem === feature.id && (
                      <motion.div
                        key={`desc-${feature.id}`}
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="pb-6 pl-12 pr-8"
                      >
                        <motion.p
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.05, duration: 0.4 }}
                          className="text-gray-600 leading-relaxed"
                        >
                          {feature.description}
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side - 3D Card */}
          <div className="lg:sticky lg:top-8">
            <CardContainer className="inter-var">
              <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-3xl p-6 border shadow-xl backdrop-blur-sm ring-1 ring-blue-200/30">
                <CardItem
                  translateZ="50"
                  className="text-2xl font-bold text-neutral-600 dark:text-white mb-2"
                >
                  Zordie AI Platform
                </CardItem>
                <CardItem
                  translateZ="60"
                  as="p"
                  className="text-neutral-500 text-sm mb-4 dark:text-neutral-300"
                >
                  Explore how Zordie streamlines hiring and HR with one-click intelligence.
                </CardItem>
                <CardItem translateZ="100">
                  <img
                    src={dash}
                    alt="Zordie Demo"
                    className="w-full h-60 object-cover rounded-xl group-hover/card:shadow-xl"
                  />
                </CardItem>
              </CardBody>
            </CardContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
