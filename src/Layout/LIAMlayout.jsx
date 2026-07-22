import { Outlet } from "react-router";
import React from 'react'
import LIAMNavbar from "../LIAM/LIAMNavbar";

const LIAMlayout = () => {
  return (
     <div className="flex flex-col h-screen bg-[#fdfdfd]">
        <LIAMNavbar/>
        <main className=" flex-1 overflow-y-scroll lg:mt-0 h-full">
         <Outlet/>
        </main>
      </div>
  )
}

export default LIAMlayout