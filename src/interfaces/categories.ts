export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
  title?: string;
  subtitle?: string;
  heroImages?: Array<{ image: string; title: string; category: string }>;
  breadcrumb?: string;
}

export type GetAllCategoriesResponse = Category[];
