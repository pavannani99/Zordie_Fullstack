"use client";

import React from "react";
import { motion } from "framer-motion";

export function CardContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function CardBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`transition-all duration-300 ease-in-out ${className}`}>
      {children}
    </div>
  );
}

export function CardItem({
  children,
  className,
  translateZ,
  as = "div",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  translateZ?: number | string;
  as?: keyof JSX.IntrinsicElements;
  [key: string]: any;
}) {
  const Tag = as as keyof JSX.IntrinsicElements;
  return (
    <Tag
      {...props}
      style={{
        transform: `translateZ(${translateZ || "0px"})`,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </Tag>
  );
}
