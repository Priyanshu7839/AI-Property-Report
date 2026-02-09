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
    <div className="min-h-screen bg-[#FAFBFC] relative overflow-hidden">
     <CommercialErrorPopup isOpen={Error} onClose={()=>setError(false)}/>
      <ErrorPopup isOpen={DataError} onClose={()=>setDataError(false)}/>
      {/* Advanced mesh gradient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,91,255,0.08)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(24,163,111,0.06)_0%,transparent_50%),radial-gradient(circle_at_50%_50%,rgba(0,91,255,0.04)_0%,transparent_50%)]"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#005BFF]/10 to-transparent"></div>
      </div>

      {/* Floating dots pattern */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      ></div>

      {/* ProExchange.ai watermark */}
      <div className="fixed bottom-6 right-6 text-[#6A6A6A] font-medium text-xs tracking-wider pointer-events-none z-50 opacity-20">
        ProExchange.ai
      </div>

      {/* Header */}
      <header className="border-b border-black/[0.06] bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="text-black tracking-tight font-medium relative inline-flex items-baseline">
            <span
            >AIPropertyReport</span>
            <span
              className="text-[#0285FF]"
              style={{
                fontFamily: "Comic Sans MS, cursive",
                transform: "rotate(-4deg)",
                fontSize: "1em",
                opacity: 0.92,
                fontWeight: 600,
                letterSpacing: "0.5px",
                marginLeft: "1px",
                textShadow: "0.5px 0.5px 0 #0285FF, -0.3px 0.3px 0 #0285FF",
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
                stroke="#0285FF"
                strokeWidth="2.5"
                opacity="0.88"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-[#6A6A6A] text-[15px]">
            <a
              href="#how-it-works"
              className="hover:text-[#0285FF] transition-colors duration-200"
            >
              How it works
            </a>
            <a
              href="#sample-report"
              className="hover:text-[#0285FF] transition-colors duration-200"
            >
              Sample report
            </a>
            <span
              onClick={()=>{
                navigate('/Login')
              }}
              className="hover:text-[#0285FF] cursor-pointer transition-colors duration-200"
            >
              Partners
            </span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 lg:px-8 pt-20 lg:pt-24 pb-16 lg:pb-14 text-center relative">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#005BFF]/10 via-[#005BFF]/5 to-transparent border border-[#005BFF]/10 text-[#005BFF] text-sm mb-8 backdrop-blur-xl">
          <div className="w-1.5 h-1.5 rounded-full bg-[#005BFF] animate-pulse"></div>
          <span>AI-Powered Property Intelligence</span>
        </div>

        <h1 className="text-black mb-6 text-[42px] sm:text-[56px] lg:text-[72px] tracking-[-0.04em] relative leading-[1.1] font-[500]">
          Your Property Has a<br />
          Hidden Value.
          <br />
          <span className="bg-gradient-to-r from-[#005BFF] via-[#0066FF] to-[#005BFF] bg-clip-text text-transparent">
            Our AI Finds It
          </span>{" "}
          in 60s.
        </h1>
        <p className="text-[#6A6A6A] text-[16px] lg:text-[18px] mb-6 max-w-2xl mx-auto leading-relaxed capitalize">
         A free AI-powered report that uncovers your home’s real market value, tappable equity, and how unused capital could perform across diversed assets.
        </p>
        <p className="text-black text-[21px] lg:text-[24px] mb-12 font-semibold tracking-tight capitalize">
          Your Home Isn’t Just a Place to Live - It’s a Powerful Financial Engine - Let's Activate It !
        </p>

        {/* Address Input */}
        <form className="mb-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-6 items-start">
            {/* Left: Address Input */}
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#005BFF] to-[#0066FF] rounded-[20px] opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 blur-sm transition-opacity duration-500"></div>

                <div className="relative bg-white rounded-[18px] shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.02),0_12px_24px_rgba(0,0,0,0.04)] group-focus-within:shadow-[0_0_0_1px_rgba(0,91,255,0.2),0_8px_16px_rgba(0,91,255,0.08),0_24px_48px_rgba(0,91,255,0.12)] transition-all duration-300">
                  <MapPin
                    className={`absolute left-5 top-1/2 -translate-y-1/2   transition-colors z-10 ${emtpyError?'text-red-500':'text-[#6A6A6A] group-focus-within:text-[#005BFF]'}`}
                    size={20}
                  />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    onKeyDown = {(e)=>{handleEnterPress(e)}}
                    placeholder={emtpyError?'Please Enter an Address':'Enter any U.S. property address'}
                    className={`w-full pl-14 pr-6 py-5 bg-transparent border-0 rounded-[18px] focus:outline-none text-black  text-[15px] relative ${emtpyError?'placeholder:text-red-500':'placeholder:text-[#6A6A6A]'} `}
                  />
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
                className="w-full bg-gradient-to-b from-[#005BFF] to-[#0047CC] hover:from-[#0052E6] hover:to-[#003DB8] text-white px-8 py-6 rounded-[18px] flex items-center justify-center gap-2 transition-all duration-200 h-auto shadow-[0_1px_2px_rgba(0,0,0,0.12),0_8px_16px_rgba(0,91,255,0.24)] hover:shadow-[0_1px_2px_rgba(0,0,0,0.16),0_16px_32px_rgba(0,91,255,0.32)] hover:translate-y-[-1px] active:translate-y-0 text-[15px] font-medium"
              >
                {loading?'Get My AI Report...':'Get My AI Report'}
                <ChevronRight size={20} />
              </Button>
            </div>

            {/* Right: Map Selection */}
            <div className="bg-white/90 backdrop-blur-xl border border-[#ECECEC]/60 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
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
                  className="text-[#005BFF] hover:text-[#0047CC] text-xs flex items-center gap-1.5 h-auto py-1.5 px-2 sm:px-3"
                >
                  <Navigation size={14} />
                  <span className="hidden sm:inline">Use My Location</span>
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

        <p className="text-[#6A6A6A] text-xs mb-4 sm:mb-5 opacity-70">
          No login · Uses live county tax records · Voided after 30 seconds
        </p>

        {/* Property Type Toggle */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 bg-[#F7F7F7]/80 backdrop-blur-sm border border-[#ECECEC]/50 rounded-full p-1.5 inline-flex shadow-sm">
          <label
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer px-4 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all duration-300 hover:bg-white/50"
            style={{
              backgroundColor:
                propertyType === "residential" ? "white" : "transparent",
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
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 accent-[#005BFF]"
            />
            <span className="text-black text-xs sm:text-sm">Residential</span>
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
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 accent-[#005BFF]"
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
        </div>
      </section>

      {/* Intelligence Cards */}
      <IntelligenceCards />

      {/* Sample Report Preview */}
      <SampleReportPreview />

      {/* How It Works */}
      <HowItWorks />

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
        <div className="absolute inset-0 bg-gradient-to-br from-[#FAFBFC] via-white to-[#F5F8FF]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,91,255,0.12)_0%,transparent_40%),radial-gradient(circle_at_80%_70%,rgba(24,163,111,0.08)_0%,transparent_40%),radial-gradient(circle_at_50%_50%,rgba(0,91,255,0.06)_0%,transparent_60%)]"></div>

        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#005BFF]/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-[#18A36F]/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        ></div>

        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-xl border border-black/[0.06] shadow-[0_0_0_1px_rgba(255,255,255,0.5)_inset,0_8px_16px_rgba(0,0,0,0.06)]">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#005BFF] to-[#18A36F] animate-pulse"></div>
              <span className="text-[#6A6A6A] text-[13px] font-medium tracking-wide">
                FREE · NO LOGIN · INSTANT
              </span>
            </div>
          </div>

          {/* Main heading */}
          <h2 className="text-black text-[44px] lg:text-[56px] mb-6 tracking-[-0.03em] text-center font-[500] leading-[1.1]">
            Ready to Unlock Your
            <br />
            <span className="bg-gradient-to-r from-[#005BFF] via-[#0066FF] to-[#18A36F] bg-clip-text text-transparent">
              Property Intelligence?
            </span>
          </h2>

          <p className="text-[#6A6A6A] text-[17px] lg:text-[19px] text-center mb-12 max-w-2xl mx-auto leading-relaxed capitalize">
            Join thousands of property owners who've discovered hidden value in
            under 60 seconds
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button
              onClick={() => document.querySelector("input")?.focus()}
              className="group relative bg-gradient-to-b from-[#005BFF] to-[#0047CC] hover:from-[#0052E6] hover:to-[#003DB8] text-white px-10 py-6 rounded-[20px] inline-flex items-center gap-3 transition-all duration-200 shadow-[0_0_0_1px_rgba(255,255,255,0.1)_inset,0_1px_2px_rgba(0,0,0,0.12),0_12px_24px_rgba(0,91,255,0.3)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2)_inset,0_1px_2px_rgba(0,0,0,0.16),0_20px_40px_rgba(0,91,255,0.4)] hover:translate-y-[-2px] active:translate-y-0 text-[16px] font-medium"
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
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#005BFF]/10 to-[#005BFF]/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                <FileText
                  className="text-[#005BFF]"
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
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#18A36F]/10 to-[#18A36F]/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                <Lock className="text-[#18A36F]" size={24} strokeWidth={1.5} />
              </div>
              <h3 className="text-black text-[17px] font-medium mb-2">
                100% Private
              </h3>
              <p className="text-[#6A6A6A] text-[14px] leading-relaxed">
                No account needed. Auto-deleted after 30 seconds
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-xl border border-black/[0.06] rounded-3xl p-6 lg:p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.5)_inset,0_8px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.8)_inset,0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 group hover:scale-[1.02]">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#005BFF]/10 to-[#18A36F]/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                <svg
                  className="w-6 h-6 text-[#005BFF]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                  />
                </svg>
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

      {/* Footer */}
      <footer className="border-t border-[#ECECEC]/50 py-10 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center text-[#6A6A6A] text-sm">
          © 2026 AIPropertyReport.com · Powered by ProExchange
        </div>
      </footer>
    </div>
  );
}
