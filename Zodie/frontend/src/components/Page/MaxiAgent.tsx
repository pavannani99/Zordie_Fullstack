"use-client"
import { Features } from "@/components/blocks/features-11"
import HeroAgent from "@/components/blocks/heroAgentPHR"
import Navbar from "@/components/ui/nav"
import { Footerdemo } from "@/demo/fs"
import { GradientHeadingDemo } from "@/demo/gradientHeadDemo"
import {Bolt,CopyPlus,Layers2,Files} from 'lucide-react'
import dash from "@/components/blocks/Dashboard.png"
import { Marquee } from "@/components/ui/marqueeText"

export const MaxiPage=()=>{
    return(
        <div>
        <Navbar></Navbar>
          <HeroAgent
                  heading="Meet Your AI Agents"
                  description="Maxi ensures new hires settle in and succeed. By customizing onboarding paths and tracking progress in real time, Maxi flags early struggles, promotes mentorship, and reduces ramp-up time with proactive support."
                  image={dash}
                  item={{
                    label: "Maxi",
                    agents: [
                      { label: "Optimus", to: "/optimus", icon: <Bolt size={16} className="opacity-60" /> },
                      { label: "Prime HR", to: "/prime", icon: <CopyPlus size={16} className="opacity-60" /> },
                      { label: "Nova", to: "/nova", icon: <Layers2 size={16} className="opacity-60" /> },
                      { label: "Archie", to: "/archie", icon: <Files size={16} className="opacity-60" /> },
                      { label: "Onix", to: "/onix", icon: <Files size={16} className="opacity-60" /> },
                    ],
                  }}></HeroAgent>
                      <Marquee text='MAXI'></Marquee>
        <GradientHeadingDemo></GradientHeadingDemo>
        <Features></Features>
        <Footerdemo></Footerdemo>
        </div>
    )
}