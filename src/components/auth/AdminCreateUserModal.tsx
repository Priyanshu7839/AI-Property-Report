import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/app/components/ui/dialog';
import { InputField } from './InputField';
import { Button } from '@/app/components/ui/button';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Input } from '@/app/components/ui/input';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/app/components/ui/collapsible';
import { ChevronDown, X } from 'lucide-react';
import { Badge } from '@/app/components/ui/badge';

interface AdminCreateUserModalProps {
  open: boolean;
  onClose: () => void;
  onCreateUser: (userData: any) => void;
}

export function AdminCreateUserModal({ open, onClose, onCreateUser }: AdminCreateUserModalProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [organization, setOrganization] = useState('');
  const [state, setState] = useState('');
  const [county, setCounty] = useState('');
  const [zipCodes, setZipCodes] = useState<string[]>([]);
  const [zipInput, setZipInput] = useState('');
  const [leadTypes, setLeadTypes] = useState<string[]>([]);
  const [baseLeadPrice, setBaseLeadPrice] = useState('');
  const [premiumMultiplier, setPremiumMultiplier] = useState('1.5');
  const [monthlyCapacity, setMonthlyCapacity] = useState('');
  const [slaTarget, setSlaTarget] = useState('30');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [payoutSchedule, setPayoutSchedule] = useState('monthly');
  const [acceptedNDA, setAcceptedNDA] = useState(false);

  const roles = [
    'Super Admin',
    'Lead Manager / Ops',
    'Mortgage Partner',
    'Insurance Partner',
    'Real Estate Partner',
    'Tax Advisor',
    'Financial Advisor'
  ];

  const availableLeadTypes = [
    'Mortgage',
    'Insurance',
    'Real Estate',
    'Tax',
    'Financial Advisor'
  ];

  const handleAddZip = () => {
    if (zipInput && !zipCodes.includes(zipInput)) {
      setZipCodes([...zipCodes, zipInput]);
      setZipInput('');
    }
  };

  const handleRemoveZip = (zip: string) => {
    setZipCodes(zipCodes.filter(z => z !== zip));
  };

  const toggleLeadType = (type: string) => {
    if (leadTypes.includes(type)) {
      setLeadTypes(leadTypes.filter(t => t !== type));
    } else {
      setLeadTypes([...leadTypes, type]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateUser({
      fullName,
      email,
      role,
      organization,
      coverage: { state, county, zipCodes },
      leadTypes,
      pricing: {
        baseLeadPrice: parseFloat(baseLeadPrice),
        premiumMultiplier: parseFloat(premiumMultiplier)
      },
      monthlyCapacity: parseInt(monthlyCapacity),
      slaTarget: parseInt(slaTarget),
      webhookUrl,
      payoutSchedule,
      acceptedNDA
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create User / Invite Partner</DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Fill out the form below to create a new user or invite a partner to your organization.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Full Name"
                type="text"
                value={fullName}
                onChange={setFullName}
                placeholder="John Smith"
                required
              />
              <InputField
                label="Email"
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="john@company.com"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-900 mb-2 block">
                  Role <span className="text-red-500">*</span>
                </Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((r) => (
                      <SelectItem key={r} value={r}>{r}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <InputField
                label="Organization Name"
                type="text"
                value={organization}
                onChange={setOrganization}
                placeholder="Company LLC"
                required
              />
            </div>
          </div>

          {/* Coverage Assignment */}
          <div className="space-y-4 border-t border-gray-200 pt-6">
            <h3 className="text-sm font-semibold text-gray-900">Coverage Assignment</h3>
            <div className="grid grid-cols-2 gap-4">
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
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-900 mb-2 block">
                ZIP Codes
              </Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={zipInput}
                  onChange={(e) => setZipInput(e.target.value)}
                  placeholder="Enter ZIP code"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddZip();
                    }
                  }}
                />
                <Button type="button" onClick={handleAddZip} variant="outline">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {zipCodes.map((zip) => (
                  <Badge key={zip} variant="secondary" className="pl-2 pr-1">
                    {zip}
                    <button
                      type="button"
                      onClick={() => handleRemoveZip(zip)}
                      className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Lead Type Eligibility */}
          <div className="space-y-4 border-t border-gray-200 pt-6">
            <h3 className="text-sm font-semibold text-gray-900">Lead Type Eligibility</h3>
            <div className="grid grid-cols-2 gap-3">
              {availableLeadTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={type}
                    checked={leadTypes.includes(type)}
                    onCheckedChange={() => toggleLeadType(type)}
                  />
                  <Label htmlFor={type} className="text-sm cursor-pointer">
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Lead Pricing */}
          <div className="space-y-4 border-t border-gray-200 pt-6">
            <h3 className="text-sm font-semibold text-gray-900">Lead Pricing</h3>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Base Lead Price ($)"
                type="number"
                value={baseLeadPrice}
                onChange={setBaseLeadPrice}
                placeholder="50.00"
                step="0.01"
                required
              />
              <InputField
                label="Premium ZIP Multiplier"
                type="number"
                value={premiumMultiplier}
                onChange={setPremiumMultiplier}
                placeholder="1.5"
                step="0.1"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Monthly Capacity Cap"
                type="number"
                value={monthlyCapacity}
                onChange={setMonthlyCapacity}
                placeholder="100"
                required
              />
              <InputField
                label="SLA Target (minutes)"
                type="number"
                value={slaTarget}
                onChange={setSlaTarget}
                placeholder="30"
                required
              />
            </div>
          </div>

          {/* Advanced Settings */}
          <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced} className="border-t border-gray-200 pt-6">
            <CollapsibleTrigger asChild>
              <Button type="button" variant="ghost" className="w-full justify-between p-0 hover:bg-transparent">
                <h3 className="text-sm font-semibold text-gray-900">Advanced Settings</h3>
                <ChevronDown className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 mt-4">
              <InputField
                label="API Webhook URL (Optional)"
                type="url"
                value={webhookUrl}
                onChange={setWebhookUrl}
                placeholder="https://api.yourcompany.com/webhook"
              />

              <div>
                <Label className="text-sm font-medium text-gray-900 mb-2 block">
                  Payout Schedule
                </Label>
                <Select value={payoutSchedule} onValueChange={setPayoutSchedule}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="biweekly">Bi-weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="nda"
                  checked={acceptedNDA}
                  onCheckedChange={(checked) => setAcceptedNDA(checked as boolean)}
                />
                <Label htmlFor="nda" className="text-sm cursor-pointer">
                  Compliance / NDA accepted
                </Label>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <Button 
              type="submit" 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Send invite
            </Button>
            <Button 
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}