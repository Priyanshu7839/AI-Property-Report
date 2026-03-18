import { useState, useEffect } from "react";
import {
  MapPin,
  ChevronRight,
  Lock,
  FileText,
  Navigation,
  DatabaseZap,
  BrainCircuit,
  CheckCheck,
  ArrowLeft,
} from "lucide-react";
import { Button } from "./ui/button";
import { IntelligenceCards } from "./IntelligenceCards";
import { SampleReportPreview } from "./SampleReportPreview";
import { HowItWorks } from "./HowItWorks";
import { SocialProof } from "./SocialProof";
import { DataSourceStrip } from "./DataSourceStrip";
import { LocationMap } from "./LocationMap";
import axios from "axios";
import { useNavigate } from "react-router";
import { UploadToFirebase } from "./apicalls/ApiCalls";
import Logo from '../assets/logo.png'
import {CommercialErrorPopup} from '../components/CommercialErrorPopup'
import {ErrorPopup} from '../components/ErrorPopup';
import { trackEvent } from "../GoogleAnalytics/Analytics";
import HouseImage from '../assets/HouseImage.jpeg'
import HouseBanner from '../assets/Banner2.png'
import HomePageSection2 from "./HomePageSection2";
import Footer from "./Footer";
import FAQSection from "./FAQSection";

interface HomePageProps {
  onGenerateReport: (
    address: string,
    type: "residential" | "commercial"
  ) => void;
  onShowMethodology?: () => void;
  onShowSampleReport?: () => void;
}


