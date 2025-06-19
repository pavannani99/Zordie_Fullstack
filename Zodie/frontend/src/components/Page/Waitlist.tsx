import { Fragment } from "react/jsx-runtime"
import WaitLanding from "../blocks/Waitlist"
import Navbar from "../ui/nav"
import { Footerdemo } from "@/demo/fs"

export const WaitlistPage=()=>{
    return(
        <Fragment>
             <Navbar/>
            <WaitLanding/>
            <Footerdemo/>
        </Fragment>
        
    )
}