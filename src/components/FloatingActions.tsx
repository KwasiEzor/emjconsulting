import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 left-6 z-50 flex h-11 w-11 items-center justify-center rounded-full glass-strong shadow-lg transition-colors hover:text-gold-400"
          style={{ color: 'var(--text)' }}
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/33123456789?text=Bonjour%20EMJ-Consulting"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1.5, type: 'spring' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-xl"
      aria-label="WhatsApp"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring" />
      <MessageCircle className="relative h-7 w-7 text-white" fill="currentColor" />
    </motion.a>
  );
}

export function CookieConsent() {
  const { t } = useApp();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('emj-cookie');
    if (!accepted) {
      const timer = setTimeout(() => setShow(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const decide = (choice: string) => {
    localStorage.setItem('emj-cookie', choice);
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: 'spring', damping: 26, stiffness: 240 }}
          className="fixed inset-x-4 bottom-4 z-[80] mx-auto max-w-2xl rounded-2xl glass-strong p-5 shadow-2xl"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <p className="flex-1 text-sm" style={{ color: 'var(--text-soft)' }}>
              {t.cookie.text}
            </p>
            <div className="flex shrink-0 gap-2">
              <button
                onClick={() => decide('declined')}
                className="rounded-xl px-4 py-2 text-sm font-medium transition-colors hover:bg-black/5"
                style={{ color: 'var(--text-soft)' }}
              >
                {t.cookie.decline}
              </button>
              <button
                onClick={() => decide('accepted')}
                className="rounded-xl bg-gold-gradient px-4 py-2 text-sm font-semibold text-navy-900"
              >
                {t.cookie.accept}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
