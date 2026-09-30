"use client";
import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { HeaderData, HeaderLink } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

function isPathActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isLinkActive(pathname: string, link: HeaderLink) {
  if (link.dropdown?.length) {
    return link.dropdown.some((item) => isPathActive(pathname, item.href));
  }
  return isPathActive(pathname, link.href);
}

export default function Header({ data }: { data: HeaderData }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [desktopDropdown, setDesktopDropdown] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleDropdown = (name: string, e: React.MouseEvent) => {
    e.preventDefault();
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const openDesktopMenu = (name: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDesktopDropdown(name);
  };

  const closeDesktopMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setDesktopDropdown(null), 140);
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
          {data.links.map((link, idx) => {
            const isOpen = desktopDropdown === link.name;
            const isActive = isLinkActive(pathname, link);
            const navClass = `flex items-center gap-1 text-[18px] font-semibold transition-colors pb-1 border-b-2 ${
              isActive || isOpen
                ? 'text-[#e60000] border-[#e60000]'
                : 'text-[#0a1128] border-transparent hover:text-[#e60000] hover:border-[#e60000]'
            }`;
            return (
              <div
                key={idx}
                className="relative"
                onMouseEnter={() => link.dropdown && openDesktopMenu(link.name)}
                onMouseLeave={() => link.dropdown && closeDesktopMenu()}
              >
                {link.dropdown ? (
                  <button
                    type="button"
                    className={`${navClass} cursor-pointer bg-transparent`}
                  >
                    {link.name}
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                      className="inline-flex"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.span>
                  </button>
                ) : (
                  <Link href={link.href} className={navClass}>
                    {link.name}
                  </Link>
                )}

                {link.dropdown && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50">
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 12, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                          className="origin-top"
                        >
                          <div className="relative w-[240px] bg-white rounded-xl border border-gray-100 shadow-[0_18px_40px_rgba(16,27,41,0.12)] overflow-hidden">
                            <div className="h-[3px] w-full bg-[#e60000]" />
                            <div className="py-2">
                              {link.dropdown.map((subLink, subIdx) => (
                                <motion.div
                                  key={subIdx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.22, delay: 0.05 + subIdx * 0.05 }}
                                >
                                  <Link
                                    href={subLink.href}
                                    className={`group/item flex items-center gap-2 px-4 py-2.5 mx-1.5 rounded-lg text-[15px] font-medium transition-colors ${
                                      isPathActive(pathname, subLink.href)
                                        ? 'text-[#e60000] bg-[#fff5f5]'
                                        : 'text-[#0a1128] hover:text-[#e60000] hover:bg-[#fff5f5]'
                                    }`}
                                  >
                                    <span className={`h-[6px] w-[6px] rounded-full transition-colors ${
                                      isPathActive(pathname, subLink.href)
                                        ? 'bg-[#e60000]'
                                        : 'bg-gray-300 group-hover/item:bg-[#e60000]'
                                    }`} />
                                    {subLink.name}
                                  </Link>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <Link href={data.button_link as string || "/contact"} className="bg-[#e60000] text-white px-8 py-3 text-[18px] font-bold hover:bg-[#cc0000] transition hidden sm:block">
            {data.button_text as string || "Apply Online"}
          </Link>
          
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
              {data.links.map((link, idx) => {
                const isActive = isLinkActive(pathname, link);
                return (
                <div key={idx} className="flex flex-col border-b border-gray-50 last:border-0">
                  <div className="flex items-center justify-between py-3">
                    {link.dropdown ? (
                      <button
                        type="button"
                        onClick={(e) => toggleDropdown(link.name, e)}
                        className={`text-[16px] font-semibold text-left bg-transparent ${
                          isActive || openDropdown === link.name ? 'text-[#e60000]' : 'text-[#0a1128]'
                        }`}
                      >
                        {link.name}
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`text-[16px] font-semibold ${
                          isActive ? 'text-[#e60000]' : 'text-[#0a1128]'
                        }`}
                      >
                        {link.name}
                      </Link>
                    )}
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
                              className={`py-2 text-[15px] font-medium ${
                                isPathActive(pathname, subLink.href)
                                  ? 'text-[#e60000]'
                                  : 'text-gray-600 hover:text-[#e60000]'
                              }`}
                            >
                              {subLink.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
                );
              })}
              <Link href={data.button_link as string || "/contact"} onClick={() => setIsMobileMenuOpen(false)} className="bg-[#e60000] text-white px-8 py-3 mt-4 text-[16px] font-bold hover:bg-[#cc0000] transition w-full sm:hidden text-center block">
                {data.button_text as string || "Apply Online"}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
