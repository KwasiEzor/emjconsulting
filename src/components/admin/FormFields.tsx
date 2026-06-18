import { ReactNode } from 'react';

export function Field({ label, children, required }: { label: string; children: ReactNode; required?: boolean }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/50">
        {label} {required && <span className="text-gold-400">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputBase = "w-full rounded-lg border border-white/10 bg-navy-800 px-3.5 py-2.5 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-gold-400/50 focus:ring-2 focus:ring-gold-400/20";

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputBase} ${props.className || ''}`} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputBase} ${props.className || ''}`} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${inputBase} ${props.className || ''}`} />;
}

export function FormGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>;
}
