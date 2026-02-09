import React, { useState, useEffect } from 'react';
import { AuthCard } from './AuthCard';
import { Button } from '@/app/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/app/components/ui/input-otp';
import { CheckCircle2 } from 'lucide-react';

interface OTPVerificationScreenProps {
  email: string;
  onVerify: (code: string) => void;
  onResend: () => void;
  onTryAnother: () => void;
}

export function OTPVerificationScreen({ 
  email, 
  onVerify, 
  onResend, 
  onTryAnother 
}: OTPVerificationScreenProps) {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(60);
  const [isVerified, setIsVerified] = useState(false);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleOTPChange = (value: string) => {
    setOtp(value);
    if (value.length === 6) {
      // Auto-verify when 6 digits entered
      setTimeout(() => {
        setIsVerified(true);
        setTimeout(() => {
          onVerify(value);
        }, 1500);
      }, 500);
    }
  };

  const handleResend = () => {
    setTimer(60);
    setCanResend(false);
    onResend();
  };

  if (isVerified) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md text-center">
          <div className="flex flex-col items-center py-8">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4 animate-in zoom-in duration-300">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-[24px] font-semibold text-gray-900 tracking-tight mb-2">
              Verified
            </h1>
            <p className="text-[15px] text-gray-600">Redirecting to your workspace...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-[28px] font-semibold text-gray-900 tracking-tight mb-2">
            Verify your sign-in
          </h1>
          <p className="text-[15px] text-gray-600">
            Enter the 6-digit code sent to <span className="font-semibold text-gray-900">{email}</span>
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
          <div className="space-y-6">
            <div className="flex justify-center">
              <InputOTP maxLength={6} value={otp} onChange={handleOTPChange}>
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

            <div className="text-center">
              <p className="text-[13px] text-gray-600">
                {timer > 0 ? (
                  <>Code expires in <span className="font-semibold text-gray-900">{timer}s</span></>
                ) : (
                  <span className="text-red-600 font-semibold">Code expired</span>
                )}
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <Button
                onClick={handleResend}
                disabled={!canResend}
                variant="outline"
                className="w-full h-11 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all font-semibold rounded-lg disabled:opacity-50"
              >
                {canResend ? 'Resend code' : `Resend code (${timer}s)`}
              </Button>

              <button
                onClick={onTryAnother}
                className="w-full text-[13px] text-gray-600 hover:text-gray-900 font-semibold transition-colors py-2"
              >
                Try another method
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}