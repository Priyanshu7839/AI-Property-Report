import { ArrowRight, Banknote, Bell, Building2, ChevronDown, Crown, DollarSign, HelpCircle, House, Landmark, Map, Menu, Network, Paperclip, Settings2, Shield, User, NotepadText, SquarePen, LogOut  } from 'lucide-react';
import React, { useState,useEffect,useRef } from 'react'
import { IoPulse } from "react-icons/io5";
import LIAMLOGO from '../assets/LIAMLOGO.png'
import { Settings } from '../components/AllAdminPortals/FinancialAdvisorPortal/pages/Settings';
import { useNavigate, useSearchParams } from 'react-router';
import { getCurrentUser } from '../../Apicall';
import { supabase } from '../Utils/Supabase';
import LIAMIcon from '../assets/LIAMIcon.png'
import { GoogleSignIn } from '@capawesome/capacitor-google-sign-in';



const LIAMNavbar = () => {


  const [sidebarOpen,setSidebarOpen] = useState(false)
  const sidebarRef = useRef(null);

  


  useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      sidebarOpen &&
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target)
    ) {
      setSidebarOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  document.addEventListener("touchstart", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
    document.removeEventListener("touchstart", handleClickOutside);
  };
}, [sidebarOpen]);

const logout = async () => {
  try {
    // Sign out from Supabase
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error);
      return;
    }

    // Sign out from Google
    await GoogleSignIn.signOut();

    // Clear local storage if you use it
    localStorage.removeItem("user");

    // Navigate to login
    navigate("/");
  } catch (err) {
    console.error(err);
  }
};

   const sidebaroptions = [
    {
      name:'Home',
      icon:<House/>,
       onClick: () =>
    navigate("/AskLIAM/Home"),
    },
    
    {
      name:'LIAM Daily Briefing',
      icon:<NotepadText/>,
       onClick: () =>
    navigate("/AskLIAM/LIAMConversation", {
      state: {
        intent: "daily_briefing",
      },
    }),

      
    },
    {
      name:'My Roadmaps',
      icon:<Map/>,
         onClick: () =>
    navigate("#"),

      
    },
    {
      name:'My Properties',
      icon:<Building2/>,
       onClick: () =>
    navigate("/ASKLIAM/MyProperties"),
    },
    {
      name:'LIAM Network',
      icon:<Network/>,
   
       onClick: () =>
    navigate("/ASKLIAM/LIAMNetwork"),
  
    },
    {
      name:'Notifications',
      icon:<Bell/>,
          onClick: () =>
    navigate("#"),

    },
    {
      name:'LIAM Pro',
      icon:<Crown/>,
      dropdown:true,
          onClick: () =>
    navigate("#"),

    },
    {
      
      name:'Logout',
      icon:<LogOut/>,
      onClick:logout
    }
   
    
  ]


  const [selectedSidebarOptions,setSelectedSidebarOptions] = useState('Home')

  const [showLiamProDropDown,setShowLiamProDropdown] = useState(false)
  const navigate = useNavigate()

  
     const [searchParams] = useSearchParams();

   const uuid = searchParams.get("uuid");


    const [userData, setUserData] = useState(null);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const {
  //         data: { user },
  //       } = await supabase.auth.getUser();

  //       if (!user) return;

  //       const response = await getCurrentUser(uuid);

  //       if (response.success) {
  //         setUserData(response.data);
  //         console.log(response.data);
  //       }
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   fetchUser();
  // }, []);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleNavigate = (route) => {
  if (window.location.pathname === route) {
    // Same route → refresh
    window.location.reload();
  } else {
    // Different route → navigate normally
    navigate('/AskLIAM/LIAMConversation',{
      state:{
        intent:'normal'
      }
    })
  }
};


 


  return (
    <div ref={sidebarRef} className = 'px-3 pt-10 pb-5 flex items-start justify-between h-[12vh] bg-[#FDFDFD]'>
       <Menu size={24}  onClick={() =>{ 
        
        setSidebarOpen(!sidebarOpen)

       
       }}/>
           <div className='text-center flex flex-col items-center px-3'>
             <p className='flex text-[46px]  font-bold leading-8 tracking-[0.15em]  w-[160px] flex items-center justify-center'>
             <img src={LIAMIcon} alt=""  className='w-[60%]'/>

            </p>


            <p className='text-[12px] flex flex-col gap-1 leading-snug tracking-wide mt-2 text-gray-600 font-medium'>
             
             AI REAL ESTATE ASSISTANT
            </p>
           </div>

             <div 
             onClick={()=>{
              handleNavigate('/AskLIAM/LIAMConversation')
             }}
             className="">
                         <SquarePen color='black' />
                      </div>


                        <aside
                              className={`
                                flex-shrink-0 flex flex-col justify-between border-r border-white/5
                                transition-all duration-300 overflow-x-hidden overflow-y-scroll absolute h-full z-99 top-0 left-0 bg-white  gap-[12px]
                                ${sidebarOpen ? "w-77 px-4 py-5" : "w-0"}
                              `}
                             
                            >
                              
                      
                            <div className='flex items-start flex-col justify-center w-full gap-4 '>
                                <div className="flex items-center justify-between w-full font-extrabold text-[24px]">
                                <h1>LIAM</h1>
                                <Menu onClick={()=>{setSidebarOpen(false)}}/>
                              </div>
                      
                              <div className="flex flex-col items-start gap-1 w-full">
                                {
                                  sidebaroptions?.map((item,i)=>{
                                    return(
                                     <div 
                                     key={i}
                                     onClick={()=>{
                                      item.onClick?.()
                                     if(!item.dropdown){ setSidebarOpen(false)}
                                     }}
                                     className={`w-full flex flex-col gap-2`}>
                                      <div className={`w-full px-4 flex rounded-[12px] py-3 items-center justify-between ${selectedSidebarOptions === item.name ?'bg-[#22C55E14] text-[#22C55E]':'text-[#6B7280] bg-white'}`}>
                                         <h1 
                                      
                                      className = {`   gap-3 w-full flex items-center justify-start  font-semibold text-[16px]`}>
                                        {item.icon}
                                        {item.name}</h1>
                                        
                                        {item.dropdown &&
                                        <div className='flex items-center justify-center gap-1'>
                                            <div className='py-1 px-2 bg-[#22C55E14] text-[#22C55E] text-[9px] font-semibold rounded-[6px] whitespace-nowrap'>Coming Soon</div>
                                           <ChevronDown onClick={()=>{setShowLiamProDropdown(!showLiamProDropDown)}} size={16}/>
                                        </div>
                                        }
                                      </div>
                      
                                     {(item.dropdown && showLiamProDropDown)&& <div className='py-3 px-5 flex flex-col gap-6 bg-[#22C55E14] rounded-md'>
                                           <div className='flex items-center justify-between'>
                                             <h1 className="font-semibold text-[14px] text-[#6B7280] flex items-center gap-1">
                                              <Landmark color='#22C55E' size={16}/>
                                              Mortgage Offers
                                            </h1>
                      
                                            <div className='py-1 px-2 text-[white] bg-[green] text-[9px] font-semibold rounded-[6px] whitespace-nowrap '>Coming Soon</div>
                                           </div>
                                            
                                           <div className='flex items-center justify-between'>
                                             <h1 className="font-semibold text-[14px] text-[#6B7280] flex items-center gap-1">
                                              <Banknote color='#22C55E' size={16}/>
                                             Sell Property
                                            </h1>
                      
                                            <div className='py-1 px-2 text-[white] bg-[green] text-[9px] font-semibold rounded-[6px] whitespace-nowrap '>Coming Soon</div>
                                           </div>
                                            
                                           <div className='flex items-center justify-between'>
                                             <h1 className="font-semibold text-[14px] text-[#6B7280] flex items-center gap-1">
                                              <Shield color='#22C55E' size={16}/>
                                              Insurance Offers
                                            </h1>
                      
                                            <div className='py-1 px-2 text-[white] bg-[green] text-[9px] font-semibold rounded-[6px] whitespace-nowrap '>Coming Soon</div>
                                           </div>
                                            
                                           <div className='flex items-center justify-between'>
                                             <h1 className="font-semibold text-[14px] text-[#6B7280] flex items-center gap-1">
                                              <DollarSign color='#22C55E' size={16}/>
                                              Refinance Options
                                            </h1>
                      
                                           <div className='py-1 px-2 text-[white] bg-[green] text-[9px] font-semibold rounded-[6px] whitespace-nowrap '>Coming Soon</div>
                                           </div>
                                            
                                      </div>}
                                     </div>
                                    )
                                  })
                                }
                      
                              </div>
                      
                              <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-5 rounded-[20px] flex flex-col items-start gap-3">
                      
                                <h1 className='font-bold text-[#1A1A1A] text-[15px]'>Unlock more with LIAM Pro</h1>
                      
                              <p className="text-[#6B7280] text-[13px]">Premium tools to finance, protect, refinance, promote and sell your properties.</p>
                      
                              <span className='text-[#22C55E] font-bold text-[13px] flex items-center gap-1' >Learn More <ArrowRight size={16}/></span>
                              </div>
                            </div>
                      
                            <div className="border-t border-[#F3F4F6] py-[30px]">
                                  <div className=' flex items-center gap-3'>
                      
                                    <div className='h-[44px] w-[44px] rounded-full bg-[#000] overflow-hidden'>
                                        <img src={user?.user_metadata?.picture} alt="" />
                                    </div>
                                   <div className='flex flex-col gap-[2px]'>
                                     <h1 className="text-[15px] text-[#1A1A1A] font-bold">{user?.user_metadata?.full_name}</h1>
                                    <p className="text-[12px] text-[#6B7280]">{user?.user_metadata?.email}</p>
                                   </div>
                                    </div>    
                            </div>
                      
                            </aside>

          
    </div>
  )
}

export default LIAMNavbar