export interface AddBlogPost {
  title: string;
  shortDescription: string;
  urlHandle: string;
  content: string;
  featuredImageUrl: string;
  author: string;
  isVisible: boolean;
  publishedDate: Date;
  categories: string[];
}