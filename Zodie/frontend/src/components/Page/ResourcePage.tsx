"use client"
import { Fragment } from 'react/jsx-runtime'
import Navbar from '../ui/nav'
import { Footerdemo } from '@/demo/fs'
import { About } from '../ui/about-3'
import ResourcePage from '../ui/resource'
export const Resource=()=>{
    return(
      <Fragment>
        <Navbar></Navbar>
        <ResourcePage/>
        <Footerdemo></Footerdemo>
      </Fragment>
    )
}