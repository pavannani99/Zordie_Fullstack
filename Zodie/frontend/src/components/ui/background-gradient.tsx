"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export const BackgroundGradient = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative bg-white dark:bg-zinc-900 p-4 sm:p-6 rounded-2xl overflow-hidden group shadow-md",
        className
      )}
    >
      {/* Soft, pastel glow */}
      <div className="absolute -inset-[1px] bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-[inherit] blur-[4px] opacity-15 group-hover:opacity-30 transition duration-500 pointer-events-none" />
      {children}
    </div>
  );
};
