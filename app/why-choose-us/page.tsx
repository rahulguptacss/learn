import React from 'react';
import Header from '../../components/section/Header';
import Breadcrumb from '../../components/section/Breadcrumb';
import WhyChooseUs from '../../components/section/WhyChooseUs';
import Statistics from '../../components/section/Statistics';
import Footer from '../../components/section/Footer';
import siteData from '../../components/data/data.json';
import { SiteData } from '../../components/types';

export const metadata = {
  title: siteData.categories.Education.templateComponents["template-1"].pages.whyChooseUs?.metadata?.title || 'Why Choose Us | Learnhub',
};

const data = siteData as SiteData;
const pageData = data.categories.Education.templateComponents["template-1"].pages.whyChooseUs;
const templateData = data.categories.Education.templateComponents["template-1"].sections;
const commonData = data.common;

export default function WhyChooseUsPage() {
  return (
    <div className="font-sans antialiased text-[#101b29]">
      <Header data={commonData.Header} />
      <main>
        <Breadcrumb 
          title={pageData?.title || ''} 
          pageName={pageData?.pageName || ''} 
          data={commonData.Breadcrumb} 
        />
        <WhyChooseUs data={templateData.whyChooseUs} />
        <Statistics data={templateData.statistics} />
      </main>
      <Footer data={commonData.Footer} />
    </div>
  );
}
