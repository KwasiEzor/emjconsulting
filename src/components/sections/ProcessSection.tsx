import { motion } from 'framer-motion';
import { Search, FileText, Send, Eye, CheckCircle2 } from 'lucide-react';
import SectionHeading from '../SectionHeading';
import { useApp } from '../../contexts/AppContext';

export default function ProcessSection() {
  const { t } = useApp();
  const steps = [
    { Icon: Search, title: t.process.s1, desc: t.process.s1d },
    { Icon: FileText, title: t.process.s2, desc: t.process.s2d },
    { Icon: Send, title: t.process.s3, desc: t.process.s3d },
    { Icon: Eye, title: t.process.s4, desc: t.process.s4d },
    { Icon: CheckCircle2, title: t.process.s5, desc: t.process.s5d },
  ];

  return (
    <section className="relative overflow-hidden bg-navy-900 py-24 text-white">
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-gold-400/10 blur-3xl animate-blob" />
      <div className="absolute -left-32 bottom-1/4 h-96 w-96 rounded-full bg-navy-400/20 blur-3xl animate-blob animation-delay-2000" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Process" title={t.sections.process} subtitle={t.sections.processSub} light />

        <div className="relative mt-16">
          {/* Connecting line */}
          <div className="absolute left-0 right-0 top-7 hidden h-0.5 bg-gradient-to-r from-transparent via-gold-400/40 to-transparent lg:block" />

          <div className="grid gap-8 lg:grid-cols-5">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative mb-6">
                  <div className="absolute inset-0 rounded-full bg-gold-400/30 blur-xl" />
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-gold-gradient text-navy-900 shadow-xl"
                  >
                    <step.Icon className="h-6 w-6" />
                  </motion.div>
                  <span className="absolute -right-1 -top-1 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-navy-700 text-xs font-bold text-gold-400 ring-2 ring-gold-400/30">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold">{step.title}</h3>
                <p className="text-sm text-white/60">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
