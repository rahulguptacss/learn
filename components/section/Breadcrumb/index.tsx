"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { BreadcrumbData } from '../../types';

export default function Breadcrumb({ title, pageName, data }: { title: string, pageName: string, data: BreadcrumbData }) {
  return (
    <section className="relative w-full h-[200px] md:h-[300px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={data.image} 
          alt={title}
          fill
          priority
          className="object-cover object-center"
        />
      </div>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 z-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 mt-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[36px] md:text-[46px] font-bold mb-4"
        >
          {title}
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-3 text-[13px] md:text-[14px] font-bold tracking-widest uppercase text-gray-200"
        >
          <Link href={data.home_link} className="flex items-center gap-1.5 hover:text-[#e60000] transition-colors">
            <Home className="w-[18px] h-[18px]" /> {data.home_text}
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">{pageName}</span>
        </motion.div>
      </div>
    </section>
  );
}
