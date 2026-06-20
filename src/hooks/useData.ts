import { useState, useEffect } from 'react';
import * as api from '../lib/api-client';

// Types
export interface Service {
  id: string;
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  icon: string;
  slug: string;
  benefits?: Record<string, string[]>;
  process?: Array<{titleFr: string; titleEn: string}>;
  price?: string;
  duration?: string;
  featured?: boolean;
  order?: number;
}

export interface Destination {
  id: string;
  nameFr: string;
  nameEn: string;
  slug: string;
  flagEmoji: string;
  imageUrl?: string;
  descriptionFr: string;
  descriptionEn: string;
  visaDuration?: string;
  requirements?: Record<string, unknown>;
  featured?: boolean;
  continent?: string;
  order?: number;
}

export interface BlogPost {
  id: string;
  titleFr: string;
  titleEn: string;
  slug: string;
  excerptFr: string;
  excerptEn: string;
  contentFr: string;
  contentEn: string;
  imageUrl?: string;
  categoryId?: string;
  author: string;
  status: string;
  readingTime?: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Faq {
  id: string;
  questionFr: string;
  questionEn: string;
  answerFr: string;
  answerEn: string;
  order?: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  content: string;
  imageUrl?: string;
  rating?: string;
  createdAt: string;
}

// Generic fetch hook
export function useFetch<T>(endpoint: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Remove leading /api/ if present to avoid double prefix
    const cleanEndpoint = endpoint.replace(/^\/api\//, '');
    fetch(`/api/${cleanEndpoint}`)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [endpoint]);

  return { data, loading, error };
}

// Specific hooks
export function useServices() {
  const [data, setData] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    api.fetchServices()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}

export function useDestinations() {
  const [data, setData] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    api.fetchDestinations()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}

export function useBlogPosts() {
  const [data, setData] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    api.fetchBlogPosts()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}

export function useFAQs() {
  const [data, setData] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    api.fetchFAQs()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}

export function useTestimonials() {
  const [data, setData] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    api.fetchTestimonials()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
