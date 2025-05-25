"use-client"
import { Features } from "@/components/blocks/features-11"
import HeroAgent from "@/components/blocks/heroAgentPHR"
import Navbar from "@/components/ui/nav"
import { Footerdemo } from "@/demo/fs"
import { GradientHeadingDemo } from "@/demo/gradientHeadDemo"
import {Bolt,CopyPlus,Layers2,Files} from 'lucide-react'
import dash from "@/components/blocks/Dashboard.png"
import optimus from '@/images/optimus.png'
import { Marquee } from "@/components/ui/marqueeText"
export const OptimusPage=()=>{
    return(
        <div>
        <Navbar></Navbar>
          <HeroAgent
                  heading="Meet Your AI Agent"
                  description="HR Optimus acts as your intelligent hiring engine—automating outreach, predicting candidate behavior, and mapping long-term fit. It ensures you never miss high-potential talent, even when they’re not actively looking"
                  image={optimus}
                  item={{
                    label: "Optimus",
                    agents: [
                      { label: "Maxi", to: "/maxi", icon: <Bolt size={16} className="opacity-60" /> },
                      { label: "Prime HR", to: "/prime", icon: <CopyPlus size={16} className="opacity-60" /> },
                      { label: "Nova", to: "/nova", icon: <Layers2 size={16} className="opacity-60" /> },
                      { label: "Archie", to: "/archie", icon: <Files size={16} className="opacity-60" /> },
                      { label: "Onix", to: "/onix", icon: <Files size={16} className="opacity-60" /> },
                    ],
                  }}></HeroAgent>
                          <Marquee text='OPTIMUS'></Marquee>
        <GradientHeadingDemo></GradientHeadingDemo>
        <Features></Features>
        <Footerdemo></Footerdemo>
        </div>
    )
}