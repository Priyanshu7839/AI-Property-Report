import { useState } from 'react';
import { Zap, CheckCircle, XCircle, AlertCircle, RefreshCw, Settings, Eye } from 'lucide-react';

const avmProviders = [
  { 
    name: 'Zillow API', 
    type: 'Price Estimation', 
    status: 'Connected', 
    lastSync: '2 min ago', 
    requests: '1,247', 
    errors: 3,
    apiKey: 'zil_prod_**********************8f2a',
    endpoint: 'https://api.zillow.com/v2/estimates'
  },
  { 
    name: 'Redfin Data API', 
    type: 'Sales Data', 
    status: 'Connected', 
    lastSync: '5 min ago', 
    requests: '892', 
    errors: 0,
    apiKey: 'red_prod_**********************4b9c',
    endpoint: 'https://api.redfin.com/v1/properties'
  },
  { 
    name: 'CoreLogic AVM', 
    type: 'Price Estimation', 
    status: 'Connected', 
    lastSync: '1 min ago', 
    requests: '2,134', 
    errors: 12,
    apiKey: 'cl_prod_**********************7d3e',
    endpoint: 'https://api.corelogic.com/avm/v1'
  },
  { 
    name: 'Mortgage Rate API', 
    type: 'Mortgage Data', 
    status: 'Disconnected', 
    lastSync: 'Never', 
    requests: '0', 
    errors: 0,
    apiKey: 'Not configured',
    endpoint: 'https://api.mortgagedata.com/v1/rates'
  },
];

const affiliateNetworks = [
  { 
    name: 'Impact.com', 
    status: 'Active', 
    clicks: '12,450', 
    conversions: '287', 
    revenue: '$18,750', 
    conversionRate: '2.3%',
    partnerId: 'IMP-****-2847',
    webhookUrl: 'https://webhook.yourdomain.com/impact'
  },
  { 
    name: 'CJ Affiliate', 
    status: 'Active', 
    clicks: '8,920', 
    conversions: '176', 
    revenue: '$8,420', 
    conversionRate: '2.0%',
    partnerId: 'CJ-****-5921',
    webhookUrl: 'https://webhook.yourdomain.com/cj'
  },
  { 
    name: 'FlexOffers', 
    status: 'Active', 
    clicks: '5,670', 
    conversions: '98', 
    revenue: '$4,030', 
    conversionRate: '1.7%',
    partnerId: 'FLX-****-1293',
    webhookUrl: 'https://webhook.yourdomain.com/flexoffers'
  },
];

const leadBuyerAPIs = [
  { 
    name: 'Rocket Mortgage', 
    type: 'Lender', 
    status: 'Active', 
    delivered: '1,247', 
    accepted: '1,184', 
    rejected: '63', 
    failed: 8,
    webhookUrl: 'https://api.rocketmortgage.com/leads/webhook',
    apiKey: 'rm_prod_**********************9a2f'
  },
  { 
    name: 'Better.com', 
    type: 'Lender', 
    status: 'Active', 
    delivered: '892', 
    accepted: '801', 
    rejected: '91', 
    failed: 5,
    webhookUrl: 'https://api.better.com/v1/leads',
    apiKey: 'bet_prod_**********************3c7d'
  },
  { 
    name: 'Hippo Insurance', 
    type: 'Insurance', 
    status: 'Active', 
    delivered: '756', 
    accepted: '741', 
    rejected: '15', 
    failed: 2,
    webhookUrl: 'https://api.hippo.com/leads/intake',
    apiKey: 'hip_prod_**********************5e8b'
  },
  { 
    name: 'Redfin CRM', 
    type: 'Real Estate', 
    status: 'Testing', 
    delivered: '45', 
    accepted: '43', 
    rejected: '2', 
    failed: 0,
    webhookUrl: 'https://api.redfin.com/crm/leads',
    apiKey: 'rf_test_**********************2f1a'
  },
];

const recentAPILogs = [
  { timestamp: '2024-11-28 10:34:22', api: 'Zillow API', endpoint: '/estimates', method: 'POST', status: 200, responseTime: '245ms', message: 'Success' },
  { timestamp: '2024-11-28 10:34:18', api: 'Rocket Mortgage', endpoint: '/leads/webhook', method: 'POST', status: 200, responseTime: '512ms', message: 'Lead accepted' },
  { timestamp: '2024-11-28 10:34:15', api: 'CoreLogic AVM', endpoint: '/avm/v1', method: 'POST', status: 429, responseTime: '89ms', message: 'Rate limit exceeded' },
  { timestamp: '2024-11-28 10:34:10', api: 'Impact.com', endpoint: '/track', method: 'GET', status: 200, responseTime: '156ms', message: 'Click tracked' },
  { timestamp: '2024-11-28 10:34:05', api: 'Better.com', endpoint: '/v1/leads', method: 'POST', status: 200, responseTime: '421ms', message: 'Lead accepted' },
  { timestamp: '2024-11-28 10:33:58', api: 'Redfin Data API', endpoint: '/v1/properties', method: 'GET', status: 200, responseTime: '298ms', message: 'Property data retrieved' },
  { timestamp: '2024-11-28 10:33:52', api: 'Hippo Insurance', endpoint: '/leads/intake', method: 'POST', status: 200, responseTime: '378ms', message: 'Lead accepted' },
  { timestamp: '2024-11-28 10:33:45', api: 'CoreLogic AVM', endpoint: '/avm/v1', method: 'POST', status: 500, responseTime: '1205ms', message: 'Internal server error' },
];

