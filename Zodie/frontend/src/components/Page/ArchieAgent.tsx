"use-client"
import { Features } from "@/components/blocks/features-11"
import HeroAgent from "@/components/blocks/heroAgentPHR"
import Navbar from "@/components/ui/nav"
import { Footerdemo } from "@/demo/fs"
import { GradientHeadingDemo } from "@/demo/gradientHeadDemo"
import {Bolt,CopyPlus,Layers2,Files} from 'lucide-react'
import dash from "@/components/blocks/Dashboard.png"
import { Marquee } from "@/components/ui/marqueeText"
import archie from '@/images/archie.png'

export const ArchiePage=()=>{
    return(
        <div>
        <Navbar></Navbar>
          <HeroAgent
                  heading="Meet Your AI Agents"
                  description="Archie brings clarity to your HR data. From uncovering where candidates drop off to revealing which sources bring the best talent, it arms HR leaders with the insights they need to continuously refine and win the hiring game"
                  image={archie}
                  item={{
                    label: "Archie",
                    agents: [
                      { label: "Maxi", to: "/maxi", icon: <Bolt size={16} className="opacity-60" /> },
                      { label: "Prime HR", to: "/prime", icon: <CopyPlus size={16} className="opacity-60" /> },
                      { label: "Nova", to: "/nova", icon: <Layers2 size={16} className="opacity-60" /> },
                      { label: "Optimus", to: "/optimus", icon: <Files size={16} className="opacity-60" /> },
                      { label: "Onix", to: "/onix", icon: <Files size={16} className="opacity-60" /> },
                    ],
                  }}></HeroAgent>
                      <Marquee text='ARCHIE'></Marquee>
        <GradientHeadingDemo></GradientHeadingDemo>
        <Features></Features>
        <Footerdemo></Footerdemo>
        </div>
    )
}