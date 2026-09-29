"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HeaderData } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Header({ data }: { data: HeaderData }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string, e: React.MouseEvent) => {
    e.preventDefault();
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <header className="bg-white/95 backdrop-blur-md py-3 md:py-0 px-4 md:px-8 sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="container mx-auto max-w-7xl flex items-center justify-between relative z-50">
        <Link href="/" className="flex items-center">
          <Image 
            src={data.logo_image || "/logo/logo.png"} 
            alt={data.logo_text || "Learnhub Logo"} 
            width={300} 
            height={85} 
            priority
            className="h-14 sm:h-16 md:h-20 lg:h-[85px] w-auto object-contain"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {data.links.map((link, idx) => (
            <div key={idx} className="relative group">
              <Link 
                href={link.href}
                className={`flex items-center gap-1 text-[18px] font-semibold transition-colors pb-1 border-b-2 hover:text-[#e60000] ${
                  link.active 
                    ? 'text-[#e60000] border-[#e60000]' 
                    : 'text-[#0a1128] border-transparent hover:border-[#e60000]'
                }`}
              >
                {link.name}
                {link.dropdown && <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />}
              </Link>
              
              {link.dropdown && (
                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-3 w-56 flex flex-col">
                    {link.dropdown.map((subLink, subIdx) => (
                      <Link 
                        key={subIdx}
                        href={subLink.href}
                        className="px-5 py-2.5 hover:bg-gray-50 text-[#0a1128] hover:text-[#e60000] font-medium transition-colors"
                      >
                        {subLink.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button className="bg-[#e60000] text-white px-8 py-3 text-[18px] font-bold hover:bg-[#cc0000] transition hidden sm:block">
            {data.button_text}
          </button>
          
          <button 
            className="lg:hidden text-[#0a1128] p-2 sm:p-2.5 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl flex flex-col z-40 overflow-hidden"
          >
            <div className="py-4 px-6 flex flex-col">
              {data.links.map((link, idx) => (
                <div key={idx} className="flex flex-col border-b border-gray-50 last:border-0">
                  <div className="flex items-center justify-between py-3">
                    <Link 
                      href={link.href}
                      onClick={() => !link.dropdown && setIsMobileMenuOpen(false)}
                      className={`text-[16px] font-semibold ${
                        link.active ? 'text-[#e60000]' : 'text-[#0a1128]'
                      }`}
                    >
                      {link.name}
                    </Link>
                    {link.dropdown && (
                      <button 
                        onClick={(e) => toggleDropdown(link.name, e)}
                        className="p-1 text-[#0a1128] hover:bg-gray-50 rounded"
                      >
                        <ChevronDown className={`w-5 h-5 transition-transform ${openDropdown === link.name ? 'rotate-180 text-[#e60000]' : ''}`} />
                      </button>
                    )}
                  </div>
                  {link.dropdown && (
                    <AnimatePresence>
                      {openDropdown === link.name && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="flex flex-col pl-4 pb-3 overflow-hidden"
                        >
                          {link.dropdown.map((subLink, subIdx) => (
                            <Link 
                              key={subIdx}
                              href={subLink.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="py-2 text-[15px] font-medium text-gray-600 hover:text-[#e60000]"
                            >
                              {subLink.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
              <button className="bg-[#e60000] text-white px-8 py-3 mt-4 text-[16px] font-bold hover:bg-[#cc0000] transition w-full sm:hidden">
                {data.button_text}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