export function HomePage({
  onGenerateReport,
  onShowMethodology,
  onShowSampleReport,
}: HomePageProps) {
  const [address, setAddress] = useState("");
  const [propertyType, setPropertyType] = useState<
    "residential" | "commercial"
  >("residential");

  const [location, setLocation] = useState(null);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [center, setcenter] = useState({
    lat: 37.3382,
    lng: -121.8863,
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(address);
    }, 500);

    return () => clearTimeout(handler);
  }, [address]);

  useEffect(() => {
    if (!debouncedQuery) return;

    const fetchSearch = async () => {
      try {
        const response = await axios.get(
          `https://trueway-geocoding.p.rapidapi.com/Geocode?address=${debouncedQuery}&language=en`,
          {
            headers: {
              " x-rapidapi-host": "trueway-geocoding.p.rapidapi.com",
              "x-rapidapi-key":
                "d3cfd720b6msh644a12c2e9f2d08p186288jsn9c9392aa203b",
            },
          }
        );
        console.log(response.data.results[0]?.location);
        setcenter({
          lat: response.data.results[0].location.lat,
          lng: response.data.results[0].location.lng,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchSearch();
  }, [debouncedQuery]);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get(
          `https://trueway-geocoding.p.rapidapi.com/ReverseGeocode?location=${location.lat}%2C${location.lng}&language=en`,
          {
            headers: {
              " x-rapidapi-host": "trueway-geocoding.p.rapidapi.com",
              "x-rapidapi-key":
                "d3cfd720b6msh644a12c2e9f2d08p186288jsn9c9392aa203b",
            },
          }
        );

        console.log(response?.data?.results?.[0]?.address);
        setAddress(response?.data?.results?.[0]?.address);
      } catch (error) {
        console.log(error);
      }
    };
    if (location) {
      fetchLocation();
    }
  }, [location]);

  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const handleLocationSelect = async (
    lat: number,
    lng: number,
    addressFromMap?: string
  ) => {
    try {
      const response = await axios.get(
        `https://trueway-geocoding.p.rapidapi.com/ReverseGeocode?location=${lat}%2C${lng}&language=en`,
        {
          headers: {
            " x-rapidapi-host": "trueway-geocoding.p.rapidapi.com",
            "x-rapidapi-key":
              "d3cfd720b6msh644a12c2e9f2d08p186288jsn9c9392aa203b",
          },
        }
      );

      setAddress(response?.data?.results?.[0]?.address);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  const [emtpyError,setemptyError] = useState(false);
  const[loading,setLoading] = useState(false);
  const [Error,setError] = useState(false)
  const [DataError,setDataError] = useState(false)

  const handleSubmit = async()=>{
    setemptyError(false)
    setLoading(true);


    if(address===''){
     
      setemptyError(true);
    setLoading(false)

      return;
    }
    else{
      setemptyError(false)

        try {
          const response = await axios.get(`https://zhomes-realty-us.p.rapidapi.com/properties/search-address?address=${address}`,{
            headers:{
            'X-RapidAPI-Key': '69953a3276msh1fffb8e07d13516p11031ejsnfd55185a907e',
            'X-RapidAPI-Host': 'zhomes-realty-us.p.rapidapi.com'
          }
          })

          console.log(response)
          

          // if(response.data.data?.zestimate === null) {
          // setDataError(true)
          // return;
          // }

          if(response.data.message==='Successful'){
            const data= response?.data
            UploadToFirebase(address,true)
        navigate(`/Report?address=${address}`,{

          
          state:{data}
        });
            
          }

        } catch (error) {
          console.log(error)
          
          if(error.response.data.errors.address==='The input is not a detailed address'){
            setError(true);
            setAddress('')
          
              UploadToFirebase(address,false)

          }
        }
    }

    setLoading(false)
  }

  const handleEnterPress = (e) => {
   
    if (e.key === 'Enter') {
       e.preventDefault()
            handleSubmit()
    }
  };

  return (
    <div className="min-h-screen bg-white/60 relative overflow-hidden">
     <CommercialErrorPopup isOpen={Error} onClose={()=>setError(false)}/>
      <ErrorPopup isOpen={DataError} onClose={()=>setDataError(false)}/>
     
      {/* Floating dots pattern */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      ></div>


      {/* Header */}
      <header className="border-b border-black/[0.06] bg-white/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="text-[#000] tracking-tight font-medium relative inline-flex items-baseline">
            <span
            >AIPropertyReport</span>
            <span
              className="text-[#000]"
              style={{
                fontFamily: "Comic Sans MS, cursive",
                transform: "rotate(-4deg)",
                fontSize: "1em",
                opacity: 0.92,
                fontWeight: 600,
                letterSpacing: "0.5px",
                marginLeft: "1px",
                textShadow: "0.5px 0.5px 0 #000, -0.3px 0.3px 0 #000",
              }}
            >
              .com
            </span>
            {/* Hand-drawn underline */}
            <svg
              className="absolute pointer-events-none"
              style={{
                left: "-2px",
                bottom: "-4px",
                width: "calc(100% + 4px)",
                height: "8px",
              }}
              viewBox="0 0 300 8"
              preserveAspectRatio="none"
            >
              <path
                d="M 2 4 Q 75 5, 150 4 T 298 4"
                fill="none"
                stroke="#000"
                strokeWidth="2.5"
                opacity="0.88"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-[#000]/70 text-[15px]">
            <a
              href="#how-it-works"
              className="hover:text-[#000] transition-colors duration-200"
            >
              How it works
            </a>
            <a
              href="#sample-report"
              className="hover:text-[#000] transition-colors duration-200"
            >
              Sample report
            </a>
            <span
              onClick={()=>{
                navigate('/Login')
              }}
              className="hover:text-[#000] cursor-pointer transition-colors duration-200"
            >
              Partners
            </span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}

      <img src={HouseBanner} alt="" className='absolute top-0 left-0 h-[600px] sm:h-[400px] md:h-[800px] lg:h-[800px] xl:h-auto w-full object-cover'/>
  
    <div className='flex flex-col items-center justify-center w-full max-w-6xl mx-auto px-6 lg:px-8 '>
         <section className=" text-center relative flex flex-col items-center justify-center  mt-20 mb-50  xl:mb-60">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#000] to-[#000]  border border-[#0A2540]/10 text-[#fff] text-sm mb-3 backdrop-blur-xl max-sm:text-[10px]">
          <div className="w-1.5 h-1.5 rounded-full bg-[#18a36f] animate-pulse"></div>
          <span>AI-Powered Property Intelligence</span>
        </div>

        <h1 className="text-black mb-6 text-[32px] sm:text-[42px] md:text-[56px] lg:text-[56px] tracking-[-0.04em] relative leading-[1.1] font-[700] text-center flex items-center justify-center flex-col gap-1">
          Your Property Has a
          Hidden Value.
          <br />
              <div className='flex gap-4'>
                  <span className="flex bg-gradient-to-r from-gray-500 via-gray-500 to-gray-500 bg-clip-text text-transparent">
            Our AI Finds It
          </span>
          <span>in</span>
          <span className='flex'>60 <p className = 'italic text-gray-500'>s.</p></span>
              </div>
        </h1>
        {/* <p className="text-[white] text-[16px] lg:text-[16px] mb-6 max-w-2xl mx-auto leading-relaxed capitalize">
         A free AI-powered report that uncovers your home’s real market value, tappable equity, and how unused capital could perform across diversed assets.
        </p> */}
        {/* <p className="text-black text-[21px] lg:text-[20px] mb-12 font-semibold tracking-tight capitalize">
          Your Home Isn’t Just a Place to Live - It’s a Powerful Financial Engine - Let's Activate It !
        </p> */}

      
      </section>

      {/* <section className='w-[50%]'>
        <img src={HouseImage} alt="" />
      </section> */}
    </div>
     

     <div className='flex flex-col items-center max-w-6xl mx-auto w-full mb-10 p-2 md:p-0'>
        {/* Address Input */}
        <form className="mb-8 w-full  backdrop-blur-lg rounded-[18px] p-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-6 items-start">
            {/* Left: Address Input */}
            <div className="space-y-4">
              <div className="relative group">
                

                <div className="relative bg-white/70 rounded-[18px] shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.02),0_12px_24px_rgba(0,0,0,0.04)] group-focus-within:shadow-[0_0_0_1px_rgba(0,0,0,0.2),0_8px_16px_rgba(0,0,0,0.08),0_24px_48px_rgba(0,0,0,0.12)] transition-all duration-300 relative py-2">
                  <MapPin
                    className={`absolute left-5 top-1/2 -translate-y-1/2   transition-colors z-10 ${emtpyError?'text-red-500':'text-[#000] group-focus-within:text-[#0A2540]'}`}
                    size={20}
                  />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    onKeyDown = {(e)=>{handleEnterPress(e)}}
                    placeholder={emtpyError?'Please Enter an Address':'Enter any U.S. property address'}
                    className={`w-full pl-14 pr-6 py-3 sm:py-5 bg-transparent border-0 rounded-[18px] focus:outline-none text-black  text-[15px] relative ${emtpyError?'placeholder:text-red-500':'placeholder:text-[#6A6A6A]'} `}
                  />

                   <Button
              onClick={()=>{
                handleSubmit()
                  trackEvent("Report Generate Button Click", {
      location: "Homepage",
    })
              }}
                type="button"
                className="w-fit bg-gradient-to-b from-gray-700 to-gray-800 hover:from-[#000] hover:to-[#000] text-white px-8 py-3 hidden sm:flex rounded-[18px]  items-center justify-center gap-2 transition-all duration-200 h-auto shadow-[0_1px_2px_rgba(0,0,0,0.12),0_8px_16px_rgba(0,0,0,0.24)] hover:shadow-[0_1px_2px_rgba(0,0,0,0.16),0_16px_32px_rgba(0,0,0,0.32)]   text-[15px] font-medium absolute top-[50%] translate-y-[-50%] right-3"
              >
                {loading?'Fetching Report...':'Get My AI Report'}
                {/* <ChevronRight size={20} /> */}
              </Button>
                </div>

                

              </div>
              <Button
              onClick={()=>{
                handleSubmit()
                  trackEvent("Report Generate Button Click", {
      location: "Homepage",
    })
              }}
                type="button"
                className="w-full sm:hidden  bg-gradient-to-b from-gray-700 to-gray-800 hover:from-[#000] hover:to-[#000] text-white sm:px-8 px-4 py-4  rounded-[18px] flex items-center justify-center gap-2 transition-all duration-200 h-auto shadow-[0_1px_2px_rgba(0,0,0,0.12),0_8px_16px_rgba(0,0,0,0.24)] hover:shadow-[0_1px_2px_rgba(0,0,0,0.16),0_16px_32px_rgba(0,0,0,0.32)] hover:translate-y-[-1px] active:translate-y-0 text-[15px] font-medium z-[99]"
              >
                {loading?'Fetching Report...':'Get My AI Report'}
                <ChevronRight size={20} />
              </Button>
            </div>

            {/* Right: Map Selection */}
            <div className="bg-white/60 backdrop-blur-xl border border-[#ECECEC]/60 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
              <div className="p-3 sm:p-4 border-b border-[#ECECEC]/50 flex items-center justify-between">
                <span className="text-[#6A6A6A] text-xs sm:text-sm">
                  Or select on map
                </span>
                <Button
                  type="button"
                  onClick={() => {
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition((position) => {
                        handleLocationSelect(
                          position.coords.latitude,
                          position.coords.longitude
                        );
                      });
                    }
                  }}
                  variant="ghost"
                  className="text-[#0A2540] hover:text-[#0A2540] text-xs flex items-center gap-1.5 h-auto py-1.5 px-2 sm:px-3"
                >
                  <Navigation size={14} />
                  <span className="hidden sm:inline text-black">Use My Location</span>
                  <span className="sm:hidden">GPS</span>
                </Button>
              </div>

              <LocationMap
                location={location}
                setLocation={setLocation}
                center={center}
                setCenter={setcenter}
              />
            </div>
          </div>
        </form>

        {/* <p className="text-[#6A6A6A] text-xs mb-0 sm:mb-5 opacity-70">
          No login · Uses live county tax records · Voided after 30 seconds
        </p> */}

        {/* Property Type Toggle */}
        {/* <div className="flex items-center justify-center gap-2 sm:gap-1 bg-[#F7F7F7]/80 backdrop-blur-sm border border-[#ECECEC]/50 rounded-full p-1.5 inline-flex shadow-sm">
          <label
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer px-4 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all duration-300 hover:bg-white/50"
            style={{
              backgroundColor:
                propertyType === "residential" ? "black" : "transparent",
              boxShadow:
                propertyType === "residential"
                  ? "0 2px 8px rgba(0,0,0,0.06)"
                  : "none",
            }}
          >
            <input
              type="radio"
              name="propertyType"
              value="residential"
              checked={propertyType === "residential"}
              onChange={(e) => setPropertyType(e.target.value as "residential")}
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 accent-[#fff]"
            />
            <span className="text-white text-xs sm:text-sm">Residential</span>
          </label>
          <label
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer px-4 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all duration-300 hover:bg-white/50"
            style={{
              backgroundColor:
                propertyType === "commercial" ? "white" : "transparent",
              boxShadow:
                propertyType === "commercial"
                  ? "0 2px 8px rgba(0,0,0,0.06)"
                  : "none",
            }}
          >
            <input
              type="radio"
              name="propertyType"
              value="commercial"
              checked={propertyType === "commercial"}
              // onChange={(e) => setPropertyType(e.target.value as 'commercial')}
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 accent-[#0A2540]"
            />
            <span className="text-black text-xs sm:text-sm">
              Commercial
              <span
                className="text-[#0285FF]"
                style={{
                  fontFamily: "Comic Sans MS, cursive",
                  transform: "rotate(-4deg)",
                  fontSize: "1em",
                  opacity: 0.92,
                  fontWeight: 300,
                  letterSpacing: "0.5px",
                  marginLeft: "1px",
                  textShadow: "0.5px 0.5px 0 #0285FF, -0.3px 0.3px 0 #0285FF",
                }}
              >
                (Coming Soon)
              </span>
            </span>
          </label>
        </div> */}
     </div>

      <HomePageSection2/>
      {/* Intelligence Cards */}
      {/* <IntelligenceCards /> */}

      {/* Sample Report Preview */}
      <SampleReportPreview />

      {/* How It Works */}
      {/* <HowItWorks /> */}

      {/* Social Proof */}
      {/* <SocialProof /> */}

      {/* Methodology Section */}
      {onShowMethodology && (
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
          <div className="bg-white border border-black/[0.06] rounded-3xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="p-8 lg:p-12">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-black text-[28px] lg:text-[32px] tracking-[-0.02em] font-medium mb-2">
                    Our Methodology
                  </h2>
                  <p className="text-[#6A6A6A] text-[15px] lg:text-[17px]">
                    Transparent, expert-grade AI analysis built with modern
                    econometrics
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-[#F7F7F7] rounded-2xl p-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#005BFF]/10 to-[#005BFF]/5 flex items-center justify-center mb-4">
                    <span className="text-[#3B82F6] text-[20px]">
                      <DatabaseZap />
                    </span>
                  </div>
                  <h3 className="text-black font-medium mb-2">Data Sources</h3>
                  <p className="text-[#6A6A6A] text-[14px] leading-relaxed">
                    8+ authoritative APIs including county records, MLS data,
                    NOAA climate models, and CoreLogic valuations
                  </p>
                </div>

                <div className="bg-[#F7F7F7] rounded-2xl p-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff3493]/10 to-[#ff3493]/5 flex items-center justify-center mb-4">
                    <span className="text-[#ff3493] text-[20px]">
                      <BrainCircuit />
                    </span>
                  </div>
                  <h3 className="text-black font-medium mb-2">
                    AI Valuation Engine
                  </h3>
                  <p className="text-[#6A6A6A] text-[14px] leading-relaxed">
                    Graph Neural Networks with 365-800 engineered features per
                    property for precision analysis
                  </p>
                </div>

                <div className="bg-[#F7F7F7] rounded-2xl p-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#18A36F]/10 to-[#18A36F]/5 flex items-center justify-center mb-4">
                    <span className="text-[#218d25] text-[20px]">
                      <CheckCheck />
                    </span>
                  </div>
                  <h3 className="text-black font-medium mb-2">
                    Confidence Scoring
                  </h3>
                  <p className="text-[#6A6A6A] text-[14px] leading-relaxed">
                    Multi-layer validation with data freshness, comp agreement,
                    and outlier detection
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-black/[0.06]">
                <p className="text-[#999999] text-[13px] italic">
                  All models are versioned, time-stamped, and reproducible at
                  academic standards
                </p>
                <button
                  onClick={onShowMethodology}
                  className="text-[#3B82F6] hover:text-[#2563EB] font-medium text-[15px] transition-colors flex items-center gap-2"
                >
                  View Full Methodology
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Data Source Strip */}
      <DataSourceStrip />

      {/* Final CTA */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Advanced mesh gradient background */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-[#FAFBFC] via-white to-[#F5F8FF]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,91,255,0.12)_0%,transparent_40%),radial-gradient(circle_at_80%_70%,rgba(24,163,111,0.08)_0%,transparent_40%),radial-gradient(circle_at_50%_50%,rgba(0,91,255,0.06)_0%,transparent_60%)]"></div> */}

        {/* Floating orbs */}
        {/* <div className="absolute top-20 left-10 w-72 h-72 bg-[#005BFF]/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-[#18A36F]/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div> */}

        {/* Grid pattern overlay */}
        {/* <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        ></div> */}

        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-b from-[#0A0A0A] to-[#161718] border border-black ">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#005BFF] to-[#18A36F] animate-pulse"></div>
              <span className="text-[#fff] text-[13px] font-medium tracking-wide">
                FREE · NO LOGIN · INSTANT
              </span>
            </div>
          </div>

          {/* Main heading */}
          <h2 className="text-black text-[44px] lg:text-[56px] mb-6 tracking-[-0.03em] text-center font-[500] leading-[1.1] ">
            Ready to Unlock Your
          
            <span className="bg-gradient-to-r from-gray-800 via-gray-600 to-gray-500 bg-clip-text text-transparent ml-2">
              Property Intelligence?
            </span>
          </h2>

          <p className="text-[#6A6A6A] text-[17px] lg:text-[19px] text-center mb-12 max-w-2xl mx-auto leading-relaxed capitalize">
            Join thousands of property owners who've discovered hidden value in
            under 60 seconds
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Button
              onClick={() => document.querySelector("input")?.focus()}
              className="group relative bg-gradient-to-b from-[#0A0A0A] to-[#161718] text-white px-10 py-6 rounded-[20px] inline-flex items-center gap-3 transition-all duration-200 shadow-[0_0_0_1px_rgba(0,0,0,0.1)_inset,0_1px_2px_rgba(0,0,0,0.12),0_12px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_0_0_1px_rgba(0,0,0,0.2)_inset,0_1px_2px_rgba(0,0,0,0.16),0_20px_40px_rgba(0,0,0,0.4)] hover:translate-y-[-2px] active:translate-y-0 text-[16px] font-medium"
            >
              <span>Get My Free Report</span>
              <ChevronRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Button>

            <Button
              onClick={() =>
                onShowSampleReport
                  ? onShowSampleReport()
                  : document
                      .getElementById("sample-report")
                      ?.scrollIntoView({ behavior: "smooth" })
              }
              variant="ghost"
              className="px-8 py-6 rounded-[20px] text-[#6A6A6A] hover:text-black hover:bg-white/60 border border-black/[0.06] hover:border-black/[0.1] backdrop-blur-xl transition-all duration-200 text-[16px] font-medium"
            >
              View Sample Report
            </Button>
          </div>

          {/* Trust indicators - Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 max-w-4xl mx-auto">
            <div className="bg-white/60 backdrop-blur-xl border border-black/[0.06] rounded-3xl p-6 lg:p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.5)_inset,0_8px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.8)_inset,0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 group hover:scale-[1.02]">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-b from-[#0A0A0A] to-[#161718] shadow-md shadow-black flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                <FileText
                  className="text-[#fff]"
                  size={24}
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-black text-[17px] font-medium mb-2">
                Instant Report
              </h3>
              <p className="text-[#6A6A6A] text-[14px] leading-relaxed">
                Complete property intelligence in under 60 seconds
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-xl border border-black/[0.06] rounded-3xl p-6 lg:p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.5)_inset,0_8px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.8)_inset,0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 group hover:scale-[1.02]">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-b from-[#0A0A0A] to-[#161718] shadow-md shadow-black flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                <Lock className="text-[#fff]" size={24} strokeWidth={1.5} />
              </div>
              <h3 className="text-black text-[17px] font-medium mb-2">
                100% Private
              </h3>
              <p className="text-[#6A6A6A] text-[14px] leading-relaxed">
                No account needed. Auto-deleted after 30 seconds
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-xl border border-black/[0.06] rounded-3xl p-6 lg:p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.5)_inset,0_8px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.8)_inset,0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 group hover:scale-[1.02]">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-b from-[#0A0A0A] to-[#161718] shadow-md shadow-black flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200 text-white">
                <BrainCircuit />
              </div>
              <h3 className="text-black text-[17px] font-medium mb-2">
                AI-Powered
              </h3>
              <p className="text-[#6A6A6A] text-[14px] leading-relaxed">
                Live data from county records & market comps
              </p>
            </div>
          </div>
        </div>
      </section>
      <FAQSection/>
      {/* Footer
      <footer className="border-t border-[#ECECEC]/50 py-10 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center text-[#6A6A6A] text-sm">
          © 2026 AIPropertyReport.com · Powered by ProExchange
        </div>
      </footer> */}
      <Footer/>
    </div>
  );
}
