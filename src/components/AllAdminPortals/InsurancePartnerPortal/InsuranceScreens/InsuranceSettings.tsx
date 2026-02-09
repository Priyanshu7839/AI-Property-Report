import { MapPin, Bell, Users, Shield, Upload } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Switch } from '../../../ui/switch';
import { useState } from 'react';

interface SettingsProps {
  onNavigate: (screen: string) => void;
}

export function InsuranceSettings({ onNavigate }: SettingsProps) {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    weeklyReports: true,
    twoFactorAuth: true,
    autoAssignLeads: true
  });

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your partner account preferences and configuration.</p>
      </div>

      <div className="max-w-4xl space-y-6">
        {/* Coverage Area */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="bg-blue-50 p-2 rounded-lg">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900">Coverage Area</h2>
              <p className="text-sm text-gray-600 mt-0.5">Define your service territory</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">States</label>
              <input
                type="text"
                defaultValue="TX, LA, OK"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Comma-separated state codes</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Counties</label>
              <input
                type="text"
                defaultValue="Harris County, Fort Bend County"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Codes</label>
              <textarea
                rows={3}
                defaultValue="77002, 77056, 77019, 77005, 77098, 77008, 77025"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Comma-separated ZIP codes</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <Button>Save Coverage Area</Button>
          </div>
        </div>

        {/* Lead Management */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="bg-purple-50 p-2 rounded-lg">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900">Lead Management</h2>
              <p className="text-sm text-gray-600 mt-0.5">Configure lead assignment and capacity</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Weekly Lead Cap</label>
              <input
                type="number"
                defaultValue="50"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Maximum leads per week</p>
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-900">Auto-assign leads</p>
                <p className="text-xs text-gray-500">Automatically receive leads matching your criteria</p>
              </div>
              <Switch
                checked={settings.autoAssignLeads}
                onCheckedChange={(checked) => setSettings({ ...settings, autoAssignLeads: checked })}
              />
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <Button>Save Lead Settings</Button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="bg-green-50 p-2 rounded-lg">
              <Bell className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
              <p className="text-sm text-gray-600 mt-0.5">Manage how you receive updates</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-900">Email notifications</p>
                <p className="text-xs text-gray-500">Receive updates via email</p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
              />
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-900">SMS notifications</p>
                <p className="text-xs text-gray-500">Get urgent alerts via text</p>
              </div>
              <Switch
                checked={settings.smsNotifications}
                onCheckedChange={(checked) => setSettings({ ...settings, smsNotifications: checked })}
              />
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-900">Weekly performance reports</p>
                <p className="text-xs text-gray-500">Receive weekly summary emails</p>
              </div>
              <Switch
                checked={settings.weeklyReports}
                onCheckedChange={(checked) => setSettings({ ...settings, weeklyReports: checked })}
              />
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="bg-red-50 p-2 rounded-lg">
              <Shield className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900">Security</h2>
              <p className="text-sm text-gray-600 mt-0.5">Protect your account</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-900">Two-factor authentication</p>
                <p className="text-xs text-gray-500">Add an extra layer of security</p>
              </div>
              <Switch
                checked={settings.twoFactorAuth}
                onCheckedChange={(checked) => setSettings({ ...settings, twoFactorAuth: checked })}
              />
            </div>

            <div className="pt-3 border-t border-gray-200">
              <Button variant="outline">Change Password</Button>
            </div>
          </div>
        </div>

        {/* Team Access */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="bg-indigo-50 p-2 rounded-lg">
              <Users className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900">Team Access</h2>
              <p className="text-sm text-gray-600 mt-0.5">Manage team member permissions</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">john.smith@atlasinsurance.com</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
              <Button variant="ghost" size="sm">Edit</Button>
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">sarah.jones@atlasinsurance.com</p>
                <p className="text-xs text-gray-500">Agent</p>
              </div>
              <Button variant="ghost" size="sm">Edit</Button>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <Button variant="outline">
              <Users className="w-4 h-4 mr-2" />
              Invite Team Member
            </Button>
          </div>
        </div>

        {/* Branding */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="bg-amber-50 p-2 rounded-lg">
              <Upload className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900">Branding</h2>
              <p className="text-sm text-gray-600 mt-0.5">Customize your partner materials</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Logo</label>
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                <Upload className="w-6 h-6 text-gray-400" />
              </div>
              <div>
                <Button variant="outline" size="sm">Upload Logo</Button>
                <p className="text-xs text-gray-500 mt-1">PNG or JPG, max 2MB</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
