import { BlogItem } from '@/components/types';

export function slugifyBlogTitle(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getBlogSlug(blog: Pick<BlogItem, 'title' | 'slug' | 'id'>) {
  return (blog.slug as string) || slugifyBlogTitle(blog.title);
}

export function findBlogByParam(blogs: BlogItem[], param: string) {
  const decoded = decodeURIComponent(param).toLowerCase();
  return blogs.find((blog) => {
    const slug = getBlogSlug(blog).toLowerCase();
    return slug === decoded || String(blog.id).toLowerCase() === decoded;
  });
}
