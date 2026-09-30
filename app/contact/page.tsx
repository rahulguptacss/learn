import React from 'react';
import Header from '../../components/section/Header';
import Footer from '../../components/section/Footer';
import Breadcrumb from '../../components/section/Breadcrumb';
import Contact from '../../components/section/Contact';
import siteData from '../../components/data/data.json';
import { SiteData, ContactData } from '../../components/types';

const data = siteData as SiteData;
const templateComponents = data.categories.Education.templateComponents["template-1"];
const templateData = templateComponents.sections;
const pageData = templateComponents.pages.contact;
const commonData = data.common;
const contactData = templateData.contact as ContactData;

export const metadata = {
  title: pageData?.metadata?.title || 'Contact Us | Learnhub',
  description: pageData?.metadata?.description || "Get in touch with us.",
};

export default function ContactPage() {
  return (
    <div className="font-sans antialiased text-[#101b29] bg-white">
      <Header data={commonData.Header} />
      <main>
        <Breadcrumb 
          title={pageData?.title || "Contact Us"}
          pageName={pageData?.pageName || "Contact Us"}
          data={commonData.Breadcrumb}
        />
        
        <Contact data={contactData} />
      </main>
      <Footer data={commonData.Footer} />
    </div>
  );
}
