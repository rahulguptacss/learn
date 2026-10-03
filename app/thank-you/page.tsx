import React from 'react';
import Header from '../../components/section/Header';
import Footer from '../../components/section/Footer';
import siteData from '../../components/data/data.json';
import { SiteData } from '../../components/types';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const data = siteData as SiteData;
const commonData = data.common;

export const metadata = {
  title: 'Thank You | Learnhub',
  description: 'Thank you for contacting us',
};

export default function ThankYouPage() {
  return (
    <div className="font-sans antialiased text-[#101b29] bg-[#f8f9fb] min-h-screen flex flex-col">
      <Header data={commonData.Header} />
      <main className="flex-grow flex flex-col justify-center relative overflow-hidden">
        
        <section className="w-full py-12 relative z-10">
          {/* Background decorations */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
            <div className="absolute top-[-10%] right-[-5%] w-[40%] aspect-square rounded-full bg-[#e60000]/5 blur-[100px]" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[40%] aspect-square rounded-full bg-[#1b2a4b]/5 blur-[100px]" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto bg-white rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 p-10 md:p-14 text-center">
              
              <div className="w-24 h-24 bg-[#fde8eb] rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                <CheckCircle2 className="w-12 h-12 text-[#e60000]" strokeWidth={2.5} />
              </div>
              
              <h1 className="text-[32px] md:text-[42px] font-black text-[#1b2a4b] mb-4 tracking-tight leading-tight">
                Thank You!
              </h1>
              
              <p className="text-[16px] md:text-[18px] text-[#5e6a7c] leading-[1.7] mb-10 max-w-lg mx-auto">
                We have received your message and appreciate you taking the time to contact us. 
                Our team will get back to you shortly.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  href="/" 
                  className="bg-[#e60000] text-white px-8 py-3.5 rounded-[8px] font-medium hover:bg-[#cc0000] transition-all flex items-center justify-center gap-3 group/btn shadow-md hover:shadow-xl hover:shadow-red-600/20 hover:-translate-y-0.5 duration-300 w-full sm:w-auto"
                >
                  Back to Home <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" strokeWidth={2} />
                </Link>
                
                <Link 
                  href="/courses" 
                  className="bg-[#f8f9fb] text-[#1b2a4b] border border-[#edf0f5] px-8 py-3.5 rounded-[8px] font-medium hover:bg-gray-50 transition-all flex items-center justify-center gap-3 w-full sm:w-auto"
                >
                  Explore Courses
                </Link>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer data={commonData.Footer} />
    </div>
  );
}
