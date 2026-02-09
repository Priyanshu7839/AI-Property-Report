import { useState } from 'react';
import { Plus, Trash2, Play } from 'lucide-react';

interface Rule {
  id: string;
  name: string;
  condition: string;
  action: string;
  priority: number;
  active: boolean;
}

const mockRules: Rule[] = [
  {
    id: 'R-001',
    name: 'High-Value Mortgage Leads',
    condition: 'IF Type = Mortgage AND Property Value > $1M',
    action: 'THEN Assign to Top-Tier Mortgage Partners',
    priority: 1,
    active: true,
  },
  {
    id: 'R-002',
    name: 'California Insurance Routing',
    condition: 'IF Type = Insurance AND State = CA',
    action: 'THEN Assign to CA Insurance Partners',
    priority: 2,
    active: true,
  },
  {
    id: 'R-003',
    name: 'High Intent Priority',
    condition: 'IF Intent Score > 80',
    action: 'THEN Prioritize Fastest Response Partner',
    priority: 3,
    active: true,
  },
  {
    id: 'R-004',
    name: 'Tax Lead Geographic Match',
    condition: 'IF Type = Tax',
    action: 'THEN Match by ZIP to Tax Partners',
    priority: 4,
    active: true,
  },
];

export function RoutingRulesScreen() {
  const [selectedRule, setSelectedRule] = useState<Rule | null>(mockRules[0]);
  const [testZip, setTestZip] = useState('');
  const [testType, setTestType] = useState('Mortgage');
  const [testValue, setTestValue] = useState('850000');

  return (
    <div className="grid grid-cols-5 gap-6">
      {/* Left Panel: Rules List */}
      <div className="col-span-2 bg-white rounded-lg border border-gray-200 p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Routing Rules</h2>
          <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2">
          {mockRules.map((rule) => (
            <button
              key={rule.id}
              onClick={() => setSelectedRule(rule)}
              className={`
                w-full text-left p-3 rounded-lg border transition-all
                ${selectedRule?.id === rule.id
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
                }
              `}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 text-sm">{rule.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Priority {rule.priority}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded ${rule.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                  {rule.active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <p className="text-xs text-gray-600 line-clamp-2">{rule.condition}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Right Panel: Rule Editor */}
      <div className="col-span-3 space-y-6">
        {selectedRule ? (
          <>
            {/* Rule Editor */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Rule Editor</h2>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                    Duplicate
                  </button>
                  <button className="px-3 py-1.5 text-sm border border-red-300 text-red-700 rounded-lg hover:bg-red-50">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rule Name</label>
                  <input
                    type="text"
                    defaultValue={selectedRule.name}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Condition (IF)</label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <select className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Lead Type</option>
                        <option>Property Value</option>
                        <option>Intent Score</option>
                        <option>State</option>
                        <option>County</option>
                      </select>
                      <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>=</option>
                        <option>&gt;</option>
                        <option>&lt;</option>
                        <option>≥</option>
                        <option>≤</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Value"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <button className="text-sm text-blue-600 hover:text-blue-700">+ Add condition</button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assignment Logic (THEN)</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Assign to Top-Tier Mortgage Partners</option>
                    <option>Assign to CA Insurance Partners</option>
                    <option>Prioritize Fastest Response Partner</option>
                    <option>Match by ZIP to Tax Partners</option>
                    <option>Round-robin Assignment</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
                    <input
                      type="number"
                      defaultValue={selectedRule.priority}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <div className="flex items-center gap-3 pt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked={selectedRule.active}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">Active</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Save Rule
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                    Cancel
                  </button>
                </div>
              </div>
            </div>

            {/* Test Rule */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Play className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">Test Rule</h3>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                  <input
                    type="text"
                    value={testZip}
                    onChange={(e) => setTestZip(e.target.value)}
                    placeholder="e.g. 95110"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lead Type</label>
                  <select
                    value={testType}
                    onChange={(e) => setTestType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Mortgage</option>
                    <option>Insurance</option>
                    <option>Tax</option>
                    <option>Agent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Value</label>
                  <input
                    type="text"
                    value={testValue}
                    onChange={(e) => setTestValue(e.target.value)}
                    placeholder="e.g. 850000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Run Test
              </button>

              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm font-medium text-green-900 mb-1">Suggested Partner:</p>
                <p className="text-sm text-green-700">Cascade Mortgage Group (WA • King County)</p>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-gray-500">Select a rule to edit or create a new one</p>
          </div>
        )}
      </div>
    </div>
  );
}