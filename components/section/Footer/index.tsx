"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { FooterData } from '../../types';
import { MapPin, Phone, Mail, Apple, ChevronRight, GraduationCap, ArrowUp } from 'lucide-react';
import { FaFacebookF, FaYoutube, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export default function Footer({ data }: { data: FooterData }) {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'FaFacebook': return <FaFacebookF className="w-4 h-4" />;
      case 'FaTwitter': return <FaXTwitter className="w-4 h-4" />;
      case 'FaYoutube': return <FaYoutube className="w-4 h-4" />;
      case 'FaLinkedin': return <FaLinkedinIn className="w-4 h-4" />;
      case 'FaInstagram': return <FaInstagram className="w-4 h-4" />;
      default: return <FaFacebookF className="w-4 h-4" />;
    }
  };

  return (
    <footer className="bg-[#111f38] text-white pt-10 pb-4 relative overflow-hidden font-sans border-t-[8px] border-[#e60000]">
      {/* Decorative large icon in background */}
      <div className="absolute right-0 top-10 opacity-[0.04] pointer-events-none translate-x-[20%] text-white hidden lg:block">
        <GraduationCap size={700} strokeWidth={1} />
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-[1300px] relative z-10">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.6fr] gap-0 md:gap-12 lg:gap-10 mb-8"
        >
          
          {/* Col 1 */}
          <motion.div variants={fadeUpVariants} className="lg:pr-10 border-b border-gray-800 md:border-none pb-6 md:pb-0">
            <Link href="/" className="inline-block mb-4">
              <Image 
                src="/logo/footerlogo.png" 
                alt={data.logo_text} 
                width={200} 
                height={60} 
                className="h-auto w-[220px] object-contain"
              />
            </Link>
            <p className="text-gray-300 text-[15px] leading-[1.8] mb-5">
              {data.description}
            </p>
            <div className="flex gap-4">
              {data.socials.map((social, idx) => (
                <a key={idx} href={social.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-transparent border border-gray-600/50 flex items-center justify-center hover:bg-[#e60000] hover:border-[#e60000] transition-colors text-gray-300 hover:text-white">
                  {getSocialIcon(social.icon)}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Col 2 */}
          <motion.div variants={fadeUpVariants} className="border-b border-gray-800 md:border-none py-5 md:py-0">
            <div 
              className="flex justify-between items-center cursor-pointer md:cursor-default group"
              onClick={() => toggleSection('quick')}
            >
              <h4 className="text-[18px] md:text-[20px] font-bold text-white mb-0 md:mb-8">
                Quick Links
                <div className="w-8 h-[3px] bg-[#e60000] mt-3 hidden md:block"></div>
              </h4>
              <ChevronRight className={`md:hidden text-gray-400 transition-transform duration-300 ${openSection === 'quick' ? 'rotate-90 text-white' : ''}`} />
            </div>
            <div className={`overflow-hidden transition-all duration-300 md:!max-h-[1000px] md:!opacity-100 md:mt-0 ${openSection === 'quick' ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
              <div className="w-8 h-[3px] bg-[#e60000] mb-4 md:hidden"></div>
              <ul className="space-y-4">
                {data.quick_links.map((link, idx) => (
                  <li key={idx}>
                    <Link href={link.href} className="text-gray-300 text-[15px] hover:text-[#e60000] transition-colors flex items-center gap-3">
                      <ChevronRight className="w-4 h-4 text-white" strokeWidth={3} />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Col 3 */}
          <motion.div variants={fadeUpVariants} className="border-b border-gray-800 md:border-none py-5 md:py-0">
            <div 
              className="flex justify-between items-center cursor-pointer md:cursor-default group"
              onClick={() => toggleSection('resources')}
            >
              <h4 className="text-[18px] md:text-[20px] font-bold text-white mb-0 md:mb-8">
                Our Resources
                <div className="w-8 h-[3px] bg-[#e60000] mt-3 hidden md:block"></div>
              </h4>
              <ChevronRight className={`md:hidden text-gray-400 transition-transform duration-300 ${openSection === 'resources' ? 'rotate-90 text-white' : ''}`} />
            </div>
            <div className={`overflow-hidden transition-all duration-300 md:!max-h-[1000px] md:!opacity-100 md:mt-0 ${openSection === 'resources' ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
              <div className="w-8 h-[3px] bg-[#e60000] mb-4 md:hidden"></div>
              <ul className="space-y-4">
                {data.extra_links.map((link, idx) => (
                  <li key={idx}>
                    <Link href={link.href} className="text-gray-300 text-[15px] hover:text-[#e60000] transition-colors flex items-center gap-3">
                      <ChevronRight className="w-4 h-4 text-white" strokeWidth={3} />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Col 4 */}
          <motion.div variants={fadeUpVariants} className="py-5 md:py-0">
            <div 
              className="flex justify-between items-center cursor-pointer md:cursor-default group"
              onClick={() => toggleSection('contact')}
            >
              <h4 className="text-[18px] md:text-[20px] font-bold text-white mb-0 md:mb-8">
                Contact Information
                <div className="w-8 h-[3px] bg-[#e60000] mt-3 hidden md:block"></div>
              </h4>
              <ChevronRight className={`md:hidden text-gray-400 transition-transform duration-300 ${openSection === 'contact' ? 'rotate-90 text-white' : ''}`} />
            </div>
            <div className={`overflow-hidden transition-all duration-300 md:!max-h-[1000px] md:!opacity-100 md:mt-0 ${openSection === 'contact' ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
              <div className="w-8 h-[3px] bg-[#e60000] mb-4 md:hidden"></div>
              <ul className="space-y-6">
                <li className="flex gap-4 items-center">
                  <div className="w-11 h-11 rounded-full bg-[#e60000] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-white" fill="currentColor" />
                  </div>
                  <div>
                    <a href={`tel:${data.contact.phone}`} className="text-[16px] font-bold text-white hover:text-[#e60000] transition-colors block mb-1">{data.contact.phone}</a>
                    <span className="block text-[13px] text-gray-400">{data.contact.phone_sub}</span>
                  </div>
                </li>
                <li className="flex gap-4 items-center">
                  <div className="w-11 h-11 rounded-full bg-[#e60000] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-white" fill="currentColor" />
                  </div>
                  <div>
                    <a href={`mailto:${data.contact.email}`} className="text-[16px] font-bold text-white hover:text-[#e60000] transition-colors block mb-1">{data.contact.email}</a>
                    <span className="block text-[13px] text-gray-400">{data.contact.email_sub}</span>
                  </div>
                </li>
                <li className="flex gap-4 items-center">
                  <div className="w-11 h-11 rounded-full bg-[#e60000] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-white" fill="currentColor" />
                  </div>
                  <div>
                    <span className="block text-[16px] font-bold text-white mb-1">{data.contact.address}</span>
                    <span className="block text-[13px] text-gray-400">{data.contact.address_sub}</span>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-700/50 pt-4 pb-2 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-6 relative"
        >
          <p className="text-gray-400 text-[14px] text-center md:text-left">
            {data.copyright}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 text-[14px] text-gray-300">
            {data.bottom_links?.map((link, idx) => (
              <React.Fragment key={idx}>
                <Link href={link.href} className="hover:text-white transition-colors">{link.name}</Link>
                {idx < data.bottom_links.length - 1 && (
                  <div className="w-[1px] h-3 bg-gray-600 hidden sm:block"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 w-11 h-11 md:w-12 md:h-12 bg-[#e60000] text-white rounded-full flex items-center justify-center shadow-xl transition-all duration-300 z-50 hover:bg-[#cc0000] hover:-translate-y-1 ${
          showScrollTop ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4'
        }`}
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
      </button>
    </footer>
  );
}
