"use client";

import { ReactNode, useEffect, useRef } from "react";
import { gsap } from "gsap";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function PageTransition({ children, className = "", delay = 0 }: PageTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(ref.current, 
      { opacity: 0, y: 15 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay }
    );
  }, [delay]);

  return (
    <div ref={ref} className={`opacity-0 ${className}`}>
      {children}
    </div>
  );
}
