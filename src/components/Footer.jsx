import React from "react";
import PexIconWhite from "../assets/House.jpeg";
import { Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const footerLinks = [
    {
      title: "Product",
      links: [
        "Tenant Hub",
        "AI Property Reports",
        "Portfolio Management",
        "Mortgage Optimisation",
        "Insurance Optimisation",
      ],
    },
    {
      title: "Solutions",
      links: [
        "Homeowners",
        "Real Estate Agents",
        "Landlords",
        "Property Managers",
        "FinTech Partners",
      ],
    },
    {
      title: "Company",
      links: [
        "AboutUs",
        "Team",
        "Legal & Compliance",
        "Investor Relations",
        "Contact",
      ],
    },
    {
      title: "Resources",
      links: [
        "Help Center",
        "Blog & Insights",
        "Developer API",
        "Privacy Policy",
        "Cookies",
      ],
    },
  ];

  return (
    <div className="max-w-9xl w-full rounded-t-[18.38px] pt-10 pb-6 px-10 bg-[#1A1A1A] ">
      <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-8 border-b border-[#FFFFFF14] pb-10">
        <div className="flex flex-col gap-3 lg:w-auto w-full">
          <div className="flex items-center gap-2">
            <img src={PexIconWhite} alt="" className='w-10 h-10 aspect-square rounded-md'/>
            <div>
              <p className="text-[10.77px] text-[#FFFFFF66]">
                Powered by LIAM
              </p>
                <div className="text-[#fff]/60 tracking-tight font-medium relative inline-flex items-baseline">
            <span
            >AIPropertyReport</span>
            <span
              className="text-[#fff]"
              style={{
                fontFamily: "Comic Sans MS, cursive",
                transform: "rotate(-4deg)",
                fontSize: "1em",
                opacity: 0.92,
                fontWeight: 600,
                letterSpacing: "0.5px",
                marginLeft: "1px",
                textShadow: "0.5px 0.5px 0 #fff, -0.3px 0.3px 0 #fff",
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
                stroke="#fff"
                strokeWidth="2.5"
                opacity="0.88"
                strokeLinecap="round"
              />
            </svg>
          </div>
            </div>
          </div>
          <div className="bg-[#262626] border border-[#FFFFFF14] lg:p-2 p-4 rounded-lg sm:w-[225px] w-full">
            <p className="text-[12px] font-medium text-[#ffffff]">
              AI-driven insights to unlock the true potential of your real
              estate assets.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-8 flex-wrap lg:flex-nowrap ">
          {footerLinks.map((link, i) => {
            return (
              <div key={i} className="flex flex-col sm:gap-4 gap-2 w-[43%] lg:w-auto">
                <h1 className="text-[16px] font-bold text-[#FFFFFF78]">
                  {link.title}
                </h1>

                <div className="flex flex-col gap-2.5">
                  {link.links.map((item, j) => {
                    return (
                      <a
                        href="#"
                        key={j}
                        className="text-[12px] text-[#FFFFFF]"
                      >
                        {item}
                      </a>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

      <div className="flex flex-col gap-3  w-full lg:w-auto">
          <div className="flex flex-col gap-2">
          <h1 className="text-[16px] font-bold text-[#FFFFFF78]">
            Get the app
          </h1>
          <div className="flex gap-2">
            <button className="rounded-[9.19px] bg-[#FFFFFF12] py-1 px-4 flex gap-1 items-center w-full lg:w-auto">
              <svg
                width="15"
                height="19"
                viewBox="0 0 15 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_52_853)">
                  <path
                    d="M12.1534 9.58481C12.1534 9.66217 12.0373 11.9458 14.5532 13.1457C14.0887 14.5778 12.4631 17.7516 10.5665 17.7516C9.48278 17.7516 8.86351 17.0549 7.62495 17.0549C6.34767 17.0549 5.65097 17.7516 4.68334 17.7516C2.82549 17.829 1.04504 14.3455 0.541874 12.9134C0.154821 11.8297 0 10.7847 0 9.77829C0 6.33353 2.28361 4.6692 4.45111 4.6305C5.49615 4.6305 6.81213 5.3659 7.39271 5.3659C7.93455 5.3659 9.4441 4.47568 10.8375 4.59179C12.2696 4.70791 13.3533 5.24978 14.0887 6.29483C12.8115 7.10764 12.1534 8.1527 12.1534 9.58481ZM9.98594 3.23711C9.21186 4.12733 8.28291 4.6305 7.2766 4.55309C7.19919 3.50804 7.58624 2.54041 8.28291 1.7663C8.90219 1.06961 9.98594 0.489031 10.9149 0.411621C10.9149 0.83738 11.031 1.99854 9.98594 3.23711Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_52_853">
                    <rect width="14.5532" height="18.383" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <div className="flex items-start flex-col border-l border-[#FFFFFF33] pl-2">
                <p className="text-[11px] text-[#FFFFFF78]">Download on the</p>
                <h1 className="text-white text-[14px] font-bold">App Store</h1>
              </div>
            </button>
            <button className="rounded-[9.19px] bg-[#FFFFFF12] py-1 px-4 flex gap-1 items-center w-full sm:w-auto">
              <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_52_860)">
<path d="M9.87365 8.39113L2.60007 1.0846L11.8484 6.41638L9.87365 8.39113ZM0.724069 0.656738L9.14959 9.08225L0.724069 17.5078C0.29621 17.3103 0 16.8825 0 16.3559V1.84158C0 1.31499 0.29621 0.887121 0.724069 0.656738ZM14.7117 8.09493C15.3371 8.55566 15.3371 9.64178 14.7447 10.1026L12.77 11.2216L10.5977 9.08225L12.77 6.97589L14.7117 8.09493ZM2.60007 17.0799L9.87365 9.80631L11.8484 11.7811L2.60007 17.0799Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_52_860">
<rect width="15.3191" height="17.617" fill="white"/>
</clipPath>
</defs>
</svg>


              <div className="flex items-start flex-col border-l border-[#FFFFFF33] pl-2">
                <p className="text-[11px] text-[#FFFFFF78]">Get it on</p>
                <h1 className="text-white text-[14px] font-bold">Google Play</h1>
              </div>
            </button>
          </div>
        </div>
        <div className="w-full bg-[#2A2A2A] rounded-[9.19px] flex py-0.5 pl-0.5">
            <div className="shrink-0 py-2 px-4 flex items-center h-full text-[16px] text-[#FFFFFF] font-medium bg-[#1a1a1a] rounded-l-lg">
                Follow Us
            </div>
            <div className="py-1 px-4 flex justify-between items-center  w-full">
                <Facebook size={16} color={"#fff"} />
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.04688 14.3335L7.19894 9.18146M7.19894 9.18146L2.04688 2.04785H5.45956L9.18048 7.19992M7.19894 9.18146L10.9199 14.3335H14.3325L9.18048 7.19992M14.3325 2.04785L9.18048 7.19992" stroke="white" stroke-width="2.23376" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                    <Instagram  size={16} color={"#fff"} />
                    <Linkedin size={16} color={"#fff"} />
            </div>
        </div>
      </div>
      </div>
      <div className="w-full flex items-center justify-center text-[12px] text-[#FFFFFF] pt-6">
        <p>Copyright © 2026. AI Property Report</p>
      </div>
    </div>
  );
};

export default Footer;
