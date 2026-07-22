import React, { useEffect, useState } from 'react'
import LIAMNavbar from '../LIAMNavbar'
import { Armchair, Bell, Building2, Car, CircleParking, FileText, Heart, Heater, Layers, MapPin, RefreshCcw, TrendingUp, Warehouse } from 'lucide-react';
import { FaToolbox } from 'react-icons/fa';
import { useNavigate, useSearchParams } from 'react-router';
import axios from 'axios';

const PropertyDetails = () => {

  const navigate = useNavigate()
   const [searchParams] = useSearchParams();

   const liamid = searchParams.get("liamid");
   const add = searchParams.get('add')

     const [homesData,setHomesData] = useState('')

    const fetchPropertiesDetails = async () => {
        try {
         const response = await axios.get(
           `https://zhomes-realty-us.p.rapidapi.com/properties/details?zpid=${liamid}`,
           {
             headers: {
               "X-RapidAPI-Key":
                 "a48bfbafb3msh42b1f23858b4dd2p127af3jsne5dc6836da5a",
               "X-RapidAPI-Host": "zhomes-realty-us.p.rapidapi.com",
             },
           },
         );


         if (response.data.message === "Successful") {
           setHomesData(response.data.data)
           console.log(response.data.data)
         }
       } catch (error) {
         console.log(error);
       }
     }



     useEffect(()=>{
      fetchPropertiesDetails()
     },[liamid])



  return (
    <div>

        <div className='px-5 font-[Inter]'>
               <div>

                               {/* -------------------------------------------------------- */}

                                <div className="relative h-54 bg-gray-100 border border-gray-100 rounded-2xl overflow-hidden mb-2">
                                  <img
                                    src={homesData?.photoUrlsHighRes?.[0]?.url}
                                    alt={"xdcdfdfd"}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                  <div className="absolute top-3 left-3 bg-black  backdrop-blur-sm text-xs font-semibold px-2.5 py-1 rounded-full text-white">
                                    # {1} Match
                                  </div>
                                  <button
                                    // onClick={() => setSaved(!saved)}
                                    className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all  text-white" `}
                                  >
                                    <Heart size={14} fill="none" />
                                  </button>
                                </div>
                               {/* -------------------------------------------------------- */}

            
                                <div className=" text-[#18181B] border-[0.5px] border-[#cfcfd7] mb-5 px-5 py-3 rounded-2xl flex  gap-2 items-center justify-between">
                                  <div className="flex flex-col gap-2 items-start justify-between ">
                                    <p className="font-semibold text-xl leading-tight capitalize">
                                      {add}
                                    </p>
                                    <p className="text-md text-[#71717A] flex items-center gap-1">
                                      <MapPin size={16} /> Houston, TX
                                    </p>
            
                                    <div className="flex items-center gap-2">
                                      <div className="text-[#71717A] text-xs font-medium border-[1px] border-[#e4e4e7] py-[2px] px-2 rounded-md">
                                         {homesData?.resoFacts?.homeType}
                                      </div>
                                      <div className="text-[#71717A] text-xs font-medium border-[1px] border-[#e4e4e7] py-[2px] px-2 rounded-md">
                                        Built In {homesData?.resoFacts?.yearBuilt}
                                      </div>
                                    </div>
                                  </div>
            
                                  <div className="p-4 text-[#1fae3e] flex flex-col items-center justify-center  bg-[#10B9811A] rounded-xl">
                                    <p className="text-[10px] text-black font-bold ">
                                      LIAM SCORE
                                    </p>
                                    <h1 className="text-[28px] font-extrabold leading-tight ">
                                      93
                                    </h1>
                                    <p className="text-[10px] font-bold ">Excellent</p>
                                  </div>
                                </div>
            
                               {/* -------------------------------------------------------- */}

                                <div className="px-5 py-3 bg-black text-[#1fae3e] rounded-2xl flex gap-2 items-center justify-between mb-5">
                                  <h1 className="flex items-center justify-center flex-col border-r-[0.5px] border-[#cfcfd7] w-full">
                                    <p className="text-gray-100 text-sm">Price</p>
                                    <p className="font-bold">
                                      $
                                      {Number(homesData?.price).toLocaleString(
                                        "en-us",
                                      )}
                                    </p>
                                  </h1>
                                  <h1 className="flex items-center justify-center flex-col border-r-[0.5px] border-[#cfcfd7] w-full">
                                    <p className="text-gray-100 text-sm">Price/Sq.Ft.</p>
                                    <p className="font-bold capitalize">
                                      $
                                       {Number(
                            homesData?.resoFacts?.pricePerSquareFoot,
                          ).toLocaleString("en-us")}
                                    </p>
                                  </h1>
                                  <h1 className="flex items-center justify-center flex-col  w-full">
                                    <p className="text-gray-100 text-sm">Est. Rent</p>
                                    <p className="font-bold capitalize">
                                     $0
                                    </p>
                                  </h1>
                                </div>
                               {/* -------------------------------------------------------- */}
            
                                <div className="px-2 py-3 border border-[#E2E8F0] bg-[#2d7a3a08]  text-[#1fae3e] rounded-2xl grid grid-cols-3 gap-3 items-center justify-between mb-5">
                                  <div className="flex flex-col items-center gap-[2px]">
                                    <div className="p-3 bg-[white] rounded-[10px] text-[#1fae3e] shadow-sm shadow-[#0000000D]">
                                      <Building2 size={20} />
                                    </div>
            
                                    <p className="text-[10px] text-[#71717A]">HOA Fee</p>
            
                                    <h1 className="text-[#111827] text-[13px] font-bold">
                                        $ {homesData?.hoaFee}
                                    </h1>
                                  </div>
                                  <div className="flex flex-col items-center gap-[2px]">
                                    <div className="p-3 bg-[white] rounded-[10px] text-[#1fae3e] shadow-sm shadow-[#0000000D]">
                                      <Armchair size={20} />
                                    </div>
            
                                    <p className="text-[10px] text-[#71717A]">Furnished</p>
            
                                    <h1 className="text-[#111827] text-[13px] font-bold">
                                     {homesData?.resoFacts?.furnished ? "Yes" : "No"}
                                    </h1>
                                  </div>
            
                                  <div className="flex flex-col items-center gap-[2px]">
                                    <div
                                      div
                                      className="p-3 bg-[white] rounded-[10px] text-[#1fae3e] shadow-sm shadow-[#0000000D]"
                                    >
                                      <Warehouse size={20} />
                                    </div>
            
                                    <p className="text-[10px] text-[#71717A]">
                                      Garage Attached
                                    </p>
            
                                    <h1 className="text-[#111827] text-[13px] font-bold">
                                      {homesData?.resoFacts?.hasAttachedGarage
                            ? "Yes"
                            : "NO"}
                                    </h1>
                                  </div>
                                  <div className="flex flex-col items-center gap-[2px]">
                                    <div className="p-3 bg-[white] rounded-[10px] text-[#1fae3e] shadow-sm shadow-[#0000000D]">
                                      <CircleParking size={20} />
                                    </div>
                                    <p className="text-[10px] text-[#71717A]">
                                      Open Parking
                                    </p>
            
                                    <h1 className="text-[#111827] text-[13px] font-bold">
                                      {homesData?.resoFacts?.hasOpenParking ? "Yes" : "NO"}
                                    </h1>
                                  </div>
                                  <div className="flex flex-col items-center gap-[2px]">
                                    <div
                                      div
                                      className="p-3 bg-[white] rounded-[10px] text-[#1fae3e] shadow-sm shadow-[#0000000D]"
                                    >
                                      <Heater size={20} />
                                    </div>
            
                                    <p className="text-[10px] text-[#71717A]">Heating</p>
            
                                    <h1 className="text-[#111827] text-[13px] font-bold">
                                     {homesData?.resoFacts?.heating?.length > 0
                            ? homesData?.resoFacts?.heating?.[0]
                            : "NO"}
                                    </h1>
                                  </div>
                                  <div className="flex flex-col items-center gap-[2px]">
                                    <div className="p-3 bg-[white] rounded-[10px] text-[#1fae3e] shadow-sm shadow-[#0000000D]">
                                      <Car size={20} />
                                    </div>
            
                                    <p className="text-[10px] text-[#71717A]">
                                      Parking Features
                                    </p>
            
                                    <h1 className="text-[#111827] text-[13px] font-bold whitespace-nowrap">
                                    {homesData?.resoFacts?.parkingFeatures?.length > 0
                            ? homesData?.resoFacts?.parkingFeatures?.[0]
                            : "NO"}
                                    </h1>
                                  </div>
                                </div>
                               {/* -------------------------------------------------------- */}
            
                               <div className='flex flex-col gap-4 mb-5'>
                                <h1 className='text-[#0F172A] font-bold text-[18px]'>Quick Actions</h1>

                                <div 
                                onClick={()=>{
                                  navigate('/AskLIAM/CreateAlerts')
                                }}
                                className='rounded-[16px] border border-[#E2E8F0] bg-[#2D7A3A0D] p-4 flex flex-col gap-3'>

                                    <div className='w-10 h-10 rounded-[10px] bg-[#fff] flex items-center justify-center shadow-sm shadow-[#0000000D]'>
                                        <Bell color='#1fae3e'/>

                                    </div>

                                    <h1 className='text-[#0F172A] font-bold text-[15px]'>Create Alert</h1>

                                    <p className='text-[#6B7280] text-[12px]'>Set up 24/7 price & market alerts</p>

                                </div>

                               </div>

                               {/* -------------------------------------------------------- */}
                               <div className='flex flex-col gap-4'>
                                <h1 className='text-[#0F172A] font-bold text-[18px]'>Coming Soon</h1>


                                <div className='flex items-center justify-between gap-4 border-b border-[#E2E8F0] py-4'>

                                   <div className='flex items-center gap-5'>
                                     <div className='bg-[#22C55E15] h-9 w-9 flex items-center justify-center rounded-[10px]'>
                                          <Layers color='#2D8A21'/>
                                     </div>

                                    <div className='flex flex-col gap-[2px]'>
                                        <h1 className='text-[#0F172A] text-[15px] font-semibold'>Portfolio Tracking</h1>
                                        <p className='text-[13px] text-[#64748B]'>Monitor all your properties in one place</p>
                                    </div>
                                   </div>

                                    <div className='px-2 py-1 bg-[#22C55E15] rounded-[6px] text-[#22C55E] text-[11px] font-bold'>
                                        Soon
                                    </div>

                                </div>
                                {/* ========================================== */}
                                <div className='flex items-center justify-between gap-4 border-b border-[#E2E8F0] py-4'>

                                    <div className='flex items-center gap-5'>
                                      
                                      <div className='bg-[#0EA5E915] h-9 w-9 flex items-center justify-center rounded-[10px]'>

                                              <RefreshCcw color='#0EA5E9'/>


                                      </div>

                                    <div className='flex flex-col gap-[2px]'>
                                        <h1 className='text-[#0F172A] text-[15px] font-semibold'>Refinancing Insights</h1>
                                        <p className='text-[13px] text-[#64748B]'>When to lock in a better rate</p>
                                    </div>
                                    </div>

                                   <div className='px-2 py-1 bg-[#22C55E15] rounded-[6px] text-[#22C55E] text-[11px] font-bold'>
                                        Soon
                                    </div>

                                </div>
                                {/* ========================================== */}
                                <div className='flex items-center justify-between gap-4 border-b border-[#E2E8F0] py-4'>

                                   <div className='flex items-center gap-5'>
                                     <div className='bg-[#7C3AED15] h-9 w-9 flex items-center justify-center rounded-[10px]'>

                                              <FileText color='#7C3AED'/>


                                      </div>

                                    <div className='flex flex-col gap-[2px]'>
                                        <h1 className='text-[#0F172A] text-[15px] font-semibold'>Tax Optimization</h1>
                                        <p className='text-[13px] text-[#64748B]'>Maximize your real estate deductions</p>
                                    </div>

                                   </div>
                                    <div className='px-2 py-1 bg-[#22C55E15] rounded-[6px] text-[#22C55E] text-[11px] font-bold'>
                                        Soon
                                    </div>

                                </div>
                                {/* ========================================== */}
                                <div className='flex items-center justify-between gap-4 border-b border-[#E2E8F0] py-4'>

                                   <div className="flex items-center gap-5">
                                      <div className='bg-[#EAB30815] h-9 w-9 flex items-center justify-center rounded-[10px]'>

                                              <TrendingUp color='#EAB308'/>


                                      </div>

                                    <div className='flex flex-col gap-[2px]'>
                                        <h1 className='text-[#0F172A] text-[15px] font-semibold'>Equity Analysis</h1>
                                        <p className='text-[13px] text-[#64748B]'>Unlock borrowing power for new deals</p>
                                    </div>
                                   </div>

                                    <div className='px-2 py-1 bg-[#22C55E15] rounded-[6px] text-[#22C55E] text-[11px] font-bold'>
                                        Soon
                                    </div>

                                </div>
                                {/* ========================================== */}
                                <div className='flex items-center justify-between gap-4 border-b border-[#E2E8F0] py-4'>

                                    <div className='flex items-center gap-5'>
                                        <div className='bg-[#3B82F615] h-9 w-9 flex items-center justify-center rounded-[10px]'>

                                              <FaToolbox color='#3B82F6'/>


                                      </div>


                                    <div className='flex flex-col gap-[2px]'>
                                        <h1 className='text-[#0F172A] text-[15px] font-semibold'>Renovation ROI</h1>
                                        <p className='text-[13px] text-[#64748B]'>Estimate value add for home improvements</p>
                                    </div>
                                    </div>

                                   <div className='px-2 py-1 bg-[#22C55E15] rounded-[6px] text-[#22C55E] text-[11px] font-bold'>
                                        Soon
                                    </div>

                                </div>
                                {/* ========================================== */}

                               

                               </div>
                               {/* -------------------------------------------------------- */}

                              </div>
        </div>
    </div>
  )
}

export default PropertyDetails