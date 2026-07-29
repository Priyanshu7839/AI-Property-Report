import React from 'react'
import RoadmapsImg from '../../assets/RoadmapsImg.png'
import { CheckCircle, CircleCheck } from 'lucide-react'
const MyRoadmaps = () => {
  return (
    <div className=" bg-[#FDFDFD] h-[85vh] flex flex-col gap-4 justify-between">
       <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-1  px-5'>
         <h1 className= 'text-[24px] sm:text-[41px] font-bold'>Build A Rental Portfolio</h1>
        <div className='py-1 px-2 bg-[#22C55E14] text-[#22C55E] font-medium text-[12px] w-fit rounded-[8px]'>
            In Progress

        </div>
       </div>

        <img src={RoadmapsImg} alt="" />

          <div className='px-5 flex flex-col gap-5'>

             <p className="text-[#6B7280] text-[13px] font-medium">Acquire and optimize rental properties in high-growth
markets to build a $5M portfolio that generates
long-term cash flow and equity.</p>



            <div className='pb-3  border-b border-[#cfcfd7] flex items-center justify-between'>

                <div className='flex flex-col items-center justify-center  border-r border-[#cfcfd7] w-full'>
                    <p className='text-[11px] text-[#6b7280]'>
                        Target Portfolio Value
                    </p>
                    <h1 className='text-[20px] font-bold'>$5,000,000</h1>
                </div>
                <div className='flex flex-col items-center justify-center  border-r border-[#cfcfd7] w-full'>
                    <p className='text-[11px] text-[#6b7280]'>
                        Target Cashflow Value
                    </p>
                    <h1 className='text-[20px] font-bold'>$10,000/mo</h1>
                </div>
                <div className='flex flex-col items-center justify-center   w-full'>
                    <p className='text-[11px] text-[#6b7280]'>
                        Timeline
                    </p>
                    <h1 className='text-[20px] font-bold'>36Months</h1>
                </div>

            </div>


            <div className='flex flex-col gap-5'>
                <div className='font-black font-bold text-[16px]'>
                    Milestones
                </div>


                <div className='flex flex-col gap-4'>
                   <div className='flex items-center gap-3'>
                    <CircleCheck size={32} color='white' fill='green'/>
                     <div>
                        <h1 className='text-[14px] font-bold text-black'>Define Investment Criteria</h1>
                        <p className='text-[#1fae3e] flex items-center justify-start gap-2 text-[13px] font-medium'>Completed <div className='shrink-0 w-2 h-2 rounded-full bg-[#1fae3e]'></div>
                        <h1 className='text-[#6B7280]'>May,1 2025</h1>
                        </p>
                    </div>
                   </div>
                   <div className='flex items-center gap-3'>
                    <CircleCheck size={32} color='white' fill='green'/>
                     <div>
                        <h1 className='text-[14px] font-bold text-black'>Define Investment Criteria</h1>
                        <p className='text-[#1fae3e] flex items-center justify-start gap-2 text-[13px] font-medium'>Completed <div className='shrink-0 w-2 h-2 rounded-full bg-[#1fae3e]'></div>
                        <h1 className='text-[#6B7280]'>May,1 2025</h1>
                        </p>
                    </div>
                   </div>
                   <div className='flex items-center gap-3'>
                    <CircleCheck size={32} color='white' fill='green'/>
                     <div>
                        <h1 className='text-[14px] font-bold text-black'>Define Investment Criteria</h1>
                        <p className='text-[#1fae3e] flex items-center justify-start gap-2 text-[13px] font-medium'>Completed <div className='shrink-0 w-2 h-2 rounded-full bg-[#1fae3e]'></div>
                        <h1 className='text-[#6B7280]'>May,1 2025</h1>
                        </p>
                    </div>
                   </div>
                </div>
            </div>


            

          </div>

       </div>
          <div className='w-full px-5'>
             <button
             
              className="px-5 py-3 bg-[green] font-semibold text-[16px] text-[#FFFFFF] w-full rounded-[12px]"
            >
            Add Property
            </button>
          </div>

    </div>
  )
}

export default MyRoadmaps