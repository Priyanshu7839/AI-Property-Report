import { Lock } from 'lucide-react';

export function IntelligenceCards() {
  const cards = [
    { label: 'AI VALUATION', value: '$847K', color: '#005BFF' },
    { label: 'EQUITY UNLOCK', value: '$142K', color: '#18A36F' },
    { label: 'INSURANCE WASTE', value: '$2.4K/yr', color: '#000' },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 lg:px-8 py-3 lg:py-5 lg:pt-0">
      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="relative bg-white/60 backdrop-blur-xl border border-black/[0.06] rounded-3xl p-8 lg:p-10 shadow-[0_0_0_1px_rgba(255,255,255,0.1)_inset,0_1px_2px_rgba(0,0,0,0.05),0_8px_16px_rgba(0,0,0,0.04)] overflow-hidden group hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2)_inset,0_1px_2px_rgba(0,0,0,0.08),0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 hover:scale-[1.02]"
          >
            {/* Gradient accent on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#005BFF]/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Lock overlay */}
            <div className="absolute inset-0 backdrop-blur-sm bg-white/40 z-10 flex items-center justify-center group-hover:backdrop-blur-md transition-all duration-300">
              <div className="bg-white rounded-2xl p-5 shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)] group-hover:scale-110 transition-transform duration-300">
                <Lock className="text-[#6A6A6A]" size={24} strokeWidth={1.5} />
              </div>
            </div>
            
            {/* Content */}
            <div className="relative z-0">
              <div className="text-[#6A6A6A] text-[11px] tracking-[0.08em] uppercase mb-3 font-medium">
                {card.label}
              </div>
              <div 
                className="text-[40px] lg:text-[48px] tracking-[-0.02em] font-[500]"
                style={{ color: card.color }}
              >
                {card.value}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <p className="text-[#6A6A6A] text-[15px]">Unlock full intelligence report</p>
      </div>
    </section>
  );
}