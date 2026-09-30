"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Tag,
  MessageCircle,
  ArrowRight,
  BookOpen,
  Wifi,
  Heart,
  Lightbulb,
  Mic2,
} from 'lucide-react';
import { FaFacebook, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { EventItem, EventExpectItem } from '../../types';

// ── icon map for what_to_expect ─────────────────────────────
const iconMap: Record<string, React.ReactNode> = {
  speaker: <Mic2 className="w-5 h-5" />,
  session: <BookOpen className="w-5 h-5" />,
  network: <Wifi className="w-5 h-5" />,
  insight: <Lightbulb className="w-5 h-5" />,
  default: <Heart className="w-5 h-5" />,
};

function getIcon(key?: string) {
  return iconMap[key || 'default'] ?? iconMap.default;
}

// ── animation helpers ────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

// ── quick-info strip item ────────────────────────────────────
function InfoStrip({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-[#f0f0f0] last:border-0">
      <div className="w-8 h-8 rounded-full bg-[#fde8eb] flex items-center justify-center text-[#e60000] shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-[11px] text-[#8e98a8] font-semibold uppercase tracking-wider leading-none mb-0.5">{label}</p>
        <p className="text-[14px] font-semibold text-[#1b2a4b]">{value}</p>
      </div>
    </div>
  );
}

// ── sidebar card wrapper ─────────────────────────────────────
function SideCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-[#edf0f5] rounded-[14px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] mb-5">
      <div className="px-5 py-4 border-b border-[#f0f0f0]">
        <h3 className="text-[16px] font-bold text-[#1b2a4b]">{title}</h3>
        <div className="w-8 h-[3px] bg-[#e60000] mt-1.5" />
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  );
}

// ── section heading ──────────────────────────────────────────
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h2 className="text-[20px] md:text-[22px] font-bold text-[#1b2a4b]">{children}</h2>
      <div className="w-10 h-[3px] bg-[#e60000] mt-2" />
    </div>
  );
}

