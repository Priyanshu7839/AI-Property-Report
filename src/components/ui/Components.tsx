import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Card({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      className={cn(
        "bg-[#fff] shadow-black/10 shadow-sm border border-[#E6E8EC] rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function Badge({ 
  variant = 'neutral', 
  children, 
  className 
}: { 
  variant?: 'positive' | 'warning' | 'risk' | 'info' | 'neutral', 
  children: React.ReactNode,
  className?: string 
}) {
  const variants = {
    positive: "bg-emerald-50 text-emerald-700 border-emerald-100",
    warning: "bg-amber-50 text-amber-700 border-amber-100",
    risk: "bg-rose-50 text-rose-700 border-rose-100",
    info: "bg-blue-50 text-blue-700 border-blue-100",
    neutral: "bg-white text-gray-600 border-gray-200"
  };

  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border", variants[variant], className)}>
      {children}
    </span>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  subtext?: string;
}

export function StatCard({ label, value, trend, trendDirection, subtext }: StatCardProps) {
  return (
    <Card className="p-5 flex flex-col gap-2 hover:shadow-md transition-shadow bg-white shadow-black/10 shadow-sm" >
      <div className="flex justify-between items-start">
        <span className="text-sm font-medium text-[#5B616E]">{label}</span>
        {trend && (
          <div className={cn(
            "flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full",
            trendDirection === 'up' ? "text-emerald-700 bg-emerald-50" : 
            trendDirection === 'down' ? "text-rose-700 bg-rose-50" : 
            "text-gray-600 bg-gray-50"
          )}>
            {trendDirection === 'up' && <ArrowUpRight size={14} />}
            {trendDirection === 'down' && <ArrowDownRight size={14} />}
            {trendDirection === 'neutral' && <Minus size={14} />}
            {trend}
          </div>
        )}
      </div>
      <div>
        <div className="text-2xl font-bold tracking-tight text-[#111111]">{value}</div>
        {subtext && <div className="text-xs text-[#5B616E] mt-1">{subtext}</div>}
      </div>
    </Card>
  );
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  children, 
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' | 'ghost', size?: 'sm' | 'md' | 'lg' }) {
  const variants = {
    primary: "bg-[#111111] text-white hover:bg-black shadow-sm",
    secondary: "bg-[#F7F8FA] text-[#111111] hover:bg-[#E6E8EC] border border-[#E6E8EC]",
    outline: "bg-transparent border border-[#E6E8EC] text-[#111111] hover:bg-[#F7F8FA]",
    ghost: "bg-transparent text-[#5B616E] hover:text-[#111111] hover:bg-[#F7F8FA]"
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  return (
    <button 
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#111111]",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
