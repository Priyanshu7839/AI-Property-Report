import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, Badge } from '../ui/Card';
import { Shield, TrendingUp, Zap, BarChart, ArrowRight } from 'lucide-react';

const SCENARIOS = [
  {
    id: 'A',
    name: 'Preserve Structure',
    description: 'Minimal intervention, focus on stability.',
    return: '4.2% - 5.5%',
    volatility: 'Low',
    liquidity: 'High',
    taxDrag: '1.2%',
    risk: 'Stable',
    icon: Shield,
    color: 'bg-gray-100',
    textColor: 'text-gray-700',
    borderColor: 'border-gray-200'
  },
  {
    id: 'B',
    name: 'Structured Allocation',
    description: 'Balanced approach with some leverage.',
    return: '6.8% - 8.1%',
    volatility: 'Medium',
    liquidity: 'Medium',
    taxDrag: '2.4%',
    risk: 'Structured',
    icon: BarChart,
    color: 'bg-blue-50',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-100'
  },
  {
    id: 'C',
    name: 'Growth Tilt',
    description: 'Aggressive equity unlock for reinvestment.',
    return: '9.5% - 12.2%',
    volatility: 'High',
    liquidity: 'Low',
    taxDrag: '3.8%',
    risk: 'Growth Tilt',
    icon: TrendingUp,
    color: 'bg-amber-50',
    textColor: 'text-amber-700',
    borderColor: 'border-amber-100'
  },
  {
    id: 'D',
    name: 'AI Optimized Growth',
    description: 'Algorithmically balanced for max efficiency.',
    return: '10.8% - 14.1%',
    volatility: 'Med-High',
    liquidity: 'Medium',
    taxDrag: '2.9%',
    risk: 'Return Focused',
    icon: Zap,
    color: 'bg-green-50',
    textColor: 'text-green-700',
    borderColor: 'border-green-200',
    highlight: true
  }
];

export const StrategyPanel = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SCENARIOS.map((scenario) => (
          <Card 
            key={scenario.id} 
            className={`relative transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${scenario.highlight ? 'border-green-500 shadow-md ring-1 ring-green-500/20' : ''}`}
          >
            {scenario.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm z-10">
                RECOMMENDED
              </div>
            )}
            
            <CardHeader className="pb-2">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${scenario.color} ${scenario.textColor}`}>
                <scenario.icon className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg">{scenario.name}</CardTitle>
              <p className="text-xs text-gray-500 mt-1 h-8">{scenario.description}</p>
            </CardHeader>
            
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Proj. Return</span>
                  <span className={`font-bold ${scenario.highlight ? 'text-green-600' : 'text-gray-900'}`}>{scenario.return}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Volatility</span>
                  <span className="font-medium text-gray-700">{scenario.volatility}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Liquidity</span>
                  <span className="font-medium text-gray-700">{scenario.liquidity}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Tax Drag</span>
                  <span className="font-medium text-gray-700">{scenario.taxDrag}</span>
                </div>
              </div>

              <div className={`mt-4 py-2 px-3 rounded-md text-xs font-semibold text-center ${scenario.color} ${scenario.textColor} border ${scenario.borderColor}`}>
                {scenario.risk}
              </div>

              <button className={`w-full py-2 mt-2 rounded-lg text-sm font-medium border transition-colors flex items-center justify-center gap-2 ${scenario.highlight ? 'bg-green-600 text-white border-green-600 hover:bg-green-700' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}>
                Select Strategy <ArrowRight className="w-3 h-3" />
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
