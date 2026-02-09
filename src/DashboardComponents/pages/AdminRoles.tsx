import { useState } from 'react';
import { Shield, UserPlus, Edit, Trash2, Key } from 'lucide-react';

const mockUsers = [
  {
    id: 'USR-001',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    role: 'SuperAdmin',
    permissions: ['All Access'],
    lastLogin: '2024-11-28 10:15 AM',
    status: 'Active',
    createdDate: '2024-01-15'
  },
  {
    id: 'USR-002',
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    role: 'Lead Manager',
    permissions: ['View Leads', 'Assign Leads', 'Edit Rules', 'View Reports'],
    lastLogin: '2024-11-28 09:42 AM',
    status: 'Active',
    createdDate: '2024-02-20'
  },
  {
    id: 'USR-003',
    name: 'Emily Rodriguez',
    email: 'emily.r@company.com',
    role: 'Data Analyst',
    permissions: ['View Reports', 'View Heatmaps', 'Export Data'],
    lastLogin: '2024-11-28 08:30 AM',
    status: 'Active',
    createdDate: '2024-03-10'
  },
  {
    id: 'USR-004',
    name: 'David Kim',
    email: 'david.kim@company.com',
    role: 'Lead Manager',
    permissions: ['View Leads', 'Assign Leads', 'Edit Rules', 'View Reports'],
    lastLogin: '2024-11-27 04:22 PM',
    status: 'Active',
    createdDate: '2024-04-05'
  },
  {
    id: 'AGT-045',
    name: 'Bay Area Realty Group',
    email: 'contact@bayarearealty.com',
    role: 'Agent (External)',
    permissions: ['View Purchased ZIPs', 'View Leads for ZIPs', 'Payment History'],
    lastLogin: '2024-11-28 07:15 AM',
    status: 'Active',
    createdDate: '2024-05-12'
  },
  {
    id: 'AGT-023',
    name: 'Manhattan Elite Realty',
    email: 'leads@manhattanelite.com',
    role: 'Agent (External)',
    permissions: ['View Purchased ZIPs', 'View Leads for ZIPs', 'Payment History'],
    lastLogin: '2024-11-27 09:30 PM',
    status: 'Active',
    createdDate: '2024-06-18'
  },
];

const roleDefinitions = [
  {
    role: 'SuperAdmin',
    description: 'Full access to all features and settings',
    permissions: [
      'Full access to all modules',
      'Manage users and roles',
      'Configure billing and payments',
      'Access to all buyer and ZIP data',
      'System configuration',
      'API management'
    ],
    count: 1,
    color: 'bg-red-100 text-red-700 border-red-300'
  },
  {
    role: 'Lead Manager',
    description: 'Manage leads and routing rules',
    permissions: [
      'View and export leads',
      'Assign leads to buyers',
      'Create and edit auto-routing rules',
      'View reports and analytics',
      'Manage lead capture forms',
      'No access to billing or API settings'
    ],
    count: 2,
    color: 'bg-blue-100 text-blue-700 border-blue-300'
  },
  {
    role: 'Data Analyst',
    description: 'View reports and analytics only',
    permissions: [
      'View reports and heatmaps',
      'Export data to CSV',
      'View dashboard analytics',
      'No access to leads or PII',
      'No access to configuration',
      'Read-only access'
    ],
    count: 1,
    color: 'bg-green-100 text-green-700 border-green-300'
  },
  {
    role: 'Agent (External)',
    description: 'External buyers with limited access',
    permissions: [
      'View purchased ZIP codes only',
      'View leads for owned ZIPs',
      'Payment and subscription management',
      'No access to other ZIPs',
      'No access to admin features',
      'Self-service portal only'
    ],
    count: 2,
    color: 'bg-purple-100 text-purple-700 border-purple-300'
  },
];

