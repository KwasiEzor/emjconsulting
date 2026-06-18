import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plane, MapPin, Phone, Mail, Facebook, Instagram, Send, CheckCircle2 } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export default function Footer() {
  const { t } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Email invalide');
      return;
    }
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setSubscribed(true);
      setEmail('');
    } catch {
      setError('Erreur réseau');
    }
  };

  const links = [
    { to: '/', label: t.nav.home },
    { to: '/about', label: t.nav.about },
    { to: '/services', label: t.nav.services },
    { to: '/destinations', label: t.nav.destinations },
    { to: '/blog', label: t.nav.blog },
    { to: '/contact', label: t.nav.contact },
  ];

  return (
    <footer className="relative overflow-hidden bg-navy-900 text-white">
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-gold-400/10 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-navy-400/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-gradient">
                <Plane className="h-5 w-5 text-navy-900" />
              </div>
              <span className="font-display text-xl font-bold">
                EMJ<span className="text-gold-gradient">Consulting</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">{t.footer.tagline}</p>
            <div className="mt-6 flex gap-3">
              {[
                { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
                { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
                { icon: Send, href: 'https://tiktok.com', label: 'TikTok' },
              ].map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-gold-400/50 hover:text-gold-400"
                  aria-label={s.label}
                >
                  <s.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-gold-400">{t.footer.quickLinks}</h4>
            <ul className="mt-4 space-y-2.5">
              {links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-white/60 transition-colors hover:text-gold-400">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-gold-400">{t.footer.contact}</h4>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-3 text-sm text-white/60">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <span>123 Avenue de la Liberté, Paris, France</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Phone className="h-4 w-4 shrink-0 text-gold-400" />
                <a href="tel:+33123456789" className="hover:text-gold-400">+33 1 23 45 67 89</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Mail className="h-4 w-4 shrink-0 text-gold-400" />
                <a href="mailto:contact@emj-consulting.com" className="hover:text-gold-400">contact@emj-consulting.com</a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-gold-400">{t.footer.newsletter}</h4>
            <p className="mt-4 text-sm text-white/60">{t.footer.newsletterSub}</p>
            {subscribed ? (
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-gold-400/30 bg-gold-400/10 px-4 py-3 text-sm text-gold-300">
                <CheckCircle2 className="h-4 w-4" /> {t.footer.subscribe} ✓
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-4">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.footer.emailPlaceholder}
                    className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none focus:border-gold-400/50"
                  />
                  <button
                    type="submit"
                    className="shrink-0 rounded-xl bg-gold-gradient px-4 py-2.5 text-sm font-semibold text-navy-900 transition-transform hover:scale-105"
                    aria-label={t.footer.subscribe}
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
                {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
              </form>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} EMJ-Consulting. {t.footer.rights}</p>
          <p className="flex items-center gap-1.5">{t.footer.madeWith} <span className="text-gold-400">✦</span> EMJ</p>
        </div>
      </div>
    </footer>
  );
}
