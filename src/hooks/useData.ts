import { useState, useEffect } from 'react';

export interface Service {
  id: number;
  icon: string;
  title_fr: string;
  title_en: string;
  desc_fr: string;
  desc_en: string;
  benefits_fr: string;
  benefits_en: string;
  process_fr: string;
  process_en: string;
}

export interface Destination {
  id: number;
  name_fr: string;
  name_en: string;
  flag: string;
  image: string;
  region: string;
  desc_fr: string;
  desc_en: string;
  conditions_fr: string;
  conditions_en: string;
  documents_fr: string;
  documents_en: string;
  delay_days: string;
  map_x: number;
  map_y: number;
}

export interface Testimonial {
  id: number;
  name: string;
  role_fr: string;
  role_en: string;
  avatar: string;
  rating: number;
  text_fr: string;
  text_en: string;
}

export interface Faq {
  id: number;
  question_fr: string;
  question_en: string;
  answer_fr: string;
  answer_en: string;
}

export interface BlogPost {
  id: number;
  title_fr: string;
  title_en: string;
  excerpt_fr: string;
  excerpt_en: string;
  content_fr: string;
  content_en: string;
  category: string;
  author: string;
  image: string;
  read_time: number;
  created_at: string;
}

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((d) => { if (active) setData(d); })
      .catch((e) => { if (active) setError(e.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [url]);

  return { data, loading, error };
}
