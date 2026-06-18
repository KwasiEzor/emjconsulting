import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plane, Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminLogin() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) setError(error);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy-950 px-4">
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-gold-400/10 blur-3xl animate-blob" />
      <div className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-navy-400/20 blur-3xl animate-blob animation-delay-2000" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-gradient shadow-xl">
            <Plane className="h-8 w-8 text-navy-900" />
          </div>
          <h1 className="font-display text-2xl font-bold text-white">EMJ-Consulting</h1>
          <p className="mt-1 text-sm text-white/50">Admin Dashboard Login</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-navy-900 p-6 shadow-2xl sm:p-8">
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/50">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@emj-consulting.com"
                  required
                  className="w-full rounded-xl border border-white/10 bg-navy-800 py-3 pl-10 pr-4 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-gold-400/50 focus:ring-2 focus:ring-gold-400/20"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/50">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-xl border border-white/10 bg-navy-800 py-3 pl-10 pr-4 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-gold-400/50 focus:ring-2 focus:ring-gold-400/20"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-500/10 px-3 py-2.5 text-sm text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0" /> {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gold-gradient py-3.5 text-sm font-semibold text-navy-900 shadow-lg transition-transform hover:scale-[1.02] disabled:opacity-60"
          >
            {loading ? 'Signing in...' : (<>Sign In <ArrowRight className="h-4 w-4" /></>)}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-white/30">
          Demo credentials: admin@emj-consulting.com / admin123
        </p>
      </motion.div>
    </div>
  );
}
