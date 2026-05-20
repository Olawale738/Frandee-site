export type Role = 'ADMIN' | 'STAFF' | 'USER';

export type ProjectStatus = 'PLANNED' | 'ACTIVE' | 'COMPLETED' | 'ARCHIVED';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt?: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  icon?: string;
  order: number;
}

export interface Equipment {
  id: string;
  name: string;
  category: string;
  manufacturer?: string | null;
  model?: string | null;
  quantity: number;
  status: string;
  description?: string | null;
  imageUrl?: string | null;
}

export interface Software {
  id: string;
  name: string;
  vendor?: string | null;
  version?: string | null;
  licenseType?: string | null;
  seats: number;
  description?: string | null;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  client?: string | null;
  location?: string | null;
  category: string;
  status: ProjectStatus;
  summary: string;
  description: string;
  startDate?: string | null;
  endDate?: string | null;
  coverImage?: string | null;
  gallery: string[];
  tags: string[];
}
