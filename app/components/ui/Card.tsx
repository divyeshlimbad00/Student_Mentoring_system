import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    glass?: boolean;
    hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
    children,
    className = '',
    glass = false,
    hover = false,
}) => {
    const baseStyles = 'rounded-2xl p-6 transition-all duration-300';
    const glassStyles = glass
        ? 'glass-card border-slate-700/30'
        : 'bg-slate-800/50 border border-slate-700/30';

    const hoverStyles = hover
        ? 'hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 hover:border-slate-600/50'
        : '';

    return (
        <div className={`${baseStyles} ${glassStyles} ${hoverStyles} ${className}`}>
            {children}
        </div>
    );
};

export default Card;
