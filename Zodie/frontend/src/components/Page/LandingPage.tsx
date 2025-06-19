"use client"
import { AgentInfo } from '@/components/blocks/AgentsIntro'
import { HeroSection } from '@/components/blocks/hero-section-2'
import Home from '@/components/blocks/Page'

import { Footerdemo } from '@/demo/fs'
import Flow from '../blocks/Flow'
import HRAutomationSection from '../blocks/Analytics'
import Productivity from '../blocks/Productivity'
import { AnimatedTestimonialsWithParticles } from '../blocks/Testo'
import {FaqDemo} from '@/demo/faqdemo'
import ZordieFeatures from '../ui/ZordieFeatures'
import ZordieFeatures1 from '../ui/ZordieFeature1'
import { ContainerScroll } from '../ui/CS'
import ScrollAnimationDemo from '../ui/CSD'
import WaitLanding from '../blocks/Waitlist'
import PrimeFeature from '../blocks/PrimeFeatures'
import HRAgentsDashboard from '../blocks/Hragents'
export const LandingPage=()=>{
    return(
        <div className='relative bg-[radial-gradient(120%_120%_at_50%_100%,rgba(253,186,116,0.8)_0%,white_85%)]'>
        <HeroSection></HeroSection>
         <PrimeFeature/>
         <ZordieFeatures/>
         <ZordieFeatures1/>
        <Flow></Flow>
        <HRAgentsDashboard/>
        <Productivity></Productivity>
       <AnimatedTestimonialsWithParticles></AnimatedTestimonialsWithParticles>
        <FaqDemo></FaqDemo>
        <Footerdemo></Footerdemo>
        </div>
    )
}