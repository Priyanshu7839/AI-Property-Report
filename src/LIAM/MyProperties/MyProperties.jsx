import React, { useEffect, useState } from 'react'
import LIAMNavbar from '../LIAMNavbar'
import { motion } from "framer-motion";
import { Bell, ChevronRight, Plus, Search } from 'lucide-react';
import ResidentialImg from '../../assets/ResidentialImg.png'
import VacantLandImg from '../../assets/VacantLandImg.png'
import CommercialImg from '../../assets/CommercialImg.png'
import MixedUseImg from '../../assets/MixedUseImg.png'
import { useNavigate } from 'react-router';
import { getProperty } from '../../../Apicall';
import { toast } from 'sonner';



const MyProperties = () => {

    const navigate = useNavigate()

    const propertyFilter = ['All','Residential','Commercial','Mixed','Vacant']

    const [propertyType,setpropertyType] = useState('All')
    const [NoPropertiesImg,setNoPropertiesImg] = useState(ResidentialImg)

    useEffect(()=>{
       if(propertyType === 'Residential'){
        setNoPropertiesImg(ResidentialImg)
       }
       if(propertyType === 'Commercial'){
        setNoPropertiesImg(CommercialImg)
       }
       if(propertyType === 'Mixed'){
        setNoPropertiesImg(MixedUseImg)
       }
       if(propertyType === 'Vacant'){
        setNoPropertiesImg(VacantLandImg)
       }
    },[propertyType])


    const [properties,setProperties] = useState([])
    const user = JSON.parse(localStorage.getItem("user"));

    
    const fetchProperty = async () => {
    try {
        const response = await getProperty(
            user?.id,
            propertyType
        );

        console.log(response.data);

        setProperties(response.data); // Assuming properties state

    } catch (err) {
        console.error(err);
        toast.error(err.message);
    }
};


useEffect(()=>{fetchProperty()},[propertyType,user?.id])

  return (
    <div className='h-[83vh] font-[Inter]'>
     

       <div className=' flex flex-col justify-between h-full'>
         <div className='flex flex-col gap-5 px-5'>

            <div className='w-full flex items-center justify-between gap-4'>
              {
                propertyFilter.map((item,i)=>{return(
                    <div 
                    key={i}
                    onClick={()=>{setpropertyType(item)}}
                    className={`w-full flex flex-col gap-2 text-[14px] text-center transition-all duration-300 ${item===propertyType ?'font-bold text-[#108548]':'pb-2 font-medium text-[#64748B]'}`}>
                        {item}

                     {item === propertyType &&   <motion.div 
                          initial={{ width: 0 }}
       animate={{ width: "100%" }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
                        className='w-full h-[2px] bg-[#108548]'></motion.div>}
                    </div>
                )})
              }

            </div>



            <div className='w-full relative'>

                <input type="text"
                placeholder='Search properties...'

                className='w-full border border-[#E2E8F0] py-3 pr-4 pl-13 rounded-[14px] placeholder:text-[#64748B] text-[14px] outline-none'
                />

                    <Search className='absolute top-[50%] translate-y-[-50%] left-5' color='#64748B'/>
            </div>


            {properties?.length !== 0 &&
                <div className='flex flex-col gap-4'>

                <div className='flex items-center justify-between'>
                    <h1 className='font-bold text-[#0F172A] text-[18px]'>{properties?.length} Properties</h1>

                    <h1
                    onClick={()=>{
                        navigate('/AskLIAM/AddProperty')
                    }}
                    className='flex items-center gap-1 text-[#108548] text-[14px] font-bold'><Plus size={16}/> Add Property</h1>

                </div>



           {properties?.map((property,i)=>{
            return(
 <div 
 key={i}
                  onClick={()=>{
                        navigate(`/AskLIAM/PropertyDetails?liamid=${property?.zpid}&add=${property?.property_name}`)
                    }}
                className='p-3 shadow-sm shadow-[#0000000A] border border-[#E2E8F0] bg-white flex rounded-[16px] gap-3 items-center justify-between'>

                  <div className='flex items-center gap-8'>
                      <div className='w-24 h-24 rounded-[12px] overflow-hidden bg-green-200 shrink-0'>
                            <img src={property?.property_image} alt="" className='w-full h-full object-cover' />
                    </div>


                    <div className='flex flex-col items-start justify-between gap-3'>

                        <div className='flex flex-col gap-[2px]'>
                            <h1 className='text-[#0F172A] font-bold text-[16px]'>{property?.property_name}</h1>
                            {/* <p className='text-[#64748B] text-[14px]'>Austin, TX 78704</p> */}
                        </div>

                        <div className='flex items-center gap-4 justify-between'>
                            <div className='flex flex-col gap-[2px]'>
                                <p className='text-[#64748B] font-semibold text-[11px]'>Value</p>
                                <h1 className='text-[#0F172A] text-[14px] font-bold'>${parseInt(property?.price).toLocaleString('en-us')}</h1>
                            </div>
                            <div className='flex flex-col gap-[2px]'>
                                <p className='text-[#64748B] font-semibold text-[11px]'>Type</p>
                                <h1 className='text-[#0F172A] text-[14px] font-bold'>{property?.propertyType}</h1>
                            </div>
                        </div>

                    </div>
                  </div>

                    <ChevronRight/>


                </div>
            )
           })    }

            </div>}
        </div>

        {properties?.length !== 0 &&
            
            <div className='bg-white border-t rounded-t-[32px] border-[#E2E8F0] p-6 flex flex-col gap-6  relative'>
              <div className='flex items-center justify-between gap-6'>

                    <div className='flex flex-col gap-2'>
                        <h1 className='text-[#64748B] font-semibold text-[13px]'>Total Portfolio Value</h1>
                        <p className='text-[#0F172A] text-[20px] font-bold'>$2,050,000</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-[#64748B] font-semibold text-[13px]'>Total Cash Flow / mo</h1>
                        <p className='text-[#108548] text-[20px] font-bold'>$3,650</p>
                    </div>

              </div>

              <div className='flex items-center justify-between gap-6'>
                 <div className='flex flex-col gap-2'>
                        <h1 className='text-[#64748B] font-semibold text-[13px]'>Deployable Equity</h1>
                        <p className='text-[#0F172A] text-[20px] font-bold'>$148,000</p>
                    </div>



                    <div 
                      onClick={()=>{
                        navigate('/AskLIAM/AddProperty')
                    }}
                    className='h-14 w-14 rounded-full bg-[#108548] shadow-sm shadow-[#1085484D] flex items-center justify-center'>

                        <Plus  strokeWidth={3} size={24} color='white'/>

                    </div>
              </div>
        </div>}



        {properties?.length === 0 && 
        <div className='flex flex-col gap-5 h-full px-5'>
            <div className='p-8 flex flex-col items-center justify-center gap-6'>

                    <div className='w-40 h-40'>
                            <img src={NoPropertiesImg} alt="" />
                    </div>


                <h1 className='text-[#111827] text-[20px] font-bold text-center'>No properties yet</h1>

                <p className='text-[15px] text-[#6B7280] text-center'>Add a property to start tracking its value, market trends, and get AI-powered insights.</p>

                <button 
                  onClick={()=>{
                        navigate('/AskLIAM/AddProperty')
                    }}
                className='py-[14px] px-8 flex items-center justify-center rounded-[12px] bg-[green] text-white text-[16px] font-bold'><Plus/> Add Property</button>

            </div>

            <div className='rounded-[16px] p-4 border border-[#47983B] bg-[#2D7A3A0D] flex items-center gap-4'>

                <div className='w-10 h-10 rounded-[10px] bg-white flex items-center justify-center'>
                    <Bell  size={16} color='#22C55E'/>
                </div>

                <div className='flex flex-col gap-[2px]'>
                    <h1 className='text-[#111827] text-[15px] font-bold capitalize'>Stay ahead of the market</h1>
                    <p className='text-[#6B7280] text-[13px]'>Set 24/7 alerts and get notified about price changes...</p>

                </div>

                <ChevronRight size={16} color='#6B7280'/>

            </div>
        </div>
        }
       </div>
    </div>
  )
}

export default MyProperties