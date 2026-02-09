import React, { useState } from 'react';
import { AuthCard } from './AuthCard';
import { InputField } from './InputField';
import { Button } from '@/app/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

interface ForgotPasswordScreenProps {
  onSendResetLink: (email: string) => void;
  onBackToSignIn: () => void;
}

export function ForgotPasswordScreen({ onSendResetLink, onBackToSignIn }: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsSubmitted(true);
      onSendResetLink(email);
      setIsLoading(false);
    }, 500);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-6 mx-auto">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-[24px] font-semibold text-gray-900 tracking-tight mb-2">
              Check your email
            </h1>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <p className="text-[15px] text-gray-600">
                  If your email exists in our system, a reset link has been sent to:
                </p>
                <p className="text-[15px] font-semibold text-gray-900">{email}</p>
              </div>
              <p className="text-sm text-gray-500">
                Please check your inbox and spam folder.
              </p>

              <Button
                onClick={onBackToSignIn}
                variant="outline"
                className="w-full h-11 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all font-semibold rounded-lg"
              >
                Back to sign in
              </Button>
            </div>
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
            Reset your password
          </h1>
          <p className="text-[15px] text-gray-600">
            Enter your email and we'll send a reset link.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="you@company.com"
              required
            />

            <div className="space-y-3">
              <Button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11 rounded-lg transition-all shadow-sm hover:shadow disabled:opacity-50"
              >
                {isLoading ? 'Sending...' : 'Send reset link'}
              </Button>

              <button
                type="button"
                onClick={onBackToSignIn}
                className="w-full text-[13px] text-gray-600 hover:text-gray-900 font-semibold transition-colors py-2"
              >
                Back to sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}