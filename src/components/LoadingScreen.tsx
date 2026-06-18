import { motion, AnimatePresence } from 'framer-motion';
import { Plane } from 'lucide-react';

export default function LoadingScreen({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-navy-900"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />
          <div className="relative flex flex-col items-center gap-6">
            <motion.div
              className="relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 rounded-full bg-gold-400/30 blur-2xl animate-pulse" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gold-gradient">
                <Plane className="h-9 w-9 text-navy-900" />
              </div>
            </motion.div>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-2xl font-bold text-white">EMJ</span>
              <span className="font-display text-2xl font-bold text-gold-gradient">Consulting</span>
            </div>
            <div className="h-1 w-48 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full bg-gold-gradient"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
