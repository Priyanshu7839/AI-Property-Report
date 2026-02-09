import { Outlet } from "react-router";
import {Navigation} from '../DashboardComponents/Navigation'
import React from 'react'

const DashboardLayout = () => {
  return (
     <div className="flex h-screen bg-gray-50">
        <Navigation />
        <main className="flex-1 overflow-y-auto lg:mt-0 mt-[60px]">
         <Outlet/>
        </main>
      </div>
  )
}

export default DashboardLayout