"use client";
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { 
  MapPin, Phone, Mail, Clock, 
  User, List, FileText, MessageCircle, Send,
  Headset, Users, ShieldCheck, ChevronDown
} from 'lucide-react';
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { EnquiryData } from '../../types';

const iconMap: Record<string, React.ReactNode> = {
  'map-pin': <MapPin size={24} />,
  'phone': <Phone size={24} />,
  'mail': <Mail size={24} />,
  'clock': <Clock size={24} />,
  'headset': <Headset size={28} />,
  'users': <Users size={28} />,
  'shield-check': <ShieldCheck size={28} />,
};

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

export default function Enquiry({ data }: { data: EnquiryData }) {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-12">
          
          {/* Left Column - Contact Info */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="w-full lg:w-1/3 bg-[#fff5f5] rounded-[20px] p-8 md:p-10"
          >
            <motion.h2 variants={itemVariants} className="text-[28px] md:text-[32px] font-black text-[#101b29] mb-4 tracking-tight">
              {data.left_title} <span className="text-[#e60000]">{data.left_title_highlight}</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-[15px] text-[#5e6a7c] mb-10 leading-relaxed font-medium">
              {data.description}
            </motion.p>

            <div className="flex flex-col gap-8 mb-10">
              {data.contact_info.map((info, idx) => (
                <motion.div key={idx} variants={itemVariants} className="flex gap-5">
                  <div className="w-[50px] h-[50px] rounded-full bg-[#ffdddd] text-[#e60000] flex items-center justify-center shrink-0">
                    {iconMap[info.icon]}
                  </div>
                  <div>
                    <h4 className="text-[16px] font-bold text-[#101b29] mb-1">{info.title}</h4>
                    <p className="text-[15px] text-[#5e6a7c] leading-relaxed whitespace-pre-line font-medium">
                      {info.content}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {data.socials && data.socials.length > 0 && (
              <motion.div variants={itemVariants}>
                <h4 className="text-[18px] font-bold text-[#101b29] mb-4">Follow Us</h4>
                <div className="flex flex-wrap gap-2">
                  {data.socials.map((social, idx) => {
                    const SocialIcon = (() => {
                      switch (social.icon) {
                        case 'FaFacebook': return FaFacebookF;
                        case 'FaTwitter': return FaXTwitter;
                        case 'FaInstagram': return FaInstagram;
                        case 'FaYoutube': return FaYoutube;
                        case 'FaLinkedin': return FaLinkedinIn;
                        default: return FaFacebookF;
                      }
                    })();
                    
                    const bgColors: Record<string, string> = {
                      'FaFacebook': 'bg-[#3b5998]',
                      'FaTwitter': 'bg-[#1da1f2]',
                      'FaInstagram': 'bg-[#e1306c]',
                      'FaYoutube': 'bg-[#ff0000]',
                      'FaLinkedin': 'bg-[#0077b5]'
                    };
                    
                    return (
                      <a key={idx} href={social.href} className={`w-10 h-10 rounded-[8px] ${bgColors[social.icon] || 'bg-gray-800'} hover:bg-opacity-90 text-white flex items-center justify-center transition-all`}>
                        <SocialIcon size={18} />
                      </a>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Right Column - Form */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="w-full lg:w-2/3"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="text-[28px] md:text-[32px] font-black text-[#101b29] mb-2 tracking-tight">
                {data.right_title} <span className="text-[#e60000]">{data.right_title_highlight}</span>
              </h2>
              <p className="text-[15px] text-[#5e6a7c] font-medium">
                {data.right_description}
              </p>
            </motion.div>

            <motion.form variants={itemVariants} className="bg-white rounded-[20px] p-8 md:p-10 border border-[#f0f2f5] shadow-[0_15px_40px_rgba(0,0,0,0.04)] mb-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                
                {/* Name */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <User size={18} />
                  </div>
                  <input type="text" placeholder="Your Name *" className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-[10px] text-[15px] text-[#101b29] focus:outline-none focus:border-[#e60000] transition-colors placeholder:text-gray-400 font-medium" />
                </div>
                
                {/* Email */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <Mail size={18} />
                  </div>
                  <input type="email" placeholder="Your Email *" className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-[10px] text-[15px] text-[#101b29] focus:outline-none focus:border-[#e60000] transition-colors placeholder:text-gray-400 font-medium" />
                </div>

                {/* Phone */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <Phone size={18} />
                  </div>
                  <input type="tel" placeholder="Your Phone Number *" className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-[10px] text-[15px] text-[#101b29] focus:outline-none focus:border-[#e60000] transition-colors placeholder:text-gray-400 font-medium" />
                </div>

                {/* Dropdown */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <List size={18} />
                  </div>
                  <select defaultValue="" className="w-full pl-12 pr-10 py-3.5 bg-white border border-gray-200 rounded-[10px] text-[15px] text-gray-400 focus:outline-none focus:border-[#e60000] transition-colors appearance-none font-medium cursor-pointer">
                    <option value="" disabled>Select Enquiry Type *</option>
                    <option value="admission">Admission</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Support</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                    <ChevronDown size={18} />
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <FileText size={18} />
                </div>
                <input type="text" placeholder="Subject *" className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-[10px] text-[15px] text-[#101b29] focus:outline-none focus:border-[#e60000] transition-colors placeholder:text-gray-400 font-medium" />
              </div>

              {/* Message */}
              <div className="relative mb-6">
                <div className="absolute top-4 left-0 pl-4 pointer-events-none text-gray-400">
                  <MessageCircle size={18} />
                </div>
                <textarea rows={5} placeholder="Your Message *" className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-[10px] text-[15px] text-[#101b29] focus:outline-none focus:border-[#e60000] transition-colors placeholder:text-gray-400 resize-y font-medium"></textarea>
              </div>

              {/* Submit Area */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input type="checkbox" className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-[4px] checked:bg-[#e60000] checked:border-[#e60000] transition-colors cursor-pointer" />
                    <svg className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 14 14" fill="none">
                      <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" />
                    </svg>
                  </div>
                  <span className="text-[14px] text-[#101b29] font-semibold select-none group-hover:text-[#e60000] transition-colors">
                    I agree to be contacted by the team.
                  </span>
                </label>

                <button type="submit" className="bg-[#e60000] hover:bg-[#cc0000] text-white px-8 py-3.5 rounded-[10px] font-bold text-[16px] flex items-center gap-2 transition-colors shrink-0 w-full md:w-auto justify-center shadow-[0_4px_14px_rgba(230,0,0,0.3)] hover:shadow-[0_6px_20px_rgba(230,0,0,0.4)] hover:-translate-y-0.5 duration-200">
                  Submit Enquiry <Send size={18} />
                </button>
              </div>
            </motion.form>

            {/* Features bottom strip */}
            <motion.div variants={itemVariants} className="bg-[#fff5f5] rounded-[20px] p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-4">
              {data.features.map((feature, idx) => (
                <div key={idx} className={`flex items-center gap-4 flex-1 w-full ${idx !== data.features.length - 1 ? 'border-b border-[#ffdddd] md:border-b-0 md:border-r pb-6 md:pb-0' : ''}`}>
                  <div className="w-[46px] h-[46px] rounded-full bg-[#ffdddd] text-[#e60000] flex items-center justify-center shrink-0">
                    {iconMap[feature.icon]}
                  </div>
                  <div>
                    <h5 className="text-[15px] font-bold text-[#101b29] mb-0.5">{feature.title}</h5>
                    <p className="text-[13px] text-[#5e6a7c] font-medium leading-tight">{feature.content}</p>
                  </div>
                </div>
              ))}
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
