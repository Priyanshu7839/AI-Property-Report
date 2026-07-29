import { Outlet } from "react-router";
import React from 'react'
import LIAMNavbar from "../LIAM/LIAMNavbar";

const LIAMlayout = () => {
  return (
     <div className='flex items-center justify-center'>
      <div className="flex flex-col h-screen bg-[#fdfdfd] max-w-[430px]">
          <LIAMNavbar/>
        <main className=" flex-1 overflow-y-scroll lg:mt-0 h-full">
         <Outlet/>
        </main>
      </div>
      </div>
  )
}

export default LIAMlayout