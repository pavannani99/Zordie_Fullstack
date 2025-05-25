"use client"

import * as React from "react"
import { GradientHeading } from "@/components/ui/gradientHeading"

export function GradientHeadingDemo() {
  return (
    <div className="flex justify justify-center space-y-8 p-4">
      <GradientHeading 
        variant="default"
        size="xxl"
        weight="bold"
        className="mb-2"
      >
        Features
      </GradientHeading>
    </div>
  )
}