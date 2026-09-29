import React from 'react';
import Header from '../components/section/Header';
import Hero from '../components/section/Hero';
import About from '../components/section/About';
import Courses from '../components/section/Courses';
import Statistics from '../components/section/Statistics';
import WhyChooseUs from '../components/section/WhyChooseUs';
import Gallery from '../components/section/Gallery';
import Events from '../components/section/Events';
import Testimonials from '../components/section/Testimonials';
import Blog from '../components/section/Blog';
import Footer from '../components/section/Footer';
import siteData from '../components/data/data.json';
import { SiteData } from '../components/types';

export const metadata = {
  title: siteData.categories.Education.templateComponents["template-1"].pages.home?.metadata?.title || 'Home | Learnhub',
};

const data = siteData as SiteData;
const templateData = data.categories.Education.templateComponents["template-1"].sections;
const commonData = data.common;

export default function Home() {
  return (
    <div className="font-sans antialiased text-[#101b29]">
      <Header data={commonData.Header} />
      <main>
        <Hero data={templateData.hero} />
        <About data={templateData.about} />
        <Courses data={templateData.courses} />
        <Statistics data={templateData.statistics} />
        <WhyChooseUs data={templateData.whyChooseUs} />
        <Gallery data={templateData.gallery} />
        <Events data={templateData.events} />
        <Testimonials data={templateData.testimonials} />
        <Blog data={templateData.blog} />
      </main>
      <Footer data={commonData.Footer} />
    </div>
  );
}
