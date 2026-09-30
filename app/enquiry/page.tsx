import React from 'react';
import Header from '../../components/section/Header';
import Footer from '../../components/section/Footer';
import Breadcrumb from '../../components/section/Breadcrumb';
import Enquiry from '../../components/section/Enquiry';
import siteData from '../../components/data/data.json';
import { SiteData, EnquiryData } from '../../components/types';

const data = siteData as SiteData;
const templateData = data.categories.Education.templateComponents["template-1"].sections;
const pageData = data.categories.Education.templateComponents["template-1"].pages.enquiry;
const commonData = data.common;
const enquiryData = templateData.enquiry as EnquiryData;

export const metadata = {
  title: pageData?.metadata?.title || 'enquiry | Learnhub',
  description: pageData?.metadata?.description || 'Learnhub',
};

export default function EnquiryPage() {
  return (
    <div className="font-sans antialiased text-[#101b29] bg-white">
      <Header data={commonData.Header} />
      <main>
        <Breadcrumb 
          title={pageData?.title || "Title"}
          pageName={pageData?.pageName || "PAGENAME"}
          data={commonData.Breadcrumb}
        />
        
        <Enquiry data={{...enquiryData, socials: commonData.Footer.socials as any}} />
      </main>
      <Footer data={commonData.Footer} />
    </div>
  );
}
