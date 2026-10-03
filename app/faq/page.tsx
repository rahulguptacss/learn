import React from 'react';
import Header from '../../components/section/Header';
import Footer from '../../components/section/Footer';
import Breadcrumb from '../../components/section/Breadcrumb';
import Faq from '../../components/section/Faq';
import siteData from '../../components/data/data.json';
import { SiteData, FaqData } from '../../components/types';

const data = siteData as SiteData;
const templateComponents = data.categories.Education.templateComponents["template-1"];
const templateData = templateComponents.sections;
const pageData = templateComponents.pages.faq;
const commonData = data.common;
const faqData = templateData.faq as FaqData;

export const metadata = {
  title: pageData?.metadata?.title || 'FAQ | Learnhub',
  description: pageData?.metadata?.description || "Got Questions? We've Got Answers",
};

export default function FaqPage() {
  return (
    <div className="font-sans antialiased text-[#101b29] bg-white">
      <Header data={commonData.Header} />
      <main>
        <Breadcrumb 
          title={pageData?.title || "Faq"}
          pageName={pageData?.pageName || "FAQ"}
          data={commonData.Breadcrumb}
        />
        
        <Faq data={faqData} />
      </main>
      <Footer data={commonData.Footer} />
    </div>
  );
}
