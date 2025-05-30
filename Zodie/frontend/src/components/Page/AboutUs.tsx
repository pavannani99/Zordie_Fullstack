"use client"
import { Fragment } from 'react/jsx-runtime'
import Navbar from '../ui/nav'
import { Footerdemo } from '@/demo/fs'
import { About } from '../ui/about-3'
export const AboutUs=()=>{
    return(
      <Fragment>
        <Navbar></Navbar>
        <About></About>
        <Footerdemo></Footerdemo>
      </Fragment>
    )
}