import React from 'react';
import { Calendar, Plus } from 'lucide-react';
import { StatusChip } from '../StatusChip';
import { mockAppointments } from '../RealEstatedata/RealEstatemockData';

export function RealEstateAppointments() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Appointments</h1>
          <p className="text-sm text-gray-600 mt-1">Manage your client meetings and consultations</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" />
          New Appointment
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Date/Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Lead ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {mockAppointments.map((apt) => (
              <tr key={apt.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-900">{apt.date} at {apt.time}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{apt.leadId}</td>
                <td className="px-6 py-4 whitespace-nowrap"><StatusChip status={apt.type} variant="info" /></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{apt.location || 'Virtual'}</td>
                <td className="px-6 py-4 whitespace-nowrap"><StatusChip status={apt.status} variant="success" /></td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
