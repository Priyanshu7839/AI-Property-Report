import { MapPin, Check } from 'lucide-react';

export function ValuationDeepModel() {
  const comps = [
    {
      address: '127 Oak Street',
      distance: '0.2 mi',
      price: '$862,000',
      psf: '$428',
      date: 'Nov 2024',
      source: 'MLS'
    },
    {
      address: '445 Elm Avenue',
      distance: '0.4 mi',
      price: '$835,500',
      psf: '$415',
      date: 'Oct 2024',
      source: 'MLS'
    },
    {
      address: '892 Pine Boulevard',
      distance: '0.6 mi',
      price: '$851,200',
      psf: '$422',
      date: 'Sep 2024',
      source: 'Public Record'
    }
  ];

  return (
    <section className="bg-white border border-black/[0.08] rounded-lg overflow-hidden shadow-sm">
      {/* Section Header */}
      <div className="px-5 py-4 border-b border-black/[0.06] bg-[#FAFBFC]">
        <h2 className="text-black text-[16px] sm:text-[18px] font-medium tracking-tight">Valuation Analysis</h2>
        <p className="text-[#6A6A6A] text-[12px] mt-1">Hedonic regression model • 3 comparable properties</p>
      </div>
      
      <div className="p-5 space-y-5">
        {/* Price Per Square Foot */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-4 rounded-md bg-[#F8FAFF] border border-[#005BFF]/10">
            <p className="text-[#6A6A6A] text-[10px] mb-2 uppercase tracking-wide font-medium">Subject</p>
            <p className="text-[#005BFF] text-[20px] font-medium">$421</p>
          </div>
          <div className="p-4 rounded-md bg-[#FAFBFC] border border-black/[0.06]">
            <p className="text-[#6A6A6A] text-[10px] mb-2 uppercase tracking-wide font-medium">Average</p>
            <p className="text-black text-[20px] font-medium">$418</p>
          </div>
          <div className="p-4 rounded-md bg-[#F0FDF4] border border-[#18A36F]/10">
            <p className="text-[#6A6A6A] text-[10px] mb-2 uppercase tracking-wide font-medium">Variance</p>
            <p className="text-[#18A36F] text-[20px] font-medium">+0.7%</p>
          </div>
        </div>

        {/* Comparable Sales Table */}
        <div className="space-y-2">
          <p className="text-[#6A6A6A] text-[11px] uppercase tracking-wide font-medium">Comparable Sales</p>
          <div className="border border-black/[0.06] rounded-md overflow-hidden">
            <table className="w-full text-[12px]">
              <thead className="bg-[#FAFBFC] border-b border-black/[0.06]">
                <tr>
                  <th className="text-left text-[#6A6A6A] font-medium py-2 px-3">Address</th>
                  <th className="text-right text-[#6A6A6A] font-medium py-2 px-3">Price</th>
                  <th className="text-right text-[#6A6A6A] font-medium py-2 px-3 hidden sm:table-cell">$/SF</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.04]">
                {comps.map((comp, index) => (
                  <tr key={index} className="hover:bg-[#FAFBFC] transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="text-[#005BFF] flex-shrink-0" size={12} />
                        <div>
                          <p className="text-black font-medium">{comp.address}</p>
                          <p className="text-[#6A6A6A] text-[10px]">{comp.distance} • {comp.date} • {comp.source}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-right text-black font-medium py-3 px-3">{comp.price}</td>
                    <td className="text-right text-[#6A6A6A] py-3 px-3 hidden sm:table-cell">{comp.psf}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Confidence Score */}
        <div className="pt-4 border-t border-black/[0.06]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Check className="text-[#005BFF]" size={14} />
              <p className="text-[#6A6A6A] text-[11px] uppercase tracking-wide font-medium">Confidence Score</p>
            </div>
            <span className="text-[#005BFF] text-[18px] font-medium">94%</span>
          </div>
          <div className="h-2 bg-[#FAFBFC] rounded-full overflow-hidden border border-black/[0.04]">
            <div className="h-full bg-[#005BFF] rounded-full" style={{ width: '94%' }}></div>
          </div>
          <p className="text-[#6A6A6A] text-[11px] mt-2">Based on 3 comparable sales within 0.6 miles • Last 90 days</p>
        </div>
      </div>
    </section>
  );
}