import axios from 'axios'
import { ChevronRight, Edit, Lightbulb, Search, ShieldCheck } from 'lucide-react'
import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { createProperty } from '../../../Apicall'

const AddProperty = () => {

    const navigate = useNavigate()


    const [address,setaddress] = useState('')
    const [loading,setLoading] = useState(false)
    const [adding,setAdding] = useState(false)
const user = JSON.parse(localStorage.getItem("user"));

    const handlePropertySubmit = async () => {
    setAdding(true)
    try {
        const response = await createProperty(
            user?.id,              // Logged in user's id
            'Residential',      // Residential, Commercial, Mixed Use, Land/Vacant Land
            formData                   // Your state object
        );

        console.log(response);

        toast.success(response.message);
        navigate('/AskLIAM/MyProperties')

    } catch (err) {
        console.error(err);
        toast.error(err.message);
    }
    finally{
        setAdding(false)
    }


};


const ResidentialFormData = {
  propertyName: "",
  streetAddress: "",
  unit: "",

  city: "",
  state: "",
  zip: "",

  country: "",
  county: "",
  formattedAddress: "",

  latitude: "",
  longitude: "",
  parcelNumber: "",

  apn: "",
  legalDescription: "",
  zoning: "",

  bedrooms: "",
  bathrooms: "",
  halfBathrooms: "",

  garageSpaces: "",
  livingAreaSqFt: "",
  lotSizeSqFt: "",

  yearBuilt: "",
  roofType: "",
  roofAge: "",

  flooringType: "",
  foundationType: "",
  hvacType: "",
  pool:"",
  hoa:"",
  propertyImage:'',
  zpid:''
};


const [formData,setformData] = useState(ResidentialFormData)


    const handleSubmit = async()=>{
       
        setLoading(true);
    
    
        if(address===''){
         
         
        setLoading(false)
    
          return;
        }
        else{

          setaddress('')
      

            
    
            try {
              const response = await axios.get(`https://zhomes-realty-us.p.rapidapi.com/properties/search-address?address=${address}`,{
                headers:{
                'X-RapidAPI-Key': '74acf598b5mshcc28ec4748a1da0p133d5ejsn7d64e21a0d27',
                'X-RapidAPI-Host': 'zhomes-realty-us.p.rapidapi.com'
              }
              })
    
            
    
              if(response.data.message==='Successful'){
                const data= response?.data
             
                setaddress('')
                const property = response?.data?.data

               
             setformData({
  propertyName: address,
  streetAddress: property?.streetAddress || "",
  unit: "",

  city: property?.address?.city || "",
  state: property?.address?.state || "",
  zip: property?.address?.zipcode || "",

  country: property?.address?.country || "",
  county: property?.county || "",
  formattedAddress: property?.formattedAddress || "",

  latitude: property?.latitude || "",
  longitude: property?.longitude || "",
  parcelNumber: property?.parcelNumber || "",

  apn: property?.apn || "",
  legalDescription: property?.legalDescription || "",
  zoning: property?.zoning || "",

  bedrooms: property?.bedrooms || "",
  bathrooms: property?.bathrooms || "",
  halfBathrooms: property?.halfBathrooms || "",

  garageSpaces: property?.resoFacts?.parkingCapacity || "",
  livingAreaSqFt: parseInt(property?.livingAreaValue || ""),
  lotSizeSqFt: parseInt(property?.lotAreaValue || ""),

  yearBuilt: property?.resoFacts?.yearBuilt || "",
  roofType: "",
  roofAge: "",

  flooringType: property?.resoFacts?.flooring?.[0] || "",
  foundationType: "",
  hvacType: property?.resoFacts?.heating?.[0] || "",

  pool: property?.resoFacts?.hasPrivatePool ?? "",
  hoa: property?.monthlyHoaFee || "",
  propertyImage:property?.photoUrlsHighRes?.[0]?.url,
  zpid:property?.zpid,
  price:property?.price
});
                
              }
    
            } catch (error) {
              console.log(error)
              
              if(error?.response?.data?.errors?.address==='The input is not a detailed address'){
              
                setaddress('')
              
                 
    
              }
            }
           
        }
    
        setLoading(false)
      }

      useEffect(()=>{
       if(formData.propertyName !== ''){
        handlePropertySubmit()
       }
      },[formData])


      

      

  return (
    <div className='flex flex-col p-5 gap-5 font-[Inter] h-[85vh] '>

        <div className='flex flex-col gap-3'>
            <h1 className='text-[#0F172A] text-[28px] font-extrabold'>Add Property</h1>

            <p className='text-[#64748B] text-[15px]'>Start by adding a property to track its value, market trends, and more.</p>


        </div>

       <div className='flex items-center justify-center gap-5 h-full flex-col'>

        <div className='flex flex-col gap-5 border border-[#E2E8F0] shadow-sm shadow-[#00000005] p-5 rounded-[20px]'>
                        <div className='flex items-center gap-4'>

                                <div className='bg-[#DCFCE7] rounded-[10px] h-14 w-14 flex items-center justify-center shrink-0'><Search color='#22C55E'/></div>
                                <div className='flex flex-col gap-1'>
                                    <h1 className='text-[#0F172A] font-bold text-[18px]' >Search Property</h1>
                                    <p className='text-[#64748B] text-[14px]'>Search by address to quickly add a property and get AI insights.</p>
                                </div>
                                <ChevronRight size={24} color='#64748B'/>



                            </div>

                           <div className='w-full relative'>
                          
                                          <input type="text"
                                        value={address}
                                        onChange={(e)=>{setaddress(e.target.value)}}
                                      
                                        
                                          placeholder={loading?'Fetching Property...': adding ? 'Adding Property...':'Search properties...'}
                          
                                          className={`w-full border border-[#E2E8F0] py-3 pr-4 pl-13 rounded-[14px]  text-[14px] outline-none ${(loading || adding)?'placeholder:text-[#1fae3e]':'placeholder:text-[#64748B]'}`}
                                          />
                          
                                              <Search className='absolute top-[50%] translate-y-[-50%] left-5' color='#64748B'/>
                                      <button onClick={()=>{handleSubmit()} } className='absolute top-[50%] translate-y-[-50%] right-5'>
                                        <ChevronRight/>
                                      </button>
                                      </div>



                                      <div className='flex items-center gap-2'>
                                        <div className='bg-[#DCFCE7] px-2 py-1 text-[#22C55E] text-[12px] font-bold'>
                                            Examples:
                                        </div>

                                        <p className='text-[#64748B] text-[12px]'>123 Main St, Austin, TX • 500 Ocean Ave, Miami, FL</p>

                                      </div>
        </div>
         <div 
         onClick={()=>{navigate('/AskLIAM/AddPropertyForm')}}
         className='p-5 border-[#E2E8F0] border shadow-sm shadow-[#00000005] rounded-[20px] flex flex-col gap-5'>
                <div className='flex items-center gap-4'>

                    <div className='bg-[#DCFCE7] rounded-[10px] h-14 w-14 flex items-center justify-center shrink-0'><Edit color='#22C55E'/></div>
                    <div className='flex flex-col gap-1'>
                        <h1 className='text-[#0F172A] font-bold text-[18px]' >Enter Manually</h1>
                        <p className='text-[#64748B] text-[14px]'>Add property details manually if you don't have an address.</p>
                    </div>
                    <ChevronRight size={24} color='#64748B'/>



                </div>

                <div className='h-[1px] w-full bg-[#E2E8F0]'></div>

                <div className='flex items-center justify-center text-[#64748B] font-medium text-[13px] gap-2'><ShieldCheck color='#469738' size={14}/> Your information is secure and private</div>
        </div>

        <div className='flex gap-4 p-5 rounded-[20px] bg-[#F4F5F4]'>
                <div className='h-11 w-11 flex items-center justify-center bg-[#DCFCE7] rounded-[10px] shrink-0'>
                    <Lightbulb color='#22C55E'/>

                </div>

                <div>
                    <h1 className='text-[15px] text-[#0F172A] font-bold'>Why add a property?</h1>

                    <p className='text-[#64748B] text-[14px]'>Track value changes, set 24/7 alerts, and get AI-powered market insights tailored to your property.</p>
                </div>
        </div>
       </div>



    </div>
  )
}

export default AddProperty