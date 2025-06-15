"use client"
import { AgentInfo } from '@/components/blocks/AgentsIntro'
import { HeroSection } from '@/components/blocks/hero-section-2'
import Home from '@/components/blocks/Page'
import { Faq3Demo } from '@/demo/faqdemo'
import { Footerdemo } from '@/demo/fs'
import Flow from '../blocks/Flow'
import HRAutomationSection from '../blocks/Analytics'
import Productivity from '../blocks/Productivity'
export const LandingPage=()=>{
    return(
        <div className='relative bg-[radial-gradient(120%_120%_at_50%_100%,rgba(253,186,116,0.8)_0%,white_85%)]'>
        <HeroSection></HeroSection>
         <HRAutomationSection></HRAutomationSection>
        <Flow></Flow>
        <Productivity></Productivity>
       
        {/* <AgentInfo></AgentInfo> */}
        {/* <Home></Home> */}
        <Faq3Demo></Faq3Demo>
        <Footerdemo></Footerdemo>
        </div>
    )
}