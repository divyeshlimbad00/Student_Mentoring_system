import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    icon,
    className = '',
    ...props
}) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-slate-400 mb-1.5 ml-1">
                    {label}
                </label>
            )}
            <div className="relative group">
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-blue-400">
                        {icon}
                    </div>
                )}
                <input
                    className={`
            w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5
            text-slate-200 placeholder-slate-500
            transition-all duration-200
            focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50
            disabled:opacity-50 disabled:cursor-not-allowed
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : ''}
            ${className}
          `}
                    {...props}
                />
            </div>
            {error && (
                <p className="mt-1.5 text-sm text-red-500 ml-1">
                    {error}
                </p>
            )}
        </div>
    );
};

export default Input;
