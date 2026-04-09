export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  author: string;
  coverImage?: string;
}

export interface Therapist {
  id: string;
  name: string;
  credentials: string;
  bio: string;
  specialties: string[];
  photo?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string;
}