// ── main component ───────────────────────────────────────────
export default function EventDetail({ event }: { event: EventItem }) {
  const words = event.title.trim().split(/\s+/);
  const highlight = event.title_highlight || words[words.length - 1];
  const line1 = event.title_line1 || words.slice(0, -1).join(' ');

  const quickStats = [
    { icon: <Clock className="w-4 h-4" />, label: 'Time', value: event.time || 'TBA' },
    { icon: <MapPin className="w-4 h-4" />, label: 'Location', value: event.location || 'TBA' },
    { icon: <Users className="w-4 h-4" />, label: 'Participants', value: event.total_seats || 'Open' },
    { icon: <Tag className="w-4 h-4" />, label: 'Event Type', value: event.event_type || event.category || 'General' },
  ];

  const [shareUrl, setShareUrl] = React.useState('');
  React.useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 lg:gap-12">

          {/* ── LEFT COLUMN ──────────────────────────────────── */}
          <div>
            {/* Title */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-4">
              <h1 className="text-[32px] md:text-[40px] font-bold text-[#1b2a4b] leading-[1.15] mb-3">
                {line1 && <>{line1} </>}
                <span className="text-[#e60000]">{highlight}</span>
              </h1>
              <p className="text-[15px] md:text-[16px] text-[#5e6a7c] leading-[1.7]">
                {event.description}
              </p>
            </motion.div>

            {/* Hero image with date badge */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.08 }}
              className="relative w-full aspect-[21/9] rounded-[14px] overflow-hidden mb-6 shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
            >
              <Image
                src={event.image}
                alt={event.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 720px"
                className="object-cover"
              />
              {/* Date badge */}
              <div className="absolute bottom-4 left-4 bg-[#e60000] text-white rounded-[10px] px-4 py-2 text-center shadow-lg min-w-[70px]">
                <span className="block text-[24px] font-black leading-none">{event.date}</span>
                <span className="block text-[10px] font-bold tracking-widest mt-1">{event.month}</span>
              </div>
            </motion.div>

            {/* Quick-stats strip */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6"
            >
              {quickStats.map(({ icon, label, value }) => (
                <div
                  key={label}
                  className="flex flex-col items-center justify-center text-center bg-[#f8f9fb] border border-[#edf0f5] rounded-[12px] p-4 gap-1"
                >
                  <div className="text-[#e60000] mb-1">{icon}</div>
                  <span className="text-[11px] text-[#8e98a8] font-semibold uppercase tracking-wider">{label}</span>
                  <span className="text-[13px] font-bold text-[#1b2a4b]">{value}</span>
                </div>
              ))}
            </motion.div>

            {/* About the Event */}
            {event.about && (
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mb-6 pb-6 border-b border-[#f0f4f8]"
              >
                <SectionHeading>About the Event</SectionHeading>
                <p className="text-[15px] text-[#5e6a7c] leading-[1.8]">{event.about}</p>
              </motion.div>
            )}

            {/* What to Expect */}
            {event.what_to_expect && event.what_to_expect.length > 0 && (
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mb-6 pb-6 border-b border-[#f0f4f8]"
              >
                <SectionHeading>What to Expect</SectionHeading>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {event.what_to_expect.map((item: EventExpectItem, idx: number) => (
                    <motion.div
                      key={idx}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.08 }}
                      className="flex items-start gap-4 p-4 rounded-[12px] border border-[#edf0f5] bg-[#f8f9fb] hover:border-[#e60000]/20 hover:bg-[#fff5f5] transition-colors duration-300 group"
                    >
                      <div className="w-10 h-10 rounded-[10px] bg-[#fde8eb] flex items-center justify-center text-[#e60000] shrink-0 group-hover:bg-[#e60000] group-hover:text-white transition-colors duration-300">
                        {getIcon(item.icon)}
                      </div>
                      <div>
                        <h4 className="text-[14px] font-bold text-[#1b2a4b] mb-1">{item.title}</h4>
                        <p className="text-[13px] text-[#5e6a7c] leading-[1.6]">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Who Can Attend */}
            {event.who_can_attend && (
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mb-6"
              >
                <SectionHeading>Who Can Attend?</SectionHeading>
                <div className="bg-[#f8f9fb] border border-[#edf0f5] rounded-[12px] p-5">
                  <p className="text-[15px] text-[#5e6a7c] leading-[1.8]">{event.who_can_attend}</p>
                </div>
              </motion.div>
            )}
          </div>

          {/* ── RIGHT SIDEBAR ─────────────────────────────────── */}
          <div className="lg:sticky lg:top-24 self-start">

            {/* Event Information card */}
            <SideCard title="Event Information">
              <InfoStrip icon={<Calendar className="w-4 h-4" />} label="Date" value={event.full_date || `${event.date} ${event.month}`} />
              <InfoStrip icon={<Clock className="w-4 h-4" />} label="Time" value={event.time || 'TBA'} />
              <InfoStrip icon={<MapPin className="w-4 h-4" />} label="Location" value={event.location || 'TBA'} />
              <InfoStrip icon={<Users className="w-4 h-4" />} label="Total Seats" value={event.total_seats || 'Open'} />
              <InfoStrip icon={<Tag className="w-4 h-4" />} label="Event Type" value={event.event_type || event.category || 'General'} />
              {/* Register button */}
              <a
                href="#register"
                className="mt-4 flex items-center justify-center gap-2 bg-[#e60000] hover:bg-[#cc0000] text-white font-bold text-[15px] py-3.5 px-6 rounded-[10px] transition-all duration-300 shadow-md shadow-red-600/20 hover:shadow-lg hover:shadow-red-600/25 group/btn w-full"
              >
                Enquiry Now
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" strokeWidth={2.5} />
              </a>
            </SideCard>

            {/* Venue Location */}
            <SideCard title="Venue Location">
              {/* Map Layout to match screenshot */}
              <div className="relative w-full h-[180px] rounded-[10px] overflow-hidden mb-3 bg-[#f8f9fb] border border-[#edf0f5]">
                {/* Background Map iframe (pointer-events-none so it acts just like a background image) */}
                <iframe
                  title="map background"
                  className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none grayscale-[20%]"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(event.map_label || event.location || 'California')}&t=&z=12&ie=UTF8&iwloc=&output=embed`}
                  frameBorder="0"
                  scrolling="no"
                  marginHeight={0}
                  marginWidth={0}
                ></iframe>
                {/* Custom Overlay Pin & Label matching screenshot */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  {/* Pin (looks like screenshot red pin) */}
                  <div className="w-9 h-9 bg-[#e60000] rounded-t-[50%] rounded-bl-[50%] rounded-br-[4px] rotate-45 flex items-center justify-center shadow-md mb-0">
                    <div className="w-3.5 h-3.5 bg-white rounded-full -rotate-45" />
                  </div>
                  {/* Label */}
                  <div className="bg-white px-3 py-1.5 rounded-[6px] shadow-sm flex items-center justify-center z-10 mx-4 max-w-[90%] -mt-1">
                    <span className="text-[12.5px] font-semibold text-[#1b2a4b] text-center truncate tracking-tight">{event.map_label || event.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[13px] text-[#5e6a7c] mb-2">
                <MapPin className="w-3.5 h-3.5 text-[#e60000]" strokeWidth={2.5} />
                <span>{event.map_label || event.location}</span>
              </div>
              {event.map_link && (
                <a
                  href={event.map_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] font-bold text-[#e60000] hover:underline"
                >
                  Get Directions →
                </a>
              )}
            </SideCard>

            {/* Share This Event */}
            <SideCard title="Share This Event">
              <div className="flex items-center gap-3 flex-wrap">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Facebook"
                  className="w-10 h-10 rounded-[8px] bg-[#1877f2] hover:bg-[#1464d2] text-white flex items-center justify-center transition-colors duration-200"
                >
                  <FaFacebook className="w-4 h-4" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(event.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Twitter"
                  className="w-10 h-10 rounded-[8px] bg-[#1da1f2] hover:bg-[#0d8de0] text-white flex items-center justify-center transition-colors duration-200"
                >
                  <FaXTwitter className="w-4 h-4" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on LinkedIn"
                  className="w-10 h-10 rounded-[8px] bg-[#0077b5] hover:bg-[#005f91] text-white flex items-center justify-center transition-colors duration-200"
                >
                  <FaLinkedin className="w-4 h-4" />
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(event.title + ' ' + shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on WhatsApp"
                  className="w-10 h-10 rounded-[8px] bg-[#25d366] hover:bg-[#1eb558] text-white flex items-center justify-center transition-colors duration-200"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </SideCard>

            {/* View All Events */}
            <Link
              href="/events"
              className="flex items-center justify-center gap-2 w-full bg-[#fde8eb] hover:bg-[#e60000] text-[#e60000] hover:text-white font-bold text-[14px] py-3.5 px-6 rounded-[12px] border border-[#f5c6cb] hover:border-[#e60000] transition-all duration-300 group/link"
            >
              View All Events
              <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" strokeWidth={2.5} />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
