"use-client"
import HeroAgent from "@/components/blocks/heroAgentPHR"

import { Marquee } from "@/components/ui/marqueeText"
import Navbar from "@/components/ui/nav"
import { HeroParallaxDemo } from "@/demo/agentHeroDemo"
import { FeaturesSectionWithHoverEffectsDemo } from "@/demo/FeatureDemo"
import { Footerdemo } from "@/demo/fs"
import { GradientHeadingDemo } from "@/demo/gradientHeadDemo"
import WhatsIncludedSection from "@/demo/WhatIncluded"
import dash from "@/components/blocks/Dashboard.png"
import prime from '@/images/prime.png'
import {Bolt,CopyPlus,Layers2,Files} from 'lucide-react'
import PrimeFeatures from "../Agents_Components/PrimeFt"
import IntegrationsSection from "../Agents_Components/Nodes"
import System from "../Agents_Components/system"
import Insights from "../Agents_Components/Insights"


export const PrimeHrPage=()=>{
    return(
        <div className="relative bg-[radial-gradient(120%_120%_at_50%_100%,rgba(253,186,116,0.8)_0%,white_85%)]">
        <Navbar></Navbar>
        {/* <HeroParallaxDemo></HeroParallaxDemo> */}
              <HeroAgent
                      heading="Meet Your AI Agents"
                      description="Prime is your AI-powered talent assessor. It benchmarks candidates across technical depth, cultural alignment, and potential—giving hiring teams a leaderboard of best-fit individuals through verified data and deep skill analysis."
                      image={prime}
                      item={{
                        label: "PrimeHR",
                        agents: [
                          { label: "Maxi", to: "/maxi", icon: <Bolt size={16} className="opacity-60" /> },
                          { label: "Nova", to: "/nova", icon: <CopyPlus size={16} className="opacity-60" /> },
                          { label: "Optimus", to: "/optimus", icon: <Layers2 size={16} className="opacity-60" /> },
                          { label: "Archie", to: "/archie", icon: <Files size={16} className="opacity-60" /> },
                          { label: "Onix", to: "/onix", icon: <Files size={16} className="opacity-60" /> },
                        ],
                      }}></HeroAgent>
        <Marquee text='PrimeHR'></Marquee>
        <PrimeFeatures/>
        <IntegrationsSection/>
        <Insights/>
        <System/>
        {/* <WhatsIncludedSection></WhatsIncludedSection> */}
        <Footerdemo></Footerdemo>
        </div>
    )
}