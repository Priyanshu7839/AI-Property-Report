import { ChevronLeft } from "lucide-react";
import React from "react";
import { FaApple, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center gap-8 font-[Inter] p-6 max-w-4xl w-full mx-auto justify-center h-[85vh] ">
      <div className="flex flex-col gap-6 w-full items-start">
        <ChevronLeft 
         onClick={()=>{
                navigate('/')
              }}
        />

        <div className="font-bold text-[#111827] text-[30px] flex flex-col gap-2">
          <h1>Welcome Back</h1>
          <p className="text-[16px] font-normal text-[#6B7280]">
            Sign in to continue to LIAM
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------------------------------------ */}

      <div className="flex flex-col gap-5 w-full items-start">
        <div className="flex flex-col items-start gap-2 w-full">
          <label
            htmlFor=""
            className="text-[#111827] text-[14px] font-semibold"
          >
            Email
          </label>
          <input
            type="text"
            placeholder="Enter Your Email"
            className="border border-[#E5E7EB] rounded-[12px] bg-[#F9FAFB] placeholder:text-[#9CA3AF] text-[16px] px-4 py-3 w-full"
          />
        </div>
        <div className="flex flex-col items-start gap-2 w-full">
          <label
            htmlFor=""
            className="text-[#111827] text-[14px] font-semibold "
          >
            Password
          </label>
          <input
            type="text"
            placeholder="Enter Your Password"
            className="border border-[#E5E7EB] rounded-[12px] bg-[#F9FAFB] placeholder:text-[#9CA3AF] text-[16px] px-4 py-3 w-full"
          />
          <div className="flex items-center justify-end w-full text-[13px] text-[#6B7280] font-semibold">
            Forgot password?
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------------------------------------- */}
      <button 
      onClick={()=>{navigate('/AskLIAM/Home')}}
      className="px-5 py-3 bg-[#000000] font-semibold text-[16px] text-[#FFFFFF] w-full rounded-[12px]">
        Sign In
      </button>
      {/* --------------------------------------------------------------------------------------- */}

    
     
      {/* --------------------------------------------------------------------------------------- */}
      <div className="text-[14px] text-[#6B7280]">
        Don't have an account?{" "}
        <span className="font-semibold text-[#22C55E]"
         onClick={()=>{
                navigate('/AskLIAM/Signup')
              }}
        >Sign up</span>
      </div>
    </div>
  );
};

export default Login;
