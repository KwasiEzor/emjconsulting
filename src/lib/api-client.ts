// Simple API client to fetch data from backend endpoints
const API_BASE = '/api';

export async function fetchServices() {
  const res = await fetch(`${API_BASE}/services`);
  if (!res.ok) throw new Error('Failed to fetch services');
  return res.json();
}

export async function fetchDestinations() {
  const res = await fetch(`${API_BASE}/destinations`);
  if (!res.ok) throw new Error('Failed to fetch destinations');
  return res.json();
}

export async function fetchBlogPosts() {
  const res = await fetch(`${API_BASE}/blog-posts`);
  if (!res.ok) throw new Error('Failed to fetch blog posts');
  return res.json();
}

export async function fetchFAQs() {
  const res = await fetch(`${API_BASE}/faqs`);
  if (!res.ok) throw new Error('Failed to fetch FAQs');
  return res.json();
}

export async function fetchTestimonials() {
  const res = await fetch(`${API_BASE}/testimonials`);
  if (!res.ok) throw new Error('Failed to fetch testimonials');
  return res.json();
}

export async function submitContactMessage(data: {
  name: string;
  email: string;
  phone?: string;
  country?: string;
  message: string;
}) {
  const res = await fetch(`${API_BASE}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to submit message');
  return res.json();
}

export async function submitNewsletterSubscription(email: string) {
  const res = await fetch(`${API_BASE}/newsletter`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error('Failed to subscribe');
  return res.json();
}

export async function submitAppointment(data: {
  service: string | null;
  date: string;
  time: string;
  name: string;
  email: string;
  phone?: string;
  notes?: string;
}) {
  const res = await fetch(`${API_BASE}/appointments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to submit appointment');
  return res.json();
}
