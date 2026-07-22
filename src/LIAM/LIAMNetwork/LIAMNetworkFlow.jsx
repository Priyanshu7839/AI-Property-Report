import {
  Activity,
  BarChart2,
  Bell,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  CircleCheckBig,
  Compass,
  Eye,
  Layers,
  MapPin,
  Search,
  Target,
  Users,
  X,
  Zap,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import LiamNetworkHouseImg from "../../assets/LiamNetworkHouseImg.png";
import LIAMNetworkSubmittedImg from "../../assets/LIAMNetworkSubmittedImg.png";
import LiamNetworkImg1 from "../../assets/LiamNetworkImg1.png";
import LiamNetworkImg2 from "../../assets/LiamNetworkImg2.png";
import LiamNetworkImg3 from "../../assets/LiamNetworkImg3.png";
import LiamNetworkImg4 from "../../assets/LiamNetworkImg4.png";

import { Home, Bot } from "lucide-react";
import { getProperty, updateListingTypes } from "../../../Apicall";
import { toast } from "sonner";

const users = [
  LiamNetworkImg1,
  LiamNetworkImg2,
  LiamNetworkImg3,
  LiamNetworkImg4,
];

function LiamNetwork() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-[330px] h-[420px]">
        {/* SVG CONNECTIONS */}

        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 420 420">
          {/* Left */}
          <path
            d="M210 80 C140 100, 40 180, 50 300"
            stroke="#8fd19e"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="4 7"
          />

          {/* Left Center */}
          <path
            d="M210 80 Q155 165 165 300"
            stroke="#8fd19e"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="4 7"
          />

          {/* Right Center */}

          <path
            d="M210 80 Q265 175 255 300"
            stroke="#8fd19e"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="4 7"
          />

          {/* Right */}
          <path
            d="M210 80 C280 100, 380 180, 370 300"
            stroke="#8fd19e"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="4 7"
          />

          {/* Vertical */}
        </svg>

        {/* TOP HOME */}

        <div className="absolute left-1/2 top-7 -translate-x-1/2">
          <div className="w-20 h-20 rounded-full bg-[#edf6ef] shadow flex items-center justify-center">
            <Home className="text-[#2f7d32] w-8 h-8" />
          </div>
        </div>

        {/* CENTER AI */}

        <div className="absolute left-1/2 top-[140px] -translate-x-1/2">
          <div className="w-15 h-15 rounded-full bg-[#2d7b31] shadow-2xl flex flex-col items-center justify-center">
            {/* <Bot className="text-white w-8 h-8 mb-1" /> */}

            <span className="text-white text-sm font-semibold tracking-wider">
              LIAM
            </span>
          </div>
        </div>

        {/* USER 1 */}

        <div className="absolute left-[10px] bottom-[80px]">
          <img
            src={users[0]}
            className="w-16 h-16 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>

        {/* USER 2 */}

        <div className="absolute left-[90px] bottom-[80px]">
          <img
            src={users[1]}
            className="w-16 h-16 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>

        {/* USER 3 */}

        <div className="absolute right-[90px] bottom-[80px]">
          <img
            src={users[2]}
            className="w-16 h-16 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>

        {/* USER 4 */}

        <div className="absolute right-[10px] bottom-[80px]">
          <img
            src={users[3]}
            className="w-16 h-16 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
}

