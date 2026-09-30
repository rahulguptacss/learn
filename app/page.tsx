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
const pageData = data.categories.Education.templateComponents["template-1"].pages.home;
const templateData = data.categories.Education.templateComponents["template-1"].sections;
const commonData = data.common;

const componentMap: Record<string, React.ElementType> = {
  Hero: Hero,
  About: About,
  Courses: Courses,
  Statistics: Statistics,
  WhyChooseUs: WhyChooseUs,
  Gallery: Gallery,
  Events: Events,
  Testimonials: Testimonials,
  Blog: Blog,
};

export default function Home() {
  if (!pageData) return null;

  return (
    <div className="font-sans antialiased text-[#101b29]">
      <Header data={commonData.Header} />
      <main>
        {(pageData.components as any[])?.map((comp, index) => {
          const Component = componentMap[comp.component];
          if (!Component) return null;

          const sectionKey = comp.component.charAt(0).toLowerCase() + comp.component.slice(1);
          const sectionData = templateData[sectionKey];

          return <Component key={comp.key || index} data={sectionData} />;
        })}
      </main>
      <Footer data={commonData.Footer} />
    </div>
  );
}
