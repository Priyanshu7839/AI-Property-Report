import React, { useState } from 'react';
import { AuthCard } from './AuthCard';
import { InputField } from './InputField';
import { Button } from '@/app/components/ui/button';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Textarea } from '@/app/components/ui/textarea';
import { CheckCircle2 } from 'lucide-react';

interface RequestInviteScreenProps {
  onSubmitRequest: (data: any) => void;
  onBackToSignIn: () => void;
}

export function RequestInviteScreen({ onSubmitRequest, onBackToSignIn }: RequestInviteScreenProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [state, setState] = useState('');
  const [county, setCounty] = useState('');
  const [zipCodes, setZipCodes] = useState('');
  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const roles = [
    'Mortgage Partner',
    'Insurance Partner',
    'Real Estate Partner',
    'Tax Advisor',
    'Financial Advisor'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    onSubmitRequest({
      fullName,
      email,
      role,
      state,
      county,
      zipCodes,
      company,
      website,
      message
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <AuthCard title="Request received" subtitle="">
          <div className="flex flex-col items-center text-center py-6">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>

            <p className="text-gray-600 mb-2">Thank you for your interest!</p>
            <p className="text-sm text-gray-500 mb-8 max-w-sm">
              Our team will review your request and respond within 2 business days.
            </p>

            <Button
              onClick={onBackToSignIn}
              variant="outline"
              className="w-full"
            >
              Back to sign in
            </Button>
          </div>
        </AuthCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <AuthCard 
        title="Request access" 
        subtitle="Tell us who you are and what region you cover."
        width="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputField
              label="Full Name"
              type="text"
              value={fullName}
              onChange={setFullName}
              placeholder="John Smith"
              required
            />

            <InputField
              label="Work Email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="you@company.com"
              required
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-900 mb-2 block">
              Role <span className="text-red-500">*</span>
            </Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((r) => (
                  <SelectItem key={r} value={r}>{r}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Coverage Geography</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <InputField
                label="State"
                type="text"
                value={state}
                onChange={setState}
                placeholder="CA"
                required
              />

              <InputField
                label="County"
                type="text"
                value={county}
                onChange={setCounty}
                placeholder="Santa Clara"
              />

              <InputField
                label="ZIP Codes"
                type="text"
                value={zipCodes}
                onChange={setZipCodes}
                placeholder="94085, 94086, 94087"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputField
              label="Company Name"
              type="text"
              value={company}
              onChange={setCompany}
              placeholder="Your Company LLC"
            />

            <InputField
              label="Website"
              type="url"
              value={website}
              onChange={setWebsite}
              placeholder="https://yourcompany.com"
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-900 mb-2 block">
              Message (Optional)
            </Label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us more about your business and why you'd like to join..."
              rows={4}
              className="resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              type="submit" 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Submit request
            </Button>
            <Button 
              type="button"
              onClick={onBackToSignIn}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </AuthCard>
    </div>
  );
}
