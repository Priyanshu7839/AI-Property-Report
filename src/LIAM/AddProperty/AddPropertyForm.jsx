import React, { useEffect, useState } from 'react'
import LIAMNavbar from '../LIAMNavbar'
import { Building2, House, LandPlot, Plus, ShieldCheck, Store } from 'lucide-react'
import { createProperty } from '../../../Apicall'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'

const AddPropertyForm = () => {


    const PropertyTypes = [
       { icon:<House/>,
        name:'Residential',
        desc:'Single family, condo, duplex, multifamily'
    },
       { icon:<Store/>,
        name:'Commercial',
        desc:'Office, Retail, Industrial, Hospitality'
    },
       { icon:<Building2/>,
        name:'Mixed Use',
        desc:'Retail + residential / office Combinations'
    },
       { icon:<LandPlot/>,
        name:'Land/Vacant Land',
        desc:'Vacant lots, Agricultural, Development Parcels'
    },
    ]


    const [selectedPropertyType,setSelectedPropertyType] = useState('Residential')

const handleChange = (e) => {
  const { name, value } = e.target;

  setformData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

    const [steps,setsteps] = useState(1)




  
const Residentialfields = [
  {
    name: "propertyName",
    label: "Property Name",
    placeholder: "e.g. Sunset Villa",
    type: "text",
    required: true,
  },
  {
    name: "streetAddress",
    label: "Street Address",
    placeholder: "e.g. 123 Main St",
    type: "text",
  },
  {
    name: "unit",
    label: "Unit",
    placeholder: "e.g. Apt 4B",
    type: "text",
  },

  {
    name: "city",
    label: "City",
    placeholder: "e.g. Los Angeles",
    type: "text",
  },
  {
    name: "state",
    label: "State",
    placeholder: "e.g. California",
    type: "text",
  },
  {
    name: "zip",
    label: "ZIP",
    placeholder: "e.g. 90210",
    type: "text",
  },

  {
    name: "country",
    label: "Country",
    placeholder: "e.g. United States",
    type: "text",
  },
  {
    name: "county",
    label: "County",
    placeholder: "e.g. Orange County",
    type: "text",
  },
  {
    name: "formattedAddress",
    label: "Formatted Address",
    placeholder: "Auto-generated full address",
    type: "text",
  },

  {
    name: "latitude",
    label: "Latitude",
    placeholder: "e.g. 34.0522",
    type: "number",
  },
  {
    name: "longitude",
    label: "Longitude",
    placeholder: "e.g. -118.2437",
    type: "number",
  },
  {
    name: "parcelNumber",
    label: "Parcel Number",
    placeholder: "e.g. 123-456-789",
    type: "text",
  },

  {
    name: "apn",
    label: "APN",
    placeholder: "e.g. 456-789-123",
    type: "text",
  },
  {
    name: "legalDescription",
    label: "Legal Description",
    placeholder: "Brief legal description",
    type: "text",
  },
  {
    name: "zoning",
    label: "Zoning",
    placeholder: "e.g. Residential (R1)",
    type: "text",
  },

  {
    name: "bedrooms",
    label: "Bedrooms",
    placeholder: "e.g. 4",
    type: "number",
  },
  {
    name: "bathrooms",
    label: "Bathrooms",
    placeholder: "e.g. 2.5",
    type: "number",
  },
  {
    name: "halfBathrooms",
    label: "Half Bathrooms",
    placeholder: "e.g. 1",
    type: "number",
  },

  {
    name: "garageSpaces",
    label: "Garage Spaces",
    placeholder: "e.g. 2",
    type: "number",
  },
  {
    name: "livingAreaSqFt",
    label: "Living Area SqFt",
    placeholder: "e.g. 2,150",
    type: "number",
  },
  {
    name: "lotSizeSqFt",
    label: "Lot Size SqFt",
    placeholder: "e.g. 8,500",
    type: "number",
  },

  {
    name: "yearBuilt",
    label: "Year Built",
    placeholder: "e.g. 1998",
    type: "number",
  },
  {
    name: "roofType",
    label: "Roof Type",
    placeholder: "e.g. Asphalt Shingle",
    type: "text",
  },
  {
    name: "roofAge",
    label: "Roof Age",
    placeholder: "e.g. 8 years",
    type: "number",
  },

  {
    name: "flooringType",
    label: "Flooring Type",
    placeholder: "e.g. Hardwood",
    type: "text",
  },
  {
    name: "foundationType",
    label: "Foundation Type",
    placeholder: "e.g. Concrete Slab",
    type: "text",
  },
  {
    name: "hvacType",
    label: "HVAC Type",
    placeholder: "e.g. Central Air",
    type: "text",
  },
  {
    name: "pool",
    label: "Pool",
    placeholder: "e.g. Central Air",
    type: "text",
  },
  {
  name: "pool",
  label: "Pool",
  placeholder: "e.g. Yes, In-ground, None",
  type: "text",
},
{
  name: "hoa",
  label: "HOA",
  placeholder: "e.g. $250/month or None",
  type: "text",
}
];


const CommercialFields = [
  {
    name: "propertyName",
    label: "Property Name",
    placeholder: "e.g. Commerce Plaza",
    type: "text",
    required: true,
  },
  {
    name: "streetAddress",
    label: "Street Address",
    placeholder: "e.g. 123 Business Ave",
    type: "text",
  },
  {
    name: "unit",
    label: "Unit",
    placeholder: "e.g. Suite 200",
    type: "text",
  },

  {
    name: "city",
    label: "City",
    placeholder: "e.g. Dallas",
    type: "text",
  },
  {
    name: "state",
    label: "State",
    placeholder: "e.g. Texas",
    type: "text",
  },
  {
    name: "zip",
    label: "ZIP",
    placeholder: "e.g. 75201",
    type: "text",
  },

  {
    name: "country",
    label: "Country",
    placeholder: "e.g. United States",
    type: "text",
  },
  {
    name: "county",
    label: "County",
    placeholder: "e.g. Dallas County",
    type: "text",
  },
  {
    name: "formattedAddress",
    label: "Formatted Address",
    placeholder: "Auto-generated full address",
    type: "text",
  },

  {
    name: "latitude",
    label: "Latitude",
    placeholder: "e.g. 32.7767",
    type: "number",
  },
  {
    name: "longitude",
    label: "Longitude",
    placeholder: "e.g. -96.7970",
    type: "number",
  },
  {
    name: "parcelNumber",
    label: "Parcel Number",
    placeholder: "e.g. 123-456-789",
    type: "text",
  },

  {
    name: "apn",
    label: "APN",
    placeholder: "e.g. 456-789-123",
    type: "text",
  },
  {
    name: "legalDescription",
    label: "Legal Description",
    placeholder: "Brief legal description",
    type: "text",
  },
  {
    name: "zoning",
    label: "Zoning",
    placeholder: "e.g. Commercial (C2)",
    type: "text",
  },

  {
    name: "commercialType",
    label: "Commercial Type",
    placeholder: "e.g. Office Building",
    type: "text",
  },
  {
    name: "buildingClass",
    label: "Building Class",
    placeholder: "e.g. Class A",
    type: "text",
  },
  {
    name: "totalUnits",
    label: "Total Units",
    placeholder: "e.g. 24",
    type: "number",
  },

  {
    name: "totalBuildingAreaSqFt",
    label: "Total Building Area SqFt",
    placeholder: "e.g. 48,000",
    type: "number",
  },
  {
    name: "lotSizeSqFt",
    label: "Lot Size SqFt",
    placeholder: "e.g. 65,000",
    type: "number",
  },
  {
    name: "parkingSpaces",
    label: "Parking Spaces",
    placeholder: "e.g. 120",
    type: "number",
  },

  {
    name: "occupancyPercent",
    label: "Occupancy %",
    placeholder: "e.g. 95",
    type: "number",
  },
  {
    name: "noi",
    label: "NOI",
    placeholder: "e.g. $450,000",
    type: "text",
  },
  {
    name: "capRate",
    label: "Cap Rate",
    placeholder: "e.g. 6.5%",
    type: "text",
  },

  {
    name: "annualRevenue",
    label: "Annual Revenue",
    placeholder: "e.g. $1,250,000",
    type: "text",
  },
  {
    name: "annualExpenses",
    label: "Annual Expenses",
    placeholder: "e.g. $350,000",
    type: "text",
  },
  {
    name: "yearBuilt",
    label: "Year Built",
    placeholder: "e.g. 2005",
    type: "number",
  },
];


const MixedFields = [
  // Property Information
  {
    name: "propertyName",
    label: "Property Name",
    placeholder: "e.g. Commerce Plaza",
    type: "text",
    required: true,
  },
  {
    name: "streetAddress",
    label: "Street Address",
    placeholder: "e.g. 123 Business Ave",
    type: "text",
  },
  {
    name: "unit",
    label: "Unit",
    placeholder: "e.g. Suite 200",
    type: "text",
  },

  // Address
  {
    name: "city",
    label: "City",
    placeholder: "e.g. Dallas",
    type: "text",
  },
  {
    name: "state",
    label: "State",
    placeholder: "e.g. Texas",
    type: "text",
  },
  {
    name: "zip",
    label: "ZIP",
    placeholder: "e.g. 75201",
    type: "text",
  },

  {
    name: "country",
    label: "Country",
    placeholder: "e.g. United States",
    type: "text",
  },
  {
    name: "county",
    label: "County",
    placeholder: "e.g. Dallas County",
    type: "text",
  },
  {
    name: "formattedAddress",
    label: "Formatted Address",
    placeholder: "Auto-generated full address",
    type: "text",
  },

  // Location
  {
    name: "latitude",
    label: "Latitude",
    placeholder: "e.g. 32.7767",
    type: "number",
  },
  {
    name: "longitude",
    label: "Longitude",
    placeholder: "e.g. -96.7970",
    type: "number",
  },
  {
    name: "parcelNumber",
    label: "Parcel Number",
    placeholder: "e.g. 123-456-789",
    type: "text",
  },

  // Legal
  {
    name: "apn",
    label: "APN",
    placeholder: "e.g. 456-789-123",
    type: "text",
  },
  {
    name: "legalDescription",
    label: "Legal Description",
    placeholder: "Brief legal description",
    type: "text",
  },
  {
    name: "zoning",
    label: "Zoning",
    placeholder: "e.g. Commercial (C2)",
    type: "text",
  },

  // Commercial Details
  {
    name: "commercialType",
    label: "Commercial Type",
    placeholder: "e.g. Office Building",
    type: "text",
  },
  {
    name: "buildingClass",
    label: "Building Class",
    placeholder: "e.g. Class A",
    type: "text",
  },
  {
    name: "totalUnits",
    label: "Total Units",
    placeholder: "e.g. 24",
    type: "number",
  },

  {
    name: "totalBuildingAreaSqFt",
    label: "Total Building Area SqFt",
    placeholder: "e.g. 48,000",
    type: "number",
  },
  {
    name: "lotSizeSqFt",
    label: "Lot Size SqFt",
    placeholder: "e.g. 65,000",
    type: "number",
  },
  {
    name: "parkingSpaces",
    label: "Parking Spaces",
    placeholder: "e.g. 120",
    type: "number",
  },

  {
    name: "occupancyPercent",
    label: "Occupancy %",
    placeholder: "e.g. 95",
    type: "number",
  },
  {
    name: "noi",
    label: "NOI",
    placeholder: "e.g. $450,000",
    type: "text",
  },
  {
    name: "capRate",
    label: "Cap Rate",
    placeholder: "e.g. 6.5%",
    type: "text",
  },

  // Financial
  {
    name: "annualRevenue",
    label: "Annual Revenue",
    placeholder: "e.g. $1,250,000",
    type: "text",
  },
  {
    name: "annualExpenses",
    label: "Annual Expenses",
    placeholder: "e.g. $350,000",
    type: "text",
  },
  {
    name: "yearBuilt",
    label: "Year Built",
    placeholder: "e.g. 2005",
    type: "number",
  },

  // Unit Breakdown
  {
    name: "residentialUnitCount",
    label: "Residential Unit Count",
    placeholder: "e.g. 18",
    type: "number",
  },
  {
    name: "commercialUnitCount",
    label: "Commercial Unit Count",
    placeholder: "e.g. 6",
    type: "number",
  },
  {
    name: "retailAreaSqFt",
    label: "Retail Area SqFt",
    placeholder: "e.g. 12,500",
    type: "number",
  },
  {
    name: "officeAreaSqFt",
    label: "Office Area SqFt",
    placeholder: "e.g. 8,000",
    type: "number",
  },
];

const LandFields = [
  // Property Information
  {
    name: "propertyName",
    label: "Property Name",
    placeholder: "e.g. Sunset Ranch",
    type: "text",
    required: true,
  },
  {
    name: "streetAddress",
    label: "Street Address",
    placeholder: "e.g. 123 County Rd",
    type: "text",
  },
  {
    name: "unit",
    label: "Unit",
    placeholder: "e.g. Lot A",
    type: "text",
  },

  // Address
  {
    name: "city",
    label: "City",
    placeholder: "e.g. Austin",
    type: "text",
  },
  {
    name: "state",
    label: "State",
    placeholder: "e.g. Texas",
    type: "text",
  },
  {
    name: "zip",
    label: "ZIP",
    placeholder: "e.g. 78701",
    type: "text",
  },

  {
    name: "country",
    label: "Country",
    placeholder: "e.g. United States",
    type: "text",
  },
  {
    name: "county",
    label: "County",
    placeholder: "e.g. Travis County",
    type: "text",
  },
  {
    name: "formattedAddress",
    label: "Formatted Address",
    placeholder: "Auto-generated full address",
    type: "text",
  },

  // Location
  {
    name: "latitude",
    label: "Latitude",
    placeholder: "e.g. 30.2672",
    type: "number",
  },
  {
    name: "longitude",
    label: "Longitude",
    placeholder: "e.g. -97.7431",
    type: "number",
  },
  {
    name: "parcelNumber",
    label: "Parcel Number",
    placeholder: "e.g. 123-456-789",
    type: "text",
  },

  // Legal
  {
    name: "apn",
    label: "APN",
    placeholder: "e.g. 456-789-123",
    type: "text",
  },
  {
    name: "legalDescription",
    label: "Legal Description",
    placeholder: "Brief legal description",
    type: "text",
  },
  {
    name: "zoning",
    label: "Zoning",
    placeholder: "e.g. Agricultural",
    type: "text",
  },

  // Land Details
  {
    name: "landType",
    label: "Land Type",
    placeholder: "e.g. Residential Lot",
    type: "text",
  },
  {
    name: "lotSizeSqFt",
    label: "Lot Size SqFt",
    placeholder: "e.g. 43,560",
    type: "number",
  },
  {
    name: "lotSizeAcres",
    label: "Lot Size Acres",
    placeholder: "e.g. 1.0",
    type: "number",
  },

  {
    name: "topography",
    label: "Topography",
    placeholder: "e.g. Flat",
    type: "text",
  },
  {
    name: "roadAccess",
    label: "Road Access",
    placeholder: "e.g. Paved",
    type: "text",
  },
  {
    name: "utilitiesAvailable",
    label: "Utilities Available",
    placeholder: "e.g. Water, Electric",
    type: "text",
  },

  {
    name: "entitlements",
    label: "Entitlements",
    placeholder: "e.g. Approved for Residential",
    type: "text",
  },
  {
    name: "annualTaxes",
    label: "Annual Taxes",
    placeholder: "e.g. $4,500",
    type: "text",
  },
  {
    name: "developmentPotential",
    label: "Development Potential",
    placeholder: "e.g. Multi-family Development",
    type: "text",
  },
];

const [FieldsShow,setFieldsShow] = useState(Residentialfields)



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
  hoa:""
};


const CommercialFormData = {
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

  commercialType: "",
  buildingClass: "",
  totalUnits: "",

  totalBuildingAreaSqFt: "",
  lotSizeSqFt: "",
  parkingSpaces: "",

  occupancyPercent: "",
  noi: "",
  capRate: "",

  annualRevenue: "",
  annualExpenses: "",
  yearBuilt: "",
};


const MixedFormData = {
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

  commercialType: "",
  buildingClass: "",
  totalUnits: "",

  totalBuildingAreaSqFt: "",
  lotSizeSqFt: "",
  parkingSpaces: "",

  occupancyPercent: "",
  noi: "",
  capRate: "",

  annualRevenue: "",
  annualExpenses: "",
  yearBuilt: "",

  residentialUnitCount: "",
  commercialUnitCount: "",
  retailAreaSqFt: "",
  officeAreaSqFt: "",
};

const LandFormData = {
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

  landType: "",
  lotSizeSqFt: "",
  lotSizeAcres: "",

  topography: "",
  roadAccess: "",
  utilitiesAvailable: "",

  entitlements: "",
  annualTaxes: "",
  developmentPotential: "",
};

const [formData,setformData] = useState(ResidentialFormData)

useEffect(()=>{
    if(selectedPropertyType === 'Residential'){
        setFieldsShow(Residentialfields)
        setformData(ResidentialFormData)
    }
    if(selectedPropertyType === 'Commercial'){
        setFieldsShow(CommercialFields)
        setformData(CommercialFormData)
    }

    if(selectedPropertyType === 'Mixed Use'){
        setFieldsShow(MixedFields)
        setformData(MixedFormData)
    }

    if(selectedPropertyType === 'Land/Vacant Land'){
        setFieldsShow(LandFields)
        setformData(LandFormData)
    }
},[selectedPropertyType])


const [adding,setAdding] = useState(false)


const handleSubmit = async () => {
    setAdding(true)
    try {
        const response = await createProperty(
            1,              // Logged in user's id
            selectedPropertyType,      // Residential, Commercial, Mixed Use, Land/Vacant Land
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

const navigate = useNavigate()
  return (
    <div className='h-[85vh]'>
        
        <div className='flex flex-col justify-between h-full px-5 pb-10'>
            <div className=' flex flex-col gap-3'>
            <div className='flex flex-col gap-3'>
                <h1 className='font-bold text-[24px] text-[#111827]'>Enter Property Details</h1>
                <p className='text-[#6B7280] text-[15px]'>Add property details manually to start tracking and get AI insights.</p>
                <div className='bg-[#F0F9EF] text-[#429732] font-semibold text-[12px] px-3 py-2 gap-[6px] flex items-center rounded-[12px] w-fit'>
                    <ShieldCheck/>
                    Your data is secure

                </div>
            </div>

            



            {
                steps === 1 && 
                <div className='flex flex-col gap-2'>
                            <h1 className='font-semibold text-md'>
                                Select The Property Type
                            </h1>


                            <div className='flex flex-col gap-3'>
                                {
                                    PropertyTypes.map((item,i)=>{
                                        return(
                                            <div
                                            key={i}
                                            onClick={()=>{setSelectedPropertyType(item.name)

                                                setsteps(2)
                                            }}
                                             className={
                `rounded-2xl border p-5 text-left shadow-card  flex flex-col gap-4
                                        ${selectedPropertyType === item.name ?'border-emerald-600 bg-emerald-50':'border-slate-200 bg-white'}
                `}
                                          >
                                               

                                                <span className={selectedPropertyType === item.name ? "text-emerald-700" : "text-slate-500"}>{item.icon}</span>

                                                <h1 className='font-semibold text-[18px]'>{item.name}</h1>
                                                <p className='capitalize text-xs leading-5 text-slate-600'>{item.desc}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                </div>
            }


            {
                steps === 2 &&
                 <div className='flex flex-col gap-6 p-5 border border-[#E5E5EA] rounded-[24px] bg-white w-full'>

       
                {
                    FieldsShow.map((item,i)=>{
                        return(
                             <div 
                             key={i}
                             className='flex flex-col gap-2 w-full'>
                    <h1 className='flex items-center gap-1 text-[14px] font-semibold'>
                        {item.label}
                        {/* {item.required && <span className='font-normal text-[#9CA3AF]'>(Optional)</span>} */}
                    </h1>

                    <input 

                    type={item.type}
                    required={item.required}
                    value={formData[item.name]}
                    name={item.name}   
                    onChange={handleChange}
                    placeholder={item.placeholder}
                    className='border border-[#E5E5EA] px-4 py-3 rounded-[12px] placeholder:text-[#9CA3AF] text-[15px] w-full'
                    />
                </div>
                        )
                    })
                }

            </div> 
            }
           </div>

            {steps === 2 && <div className='w-full flex flex-col gap-3 mt-3'>

                <button 
                onClick={()=>{
                  handleSubmit()
                  // navigate('/AskLIAM/MyProperties')
                }}
                className='flex items-center justify-center text-white bg-[green] text-[16px] font-semibold rounded-[12px] px-4 py-3'>{!adding && <Plus/>} {adding ?'Adding...':'Add Property'}</button>
                <button className='flex items-center justify-center text-[green] border border-[green] bg-[white] text-[16px] font-semibold rounded-[12px] px-4 py-3'>Cancel</button>

            </div>}
        </div>
    </div>
  )
}

export default AddPropertyForm