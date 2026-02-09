import React, { useState } from 'react';
import { Switch } from '../../../ui/switch';
import { Label } from '../../../ui/label';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Textarea } from '../../../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';

export function Settings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [autoAssign, setAutoAssign] = useState(true);
  const [complianceDisclaimer, setComplianceDisclaimer] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account preferences and notifications</p>
      </div>

      {/* Availability Schedule */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Availability Schedule</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <Select defaultValue="pst">
                <SelectTrigger id="timezone" className="mt-1">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                  <SelectItem value="mst">Mountain Time (MT)</SelectItem>
                  <SelectItem value="cst">Central Time (CT)</SelectItem>
                  <SelectItem value="est">Eastern Time (ET)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="capacity">Lead Capacity (per week)</Label>
              <Input id="capacity" type="number" defaultValue="15" className="mt-1" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="hours-start">Working Hours Start</Label>
              <Input id="hours-start" type="time" defaultValue="09:00" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="hours-end">Working Hours End</Label>
              <Input id="hours-end" type="time" defaultValue="18:00" className="mt-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-gray-600">Receive email alerts for new leads</p>
            </div>
            <Switch 
              id="email-notifications" 
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="sms-notifications">SMS Notifications</Label>
              <p className="text-sm text-gray-600">Receive text alerts for urgent leads</p>
            </div>
            <Switch 
              id="sms-notifications" 
              checked={smsNotifications}
              onCheckedChange={setSmsNotifications}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-assign">Auto-assign Leads</Label>
              <p className="text-sm text-gray-600">Automatically assign new leads to your queue</p>
            </div>
            <Switch 
              id="auto-assign" 
              checked={autoAssign}
              onCheckedChange={setAutoAssign}
            />
          </div>
        </div>
      </div>

      {/* Team Access */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Team Access</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="team-members">Team Members</Label>
            <Textarea 
              id="team-members" 
              placeholder="Enter email addresses (one per line) for team members who can view your leads"
              className="mt-1"
              rows={3}
            />
          </div>
          <Button variant="outline">Invite Team Members</Button>
        </div>
      </div>

      {/* Security */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Security</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="two-factor">Two-Factor Authentication</Label>
              <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
            </div>
            <Switch 
              id="two-factor" 
              checked={twoFactor}
              onCheckedChange={setTwoFactor}
            />
          </div>
          <div className="pt-4 border-t">
            <Button variant="outline" className="mr-3">Change Password</Button>
            <Button variant="outline">Download Account Data</Button>
          </div>
        </div>
      </div>

      {/* Compliance */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Compliance</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="compliance">Compliance Disclaimer Toggle</Label>
              <p className="text-sm text-gray-600">Display compliance disclaimers on all documents</p>
            </div>
            <Switch 
              id="compliance" 
              checked={complianceDisclaimer}
              onCheckedChange={setComplianceDisclaimer}
            />
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">
              All financial advice provided is for informational purposes only. Consult with a licensed financial advisor before making investment decisions.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