export function AdminRoles() {
  const [showAddUser, setShowAddUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | null>(null);

  const getRoleColor = (role: string) => {
    const roleDef = roleDefinitions.find(r => r.role === role);
    return roleDef?.color || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl">Admin Roles & Access Control</h1>
        <p className="text-gray-600 mt-1">Manage user permissions and access levels</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Total Users</p>
          <p className="text-3xl mt-2">{mockUsers.length}</p>
          <p className="text-sm text-gray-600 mt-2">All roles</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Internal Users</p>
          <p className="text-3xl mt-2">4</p>
          <p className="text-sm text-gray-600 mt-2">Staff members</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">External Agents</p>
          <p className="text-3xl mt-2">2</p>
          <p className="text-sm text-gray-600 mt-2">Buyer accounts</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Active Sessions</p>
          <p className="text-3xl mt-2">5</p>
          <p className="text-sm text-green-600 mt-2">Currently online</p>
        </div>
      </div>

      {/* Role Definitions */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg mb-6">Role Definitions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roleDefinitions.map((roleDef) => (
            <div key={roleDef.role} className={`p-4 rounded-lg border-2 ${roleDef.color}`}>
              <div className="flex items-center justify-between mb-3">
                <h4>{roleDef.role}</h4>
                <span className="px-3 py-1 bg-white rounded-full text-sm">
                  {roleDef.count} {roleDef.count === 1 ? 'user' : 'users'}
                </span>
              </div>
              <p className="text-sm mb-4 opacity-90">{roleDef.description}</p>
              <div className="space-y-2">
                {roleDef.permissions.map((permission, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <span className="mt-1">✓</span>
                    <span className="opacity-90">{permission}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg">User Management</h3>
            <button 
              onClick={() => setShowAddUser(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <UserPlus size={20} />
              Add User
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-sm text-gray-600">User ID</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Name</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Email</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Role</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Last Login</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((user) => (
                <tr key={user.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-blue-600">{user.id}</td>
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4 text-sm">{user.email}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{user.lastLogin}</td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setSelectedUser(user)}
                        className="p-2 hover:bg-gray-100 rounded"
                        title="Edit User"
                      >
                        <Edit size={16} className="text-blue-600" />
                      </button>
                      <button 
                        className="p-2 hover:bg-gray-100 rounded"
                        title="Reset Password"
                      >
                        <Key size={16} className="text-gray-600" />
                      </button>
                      {user.role !== 'SuperAdmin' && (
                        <button 
                          className="p-2 hover:bg-gray-100 rounded"
                          title="Delete User"
                        >
                          <Trash2 size={16} className="text-red-600" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl">Add New User</h2>
                <button
                  onClick={() => setShowAddUser(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="user@company.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">Role</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                    <option value="">Select a role...</option>
                    {roleDefinitions.map(role => (
                      <option key={role.role} value={role.role}>{role.role}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-2">Initial Password</label>
                  <input
                    type="password"
                    placeholder="Temporary password (user will be asked to change)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="flex items-center gap-2 p-4 bg-blue-50 rounded-lg">
                  <Shield className="text-blue-600" size={20} />
                  <p className="text-sm text-blue-900">
                    User will receive an email with login instructions and will be required to change their password on first login.
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    onClick={() => setShowAddUser(false)}
                  >
                    Create User
                  </button>
                  <button 
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                    onClick={() => setShowAddUser(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl">Edit User: {selectedUser.name}</h2>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">User ID</label>
                  <input
                    type="text"
                    value={selectedUser.id}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">Full Name</label>
                  <input
                    type="text"
                    defaultValue={selectedUser.name}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">Email Address</label>
                  <input
                    type="email"
                    defaultValue={selectedUser.email}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">Role</label>
                  <select 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    defaultValue={selectedUser.role}
                  >
                    {roleDefinitions.map(role => (
                      <option key={role.role} value={role.role}>{role.role}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-2">Status</label>
                  <select 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    defaultValue={selectedUser.status}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="mb-3">Current Permissions</h4>
                  <div className="space-y-2">
                    {selectedUser.permissions.map((permission, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm p-2 bg-gray-50 rounded">
                        <span className="text-green-600">✓</span>
                        <span>{permission}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-600 mb-2">Account Created: {selectedUser.createdDate}</p>
                  <p className="text-sm text-gray-600">Last Login: {selectedUser.lastLogin}</p>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    onClick={() => setSelectedUser(null)}
                  >
                    Save Changes
                  </button>
                  <button 
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                    onClick={() => setSelectedUser(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
