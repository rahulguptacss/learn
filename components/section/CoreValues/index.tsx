"use client";
import React from 'react';
import { CoreValuesData } from '../../types';
import { Users, Settings, Globe, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CoreValues({ data }: { data: CoreValuesData }) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users': return <Users className="w-8 h-8" />;
      case 'Settings': return <Settings className="w-8 h-8" />;
      case 'Globe': return <Globe className="w-8 h-8" />;
      case 'Leaf': return <Leaf className="w-8 h-8" />;
      default: return null;
    }
  };

  return (
    <section className="py-12 lg:py-16 bg-white relative overflow-hidden">
      {/* Decorative background shape */}
      <div className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-[#fff0f0] rounded-tl-full -z-10 opacity-60"></div>
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12">
          <motion.h4 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[14px] font-bold uppercase tracking-[0.25em] text-[#e60000] mb-3"
          >
            {data.subtitle}
          </motion.h4>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[26px] sm:text-[32px] lg:text-[44px] font-black tracking-tight leading-[1.2] sm:leading-[1.1] text-[#0a1128] mb-5"
          >
            {data.title_line1} <br className="md:hidden" />
            {data.title_line2 && <>{data.title_line2} </>}
            <span className="text-[#e60000]">{data.title_highlight}</span>
          </motion.h2>
          
          <div className="w-[60px] h-[3px] bg-[#e60000] mx-auto mb-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {data.list.map((item, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-[20px] p-8 text-center shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-gray-50 hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-[70px] h-[70px] mx-auto rounded-full bg-[#e60000] text-white flex items-center justify-center mb-6 shadow-[0_8px_20px_rgba(230,0,0,0.25)]">
                {getIcon(item.icon)}
              </div>
              <h3 className="text-[18px] font-bold text-[#1b2a4b] mb-3">
                {item.title}
              </h3>
              <p className="text-[14px] text-[#718096] leading-[1.6]">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
