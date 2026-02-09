import React, { useState } from 'react';
import { AuthCard } from './AuthCard';
import { InputField } from './InputField';
import { Button } from '@/app/components/ui/button';
import { CheckCircle2, Check } from 'lucide-react';

interface ResetPasswordScreenProps {
  onResetPassword: (password: string) => void;
}

export function ResetPasswordScreen({ onResetPassword }: ResetPasswordScreenProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const passwordRules = [
    { rule: 'Minimum 10 characters', met: password.length >= 10 },
    { rule: 'Contains a number', met: /\d/.test(password) },
    { rule: 'Contains a special character', met: /[!@#$%^&*(),.?":{}|<>]/.test(password) }
  ];

  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;
  const allRulesMet = passwordRules.every(r => r.met);
  const canSubmit = allRulesMet && passwordsMatch;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canSubmit) {
      setIsSubmitted(true);
      setTimeout(() => {
        onResetPassword(password);
      }, 1500);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <AuthCard title="Password updated" subtitle="">
          <div className="flex flex-col items-center text-center py-6">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>

            <p className="text-gray-600 mb-2">Your password has been updated successfully.</p>
            <p className="text-sm text-gray-500">Redirecting to sign in...</p>
          </div>
        </AuthCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <AuthCard title="Create a new password" subtitle="">
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="New password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Enter new password"
            required
          />

          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-700">Password requirements:</p>
            <ul className="space-y-1.5">
              {passwordRules.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-xs">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    item.met ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {item.met && <Check className="w-3 h-3 text-green-600" />}
                  </div>
                  <span className={item.met ? 'text-gray-700' : 'text-gray-500'}>
                    {item.rule}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <InputField
            label="Confirm password"
            type="password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="Confirm new password"
            required
            error={confirmPassword && !passwordsMatch ? 'Passwords do not match' : undefined}
          />

          <Button 
            type="submit" 
            disabled={!canSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
          >
            Update password
          </Button>
        </form>
      </AuthCard>
    </div>
  );
}
