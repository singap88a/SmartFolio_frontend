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
        <label className="text-sm font-medium text-slate-300">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-2.5 rounded-lg border bg-[#0F121E] transition-all duration-200 outline-none
          ${error 
            ? 'border-red-500 focus:ring-4 focus:ring-red-500/10' 
            : 'border-[#1E2336] focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10'}
          ${className}`}
        {...props}
      />
      {error ? (
        <p className="text-xs text-red-500 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-slate-400">{helperText}</p>
      ) : null}
    </div>
  );
};

export default Input;

