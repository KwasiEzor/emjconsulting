import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Briefcase, Globe, Star, HelpCircle, Newspaper,
  Calendar, Mail, Users, LogOut, Menu, X, Plane, ExternalLink
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/services', label: 'Services', icon: Briefcase },
  { to: '/admin/destinations', label: 'Destinations', icon: Globe },
  { to: '/admin/testimonials', label: 'Testimonials', icon: Star },
  { to: '/admin/faqs', label: 'FAQs', icon: HelpCircle },
  { to: '/admin/blog', label: 'Blog Posts', icon: Newspaper },
  { to: '/admin/appointments', label: 'Appointments', icon: Calendar },
  { to: '/admin/messages', label: 'Messages', icon: Mail },
  { to: '/admin/subscribers', label: 'Subscribers', icon: Users },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const NavLinks = () => (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => {
        const isActive = item.end ? location.pathname === item.to : location.pathname.startsWith(item.to);
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={() => setSidebarOpen(false)}
            className={`group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
              isActive
                ? 'bg-gold-gradient text-navy-900 shadow-lg'
                : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon className="h-[18px] w-[18px]" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-navy-950">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-white/10 bg-navy-900 p-5 lg:flex">
        <Link to="/admin" className="mb-8 flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-gradient">
            <Plane className="h-5 w-5 text-navy-900" />
          </div>
          <div className="leading-none">
            <div className="font-display text-base font-bold text-white">EMJ<span className="text-gold-400">Admin</span></div>
            <div className="text-[10px] uppercase tracking-widest text-white/40">Dashboard</div>
          </div>
        </Link>
        <NavLinks />
        <div className="mt-auto space-y-2 border-t border-white/10 pt-4">
          <Link to="/" className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white">
            <ExternalLink className="h-[18px] w-[18px]" /> View Site
          </Link>
          <div className="rounded-xl bg-white/5 px-3.5 py-3">
            <div className="truncate text-xs text-white/40">Signed in as</div>
            <div className="truncate text-sm font-medium text-white">{user?.email}</div>
          </div>
          <button onClick={signOut} className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10">
            <LogOut className="h-[18px] w-[18px]" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-navy-900 px-4 py-3 lg:hidden">
        <Link to="/admin" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-gradient">
            <Plane className="h-4 w-4 text-navy-900" />
          </div>
          <span className="font-display text-sm font-bold text-white">EMJ<span className="text-gold-400">Admin</span></span>
        </Link>
        <button onClick={() => setSidebarOpen(true)} className="rounded-lg p-2 text-white">
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile sidebar drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-sm lg:hidden"
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute left-0 top-0 h-full w-72 overflow-y-auto border-r border-white/10 bg-navy-900 p-5"
            >
              <div className="mb-6 flex items-center justify-between">
                <Link to="/admin" className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-gradient">
                    <Plane className="h-5 w-5 text-navy-900" />
                  </div>
                  <span className="font-display text-base font-bold text-white">EMJ<span className="text-gold-400">Admin</span></span>
                </Link>
                <button onClick={() => setSidebarOpen(false)} className="rounded-lg p-2 text-white/60">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <NavLinks />
              <div className="mt-6 border-t border-white/10 pt-4">
                <Link to="/" className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-white/60">
                  <ExternalLink className="h-[18px] w-[18px]" /> View Site
                </Link>
                <button onClick={signOut} className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-red-400">
                  <LogOut className="h-[18px] w-[18px]" /> Sign Out
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="lg:pl-64">
        <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-10">{children}</div>
      </main>
    </div>
  );
}
