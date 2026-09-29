import React from 'react';
import { WhyChooseUsData } from '../../types';
import { Headphones, CheckCircle, ShieldCheck, Coins, UserStar, GraduationCap, ArrowRight } from 'lucide-react';

export default function WhyChooseUs({ data }: { data: WhyChooseUsData }) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'FaHeadset': return <Headphones className="w-9 h-9" strokeWidth={1.5} />;
      case 'FaChalkboardTeacher': return <UserStar className="w-9 h-9" strokeWidth={1.5} />;
      case 'FaCertificate': return <GraduationCap className="w-9 h-9" strokeWidth={1.5} />;
      default: return <CheckCircle className="w-9 h-9" strokeWidth={1.5} />;
    }
  };

  return (
    <section className="py-12 lg:py-16 relative overflow-hidden bg-slate-50 border-y border-slate-100">
      {/* Optional soft radial gradient on the right as seen in screenshot */}
      <div className="absolute right-0 top-0 w-[60%] h-full bg-gradient-to-l from-[#fff0f0]/60 to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column */}
          <div className="pr-0 lg:pr-8">
            <h4 className="text-[14px] font-semibold uppercase tracking-[0.3em] text-[#8e98a8] mb-4">
              {data.subtitle}
            </h4>
            <div className="w-[50px] h-[2px] bg-[#e60000] mb-6"></div>
            
            <h2 className="text-[36px] lg:text-[46px] font-bold leading-[1.2] text-[#1b2a4b] tracking-tight mb-8">
              {data.title_line1} <span className="text-[#e60000]">{data.title_highlight}</span>
            </h2>
            
            <div className="mb-6 text-[16px] text-[#2c3e50] leading-[1.7] max-w-[520px]">
              {data.description.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className={idx > 0 ? "mt-5" : ""}>{paragraph}</p>
              ))}
            </div>
            
            <button className="bg-[#e60000] text-white px-7 py-3 rounded-[10px] font-medium hover:bg-[#cc0000] transition flex items-center gap-2 w-fit">
              {data.button_text} <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-5">
            {data.features.map((feature, idx) => (
              <div 
                key={idx} 
                className="bg-white px-4 py-3 lg:px-5 lg:py-3 rounded-[16px] shadow-[0_15px_40px_rgba(0,0,0,0.04)] flex gap-5 items-center transition-transform hover:-translate-y-1"
              >
                {/* Icon Box */}
                <div className="w-[85px] h-[85px] rounded-[18px] bg-[#fff0f0] text-[#e60000] flex items-center justify-center shrink-0">
                  {getIcon(feature.icon)}
                </div>
                
                {/* Divider Line */}
                <div className="h-[75px] w-[2px] bg-[#ffe5e5] hidden sm:block shrink-0"></div>
                
                {/* Content */}
                <div className="flex flex-col justify-center">
                  <span className="text-[#e60000] font-bold text-[14px] mb-0.5">
                    0{idx + 1}
                  </span>
                  <h3 className="text-[18px] font-bold text-[#1b2a4b] mb-1">{feature.title}</h3>
                  <p className="text-[13px] lg:text-[14px] text-[#5e6a7c] leading-[1.5]">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
