"use client";
import React from "react";
import { Button } from "@/components/ui/moving-border";
import { Link } from "react-router-dom";

export function MovingBorderDemo() {
  return (
    <div>
      <Button
        borderRadius="1rem"
        className="bg-white  hover:bg-blue-300 dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
      >
        <Link to='hi'>Get Early Access</Link>
      </Button>
    </div>
  );
}
    //  <Button
    //                                         key={2}
    //                                         asChild
    //                                         size="lg"
    //                                         variant="ghost"
    //                                         className="h-[42px] rounded-xl px-5 text-base">
    //                                         <Link to="#link">
    //                                             <span className="text-nowrap">Request Early Access</span>
    //                                         </Link>
    //                                     </Button>