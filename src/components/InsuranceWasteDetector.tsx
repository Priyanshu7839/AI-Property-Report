import { AlertTriangle } from 'lucide-react';

export function InsuranceWasteDetector() {
  return (
    <section className="bg-white border border-black/[0.08] rounded-lg overflow-hidden shadow-sm">
      {/* Section Header */}
      <div className="px-5 py-4 border-b border-black/[0.06] bg-[#FAFBFC]">
        <h2 className="text-black text-[16px] sm:text-[18px] font-medium tracking-tight">Insurance Analysis</h2>
        <p className="text-[#6A6A6A] text-[12px] mt-1">Coverage optimization opportunity identified</p>
      </div>
      
      <div className="p-5 space-y-5">
        {/* Alert */}
        <div className="border-l-4 border-[#FF3B30] bg-[#FFF5F5] rounded-md p-4 flex items-start gap-3">
          <AlertTriangle className="text-[#FF3B30] flex-shrink-0" size={16} strokeWidth={2} />
          <div>
            <p className="text-black text-[14px] font-medium mb-1">Potential Overpayment Detected</p>
            <p className="text-[#6A6A6A] text-[12px]">You may be overpaying <span className="text-black font-medium">$680/month</span> compared to optimized coverage</p>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="border border-black/[0.06] rounded-md overflow-hidden">
          <table className="w-full text-[12px]">
            <thead className="bg-[#FAFBFC] border-b border-black/[0.06]">
              <tr>
                <th className="text-left text-[#6A6A6A] font-medium py-2 px-3">Coverage Item</th>
                <th className="text-right text-[#6A6A6A] font-medium py-2 px-3">Current</th>
                <th className="text-right text-[#6A6A6A] font-medium py-2 px-3">Optimized</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04]">
              <tr className="hover:bg-[#FAFBFC] transition-colors">
                <td className="py-3 px-3 text-[#6A6A6A]">Annual Premium</td>
                <td className="text-right text-black font-medium py-3 px-3">$1,842</td>
                <td className="text-right text-[#18A36F] font-medium py-3 px-3">$1,162</td>
              </tr>
              <tr className="hover:bg-[#FAFBFC] transition-colors">
                <td className="py-3 px-3 text-[#6A6A6A]">Coverage Amount</td>
                <td className="text-right text-black font-medium py-3 px-3">$950K</td>
                <td className="text-right text-black font-medium py-3 px-3">$850K</td>
              </tr>
              <tr className="hover:bg-[#FAFBFC] transition-colors">
                <td className="py-3 px-3 text-[#6A6A6A]">Deductible</td>
                <td className="text-right text-black font-medium py-3 px-3">$2.5K</td>
                <td className="text-right text-black font-medium py-3 px-3">$5K</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Savings Summary */}
        <div className="bg-[#F0FDF4] border border-[#18A36F]/20 rounded-md p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[#6A6A6A] text-[11px] uppercase tracking-wide font-medium">Potential Annual Savings</p>
            <p className="text-[#18A36F] text-[20px] font-medium">$8,160</p>
          </div>
          <p className="text-[#6A6A6A] text-[11px]">
            <span className="font-medium text-black">Recommendation:</span> Property appears over-insured relative to estimated rebuild cost of $825K • 
            <span className="font-medium text-black"> Source:</span> CoreLogic Replacement Cost Analysis
          </p>
        </div>
      </div>
    </section>
  );
}