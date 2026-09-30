import React from 'react';
import Header from '../../components/section/Header';
import Footer from '../../components/section/Footer';
import Breadcrumb from '../../components/section/Breadcrumb';
import siteData from '../../components/data/data.json';
import { SiteData, NewsData } from '../../components/types';
import NewsGrid from '../../components/section/NewsGrid';

const data = siteData as SiteData;
const templateData = data.categories.Education.templateComponents["template-1"].sections;
const pageData = data.categories.Education.templateComponents["template-1"].pages.news;
const commonData = data.common;
const newsData = templateData.news as NewsData;

export const metadata = {
  title: pageData?.metadata?.title || 'news | Learnhub',
  description: pageData?.metadata?.description || 'Learnhub',
};

export default function NewsPage() {
  return (
    <div className="font-sans antialiased text-[#101b29] bg-white">
      <Header data={commonData.Header} />
      <main>
        <Breadcrumb 
          title={pageData?.title || "Title"}
          pageName={pageData?.pageName || "PAGENAME"}
          data={{
            ...commonData.Breadcrumb,
            image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2000" // using a nice students background
          }}
        />
        
        {/* News Grid Section */}
        <NewsGrid data={newsData} />

      </main>
      <Footer data={commonData.Footer} />
    </div>
  );
}
