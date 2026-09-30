import React from 'react';
import Header from '../../components/section/Header';
import Footer from '../../components/section/Footer';
import Breadcrumb from '../../components/section/Breadcrumb';
import Facilities from '../../components/section/Facilities';
import siteData from '../../components/data/data.json';
import { SiteData, FacilitiesData } from '../../components/types';

const data = siteData as SiteData;
const templateData = data.categories.Education.templateComponents["template-1"].sections;
const pageData = data.categories.Education.templateComponents["template-1"].pages.facilities;
const commonData = data.common;
const facilitiesData = templateData.facilities as FacilitiesData;

export const metadata = {
  title: pageData?.metadata?.title || 'facilities | Learnhub',
  description: pageData?.metadata?.description || 'Learnhub',
};

export default function FacilitiesPage() {
  return (
    <div className="font-sans antialiased text-[#101b29] bg-white">
      <Header data={commonData.Header} />
      <main>
        <Breadcrumb 
          title={pageData?.title || "Title"}
          pageName={pageData?.pageName || "PAGENAME"}
          data={commonData.Breadcrumb}
        />
        
        <Facilities data={facilitiesData} />
      </main>
      <Footer data={commonData.Footer} />
    </div>
  );
}
