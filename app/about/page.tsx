import React from 'react';
import Header from '../../components/section/Header';
import Breadcrumb from '../../components/section/Breadcrumb';
import About from '../../components/section/About';
import WhyChooseUs from '../../components/section/WhyChooseUs';
import Statistics from '../../components/section/Statistics';
import Footer from '../../components/section/Footer';
import siteData from '../../components/data/data.json';
import { SiteData } from '../../components/types';

export const metadata = {
  title: siteData.categories.Education.templateComponents["template-1"].pages.about?.metadata?.title || 'About Us | Learnhub',
};

const data = siteData as SiteData;
const pageData = data.categories.Education.templateComponents["template-1"].pages.about;
const templateData = data.categories.Education.templateComponents["template-1"].sections;
const commonData = data.common;

const componentMap: Record<string, React.ElementType> = {
  About: About,
  WhyChooseUs: WhyChooseUs,
  Statistics: Statistics,
};

export default function AboutPage() {
  if (!pageData) return null;

  return (
    <div className="font-sans antialiased text-[#101b29]">
      <Header data={commonData.Header} />
      <main>
        <Breadcrumb 
          title={pageData?.title || ''} 
          pageName={pageData?.pageName || ''} 
          data={commonData.Breadcrumb} 
        />
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
