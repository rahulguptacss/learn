import React from 'react';
import { notFound } from 'next/navigation';
import Header from '@/components/section/Header';
import Breadcrumb from '@/components/section/Breadcrumb';
import BlogDetail from '@/components/section/BlogDetail';
import Footer from '@/components/section/Footer';
import siteData from '@/components/data/data.json';
import { SiteData, BlogData } from '@/components/types';
import { findBlogByParam, getBlogSlug } from '@/lib/blog';

const data = siteData as SiteData;
const template = data.categories.Education.templateComponents['template-1'];
const blogData = template.sections.blog as BlogData;
const blogs = blogData.list;

export const dynamicParams = true;

export function generateStaticParams() {
  return blogs.map((blog) => ({ slug: getBlogSlug(blog) }));
}

export async function generateMetadata({ params }: PageProps<'/blog/[slug]'>) {
  const { slug } = await params;
  const blog = findBlogByParam(blogs, slug);
  return {
    title: blog
      ? `${blog.title} | Learnhub`
      : 'Blog Detail | Learnhub',
  };
}

export default async function BlogDetailPage({ params }: PageProps<'/blog/[slug]'>) {
  const { slug } = await params;
  const blog = findBlogByParam(blogs, slug);

  if (!blog) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white font-sans antialiased text-[#101b29]">
      <Header data={data.common.Header} />
      <Breadcrumb 
        title={blog.title || "Blog Details"}
        pageName="BLOG DETAILS"
        data={data.common.Breadcrumb}
        uppercasePageName={false}
      />
      <BlogDetail 
        blog={blog} 
        recentPosts={blogs.slice(0, 4)} 
        categories={blogData.categories} 
      />
      <Footer data={data.common.Footer} />
    </main>
  );
}
