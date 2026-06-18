import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, CheckCircle2, Facebook, Instagram, MessageCircle, Clock } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { useApp } from '../contexts/AppContext';

export default function Contact() {
  const { t } = useApp();
  const [form, setForm] = useState({ name: '', email: '', phone: '', country: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.email.trim()) e.email = 'Required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.message.trim()) e.message = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setForm({ name: '', email: '', phone: '', country: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const inputClass = "w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors focus:ring-2 focus:ring-gold-400/30";
  const inputStyle = (field: string) => ({
    background: 'var(--bg-soft)',
    color: 'var(--text)',
    borderColor: errors[field] ? '#ef4444' : 'var(--border)',
  });

  return (
    <PageTransition>
      <section className="relative overflow-hidden bg-navy-900 pt-36 pb-20 text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-gold-400/10 blur-3xl animate-blob" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-300">{t.nav.contact}</span>
            <h1 className="font-display text-4xl font-bold sm:text-5xl md:text-6xl">{t.contact.title}</h1>
            <p className="mt-5 text-lg text-white/70 sm:text-xl">{t.contact.subtitle}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-5">
            {/* Form */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="lg:col-span-3">
              <div className="rounded-3xl glass p-6 sm:p-8" style={{ boxShadow: '0 10px 40px -12px var(--shadow-color)' }}>
                {status === 'success' ? (
                  <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center py-12 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="mb-2 font-display text-xl font-bold" style={{ color: 'var(--text)' }}>{t.contact.success}</h3>
                    <button onClick={() => setStatus('idle')} className="mt-4 text-sm font-semibold text-gold-400 hover:underline">{t.common.sendMessage} →</button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium" style={{ color: 'var(--text)' }}>{t.contact.name} *</label>
                        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} style={inputStyle('name')} />
                        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium" style={{ color: 'var(--text)' }}>{t.contact.email} *</label>
                        <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} style={inputStyle('email')} />
                        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium" style={{ color: 'var(--text)' }}>{t.contact.phone}</label>
                        <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} style={inputStyle('phone')} />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium" style={{ color: 'var(--text)' }}>{t.contact.country}</label>
                        <input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className={inputClass} style={inputStyle('country')} />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium" style={{ color: 'var(--text)' }}>{t.contact.message} *</label>
                      <textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={inputClass} style={inputStyle('message')} />
                      {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                    </div>
                    {status === 'error' && <p className="text-sm text-red-500">{t.contact.title} error. Try again.</p>}
                    <button type="submit" disabled={status === 'loading'} className="flex w-full items-center justify-center gap-2 rounded-xl bg-gold-gradient px-6 py-3.5 text-sm font-semibold text-navy-900 shadow-lg transition-transform hover:scale-[1.02] shimmer disabled:opacity-60">
                      {status === 'loading' ? t.common.loading : <><Send className="h-4 w-4" /> {t.common.sendMessage}</>}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Info + map */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="space-y-6 lg:col-span-2">
              <div className="rounded-3xl glass p-6" style={{ boxShadow: '0 10px 40px -12px var(--shadow-color)' }}>
                <h3 className="mb-4 font-display text-lg font-bold" style={{ color: 'var(--text)' }}>{t.footer.contact}</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-gradient text-navy-900"><MapPin className="h-5 w-5" /></div>
                    <div><div className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Adresse</div><div className="text-sm" style={{ color: 'var(--text-soft)' }}>123 Avenue de la Liberté, Paris</div></div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-gradient text-navy-900"><Phone className="h-5 w-5" /></div>
                    <div><div className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Téléphone</div><a href="tel:+33123456789" className="text-sm hover:text-gold-400" style={{ color: 'var(--text-soft)' }}>+33 1 23 45 67 89</a></div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-gradient text-navy-900"><Mail className="h-5 w-5" /></div>
                    <div><div className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Email</div><a href="mailto:contact@emj-consulting.com" className="text-sm hover:text-gold-400" style={{ color: 'var(--text-soft)' }}>contact@emj-consulting.com</a></div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-gradient text-navy-900"><Clock className="h-5 w-5" /></div>
                    <div><div className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Horaires</div><div className="text-sm" style={{ color: 'var(--text-soft)' }}>Lun - Sam: 9h - 19h</div></div>
                  </li>
                </ul>
                <div className="mt-5 border-t pt-5" style={{ borderColor: 'var(--border)' }}>
                  <div className="mb-3 text-sm font-semibold" style={{ color: 'var(--text)' }}>{t.contact.followUs}</div>
                  <div className="flex gap-2">
                    {[
                      { Icon: MessageCircle, href: 'https://wa.me/33123456789', label: 'WhatsApp', color: 'bg-[#25D366]' },
                      { Icon: Facebook, href: 'https://facebook.com', label: 'Facebook', color: 'bg-[#1877F2]' },
                      { Icon: Instagram, href: 'https://instagram.com', label: 'Instagram', color: 'bg-gradient-to-br from-[#E1306C] to-[#F77737]' },
                    ].map((s) => (
                      <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" whileHover={{ y: -3 }} className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.color} text-white shadow-lg`} aria-label={s.label}>
                        <s.Icon className="h-5 w-5" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="overflow-hidden rounded-3xl glass" style={{ boxShadow: '0 10px 40px -12px var(--shadow-color)' }}>
                <iframe
                  title="Google Maps"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.996!2d2.3522!3d48.8566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis%2C%20France!5e0!3m2!1sen!2sfr!4v1700000000000"
                  width="100%"
                  height="240"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
