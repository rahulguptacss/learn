"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';
import { VideoGalleryData } from '../../types';

const ease = [0.22, 1, 0.36, 1] as const;

function youtubeId(url: string) {
  const match = url.match(/(?:youtu\.be\/|v=|embed\/)([A-Za-z0-9_-]{6,})/);
  return match?.[1] || '';
}

export default function VideoGallery({ data }: { data: VideoGalleryData }) {
  const [active, setActive] = useState<string | null>(null);
  const embedId = active ? youtubeId(active) : '';

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="text-center mb-10 lg:mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 sm:w-10 h-[2px] bg-[#e60000]" />
            <p className="text-[#e60000] text-[12px] sm:text-[13px] font-bold tracking-[0.22em] uppercase">
              {data.subtitle}
            </p>
            <span className="w-8 sm:w-10 h-[2px] bg-[#e60000]" />
          </div>
          <h2 className="text-[32px] sm:text-[40px] lg:text-[46px] font-extrabold text-[#0f2040] leading-[1.15] tracking-tight">
            {data.title_line1}{' '}
            <span className="text-[#e60000]">{data.title_highlight}</span>
          </h2>
          <p className="mt-3 text-[14.5px] sm:text-[16px] text-[#7b8799] max-w-[640px] mx-auto leading-[1.7]">
            {data.description}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {data.list.map((item) => (
            <motion.article
              key={item.id}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
              }}
            >
              <button
                type="button"
                onClick={() => setActive(item.video_url)}
                className="relative w-full h-[200px] rounded-xl overflow-hidden group text-left"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-14 h-14 rounded-full bg-[#e60000] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 ml-0.5" fill="currentColor" />
                  </span>
                </span>
                <span className="absolute bottom-3 right-3 bg-black/70 text-white text-[12px] font-medium px-2 py-0.5 rounded">
                  {item.duration}
                </span>
              </button>
              <h3 className="mt-3 text-[17px] font-extrabold text-[#0f2040] leading-snug">
                {item.title}
              </h3>
              <p className="mt-1 text-[13.5px] text-[#7b8799] leading-[1.6]">{item.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {active && embedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
            onClick={() => setActive(null)}
          >
            <button
              type="button"
              className="absolute top-5 right-5 text-white/80 hover:text-white"
              onClick={() => setActive(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              className="w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube.com/embed/${embedId}?autoplay=1`}
                title="Campus video"
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
