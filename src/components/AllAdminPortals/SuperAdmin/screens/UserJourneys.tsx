import { useState } from "react";
import {
  MousePointer,
  Search,
  Eye,
  Calculator,
  UserPlus,
  Smartphone,
  Monitor,
  MapPin,
} from "lucide-react";

export function UserJourneys() {
  const [selectedUser, setSelectedUser] = useState(0);

  const users = [
    {
      email: "sarah.j***@gmail.com",
      lastActive: "2 min ago",
      sessions: 3,
      propertiesViewed: 5,
      leadCreated: true,
    },
    {
      email: "michael.c***@yahoo.com",
      lastActive: "15 min ago",
      sessions: 2,
      propertiesViewed: 3,
      leadCreated: true,
    },
    {
      email: "jennifer.w***@outlook.com",
      lastActive: "1 hour ago",
      sessions: 1,
      propertiesViewed: 2,
      leadCreated: false,
    },
    {
      email: "david.m***@gmail.com",
      lastActive: "3 hours ago",
      sessions: 4,
      propertiesViewed: 8,
      leadCreated: true,
    },
  ];

  const userDetails = {
    email: "sarah.j***@gmail.com",
    ip: "72.89.***.**",
    device: "Desktop",
    utm: "google_cpc",
    location: "San Francisco, CA",
  };

  const timeline = [
    { event: "Login", time: "10:24 AM", icon: UserPlus },
    { event: "Search property", time: "10:25 AM", icon: Search },
    { event: "View report", time: "10:27 AM", icon: Eye },
    { event: "Open equity tab", time: "10:29 AM", icon: MousePointer },
    { event: "Open LIAM breakdown", time: "10:31 AM", icon: MousePointer },
    { event: "Click 'connect advisor'", time: "10:33 AM", icon: MousePointer },
    { event: "Submit precision calculator", time: "10:35 AM", icon: Calculator },
    { event: "Lead created", time: "10:36 AM", icon: UserPlus },
  ];

  const intentScores = [
    { type: "Mortgage Intent", score: 87, triggers: "Equity calc, rate tools" },
    { type: "Insurance Intent", score: 42, triggers: "Coverage review" },
    { type: "Sell Intent", score: 23, triggers: "Market comps view" },
    { type: "Tax Intent", score: 65, triggers: "Tax impact calc" },
    { type: "Investment Intent", score: 31, triggers: "ROI analysis" },
  ];

  return (
    <div className="p-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">User Journeys</h1>
        <p className="text-sm text-gray-600 mt-1">
          Deep timeline intelligence and intent analytics
        </p>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-6">
        {/* Left Panel - User List */}
        <div className="col-span-1 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <input
              type="text"
              placeholder="Search users..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="divide-y divide-gray-200">
            {users.map((user, index) => (
              <div
                key={index}
                onClick={() => setSelectedUser(index)}
                className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedUser === index ? "bg-blue-50" : ""
                }`}
              >
                <p className="text-sm font-medium text-gray-900">
                  {user.email}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {user.lastActive}
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-xs text-gray-600">
                    {user.sessions} sessions
                  </span>
                  <span className="text-xs text-gray-600">
                    {user.propertiesViewed} properties
                  </span>
                  {user.leadCreated && (
                    <span className="text-xs text-green-600 font-medium">
                      ✓ Lead
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Journey Detail */}
        <div className="col-span-2 space-y-6">
          {/* User Details */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">User Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Email</p>
                <p className="text-sm font-medium text-gray-900">
                  {userDetails.email}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">IP Address</p>
                <p className="text-sm font-medium text-gray-900">
                  {userDetails.ip}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Device</p>
                <div className="flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-gray-500" />
                  <p className="text-sm font-medium text-gray-900">
                    {userDetails.device}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">UTM Source</p>
                <p className="text-sm font-medium text-gray-900">
                  {userDetails.utm}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-gray-500 mb-1">Location</p>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <p className="text-sm font-medium text-gray-900">
                    {userDetails.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">
              Journey Timeline
            </h3>
            <div className="space-y-4">
              {timeline.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                      <Icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {item.event}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {item.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Intent Heatmap */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Intent Heatmap</h3>
            <div className="space-y-3">
              {intentScores.map((intent, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">
                      {intent.type}
                    </span>
                    <span className="text-sm font-semibold text-blue-600">
                      {intent.score}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${intent.score}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Triggers: {intent.triggers}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
