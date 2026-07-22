import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { Switch } from "../../../components/ui/switch";
import { Separator } from "../../../components/ui/separator";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../../../components/ui/input-otp";
import {
  Building2,
  User,
  Mail,
  Lock,
  Phone,
  ChevronRight,
  ArrowLeft,
  X,
} from "lucide-react";
import { ImageWithFallback } from "../../../components/figma/ImageWithFallback";
import Logo from "../../../assets/House.jpeg";
import Banner from "../../assets/IMG/Banner.png";
import { useNavigate, useSearchParams } from "react-router";

import { toast } from "sonner";
import { useDispatch } from "react-redux";


interface LoginScreenProps {
  onLogin: () => void;
  onCancel?: () => void;
  fromPropertyForm?: boolean;
}

export function UserDashboardLogin({
  onLogin,
  onCancel,
  fromPropertyForm = false,
}: LoginScreenProps) {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"email" | "phone" | "google">(
    "email",
  );
  const [showOTP, setShowOTP] = useState(false);
  const [accountType, setAccountType] = useState<"personal" | "business">(
    "personal",
  );
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    otp: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginMethod === "phone" && !showOTP) {
      // Simulate sending OTP
      setShowOTP(true);
      return;
    }
    if (loginMethod === "google") {
      // Simulate Google OAuth
      onLogin();
      return;
    }
    onLogin();
  };


 

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  

  const [signingIn, setSigningIn] = useState(false);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams()
  const redirect = searchParams.get('redirect')
  const address = searchParams.get('address')
 
  const SignInUser = async () => {
    if (formData.email === "" || formData.password === "") {
        toast.error("Please Enter Email and Password Both")
      return;
    }
    if(formData.email !== "kyle@aipropertyreport.com"){
        toast.error("Please Check The Email")
        return
    }
    if(formData.password !== "Kyle@1234"){
        toast.error("Please Check The Password")
        return
    
    }
    navigate('/dashboard')
    setSigningIn(true);

    

   setSigningIn(false)
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-background via-background to-muted/20">
      {/* Back/Cancel Button */}
      {onCancel && (
        <div className="absolute top-6 left-6">
          <Button
            variant="ghost"
            onClick={onCancel}
            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>
        </div>
      )}


      {/* Cute Message when coming from Property Form */}
      {fromPropertyForm && (
        <div className="text-center mb-6">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-white/60 to-gray-50/80 backdrop-blur-sm border border-gray-200/30 shadow-lg">
            <div className="text-2xl mr-3">😅</div>
            <div>
              <p className="text-lg font-medium text-gray-700 mb-1">
                Oops! One Last Step
              </p>
              <p className="text-sm text-gray-600/80">
                Quick login to access your detailed report
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Login/Signup Card */}
      <Card className="w-full max-w-md shadow-2xl border-border/50 backdrop-blur-sm">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl text-left">
            <div className="text-[#000] text-[1.25em] tracking-tight font-medium relative inline-flex mb-3 items-baseline">
              <span>AIPropertyReport</span>
              <span
                className="text-[#000]"
                style={{
                  fontFamily: "Comic Sans MS, cursive",
                  transform: "rotate(-4deg)",
                  fontSize: "1.25em",
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
          </CardTitle>
          <CardDescription className="text-left text-xs">
            {isSignup
              ? "Create your account to get started"
              : "Sign In To View All Stats Of AIPropertyReport account"}
          </CardDescription>
        </CardHeader>

        <CardContent>
       

          

          

          {/* Google Login Direct */}
          {!isSignup && loginMethod === "google" && (
            <div className="space-y-4">
              <Button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full h-12 bg-primary text-primary-foreground hover:opacity-90 shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full border-border/50" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or
                  </span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={() => setLoginMethod("email")}
                className="w-full border-border hover:bg-muted/50 backdrop-blur-sm"
              >
                Use Email Instead
              </Button>
            </div>
          )}

          {/* Form for Email/Phone Login and Signup */}
          {(isSignup || (!isSignup && loginMethod !== "google")) && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* OTP Flow for Phone Login */}
              {!isSignup && loginMethod === "phone" && showOTP && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowOTP(false)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      Sent to {formData.phone}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <Label>Enter 6-digit OTP</Label>
                    <div className="flex justify-center">
                      <InputOTP
                        maxLength={6}
                        value={formData.otp}
                        onChange={(value) => handleInputChange("otp", value)}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-14 bg-primary text-primary-foreground hover:opacity-90 shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm"
                    disabled={formData.otp.length !== 6}
                  >
                    Verify & Sign In
                  </Button>

                  <div className="text-center">
                    <button
                      type="button"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => {
                        // Simulate resending OTP
                        alert("OTP resent!");
                      }}
                    >
                      Didn't receive code? Resend
                    </button>
                  </div>
                </div>
              )}

              {/* Phone Number Input for OTP */}
              {!isSignup && loginMethod === "phone" && !showOTP && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+49 1234 567890"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className="pl-12 h-14 text-base bg-input backdrop-blur-sm border-border"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-14 bg-primary text-primary-foreground hover:opacity-90 shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm"
                    disabled={!formData.phone}
                  >
                    Send OTP
                  </Button>
                </div>
              )}

              {/* Email Login Form */}
              {!isSignup && loginMethod === "email" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="pl-12 h-14 text-base bg-input backdrop-blur-sm border-border"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
                        className="pl-12 h-14 text-base bg-input backdrop-blur-sm border-border"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="button"
                    onClick={() => {
                      SignInUser()
                    }}
                    className="w-full h-14 bg-primary text-primary-foreground hover:opacity-90 shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm"
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <span>{
                        signingIn?'LoggingIn...':'Sign In'
                        }</span>
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </Button>
                </>
              )}

              {/* Sign Up Form */}
              {isSignup && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className="pl-12 h-14 text-base bg-input backdrop-blur-sm border-border"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="pl-12 h-14 text-base bg-input backdrop-blur-sm border-border"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
                        className="pl-12 h-14 text-base bg-input backdrop-blur-sm border-border"
                        required
                      />
                    </div>
                  </div>

                  {/* <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="pl-12 h-14 text-base bg-input backdrop-blur-sm border-border"
                        required
                      />
                    </div>
                  </div> */}

                  <Button
                    type="button"
                    onClick={() => {
                      SignUpUser();
                    }}
                    className="w-full h-14 bg-primary text-primary-foreground hover:opacity-90 shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm"
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <span>
                        {signingUp ? "Creating..." : "Create Account"}
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </Button>

                  {/* Google Sign Up Option */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator className="w-full border-border/50" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or
                      </span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGoogleLogin}
                    className="w-full h-14 border-border hover:bg-muted/50 backdrop-blur-sm"
                  >
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Sign up with Google
                  </Button>
                </>
              )}
            </form>
          )}

          {/* Footer Links */}
          {!showOTP && (
            <div className="mt-6 text-center space-y-4">
              <div className="flex justify-center space-x-6 text-sm">
                <button className="text-primary hover:opacity-80 transition-colors">
                  Forgot Password?
                </button>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>© 2026 AI Property Report.</p>
      </div>
    </div>
  );
}
