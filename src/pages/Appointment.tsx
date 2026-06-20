import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, CheckCircle2, ChevronLeft, ChevronRight, User, Mail, Phone, FileText, X } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { useApp } from '../contexts/AppContext';
import { useFetch, Service } from '../hooks/useData';
import * as Icons from 'lucide-react';

interface BookedSlot { date: string; time: string; }

export default function Appointment() {
  const { lang, t } = useApp();
  const { data: servicesData } = useFetch<Service[]>('/api/services');
  const { data: bookedData } = useFetch<BookedSlot[]>('/api/appointments');
  const services = (servicesData || []) as unknown as Service[];
  const booked = (bookedData || []) as unknown as BookedSlot[];

  const [step, setStep] = useState(1);
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [info, setInfo] = useState({ name: '', email: '', phone: '', notes: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [monthOffset, setMonthOffset] = useState(0);

  const times = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];
  const bookedSet = new Set(booked.map((b) => `${b.date}|${b.time}`));

  // Calendar logic
  const today = new Date();
  const viewMonth = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1; // Monday-first
  const monthNames = lang === 'fr'
    ? ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = lang === 'fr' ? ['L', 'M', 'M', 'J', 'V', 'S', 'D'] : ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const isPast = (d: number) => {
    const cell = new Date(year, month, d);
    const todayMid = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return cell < todayMid;
  };
  const isWeekend = (d: number) => {
    const wd = new Date(year, month, d).getDay();
    return wd === 0 || wd === 6;
  };
  const fmtDate = (d: number) => `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

  const canNext = () => {
    if (step === 1) return !!service;
    if (step === 2) return !!date;
    if (step === 3) return !!time;
    return true;
  };

  const handleConfirm = async () => {
    setStatus('loading');
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service, date, time, ...info }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setConfirmOpen(false);
    } catch {
      setStatus('error');
    }
  };

  const reset = () => {
    setStep(1); setService(''); setDate(''); setTime('');
    setInfo({ name: '', email: '', phone: '', notes: '' });
    setStatus('idle');
  };

  const inputClass = "w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors focus:ring-2 focus:ring-gold-400/30";

  return (
    <PageTransition>
      <section className="relative overflow-hidden bg-navy-900 pt-36 pb-20 text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-gold-400/10 blur-3xl animate-blob" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-300">{t.nav.appointment}</span>
            <h1 className="font-display text-4xl font-bold sm:text-5xl md:text-6xl">{t.appointment.title}</h1>
            <p className="mt-5 text-lg text-white/70 sm:text-xl">{t.appointment.subtitle}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {status === 'success' ? (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="rounded-3xl glass p-12 text-center" style={{ boxShadow: '0 10px 40px -12px var(--shadow-color)' }}>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }} className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
                <CheckCircle2 className="h-10 w-10" />
              </motion.div>
              <h2 className="mb-3 font-display text-2xl font-bold" style={{ color: 'var(--text)' }}>{t.appointment.success}</h2>
              <p className="mb-2" style={{ color: 'var(--text-soft)' }}>{t.appointment.successMsg}</p>
              <div className="mx-auto my-6 max-w-sm rounded-2xl glass p-5 text-left text-sm">
                <div className="flex justify-between py-1"><span style={{ color: 'var(--text-soft)' }}>{t.appointment.step1}</span><span className="font-semibold" style={{ color: 'var(--text)' }}>{service}</span></div>
                <div className="flex justify-between py-1"><span style={{ color: 'var(--text-soft)' }}>{t.appointment.step2}</span><span className="font-semibold" style={{ color: 'var(--text)' }}>{date}</span></div>
                <div className="flex justify-between py-1"><span style={{ color: 'var(--text-soft)' }}>{t.appointment.step3}</span><span className="font-semibold" style={{ color: 'var(--text)' }}>{time}</span></div>
              </div>
              <button onClick={reset} className="rounded-xl bg-gold-gradient px-6 py-3 text-sm font-semibold text-navy-900 transition-transform hover:scale-105 shimmer">{lang === 'fr' ? 'Nouveau rendez-vous' : 'New appointment'}</button>
            </motion.div>
          ) : (
            <div className="rounded-3xl glass p-6 sm:p-10" style={{ boxShadow: '0 10px 40px -12px var(--shadow-color)' }}>
              {/* Stepper */}
              <div className="mb-10 flex items-center justify-between">
                {[1, 2, 3, 4].map((s, i) => (
                  <div key={s} className="flex flex-1 items-center">
                    <div className="flex flex-col items-center gap-2">
                      <motion.div animate={{ scale: step === s ? 1.1 : 1 }} className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-colors ${step >= s ? 'bg-gold-gradient text-navy-900' : 'bg-black/5'}`} style={{ color: step >= s ? undefined : 'var(--text-soft)' }}>
                        {step > s ? <CheckCircle2 className="h-5 w-5" /> : s}
                      </motion.div>
                      <span className={`hidden text-xs font-medium sm:block ${step >= s ? 'text-gold-400' : ''}`} style={{ color: step >= s ? undefined : 'var(--text-soft)' }}>
                        {s === 1 ? t.appointment.step1 : s === 2 ? t.appointment.step2 : s === 3 ? t.appointment.step3 : t.appointment.step4}
                      </span>
                    </div>
                    {i < 3 && <div className="mx-2 h-0.5 flex-1 rounded-full" style={{ background: step > s ? '#d4af37' : 'var(--border)' }} />}
                  </div>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {/* Step 1: Service */}
                {step === 1 && (
                  <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h3 className="mb-5 font-display text-xl font-bold" style={{ color: 'var(--text)' }}>{t.appointment.step1}</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {services.map((s) => {
                        const Icon = (Icons as unknown as Record<string, React.ComponentType<{className?: string}>>)[s.icon] || Icons.FileText;
                        const active = service === (lang === 'fr' ? s.titleFr : s.titleEn);
                        return (
                          <button key={s.id} onClick={() => setService(lang === 'fr' ? s.titleFr : s.titleEn)} className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-all ${active ? 'border-gold-400 bg-gold-400/10' : 'hover:border-gold-400/50'}`} style={{ borderColor: active ? undefined : 'var(--border)' }}>
                            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${active ? 'bg-gold-gradient text-navy-900' : 'bg-black/5'}`} style={{ color: active ? undefined : 'var(--text-soft)' }}><Icon className="h-5 w-5" /></div>
                            <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>{lang === 'fr' ? s.titleFr : s.titleEn}</span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Date */}
                {step === 2 && (
                  <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h3 className="mb-5 font-display text-xl font-bold" style={{ color: 'var(--text)' }}>{t.appointment.step2}</h3>
                    <div className="mx-auto max-w-md">
                      <div className="mb-4 flex items-center justify-between">
                        <button onClick={() => setMonthOffset((p) => Math.max(0, p - 1))} disabled={monthOffset === 0} className="flex h-9 w-9 items-center justify-center rounded-lg glass transition-colors hover:text-gold-400 disabled:opacity-30" style={{ color: 'var(--text)' }}><ChevronLeft className="h-5 w-5" /></button>
                        <span className="font-display font-semibold" style={{ color: 'var(--text)' }}>{monthNames[month]} {year}</span>
                        <button onClick={() => setMonthOffset((p) => p + 1)} className="flex h-9 w-9 items-center justify-center rounded-lg glass transition-colors hover:text-gold-400" style={{ color: 'var(--text)' }}><ChevronRight className="h-5 w-5" /></button>
                      </div>
                      <div className="grid grid-cols-7 gap-1.5">
                        {dayNames.map((d, i) => <div key={i} className="py-2 text-center text-xs font-semibold" style={{ color: 'var(--text-soft)' }}>{d}</div>)}
                        {Array.from({ length: adjustedFirstDay }).map((_, i) => <div key={`e${i}`} />)}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                          const d = i + 1;
                          const past = isPast(d);
                          const weekend = isWeekend(d);
                          const disabled = past || weekend;
                          const val = fmtDate(d);
                          const active = date === val;
                          return (
                            <button key={d} disabled={disabled} onClick={() => setDate(val)} className={`aspect-square rounded-lg text-sm font-medium transition-all ${active ? 'bg-gold-gradient text-navy-900 shadow-lg' : disabled ? 'cursor-not-allowed opacity-25' : 'glass hover:text-gold-400'}`} style={{ color: active ? undefined : 'var(--text)' }}>
                              {d}
                            </button>
                          );
                        })}
                      </div>
                      <p className="mt-4 text-center text-xs" style={{ color: 'var(--text-soft)' }}>{lang === 'fr' ? 'Disponible du lundi au vendredi' : 'Available Monday to Friday'}</p>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Time */}
                {step === 3 && (
                  <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h3 className="mb-5 font-display text-xl font-bold" style={{ color: 'var(--text)' }}>{t.appointment.step3}</h3>
                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                      {times.map((tm) => {
                        const isBooked = bookedSet.has(`${date}|${tm}`);
                        const active = time === tm;
                        return (
                          <button key={tm} disabled={isBooked} onClick={() => setTime(tm)} className={`flex items-center justify-center gap-1.5 rounded-xl border py-3 text-sm font-medium transition-all ${active ? 'border-gold-400 bg-gold-400/10 text-gold-400' : isBooked ? 'cursor-not-allowed opacity-30 line-through' : 'hover:border-gold-400/50'}`} style={{ borderColor: active ? undefined : 'var(--border)', color: active ? undefined : 'var(--text)' }}>
                            <Clock className="h-3.5 w-3.5" /> {tm}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Info */}
                {step === 4 && (
                  <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h3 className="mb-5 font-display text-xl font-bold" style={{ color: 'var(--text)' }}>{t.appointment.step4}</h3>
                    <div className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-1.5 block text-sm font-medium" style={{ color: 'var(--text)' }}>{t.appointment.name} *</label>
                          <div className="relative"><User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-400" /><input value={info.name} onChange={(e) => setInfo({ ...info, name: e.target.value })} className={`${inputClass} pl-10`} style={{ background: 'var(--bg-soft)', color: 'var(--text)', borderColor: 'var(--border)' }} /></div>
                        </div>
                        <div>
                          <label className="mb-1.5 block text-sm font-medium" style={{ color: 'var(--text)' }}>{t.appointment.email} *</label>
                          <div className="relative"><Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-400" /><input type="email" value={info.email} onChange={(e) => setInfo({ ...info, email: e.target.value })} className={`${inputClass} pl-10`} style={{ background: 'var(--bg-soft)', color: 'var(--text)', borderColor: 'var(--border)' }} /></div>
                        </div>
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium" style={{ color: 'var(--text)' }}>{t.appointment.phone}</label>
                        <div className="relative"><Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-400" /><input value={info.phone} onChange={(e) => setInfo({ ...info, phone: e.target.value })} className={`${inputClass} pl-10`} style={{ background: 'var(--bg-soft)', color: 'var(--text)', borderColor: 'var(--border)' }} /></div>
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium" style={{ color: 'var(--text)' }}>{t.appointment.notes}</label>
                        <div className="relative"><FileText className="absolute left-3.5 top-4 h-4 w-4 text-gold-400" /><textarea rows={3} value={info.notes} onChange={(e) => setInfo({ ...info, notes: e.target.value })} className={`${inputClass} pl-10`} style={{ background: 'var(--bg-soft)', color: 'var(--text)', borderColor: 'var(--border)' }} /></div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation */}
              <div className="mt-8 flex items-center justify-between">
                <button onClick={() => setStep((p) => Math.max(1, p - 1))} disabled={step === 1} className="rounded-xl px-5 py-3 text-sm font-medium transition-colors hover:bg-black/5 disabled:opacity-0" style={{ color: 'var(--text-soft)' }}>
                  {lang === 'fr' ? 'Précédent' : 'Previous'}
                </button>
                {step < 4 ? (
                  <button onClick={() => setStep((p) => p + 1)} disabled={!canNext()} className="flex items-center gap-2 rounded-xl bg-gold-gradient px-6 py-3 text-sm font-semibold text-navy-900 shadow-lg transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100">
                    {lang === 'fr' ? 'Suivant' : 'Next'} <ChevronRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button onClick={() => setConfirmOpen(true)} disabled={!info.name || !info.email} className="flex items-center gap-2 rounded-xl bg-gold-gradient px-6 py-3 text-sm font-semibold text-navy-900 shadow-lg transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shimmer">
                    <Calendar className="h-4 w-4" /> {t.appointment.confirm}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Confirmation modal */}
      <AnimatePresence>
        {confirmOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setConfirmOpen(false)} className="fixed inset-0 z-[200] flex items-center justify-center bg-navy-950/80 p-4 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: 'spring', damping: 28 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-3xl glass-strong p-8">
              <button onClick={() => setConfirmOpen(false)} className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full glass" style={{ color: 'var(--text)' }}><X className="h-5 w-5" /></button>
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-gradient text-navy-900"><Calendar className="h-7 w-7" /></div>
              <h3 className="mb-2 font-display text-xl font-bold" style={{ color: 'var(--text)' }}>{t.appointment.confirm}</h3>
              <div className="my-5 space-y-2 rounded-2xl glass p-4 text-sm">
                <div className="flex justify-between"><span style={{ color: 'var(--text-soft)' }}>{t.appointment.step1}</span><span className="font-semibold" style={{ color: 'var(--text)' }}>{service}</span></div>
                <div className="flex justify-between"><span style={{ color: 'var(--text-soft)' }}>{t.appointment.step2}</span><span className="font-semibold" style={{ color: 'var(--text)' }}>{date}</span></div>
                <div className="flex justify-between"><span style={{ color: 'var(--text-soft)' }}>{t.appointment.step3}</span><span className="font-semibold" style={{ color: 'var(--text)' }}>{time}</span></div>
                <div className="flex justify-between"><span style={{ color: 'var(--text-soft)' }}>{t.appointment.name}</span><span className="font-semibold" style={{ color: 'var(--text)' }}>{info.name}</span></div>
              </div>
              {status === 'error' && <p className="mb-3 text-sm text-red-500">Error. Try again.</p>}
              <button onClick={handleConfirm} disabled={status === 'loading'} className="flex w-full items-center justify-center gap-2 rounded-xl bg-gold-gradient px-6 py-3.5 text-sm font-semibold text-navy-900 shadow-lg transition-transform hover:scale-[1.02] disabled:opacity-60 shimmer">
                {status === 'loading' ? t.common.loading : <><CheckCircle2 className="h-4 w-4" /> {t.appointment.confirm}</>}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