const LIAMNetworkFlow = () => {
  const [steps, setsteps] = useState(1);
  const [properties, setProperties] = useState([]);

  const [pushing, setPushing] = useState(false);

  const fetchProperty = async () => {
    try {
      const response = await getProperty(1, "All");

      const sortedProperties = [...response?.data].sort((a, b) => {
    const aHasListing = (a.listing_types?.length ?? 0) > 0;
    const bHasListing = (b.listing_types?.length ?? 0) > 0;

    return Number(aHasListing) - Number(bHasListing);
});

      setProperties(sortedProperties); // Assuming properties state
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const [selectedPropertyIndex, setselectedPropertyIndex] = useState(1);
  const [ListingTypes, setListingTypes] = useState([]);

  const toggleType = (type) => {
    setListingTypes(
      (prev) =>
        prev.includes(type)
          ? prev.filter((item) => item !== type) // Remove
          : [...prev, type], // Add
    );
  };

  const handleUpdateListingTypes = async (propertyType, property_id) => {
    if (ListingTypes.length === 0) {
      toast.message("Please Choose Atleast one type to Push");
      return;
    }

    try {
      setPushing(true);
      const response = await updateListingTypes(
        propertyType,
        property_id,
        ListingTypes,
      );

      toast.success(response.message);
      setsteps(5);

      console.log(response.data);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setPushing(false);
    }
  };

  useEffect(() => {
    fetchProperty();
  }, []);
  return (
    <div className="flex flex-col items-center gap-8 font-[Inter] p-6 max-w-4xl w-full mx-auto justify-between h-[85vh] ">
      {steps === 1 && (
        <div className="flex flex-col items-center gap-8 w-full h-full justify-between">
          <div>
            <div className="flex flex-col items-center justify-center gap-3">
              <h1 className="text-[#000000] font-bold text-[28px]">
                What is LIAM Network?
              </h1>

              <p className="text-[#6B7280] text-[14px] leading-[20px] text-center">
                LAWN connects your property with serious investors whose
                investment goals align with your property.
              </p>
            </div>

            <LiamNetwork />

            <div className="pt-[20px] flex flex-col gap-4 font-medium text-[14px] text-[#000000] ">
              <h1 className="flex items-center gap-3">
                {" "}
                <Eye color="#166534" />
                More visibility for your property
              </h1>
              <h1 className="flex items-center gap-3">
                {" "}
                <CheckCircle2 color="#166534" />
                Better matches with qualified investors
              </h1>
              <h1 className="flex items-center gap-3">
                {" "}
                <Users color="#166534" />
                Higher quality leads
              </h1>
              <h1 className="flex items-center gap-3">
                {" "}
                <BarChart2 color="#166534" />
                Smarter and data-driven distribution
              </h1>
            </div>
          </div>

          <button
            onClick={() => {
              setsteps(2);
            }}
            className="bg-[green] rounded-[16px] px-6 py-4 w-full font-semibold text-[16px] text-white"
          >
            Continue
          </button>
        </div>
      )}

      {/* -------------------------------------------------------------- */}
      {steps === 2 && (
        <div className="flex flex-col items-center gap-8 w-full h-full justify-between">
          <div className="w-full flex flex-col gap-2">
            <div className="w-full flex items-center justify-between">
              <ChevronLeft
                onClick={() => {
                  setsteps(1);
                }}
              />
            </div>
            <div className="flex flex-col items-start justify-center gap-3">
              <h1 className="text-[#000000] font-bold text-[28px]">
                How Matching Works
              </h1>

              <p className="text-[#6B7280] text-[14px] leading-[20px] ">
                We use data and intelligence to connect the right buyers.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="pt-[20px] flex flex-col gap-5 font-medium text-[14px] text-[#000000]">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-[#DCFCE7] rounded-full flex items-center justify-center">
                  <Target color="#166534" />
                </div>

                <div className="flex flex-col gap-1">
                  <h1 className="text-[#111827] font-semibold text-[16px]">
                    Investment Goals
                  </h1>
                  <p className="text-[#6B7280] text-[12px]">
                    We understand what investors are trying to achieve.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-[#DCFCE7] rounded-full flex items-center justify-center">
                  <Compass color="#166534" />
                </div>

                <div className="flex flex-col gap-1">
                  <h1 className="text-[#111827] font-semibold text-[16px]">
                    Investment Strategy
                  </h1>
                  <p className="text-[#6B7280] text-[12px]">
                    We analyze buy criteria, hold period and cash flow focus.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-[#DCFCE7] rounded-full flex items-center justify-center">
                  <MapPin color="#166534" />
                </div>

                <div className="flex flex-col gap-1">
                  <h1 className="text-[#111827] font-semibold text-[16px]">
                    Market Preferences
                  </h1>
                  <p className="text-[#6B7280] text-[12px]">
                    We match based on preferred locations and asset types.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-[#DCFCE7] rounded-full flex items-center justify-center">
                  <Layers color="#166534" />
                </div>

                <div className="flex flex-col gap-1">
                  <h1 className="text-[#111827] font-semibold text-[16px]">
                    Property Characteristics
                  </h1>
                  <p className="text-[#6B7280] text-[12px]">
                    We evaluate cash flow, appreciation, price range and more.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 bg-[#DCFCE7] flex items-center gap-4 rounded-[20px]">
              <div className="w-10 h-10 rounded-full flex shrink-0 items-center justify-center bg-white">
                <Users color="#166534" />
              </div>

              <div className="flex flex-col gap-[2px]">
                <h1 className="text-[#14532D] text-[14px] font-semibold">
                  Qualified Matches
                </h1>
                <p className="text-[#14532D] text-[12px]">
                  Your property is shown to investors most likely to take
                  action.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setsteps(3);
            }}
            className="bg-[green] rounded-[16px] px-6 py-4 w-full font-semibold text-[16px] text-white"
          >
            Continue
          </button>
        </div>
      )}

      {/* -------------------------------------------------------------- */}
      {steps === 3 && (
        <div className="flex flex-col items-center gap-8 w-full h-full justify-between">
          <div className="flex flex-col gap-2">
            <div className="w-full flex items-center justify-between">
              <ChevronLeft
                onClick={() => {
                  setsteps(2);
                }}
              />
            </div>

            <div className="flex flex-col items-start justify-center gap-3">
              <h1 className="text-[#000000] font-bold text-[28px]">
                What LIAM Will Do For Your Property
              </h1>

              <p className="text-[#6B7280] text-[14px] leading-[20px] ">
                We work around the clock so you don't have to.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="pt-[20px] flex flex-col gap-5 font-medium text-[14px] text-[#000000]">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-[#DCFCE7] rounded-full flex items-center justify-center">
                  <Search color="#166534" />
                </div>

                <div className="flex flex-col gap-1">
                  <h1 className="text-[#111827] font-semibold text-[16px]">
                    Analyze Your Property
                  </h1>
                  <p className="text-[#6B7280] text-[12px]">
                    We evaluate key metrics and investment potential.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-[#DCFCE7] rounded-full flex items-center justify-center">
                  <Users color="#166534" />
                </div>

                <div className="flex flex-col gap-1">
                  <h1 className="text-[#111827] font-semibold text-[16px]">
                    Match to Investor Profiles
                  </h1>
                  <p className="text-[#6B7280] text-[12px]">
                    We find investors whose goals align with your property.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-[#DCFCE7] rounded-full flex items-center justify-center">
                  <Zap color="#166534" />
                </div>

                <div className="flex flex-col gap-1">
                  <h1 className="text-[#111827] font-semibold text-[16px]">
                    Surface to Relevant Buyers
                  </h1>
                  <p className="text-[#6B7280] text-[12px]">
                    Your property is shown to highly relevant, qualified
                    investors.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-[#DCFCE7] rounded-full flex items-center justify-center">
                  <Bell color="#166534" />
                </div>

                <div className="flex flex-col gap-1">
                  <h1 className="text-[#111827] font-semibold text-[16px]">
                    Notify Interested Buyers
                  </h1>
                  <p className="text-[#6B7280] text-[12px]">
                    We alert investors who show genuine interest.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-[#DCFCE7] rounded-full flex items-center justify-center">
                  <Activity color="#166534" />
                </div>

                <div className="flex flex-col gap-1">
                  <h1 className="text-[#111827] font-semibold text-[16px]">
                    Track Engagement
                  </h1>
                  <p className="text-[#6B7280] text-[12px]">
                    You can see views, saves and inquiries in one place.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setsteps(4);
            }}
            className="bg-[green] rounded-[16px] px-6 py-4 w-full font-semibold text-[16px] text-white"
          >
            Continue
          </button>
        </div>
      )}

      {/* -------------------------------------------------------------- */}
      {steps === 4 && (
        <div className="flex flex-col items-center gap-8 w-full h-full justify-between">
          <div className="flex flex-col gap-2">
            <div className="w-full flex items-center justify-between">
              <ChevronLeft
                onClick={() => {
                  setsteps(3);
                }}
              />
            </div>

            <div className="flex flex-col items-start justify-center gap-3">
              <h1 className="text-[#000000] font-bold text-[28px]">
                Choose Property to Submit
              </h1>

              <p className="text-[#6B7280] text-[14px] leading-[20px] ">
                Review your property details before submitting to LIAM Network.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-8 w-full">
            {properties?.map((property, i) => {
              return (
                <div
                  key={i}
                  onClick={() => {
                    setselectedPropertyIndex(property?.zpid);
                  }}
                  className="p-3 shadow-sm shadow-[#0000000A] border border-[#E2E8F0] bg-white flex rounded-[16px] gap-5 items-start flex-col justify-between"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-start gap-8">
                      <div className="w-24 h-24 rounded-[12px] overflow-hidden bg-green-200 shrink-0">
                        <img
                          src={property?.property_image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex flex-col items-start justify-between gap-3">
                        <div className="flex flex-col gap-[2px]">
                          <h1 className="text-[#0F172A] font-bold text-[16px]">
                            {property?.property_name}
                          </h1>
                          {/* <p className='text-[#64748B] text-[14px]'>Austin, TX 78704</p> */}
                        </div>

                        <div className={`flex items-center gap-4 justify-between  w-full border-[#cfcfd7] ${property?.listing_types?.length === 0 && 'pb-3 border-b'}`}>
                          <div className="flex flex-col gap-[2px]">
                            <p className="text-[#64748B] font-semibold text-[11px]">
                              Value
                            </p>
                            <h1 className="text-[#0F172A] text-[14px] font-bold">
                              $
                              {parseInt(property?.price).toLocaleString(
                                "en-us",
                              )}
                            </h1>
                          </div>
                          <div className="flex flex-col gap-[2px]">
                            <p className="text-[#64748B] font-semibold text-[11px]">
                              Type
                            </p>
                            <h1 className="text-[#0F172A] text-[14px] font-bold">
                              {property?.propertyType}
                            </h1>
                          </div>
                        </div>

                        {property?.listing_types?.length === 0 && (
                          <div className="flex flex-col gap-3  w-full">
                            <h1 className="text-xs">
                              What's Your Motive to Push
                            </h1>

                            <div className="flex gap-4 items-center justify-between">
                              <div
                                onClick={() => toggleType("Sale")}
                                className="flex items-center gap-2"
                              >
                                <div className="w-4 h-4 border rounded-sm border-[#cfcfd7] flex items-center justify-center">
                                  {selectedPropertyIndex === property?.zpid &&
                                    ListingTypes.includes("Sale") && (
                                      <Check
                                        className="text-[#22C55E]"
                                        strokeWidth={5}
                                      />
                                    )}
                                </div>
                                <h1 className="text-sm font-medium">
                                  For Sale
                                </h1>
                              </div>
                              <div
                                onClick={() => toggleType("Rent")}
                                className="flex items-center gap-2"
                              >
                                <div className="w-4 h-4 border rounded-sm border-[#cfcfd7] flex items-center justify-center">
                                  {selectedPropertyIndex === property?.zpid &&
                                    ListingTypes.includes("Rent") && (
                                      <Check
                                        className="text-[#22C55E]"
                                        strokeWidth={5}
                                      />
                                    )}
                                </div>
                                <h1 className="text-sm font-medium">
                                  For Rent
                                </h1>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="w-full flex flex-col gap-4">
                    <button
                      onClick={() => {
                        handleUpdateListingTypes(
                          property.propertyType,
                          property.property_id,
                        );
                      }}
                      disabled={
                        property?.zpid !== selectedPropertyIndex ||
                        property?.listing_types?.length !== 0
                      }
                      className="py-3 px-4 bg-[green] rounded-xl w-full font-medium text-white disabled:opacity-50"
                    >
                      {property?.listing_types?.length === 0
                        ? pushing
                          ? "Pushing..."
                          : "Push To LIAM Network"
                        : "Already Pushed"}
                    </button>
                  </div>
                </div>
              );
            })}

            {/* <div className='flex items-center gap-3'>
                                    <div className='w-6 h-6 rounded-[6px] border border-[#6B7280]'>

                                    </div>

                                    <p className='text-[#111827] text-[13px]'>I confirm that the information provided is accurate.</p>
                                </div>



                    </div>

                   <div className='flex flex-col gap-4 items-center justify-center w-full'> <button 
                    onClick={()=>{setsteps(5)}}
                    className='bg-[green] rounded-[16px] px-6 py-4 w-full font-semibold text-[16px] text-white' >Submit To LIAM Network</button> */}

            <p className="text-[#9CA3AF] text-[12px] text-center">
              You can edit details anytime before the network goes live.
            </p>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------- */}
      {steps === 5 && (
        <div className="flex flex-col items-center gap-8 w-full h-full justify-between">
          <div className="flex flex-col items-center justify-center gap-8 pt-5">
            <CircleCheck
              className=""
              fill="#22C55E"
              color="white"
              size={150}
              strokeWidth={1}
            />
            <div className="flex flex-col items-center justify-center gap-3">
              <h1 className="text-[#000000] font-extrabold text-[32px]">
                Property Submitted!
              </h1>

              <p className="text-[#6B7280] text-[16px] font-medium  text-center">
                Your property has been submitted to LIAM Network.
              </p>
            </div>

            <div className="bg-[#F2F4F7] rounded-[24px] p-6 gap-4 flex flex-col w-full">
              <h1 className="text-[#14532D] text-[14px] font-bold">
                You'll be the first to:
              </h1>

              <p className="text-[14px] font-medium text-[#1A1A1A] flex items-center gap-3">
                <CircleCheckBig color="#22C55E" />
                Early access to the network
              </p>
              <p className="text-[14px] font-medium text-[#1A1A1A] flex items-center gap-3">
                <CircleCheckBig color="#22C55E" />
                Priority review
              </p>
              <p className="text-[14px] font-medium text-[#1A1A1A] flex items-center gap-3">
                <CircleCheckBig color="#22C55E" />
                First distribution wave
              </p>
              <p className="text-[14px] font-medium text-[#1A1A1A] flex items-center gap-3">
                <CircleCheckBig color="#22C55E" />
                Investor matching queue
              </p>
            </div>
          </div>

          <img src={LIAMNetworkSubmittedImg} alt="" />

          <div className="flex flex-col gap-3 w-full">
            <button
              onClick={() => {
                setsteps(2);
              }}
              className="bg-[green] rounded-[16px] px-6 py-4 w-full font-semibold text-[16px] text-white"
            >
              Done
            </button>

            <button className="text-[green] font-semibold w-full flex items-center justify-center">
              Back to Home
            </button>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------- */}
    </div>
  );
};

export default LIAMNetworkFlow;
