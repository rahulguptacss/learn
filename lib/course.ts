import { CourseItem } from '@/components/types';

export function slugifyCourseName(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getCourseSlug(course: Pick<CourseItem, 'title' | 'slug'>) {
  return course.slug || slugifyCourseName(course.title);
}

export function findCourseByParam(courses: CourseItem[], param: string) {
  const decoded = decodeURIComponent(param).toLowerCase();
  return courses.find((course) => {
    const slug = getCourseSlug(course).toLowerCase();
    return slug === decoded || course.id.toLowerCase() === decoded;
  });
}
