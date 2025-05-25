"use-client"
import { Features } from "@/components/blocks/features-11"
import HeroAgent from "@/components/blocks/heroAgentPHR"
import Navbar from "@/components/ui/nav"
import { Footerdemo } from "@/demo/fs"
import { GradientHeadingDemo } from "@/demo/gradientHeadDemo"
import { Marquee } from "@/components/ui/marqueeText"
import dash from "@/components/blocks/Dashboard.png"
import {Bolt,CopyPlus,Layers2,Files} from 'lucide-react'
import onix from '@/images/onix.png'

export const OnixPage=()=>{
    return(
        <div>
        <Navbar></Navbar>
         <HeroAgent
          heading="Meet Your AI Agents"
          description="Onix safeguards your hiring process with ethical intelligence. It identifies bias, flags non-compliance, and verifies identities—helping you stay legally aligned and ethically strong in every recruitment decision."
          image={onix}
          item={{
            label: "Onix",
            agents: [
              { label: "Maxi", to: "/maxi", icon: <Bolt size={16} className="opacity-60" /> },
              { label: "Prime HR", to: "/prime", icon: <CopyPlus size={16} className="opacity-60" /> },
              { label: "Optimus", to: "/optimus", icon: <Layers2 size={16} className="opacity-60" /> },
              { label: "Archie", to: "/archie", icon: <Files size={16} className="opacity-60" /> },
              { label: "Nova", to: "/nova", icon: <Files size={16} className="opacity-60" /> },
            ],
          }}></HeroAgent>
              <Marquee text='ONIX'></Marquee>
        <GradientHeadingDemo></GradientHeadingDemo>
        <Features></Features>
        <Footerdemo></Footerdemo>
        </div>
    )
}