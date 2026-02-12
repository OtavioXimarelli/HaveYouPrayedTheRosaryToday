"use client";

import { useEffect, useState, ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function PageTransition({ children, className = "", delay = 0 }: PageTransitionProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-all duration-700 ease-out ${
        mounted
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4"
      } ${className}`}
    >
      {children}
    </div>
  );
}
