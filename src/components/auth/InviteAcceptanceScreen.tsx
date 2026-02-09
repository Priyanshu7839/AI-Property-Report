import React, { useState } from 'react';
import { AuthCard } from './AuthCard';
import { InputField } from './InputField';
import { Button } from '@/app/components/ui/button';
import { RoleBadge } from './RoleBadge';
import { Building2, MapPin, DollarSign } from 'lucide-react';

interface InviteAcceptanceScreenProps {
  inviteEmail: string;
  inviteRole: string;
  inviteOrganization: string;
  inviteCoverage: string;
  invitePricingModel: string;
  onAcceptInvite: (name: string, password: string) => void;
}

export function InviteAcceptanceScreen({
  inviteEmail,
  inviteRole,
  inviteOrganization,
  inviteCoverage,
  invitePricingModel,
  onAcceptInvite
}: InviteAcceptanceScreenProps) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;
  const canSubmit = name && password && passwordsMatch && password.length >= 10;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canSubmit) {
      setIsLoading(true);
      setTimeout(() => {
        onAcceptInvite(name, password);
        setIsLoading(false);
      }, 300);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="text-[28px] font-semibold text-gray-900 tracking-tight mb-2">
            You've been invited
          </h1>
          <p className="text-[15px] text-gray-600">
            Create your account to access your portal.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Left side - Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <InputField
                  label="Email"
                  type="email"
                  value={inviteEmail}
                  onChange={() => {}}
                  disabled
                />

                <InputField
                  label="Full name"
                  type="text"
                  value={name}
                  onChange={setName}
                  placeholder="John Smith"
                  required
                />

                <InputField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={setPassword}
                  placeholder="Create a password (min. 10 characters)"
                  required
                  helperText="Must be at least 10 characters"
                />

                <InputField
                  label="Confirm password"
                  type="password"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  placeholder="Confirm your password"
                  required
                  error={confirmPassword && !passwordsMatch ? 'Passwords do not match' : undefined}
                />

                <Button 
                  type="submit" 
                  disabled={!canSubmit || isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11 rounded-lg transition-all shadow-sm hover:shadow disabled:opacity-50"
                >
                  {isLoading ? 'Creating account...' : 'Create account'}
                </Button>
              </form>
            </div>

            {/* Right side - Role preview */}
            <div>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 h-full">
                <div className="mb-5">
                  <p className="text-[11px] font-bold text-gray-500 tracking-wide mb-2.5">YOUR ROLE</p>
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-[17px] font-semibold text-gray-900">{inviteRole}</h3>
                    <RoleBadge role="Active" variant="active" />
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <p className="text-[11px] font-bold text-gray-500 tracking-wide">ORGANIZATION</p>
                    </div>
                    <p className="text-[15px] text-gray-900 pl-6">{inviteOrganization}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <p className="text-[11px] font-bold text-gray-500 tracking-wide">COVERAGE</p>
                    </div>
                    <p className="text-[15px] text-gray-900 pl-6">{inviteCoverage}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      <p className="text-[11px] font-bold text-gray-500 tracking-wide">PRICING MODEL</p>
                    </div>
                    <p className="text-[15px] text-gray-900 pl-6">{invitePricingModel}</p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-xs text-gray-500 leading-relaxed">
                    By creating an account, you agree to receive leads matching your coverage area and pricing model.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}