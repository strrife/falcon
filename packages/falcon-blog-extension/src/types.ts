import { Pagination } from '@deity/falcon-data';

export type BlogPostList = {
  items: BlogPost[];
  pagination?: Pagination;
};

export type BlogPost = {
  id: number;
  date: string;
  modified?: string;
  title: string;
  content: string;
  excerpt?: string;
  slug?: string;
  status?: string;
  image?: BlogPostImage;
  related?: BlogPostList;
};

export type BlogPostImage = {
  url: string;
  description?: string;
};
