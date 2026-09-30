import React from 'react';
import Header from '../../components/section/Header';
import Footer from '../../components/section/Footer';
import Breadcrumb from '../../components/section/Breadcrumb';
import siteData from '../../components/data/data.json';
import { SiteData, BlogData } from '../../components/types';
import Blog from '../../components/section/Blog';

const data = siteData as SiteData;
const templateData = data.categories.Education.templateComponents["template-1"].sections;
const pageData = data.categories.Education.templateComponents["template-1"].pages.blog;
const commonData = data.common;
const blogData = templateData.blog as BlogData;

export const metadata = {
  title: pageData?.metadata?.title || 'blog | Learnhub',
  description: pageData?.metadata?.description || 'Learnhub',
};

export default function BlogPage() {
  return (
    <div className="font-sans antialiased text-[#101b29] bg-white">
      <Header data={commonData.Header} />
      <main>
        <Breadcrumb 
          title={pageData?.title || "Title"}
          pageName={pageData?.pageName || "PAGENAME"}
          data={commonData.Breadcrumb}
        />
        
        {/* Blog Section */}
        <div className="bg-white">
          <Blog data={blogData} />
        </div>

      </main>
      <Footer data={commonData.Footer} />
    </div>
  );
}
