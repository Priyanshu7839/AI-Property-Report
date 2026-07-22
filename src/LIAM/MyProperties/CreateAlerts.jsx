import React, { useState } from 'react'
import LIAMNavbar from '../LIAMNavbar'
import { ArrowRight, Bell, ChartBar, Check, DollarSign, House, ShieldCheck, Sparkles, TrendingDown, TrendingUp } from 'lucide-react'
import liamWatchimg from '../../assets/liamWatchimg.png'
import { useNavigate } from 'react-router'

const CreateAlerts = () => {
const navigate = useNavigate()


  const [alertTypes,setAlertTypes] =useState([
    {
      icon:<TrendingUp color='#16A34A'/>,
      name:'Property Value Increases',
      desc:'Notify me when the estimated value increases',
      options:'10% or more',
      bg:'#16A34A15',
      text:'#16A34A',
      set:true
    },
    {
      icon:<TrendingDown color='#DC2626'/>,
      name:'Property Value Descreases',
      desc:'Notify me when the estimated value decreases',
      options:'5% or more',
       bg:'#DC262615',
      text:'#DC2626',
       set:true
    },
    {
      icon:<DollarSign color='#7C3AED'/>,
      name:'New Comparable Sale',
      desc:'Notify me when new comparable sales are available nearby',
      options:'Within 0.5 miles',
       bg:'#7C3AED15',
      text:'#7C3AED',
       set:true
    },
    {
      icon:<ChartBar color='#0EA5E9'/>,
      name:'Market Trend Change',
      desc:'Notify me when LIAM detects a significant market trend change',
      options:'Major changes',
       bg:'#0EA5E915',
      text:'#0EA5E9',
       set:true
    },
    {
      icon:<ShieldCheck color='#EAB308'/>,
      name:'Neighborhood Update',
      desc:'Notify me about important neighborhood updates and developments',
      options:'All updates',
       bg:'#EAB30815',
      text:'#EAB308',
       set:false
    },
  ])

  const toggleAlert = (index) => {
  setAlertTypes((prev) =>
    prev.map((item, i) =>
      i === index
        ? { ...item, set: !item.set }
        : item
    )
  );
};

  const [submitted,setsubmitted] = useState(false)


  return (
    <div>
       
{!submitted &&
        <div className='px-5 flex flex-col gap-5 pb-10 font-[Inter]'>
                <div className='flex flex-col gap-[6px] '>
                    <h1 className='text-[24px] font-bold text-[#000000]'>Create Alert</h1>
                    <p className='text-[#71717A] text-[14px]'>Get notified about important changes to your property</p>
                </div>


                <div className='flex flex-col gap-3'>

                 {
                  alertTypes.map((alert,i)=>{
                    return(
                         <div 
                         key={i}
                         onClick={()=>{toggleAlert(i)}}
                         className='p-4 rounded-[16px] border border-[#F1F1F1] bg-white flex gap-4'>
                        <div
                        style={{backgroundColor:alert.bg}}
                        className='w-10 h-10 rounded-full  flex items-center justify-center shrink-0'>{alert.icon}</div>

                        <div className='w-full flex flex-col gap-[4px]'>
                          <div className='w-full flex items-center justify-between'>
                            <h1 className='text-[15px] text-[#000000] font-bold'>{alert.name}</h1>
                            <div className={`h-5 w-9 rounded-[10px] p-[2px]  flex items-center ${alert.set ?'justify-end bg-[#3F912F]':'jusify-start bg-[#cfcfd7]'}`}>
                                        <div className='w-4 h-4 rounded-full bg-white '></div>
                            </div>
                          </div>

                          <div className='w-full flex items-center justify-between gap-3'>
                            <p className='text-[#71717A] text-[13px]'>{alert.desc}</p>

                            <div className='whitespace-nowrap border border-[#E4E4E7] px-[10px] py-[6px] text-[#18181B] text-[11px] font-bold w-fit rounded-[6px]'>

                              {alert.options}

                            </div>
                          </div>
                        </div>

                    </div>
                    )
                  })
                 }
                </div>

                <div className='rounded-[16px] p-4 flex items-start gap-4 border border-[#3F912F] bg-[#2D7A3A0D]'>
                  <div className='w-10 h-10 bg-white rounded-[10px] shrink-0 flex items-center justify-center'>
                    <Sparkles color='#47983B'/>
                  </div>
                 <div className='flex flex-col items-start gap-[6px]'>
                   <h1 className='text-[#111827] text-[14px] font-bold'>How LIAM Watch Works</h1>
                   <p className='text-[#6B7280] text-[12px] capitalize'>LIAM monitors your property and market 24/7 using AI and will notify you instantly when these events occur.</p>
                 </div>

                </div>

                <div className='flex flex-col gap-4'>

                    <button 
                    onClick={()=>{setsubmitted(true)}}
                    className='p-4 w-full bg-[#2D8A21]  text-white flex items-center justify-center gap-[10px] rounded-[12px] text-[17px] font-semibold'><Bell/> Activate Liam Watch</button>

                    <button className='w-full text-[#16A34A] text-[15px] font-semibold'> Cancel</button>
                </div>
        </div>}



{submitted &&
        <div className='px-5 flex flex-col gap-8'>
                 <div className='flex items-center justify-center'>
                   
                    <div className='w-20 h-20 bg-[#DCFCE7] rounded-full flex items-center justify-center relative'>
                      <House color='#2D8A21' size={32}/>
                        <div className='h-8 w-8 rounded-full border-2 border-white bg-[#2D8A21] flex items-center justify-center absolute bottom-2 -right-3'><Check size={16} strokeWidth={3} color='white'/></div>
                    </div>
                 </div>

                 <div className='flex flex-col gap-4 items-center justify-center'>
                  <h1 className='text-[#111827] text-[24px] font-bold'>LIAM Watch is <span className='text-[#1fae3e]'>Active!</span></h1>
                  <p className='text-[#6B7280] text-[15px] text-center'>LIAM is now monitoring your property 24/7 and will notify you instantly about important updates.</p>
                 </div>


                 <div className='flex flex-col gap-4'>
                  <h1 className='text-[#111827] font-bold text-[13px]'>You'll be notified of:</h1>

                  <div className='flex flex-col gap-1'>
                    {
                      alertTypes.filter((item)=>item.set === true).map((alert,i)=>{
                        return(
                          <div 
                          key={i}
                          className='py-[10px] flex items-center justify-between'>
                      <div className='flex items-center gap-3'>
                        <div
                        style={{backgroundColor:alert.bg}}
                        className='w-9 h-9 rounded-[10px]  flex items-center justify-center shrink-0'>{alert.icon}</div>

                        <h1 className='text-[15px] text-[#111827] font-medium'>{alert.name}</h1>
                      </div>

                      <div className='h-6 w-6 rounded-full bg-[#DCFCE7] flex items-center justify-center'><Check size={16} strokeWidth={3} color='#2D8A21'/></div>
                    </div>
                        )
                      })
                    }

                  </div>

                  <p className='text-[13px] text-[#6B7280] text-center'>You will receive push, email, and in-app alerts.</p>
                 </div>

                    <button 
                    onClick={()=>{
                      navigate('/AskLIAM/LIAMConversation')
                    }}
                    className='p-4 w-full bg-[#2D8A21] text-white flex items-center justify-center gap-[10px] rounded-[12px] text-[17px] font-semibold'><Bell/> Great Got It<ArrowRight/></button>


        </div>}


    </div>
  )
}

export default CreateAlerts