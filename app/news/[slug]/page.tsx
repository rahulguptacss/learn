import React from 'react';
import Header from '../../../components/section/Header';
import Footer from '../../../components/section/Footer';
import Breadcrumb from '../../../components/section/Breadcrumb';
import siteData from '../../../components/data/data.json';
import { SiteData, NewsData, NewsItem } from '../../../components/types';
import NewsDetail from '../../../components/section/NewsDetail';

const data = siteData as SiteData;
const templateData = data.categories.Education.templateComponents["template-1"].sections;
const pageData = data.categories.Education.templateComponents["template-1"].pages.newsDetail;
const commonData = data.common;
const newsData = templateData.news as NewsData;

export const metadata = {
  title: pageData?.metadata?.title || 'newsDetail | Learnhub',
  description: pageData?.metadata?.description || 'Learnhub',
};

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  // Find the specific news item using slug or id
  const newsItem = newsData?.list?.find((item: NewsItem) => 
    String(item.id) === resolvedParams.slug || item.slug === resolvedParams.slug
  );

  return (
    <div className="font-sans antialiased text-[#101b29] bg-white">
      <Header data={commonData.Header} />
      <main>
        <Breadcrumb 
          title={pageData?.title || "Title"}
          pageName={pageData?.pageName || "PAGENAME"}
          data={{
            ...commonData.Breadcrumb,
            image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2000" // using students background
          }}
        />
        
        {/* News Detail Section */}
        {newsItem ? (
          <NewsDetail news={newsItem} allNews={newsData} />
        ) : (
          <div className="py-20 text-center">
            <h2 className="text-2xl font-bold text-[#1b2a4b]">News article not found</h2>
          </div>
        )}

      </main>
      <Footer data={commonData.Footer} />
    </div>
  );
}
