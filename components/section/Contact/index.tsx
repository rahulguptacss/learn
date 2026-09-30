'use client';

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { MapPin, Phone, Mail, Headset, Send } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { ContactData } from '../../types';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
};

const iconMap: Record<string, React.ReactNode> = {
  'map-pin': <MapPin size={24} />,
  'phone': <Phone size={24} />,
  'mail': <Mail size={24} />,
  'facebook': <FaFacebookF size={18} />,
  'twitter': <FaXTwitter size={18} />,
  'instagram': <FaInstagram size={18} />,
  'youtube': <FaYoutube size={18} />,
  'linkedin': <FaLinkedinIn size={18} />,
  'headset': <Headset size={28} />
};

export default function Contact({ data }: { data: ContactData }) {
  return (
    <section className="bg-white">
      {/* Top Content Area */}
      <div className="py-10 md:py-12">
        <div className="container mx-auto px-4 md:px-8 max-w-[1300px]">
          
          {/* Header */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="flex flex-col items-center text-center mb-10"
          >
            <motion.h4 variants={itemVariants} className="text-[14px] font-bold uppercase tracking-[0.2em] text-[#e60000] mb-3">
              {data.subtitle}
            </motion.h4>
            <motion.h2 variants={itemVariants} className="text-[36px] md:text-[46px] font-black leading-[1.2] text-[#101b29] tracking-tight mb-5">
              {data.title_line1} <span className="text-[#e60000]">{data.title_highlight}</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-[16px] text-[#5e6a7c] leading-[1.7] max-w-[800px] mx-auto font-medium">
              {data.description}
            </motion.p>
          </motion.div>

          {/* Contact 2-Column Grid */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
          >
            
            {/* Column 1: Let's Talk */}
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-4 bg-[#fff9f9] rounded-[24px] p-6 lg:p-8 h-full flex flex-col border border-[#fdf2f2] w-full"
            >
              <h3 className="text-[26px] font-extrabold text-[#101b29] mb-3">
                {data.lets_talk.title_line1} <span className="text-[#e60000]">{data.lets_talk.title_highlight}</span>
              </h3>
              <p className="text-[14px] text-[#5e6a7c] font-medium leading-[1.7] mb-8 pr-4">
                {data.lets_talk.description}
              </p>
              
              <div className="flex flex-col gap-6 mb-8 flex-grow">
                {data.lets_talk.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-[45px] h-[45px] rounded-full bg-white shadow-sm text-[#e60000] flex items-center justify-center shrink-0">
                      {iconMap[item.icon]}
                    </div>
                    <div>
                      <h4 className="text-[15px] font-bold text-[#101b29] mb-0.5">{item.title}</h4>
                      <p className="text-[14px] text-[#5e6a7c] leading-snug">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Socials */}
              <div className="border-t border-[#f4eaea] pt-6">
                <h4 className="text-[16px] font-extrabold text-[#101b29] mb-4">{data.lets_talk.social_title}</h4>
                <div className="flex items-center gap-3">
                  {data.lets_talk.socials.map((social, idx) => {
                    const colors = ['bg-[#3b5998]', 'bg-[#1da1f2]', 'bg-[#e1306c]', 'bg-[#ff0000]', 'bg-[#0077b5]'];
                    return (
                      <motion.a 
                        key={idx} 
                        href={social.href} 
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-[36px] h-[36px] rounded-[6px] ${colors[idx % colors.length]} text-white flex items-center justify-center transition-shadow hover:shadow-md`}
                      >
                        {iconMap[social.icon]}
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Column 2: Send Us a Message */}
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-8 bg-white rounded-[24px] p-6 md:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-gray-50 h-full w-full"
            >
              <h3 className="text-[26px] font-extrabold text-[#101b29] mb-3">
                {data.form.title_line1} <span className="text-[#e60000]">{data.form.title_highlight}</span>
              </h3>
              <p className="text-[14px] text-[#5e6a7c] font-medium leading-[1.7] mb-8">
                {data.form.description}
              </p>

              <form className="flex flex-col gap-4">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full h-[52px] px-5 rounded-[8px] border border-gray-200 focus:outline-none focus:border-[#e60000] text-[14px] text-[#101b29] font-medium placeholder-[#8e98a8] bg-white transition-colors"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="email" 
                    placeholder="Your Email *" 
                    className="w-full h-[52px] px-5 rounded-[8px] border border-gray-200 focus:outline-none focus:border-[#e60000] text-[14px] text-[#101b29] font-medium placeholder-[#8e98a8] bg-white transition-colors"
                  />
                  <input 
                    type="tel" 
                    placeholder="Your Phone" 
                    className="w-full h-[52px] px-5 rounded-[8px] border border-gray-200 focus:outline-none focus:border-[#e60000] text-[14px] text-[#101b29] font-medium placeholder-[#8e98a8] bg-white transition-colors"
                  />
                </div>
                <div className="relative">
                  <select className="w-full h-[52px] px-5 rounded-[8px] border border-gray-200 focus:outline-none focus:border-[#e60000] text-[#5e6a7c] text-[14px] font-medium bg-white appearance-none transition-colors">
                    <option value="">Select Inquiry Type</option>
                    <option value="admission">Admission</option>
                    <option value="course">Course Details</option>
                    <option value="support">General Support</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[#8e98a8]">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
                <textarea 
                  placeholder="Tell Us About Your Project / Message *" 
                  className="w-full h-[120px] p-5 rounded-[8px] border border-gray-200 focus:outline-none focus:border-[#e60000] text-[14px] text-[#101b29] font-medium placeholder-[#8e98a8] bg-white resize-none transition-colors"
                ></textarea>
                
                <motion.button 
                  type="button" 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#ed0020] hover:bg-[#cc001a] text-white h-[52px] rounded-[8px] font-bold text-[14px] flex items-center justify-center gap-2 transition-colors mt-2 uppercase w-full sm:w-[200px]"
                >
                  {data.form.button_text} <Send size={16} />
                </motion.button>
              </form>
            </motion.div>


          </motion.div>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full h-[300px] md:h-[400px] relative">
        <iframe 
          src={data.map_iframe} 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 grayscale-[0.2] opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
        ></iframe>
      </div>
    </section>
  );
}
