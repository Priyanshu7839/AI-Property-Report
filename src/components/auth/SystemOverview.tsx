import React from 'react';
import { Button } from '@/app/components/ui/button';
import { X } from 'lucide-react';

interface SystemOverviewProps {
  onClose: () => void;
}

export function SystemOverview({ onClose }: SystemOverviewProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Authentication System Overview</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Introduction */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Unified Login + Multi-Role Workspace + Invite System
            </h3>
            <p className="text-gray-600 leading-relaxed">
              A premium, enterprise-grade authentication system for AIPropertyReport.com that supports 
              multiple user roles, workspace management, partner onboarding, and secure access control. 
              Designed with the polish of Stripe, the professionalism of McKinsey, and the elegance of Sequoia.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Authentication Flows */}
            <div className="border border-gray-200 rounded-lg p-5">
              <h4 className="text-base font-semibold text-gray-900 mb-3">🔐 Authentication Flows</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Email/password login with validation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Google SSO integration (UI ready)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Optional 2FA/OTP verification layer</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Password reset with email link flow</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Session management & expiration handling</span>
                </li>
              </ul>
            </div>

            {/* Multi-Role System */}
            <div className="border border-gray-200 rounded-lg p-5">
              <h4 className="text-base font-semibold text-gray-900 mb-3">👥 Multi-Role System</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Workspace selector for users with multiple roles</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Geographic coverage (State/County/ZIP)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Role-specific dashboard routing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Active/Paused workspace status badges</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Workspace search & remember preference</span>
                </li>
              </ul>
            </div>

            {/* Partner Onboarding */}
            <div className="border border-gray-200 rounded-lg p-5">
              <h4 className="text-base font-semibold text-gray-900 mb-3">🤝 Partner Onboarding</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Invite acceptance screen with role preview</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Partner request form with coverage details</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Admin user creation with full configuration</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Lead pricing & capacity setup</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Advanced settings: webhooks, SLA, payouts</span>
                </li>
              </ul>
            </div>

            {/* Security & Access */}
            <div className="border border-gray-200 rounded-lg p-5">
              <h4 className="text-base font-semibold text-gray-900 mb-3">🛡️ Security & Access</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Access denied screen with clear messaging</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Session expired notification & re-auth</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Sign-out confirmation modal</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Password strength validation UI</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Audit logging & security footer</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Supported Roles */}
          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-base font-semibold text-gray-900 mb-3">Supported Roles</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                'Super Admin (HQ)',
                'Lead Manager / Ops',
                'Mortgage Partner',
                'Insurance Partner',
                'Real Estate Partner',
                'Tax Advisor',
                'Financial Advisor'
              ].map((role) => (
                <div key={role} className="bg-gray-50 rounded px-3 py-2 text-sm text-gray-700">
                  {role}
                </div>
              ))}
            </div>
          </div>

          {/* Design Principles */}
          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-base font-semibold text-gray-900 mb-3">Design Principles</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <strong className="text-gray-900">Premium SaaS Aesthetic:</strong> Clean white backgrounds, 
                subtle borders, soft shadows, no gradients or illustrations
              </p>
              <p>
                <strong className="text-gray-900">Professional Typography:</strong> Clear hierarchy, 
                consistent spacing, generous padding, perfect alignment
              </p>
              <p>
                <strong className="text-gray-900">Refined Interactions:</strong> Smooth transitions, 
                helpful microcopy, inline validation, toast notifications
              </p>
              <p>
                <strong className="text-gray-900">Trust Signals:</strong> Security indicators, 
                encrypted session messaging, compliance placeholders
              </p>
            </div>
          </div>

          {/* Reusable Components */}
          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-base font-semibold text-gray-900 mb-3">Reusable Component Library</h4>
            <div className="flex flex-wrap gap-2">
              {[
                'AuthCard',
                'InputField',
                'PrimaryButton',
                'SecondaryButton',
                'WorkspaceCard',
                'RoleBadge',
                'OTPInput',
                'Toast Notifications',
                'Modal/Dialog',
                'Drawer/Sheet'
              ].map((component) => (
                <span
                  key={component}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100"
                >
                  {component}
                </span>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="border-t border-gray-200 pt-6">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600 mb-4">
                Navigate through all screens using the Demo Navigation panel to explore the complete system.
              </p>
              <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700 text-white">
                Start Exploring
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