export function APIIntegration() {
  const [selectedTab, setSelectedTab] = useState<'avm' | 'affiliate' | 'buyers' | 'logs'>('avm');
  const [selectedAPI, setSelectedAPI] = useState<any>(null);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Connected':
      case 'Active':
        return 'bg-green-100 text-green-700';
      case 'Testing':
        return 'bg-yellow-100 text-yellow-700';
      case 'Disconnected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Connected':
      case 'Active':
        return <CheckCircle className="text-green-600" size={20} />;
      case 'Testing':
        return <AlertCircle className="text-yellow-600" size={20} />;
      case 'Disconnected':
        return <XCircle className="text-red-600" size={20} />;
      default:
        return <AlertCircle className="text-gray-600" size={20} />;
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl">API Integration Center</h1>
        <p className="text-gray-600 mt-1">Manage all external integrations and monitor API health</p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="text-blue-600" size={24} />
            <p className="text-gray-600 text-sm">Active Integrations</p>
          </div>
          <p className="text-3xl mt-2">14</p>
          <p className="text-sm text-gray-600 mt-2">2 in testing</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="text-green-600" size={24} />
            <p className="text-gray-600 text-sm">API Requests (Today)</p>
          </div>
          <p className="text-3xl mt-2">28,450</p>
          <p className="text-sm text-green-600 mt-2">99.4% success rate</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-2">
            <XCircle className="text-red-600" size={24} />
            <p className="text-gray-600 text-sm">Failed Requests</p>
          </div>
          <p className="text-3xl mt-2">178</p>
          <p className="text-sm text-gray-600 mt-2">0.6% error rate</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-2">
            <RefreshCw className="text-purple-600" size={24} />
            <p className="text-gray-600 text-sm">Avg Response Time</p>
          </div>
          <p className="text-3xl mt-2">342ms</p>
          <p className="text-sm text-green-600 mt-2">Within target</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="flex border-b">
          <button
            onClick={() => setSelectedTab('avm')}
            className={`px-6 py-4 ${selectedTab === 'avm' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
          >
            AVM Providers
          </button>
          <button
            onClick={() => setSelectedTab('affiliate')}
            className={`px-6 py-4 ${selectedTab === 'affiliate' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Affiliate Networks
          </button>
          <button
            onClick={() => setSelectedTab('buyers')}
            className={`px-6 py-4 ${selectedTab === 'buyers' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Lead Buyer APIs
          </button>
          <button
            onClick={() => setSelectedTab('logs')}
            className={`px-6 py-4 ${selectedTab === 'logs' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
          >
            API Logs
          </button>
        </div>
      </div>

      {/* AVM Providers Tab */}
      {selectedTab === 'avm' && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg">AVM & Data Providers</h3>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                + Add Provider
              </button>
            </div>
            
            <div className="space-y-4">
              {avmProviders.map((provider, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-4 flex-1">
                    {getStatusIcon(provider.status)}
                    <div>
                      <p>{provider.name}</p>
                      <p className="text-sm text-gray-600">{provider.type}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-8">
                    <div className="text-sm">
                      <p className="text-gray-600">Last Sync</p>
                      <p>{provider.lastSync}</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-gray-600">Requests (Today)</p>
                      <p>{provider.requests}</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-gray-600">Errors</p>
                      <p className={provider.errors > 0 ? 'text-red-600' : 'text-green-600'}>{provider.errors}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(provider.status)}`}>
                      {provider.status}
                    </span>
                    <button 
                      onClick={() => setSelectedAPI({ ...provider, category: 'AVM' })}
                      className="text-blue-600 hover:underline text-sm flex items-center gap-1"
                    >
                      <Settings size={16} />
                      Configure
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Affiliate Networks Tab */}
      {selectedTab === 'affiliate' && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg">Affiliate Networks</h3>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                + Add Network
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Network</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Status</th>
                    <th className="text-right py-3 px-4 text-sm text-gray-600">Clicks</th>
                    <th className="text-right py-3 px-4 text-sm text-gray-600">Conversions</th>
                    <th className="text-right py-3 px-4 text-sm text-gray-600">Revenue</th>
                    <th className="text-right py-3 px-4 text-sm text-gray-600">Conv. Rate</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {affiliateNetworks.map((network, index) => (
                    <tr key={index} className="border-t hover:bg-gray-50">
                      <td className="py-3 px-4">{network.name}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusColor(network.status)}`}>
                          {network.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">{network.clicks}</td>
                      <td className="py-3 px-4 text-right">{network.conversions}</td>
                      <td className="py-3 px-4 text-right text-green-600">{network.revenue}</td>
                      <td className="py-3 px-4 text-right">{network.conversionRate}</td>
                      <td className="py-3 px-4">
                        <button 
                          onClick={() => setSelectedAPI({ ...network, category: 'Affiliate' })}
                          className="text-blue-600 hover:underline text-sm"
                        >
                          Configure
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Lead Buyer APIs Tab */}
      {selectedTab === 'buyers' && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg">Lead Buyer API Integrations</h3>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                + Add Buyer API
              </button>
            </div>
            
            <div className="space-y-4">
              {leadBuyerAPIs.map((buyer, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      {getStatusIcon(buyer.status)}
                      <div>
                        <p className="text-lg">{buyer.name}</p>
                        <p className="text-sm text-gray-600">{buyer.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(buyer.status)}`}>
                        {buyer.status}
                      </span>
                      <button 
                        onClick={() => setSelectedAPI({ ...buyer, category: 'Buyer' })}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm flex items-center gap-2"
                      >
                        <Settings size={16} />
                        Configure
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4">
                    <div className="p-3 bg-gray-50 rounded">
                      <p className="text-sm text-gray-600">Delivered</p>
                      <p className="text-xl mt-1">{buyer.delivered}</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded">
                      <p className="text-sm text-gray-600">Accepted</p>
                      <p className="text-xl text-green-700 mt-1">{buyer.accepted}</p>
                    </div>
                    <div className="p-3 bg-red-50 rounded">
                      <p className="text-sm text-gray-600">Rejected</p>
                      <p className="text-xl text-red-700 mt-1">{buyer.rejected}</p>
                    </div>
                    <div className="p-3 bg-orange-50 rounded">
                      <p className="text-sm text-gray-600">Failed</p>
                      <p className="text-xl text-orange-700 mt-1">{buyer.failed}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* API Logs Tab */}
      {selectedTab === 'logs' && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg">Recent API Activity</h3>
              <div className="flex gap-4">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                  <RefreshCw size={16} />
                  Refresh
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Filter
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Timestamp</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">API</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Endpoint</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Method</th>
                    <th className="text-center py-3 px-4 text-sm text-gray-600">Status</th>
                    <th className="text-right py-3 px-4 text-sm text-gray-600">Response Time</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAPILogs.map((log, index) => (
                    <tr key={index} className="border-t hover:bg-gray-50 text-sm">
                      <td className="py-3 px-4 text-gray-600">{log.timestamp}</td>
                      <td className="py-3 px-4">{log.api}</td>
                      <td className="py-3 px-4 text-gray-600">{log.endpoint}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                          {log.method}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded text-xs ${
                          log.status === 200 ? 'bg-green-100 text-green-700' :
                          log.status === 429 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {log.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right text-gray-600">{log.responseTime}</td>
                      <td className="py-3 px-4 text-gray-600">{log.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* API Configuration Modal */}
      {selectedAPI && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl">{selectedAPI.name} Configuration</h2>
                  <p className="text-gray-600 mt-1">{selectedAPI.category} Integration</p>
                </div>
                <button
                  onClick={() => setSelectedAPI(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                {selectedAPI.apiKey && (
                  <div>
                    <label className="block text-sm mb-2">API Key</label>
                    <div className="flex gap-2">
                      <input
                        type="password"
                        value={selectedAPI.apiKey}
                        readOnly
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                      />
                      <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Eye size={20} />
                      </button>
                    </div>
                  </div>
                )}

                {selectedAPI.endpoint && (
                  <div>
                    <label className="block text-sm mb-2">API Endpoint</label>
                    <input
                      type="text"
                      value={selectedAPI.endpoint}
                      readOnly
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>
                )}

                {selectedAPI.webhookUrl && (
                  <div>
                    <label className="block text-sm mb-2">Webhook URL</label>
                    <input
                      type="text"
                      value={selectedAPI.webhookUrl}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm mb-2">Status</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                    <option value="active">Active</option>
                    <option value="testing">Testing</option>
                    <option value="paused">Paused</option>
                    <option value="disconnected">Disconnected</option>
                  </select>
                </div>

                {selectedAPI.category === 'Buyer' && (
                  <>
                    <div>
                      <label className="block text-sm mb-2">Retry Logic</label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                        <option>Retry 3 times with exponential backoff</option>
                        <option>Retry 5 times with exponential backoff</option>
                        <option>No retry</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm mb-2">Timeout (seconds)</label>
                      <input
                        type="number"
                        defaultValue="30"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </>
                )}

                <div className="pt-6 border-t flex gap-4">
                  <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Test Connection
                  </button>
                  <button className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    Save Changes
                  </button>
                  <button 
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                    onClick={() => setSelectedAPI(null)}
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
