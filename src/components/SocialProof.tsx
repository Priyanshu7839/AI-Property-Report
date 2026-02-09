export function SocialProof() {
  const testimonials = [
    {
      quote: "Saved me $18K in overpaid insurance over 3 years. Found it in 45 seconds.",
      author: "Sarah K.",
      role: "Austin, TX",
    },
    {
      quote: "AI told me to sell. I did. Bought S&P instead. Up 22% since. Best decision ever.",
      author: "Michael R.",
      role: "Denver, CO",
    },
    {
      quote: "This thing knew my property better than my realtor did. Wild.",
      author: "Jennifer L.",
      role: "Seattle, WA",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 lg:px-8 py-10 lg:py-28">
      <div className="text-center mb-16 lg:mb-20">
        <h2 className="text-black text-[40px] lg:text-[48px] mb-4 tracking-[-0.02em] font-[500]">
          Trusted by Property Owners
        </h2>
        <p className="text-[#6A6A6A] text-[17px] max-w-2xl mx-auto">
          Real insights from real users
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white/60 backdrop-blur-xl border border-black/[0.06] rounded-3xl p-8 lg:p-10 shadow-[0_0_0_1px_rgba(255,255,255,0.5)_inset,0_20px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.8)_inset,0_30px_60px_rgba(0,0,0,0.1)] transition-all duration-300 hover:scale-[1.02] group"
          >
            <p className="text-black text-[17px] mb-8 leading-relaxed">"{testimonial.quote}"</p>
            <div className="border-t border-black/[0.04] pt-6">
              <p className="text-black text-[15px] font-medium mb-1">{testimonial.author}</p>
              <p className="text-[#6A6A6A] text-[13px]">{testimonial.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}