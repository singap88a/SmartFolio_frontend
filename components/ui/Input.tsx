import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = ({ label, error, helperText, className = '', ...props }: InputProps) => {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-2.5 rounded-lg border bg-white dark:bg-slate-900 transition-all duration-200 outline-none
          ${error 
            ? 'border-red-500 focus:ring-4 focus:ring-red-500/10' 
            : 'border-slate-200 dark:border-slate-800 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10'}
          ${className}`}
        {...props}
      />
      {error ? (
        <p className="text-xs text-red-500 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
};

export default Input;
