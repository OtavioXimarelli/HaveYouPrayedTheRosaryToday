"use client";

import { useEffect } from "react";
import type { RefObject } from "react";
import { gsap } from "gsap";

interface MagicBentoEffectsProps {
  containerRef: RefObject<HTMLElement | null>;
  selector?: string;
  glowColor?: string;
  spotlightRadius?: number;
  particleCount?: number;
}

const MOBILE_BREAKPOINT = 768;

function createParticle(target: HTMLElement, color: string): HTMLDivElement {
  const rect = target.getBoundingClientRect();
  const particle = document.createElement("div");
  const x = Math.random() * rect.width;
  const y = Math.random() * rect.height;

  particle.className = "magic-bento-particle";
  particle.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    left: ${x}px;
    top: ${y}px;
    border-radius: 9999px;
    background: rgba(${color}, 1);
    box-shadow: 0 0 8px rgba(${color}, 0.55);
    pointer-events: none;
    z-index: 30;
  `;

  return particle;
}

export function MagicBentoEffects({
  containerRef,
  selector = "[data-magic-bento]",
  glowColor = "212, 175, 55",
  spotlightRadius = 380,
  particleCount = 10,
}: MagicBentoEffectsProps) {
  // Detect if light mode is active and use blue instead of gold
  const isDarkMode = typeof window !== 'undefined' ? document.documentElement.classList.contains('dark') : true;
  const effectiveGlowColor = isDarkMode ? glowColor : "59, 130, 246"; // Blue for light mode (Our Lady's color)

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const spotlight = document.createElement("div");
    spotlight.className = "magic-bento-spotlight";
    
    // Function to update spotlight gradient
    const updateSpotlightGradient = () => {
      const isDark = document.documentElement.classList.contains('dark');
      const color = isDark ? "212, 175, 55" : "59, 130, 246";
      spotlight.style.background = `radial-gradient(circle,
        rgba(${color}, 0.13) 0%,
        rgba(${color}, 0.07) 20%,
        rgba(${color}, 0.04) 40%,
        transparent 70%)`;
    };
    
    spotlight.style.cssText = `
      position: fixed;
      width: 760px;
      height: 760px;
      border-radius: 50%;
      pointer-events: none;
      transform: translate(-50%, -50%);
      opacity: 0;
      z-index: 14;
      mix-blend-mode: screen;
    `;
    updateSpotlightGradient();
    document.body.appendChild(spotlight);

    let isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
    const targets = () => Array.from(container.querySelectorAll<HTMLElement>(selector));

    const detachFns: Array<() => void> = [];
    const attachParticleEffects = () => {
      targets().forEach((target) => {
        const particles: HTMLDivElement[] = [];
        const timers: Array<ReturnType<typeof setTimeout>> = [];

        const clearParticles = () => {
          timers.forEach(clearTimeout);
          timers.length = 0;
          particles.forEach((particle) => {
            gsap.to(particle, {
              opacity: 0,
              scale: 0,
              duration: 0.2,
              onComplete: () => particle.remove(),
            });
          });
          particles.length = 0;
        };

        const onEnter = () => {
          if (isMobile) return;
          clearParticles();
          const isDark = document.documentElement.classList.contains('dark');
          const particleColor = isDark ? "212, 175, 55" : "59, 130, 246";
          
          Array.from({ length: particleCount }).forEach((_, index) => {
            const timeout = setTimeout(() => {
              const particle = createParticle(target, particleColor);
              target.appendChild(particle);
              particles.push(particle);

              gsap.fromTo(
                particle,
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.24, ease: "back.out(1.7)" }
              );
              gsap.to(particle, {
                x: (Math.random() - 0.5) * 80,
                y: (Math.random() - 0.5) * 80,
                opacity: 0.35,
                duration: 1.7 + Math.random(),
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
              });
            }, index * 65);
            timers.push(timeout);
          });
        };

        const onLeave = () => clearParticles();

        target.addEventListener("mouseenter", onEnter);
        target.addEventListener("mouseleave", onLeave);
        detachFns.push(() => {
          target.removeEventListener("mouseenter", onEnter);
          target.removeEventListener("mouseleave", onLeave);
          clearParticles();
        });
      });
    };

    const onResize = () => {
      isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
    };

    const onMove = (e: MouseEvent) => {
      if (isMobile) return;

      const rect = container.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (!inside) {
        gsap.to(spotlight, { opacity: 0, duration: 0.2, ease: "power2.out" });
        targets().forEach((target) => {
          target.style.setProperty("--glow-intensity", "0");
        });
        return;
      }

      gsap.to(spotlight, {
        left: e.clientX,
        top: e.clientY,
        opacity: 0.8,
        duration: 0.12,
        ease: "power2.out",
      });

      targets().forEach((target) => {
        const r = target.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const distance = Math.max(0, Math.hypot(dx, dy) - Math.max(r.width, r.height) / 2);
        const intensity = Math.max(0, 1 - distance / spotlightRadius);

        const relX = ((e.clientX - r.left) / r.width) * 100;
        const relY = ((e.clientY - r.top) / r.height) * 100;

        target.style.setProperty("--glow-x", `${relX}%`);
        target.style.setProperty("--glow-y", `${relY}%`);
        target.style.setProperty("--glow-intensity", intensity.toString());
        target.style.setProperty("--glow-radius", `${spotlightRadius}px`);
      });
    };
    
    // Listen for theme changes and update spotlight gradient
    const themeObserver = new MutationObserver(() => {
      updateSpotlightGradient();
    });
    
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    attachParticleEffects();
    window.addEventListener("resize", onResize);
    document.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("mousemove", onMove);
      detachFns.forEach((detach) => detach());
      spotlight.remove();
      themeObserver.disconnect();
    };
  }, [containerRef, effectiveGlowColor, particleCount, selector, spotlightRadius]);

  return (
    <style>{`
      [data-magic-bento] {
        position: relative;
        overflow: hidden;
        isolation: isolate;
        --glow-x: 50%;
        --glow-y: 50%;
        --glow-intensity: 0;
        --glow-radius: 280px;
        --glow-color: 59, 130, 246;
      }
      
      html.dark [data-magic-bento] {
        --glow-color: 212, 175, 55;
      }

      [data-magic-bento]::after {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: inherit;
        padding: 2px;
        pointer-events: none;
        background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
          rgba(var(--glow-color), calc(var(--glow-intensity) * 0.72)) 0%,
          rgba(var(--glow-color), calc(var(--glow-intensity) * 0.30)) 30%,
          transparent 60%);
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        mask-composite: exclude;
      }
    `}</style>
  );
}

