import React from 'react';
import { notFound } from 'next/navigation';
import Header from '@/components/section/Header';
import Breadcrumb from '@/components/section/Breadcrumb';
import CourseDetail from '@/components/section/CourseDetail';
import Footer from '@/components/section/Footer';
import siteData from '@/components/data/data.json';
import { SiteData } from '@/components/types';
import { findCourseByParam, getCourseSlug } from '@/lib/course';

const data = siteData as SiteData;
const template = data.categories.Education.templateComponents['template-1'];
const pageData = template.pages.courseDetail;
const courses = template.sections.courses.list;

export const dynamicParams = true;

export function generateStaticParams() {
  return courses.map((course) => ({ id: getCourseSlug(course) }));
}

export async function generateMetadata({ params }: PageProps<'/courses/[id]'>) {
  const { id } = await params;
  const course = findCourseByParam(courses, id);
  return {
    title: course
      ? `${course.title} | Learnhub`
      : pageData?.metadata?.title || 'Course Detail | Learnhub',
  };
}

export default async function CourseDetailPage({ params }: PageProps<'/courses/[id]'>) {
  const { id } = await params;
  const course = findCourseByParam(courses, id);

  if (!course) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <Header data={data.common.Header} />
      <Breadcrumb
        title={course.title}
        pageName={course.title}
        data={data.common.Breadcrumb}
        uppercasePageName={false}
      />
      <CourseDetail course={course} labels={template.sections.courseDetail} />
      <Footer data={data.common.Footer} />
    </main>
  );
}
