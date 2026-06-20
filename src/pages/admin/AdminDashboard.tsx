import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Briefcase, Globe, Star, HelpCircle, Newspaper,
  Calendar, Mail, Users, ArrowUpRight, Inbox
} from 'lucide-react';
import { adminFetch } from '../../lib/adminFetch';
import AdminLayout from '../../components/admin/AdminLayout';

interface Counts {
  services: number; destinations: number; testimonials: number;
  faqs: number; blog: number; appointments: number;
  messages: number; subscribers: number;
}

export default function AdminDashboard() {
  const [counts, setCounts] = useState<Counts | null>(null);
  const [recentMsgs, setRecentMsgs] = useState<Record<string, unknown>[]>([]);
  const [recentAppts, setRecentAppts] = useState<Record<string, unknown>[]>([]);

  useEffect(() => {
    Promise.all([
      adminFetch('/api/services'),
      adminFetch('/api/destinations'),
      adminFetch('/api/testimonials'),
      adminFetch('/api/faqs'),
      adminFetch('/api/blog-posts'),
      adminFetch('/api/appointments-admin'),
      adminFetch('/api/messages'),
      adminFetch('/api/subscribers'),
    ]).then(async (responses) => {
      const data = await Promise.all(responses.map((r) => r.json()));
      setCounts({
        services: data[0].length, destinations: data[1].length,
        testimonials: data[2].length, faqs: data[3].length,
        blog: data[4].length, appointments: data[5].length,
        messages: data[6].length, subscribers: data[7].length,
      });
      setRecentAppts((data[5] || []).slice(0, 5));
      setRecentMsgs((data[6] || []).slice(0, 5));
    }).catch(() => {});
  }, []);

  const cards = [
    { label: 'Services', value: counts?.services, icon: Briefcase, to: '/admin/services', color: 'from-blue-500 to-blue-700' },
    { label: 'Destinations', value: counts?.destinations, icon: Globe, to: '/admin/destinations', color: 'from-emerald-500 to-teal-700' },
    { label: 'Testimonials', value: counts?.testimonials, icon: Star, to: '/admin/testimonials', color: 'from-amber-500 to-orange-700' },
    { label: 'FAQs', value: counts?.faqs, icon: HelpCircle, to: '/admin/faqs', color: 'from-purple-500 to-purple-700' },
    { label: 'Blog Posts', value: counts?.blog, icon: Newspaper, to: '/admin/blog', color: 'from-rose-500 to-pink-700' },
    { label: 'Appointments', value: counts?.appointments, icon: Calendar, to: '/admin/appointments', color: 'from-cyan-500 to-blue-700' },
    { label: 'Messages', value: counts?.messages, icon: Mail, to: '/admin/messages', color: 'from-indigo-500 to-violet-700' },
    { label: 'Subscribers', value: counts?.subscribers, icon: Users, to: '/admin/subscribers', color: 'from-teal-500 to-green-700' },
  ];

  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">Dashboard</h1>
        <p className="mt-1 text-sm text-white/50">Overview of all your content and activity</p>
      </motion.div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link to={card.to} className="group block overflow-hidden rounded-2xl border border-white/10 bg-navy-900 p-5 transition-colors hover:border-gold-400/30">
              <div className="flex items-center justify-between">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${card.color} text-white shadow-lg`}>
                  <card.icon className="h-5 w-5" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-white/20 transition-colors group-hover:text-gold-400" />
              </div>
              <div className="mt-4 font-display text-3xl font-bold text-white">
                {card.value === undefined ? <span className="inline-block h-8 w-12 animate-pulse rounded bg-white/10" /> : card.value}
              </div>
              <div className="mt-0.5 text-sm text-white/50">{card.label}</div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Recent appointments */}
        <div className="rounded-2xl border border-white/10 bg-navy-900 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="flex items-center gap-2 font-display text-base font-bold text-white">
              <Calendar className="h-4 w-4 text-gold-400" /> Recent Appointments
            </h3>
            <Link to="/admin/appointments" className="text-xs font-medium text-gold-400 hover:underline">View all</Link>
          </div>
          <div className="space-y-2">
            {recentAppts.length === 0 ? (
              <p className="py-6 text-center text-sm text-white/30">No appointments yet</p>
            ) : recentAppts.map((a) => (
              <div key={String(a.id)} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2.5">
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium text-white">{String(a.name)}</div>
                  <div className="truncate text-xs text-white/40">{String(a.service)} • {String(a.date)} at {String(a.time)}</div>
                </div>
                <StatusBadge status={String(a.status)} />
              </div>
            ))}
          </div>
        </div>

        {/* Recent messages */}
        <div className="rounded-2xl border border-white/10 bg-navy-900 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="flex items-center gap-2 font-display text-base font-bold text-white">
              <Inbox className="h-4 w-4 text-gold-400" /> Recent Messages
            </h3>
            <Link to="/admin/messages" className="text-xs font-medium text-gold-400 hover:underline">View all</Link>
          </div>
          <div className="space-y-2">
            {recentMsgs.length === 0 ? (
              <p className="py-6 text-center text-sm text-white/30">No messages yet</p>
            ) : recentMsgs.map((m) => (
              <div key={String(m.id)} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2.5">
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium text-white">{String(m.name)}</div>
                  <div className="truncate text-xs text-white/40">{String(m.email)}</div>
                </div>
                <StatusBadge status={String(m.status || 'new')} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: 'bg-amber-500/15 text-amber-400',
    confirmed: 'bg-emerald-500/15 text-emerald-400',
    new: 'bg-blue-500/15 text-blue-400',
    read: 'bg-white/10 text-white/50',
    done: 'bg-emerald-500/15 text-emerald-400',
    cancelled: 'bg-red-500/15 text-red-400',
  };
  return (
    <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${map[status] || 'bg-white/10 text-white/50'}`}>
      {status}
    </span>
  );
}
