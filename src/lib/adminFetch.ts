import supabase from './supabase';

/** Get the current session access token for admin API calls */
export async function getAdminToken(): Promise<string | null> {
 const { data } = await supabase.auth.getSession();
 return data.session?.access_token || null;
}

/** Fetch wrapper that auto-attaches the admin auth token */
export async function adminFetch(url: string, options: RequestInit = {}): Promise<Response> {
 const token = await getAdminToken();
 return fetch(url, {
 ...options,
 headers: {
 'Content-Type': 'application/json',
 ...(token ? { Authorization: `Bearer ${token}` } : {}),
 ...options.headers,
 },
 });
}
