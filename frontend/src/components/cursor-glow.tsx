"use client";

import { useEffect, useRef } from "react";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    // Detect if light mode is active
    const isDarkMode = () =>
      document.documentElement.classList.contains("dark");

    // Get theme-aware glow colors (RGB format for spotlight matching)
    const getGlowColors = () => {
      return isDarkMode()
        ? {
            bg: "rgba(212, 175, 55, 0.65)", // Gold in dark mode
            rgb: "212, 175, 55",
            spotlight: "rgba(212, 175, 55, 0.4)",
          }
        : {
            bg: "rgba(59, 130, 246, 0.65)", // Blue in light mode (Our Lady's color)
            rgb: "59, 130, 246",
            spotlight: "rgba(59, 130, 246, 0.4)",
          };
    };

    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;
    let colors = getGlowColors();

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const updateGlowStyle = () => {
      colors = getGlowColors();
      glow.style.backgroundColor = colors.bg;
      glow.style.boxShadow = `
        0 0 40px ${colors.spotlight},
        0 0 80px ${colors.spotlight},
        inset 0 0 20px rgba(255, 255, 255, 0.1)
      `;
    };

    const animate = () => {
      // Smooth follow effect with easing
      glowX += (mouseX - glowX) * 0.12;
      glowY += (mouseY - glowY) * 0.12;

      glow.style.left = `${glowX}px`;
      glow.style.top = `${glowY}px`;

      requestAnimationFrame(animate);
    };

    // Start animation loop
    const animationId = requestAnimationFrame(animate);

    // Listen for mouse movement
    document.addEventListener("mousemove", onMouseMove);

    // Update glow color when theme changes
    const observer = new MutationObserver(() => {
      updateGlowStyle();
    });

    // Initial style update
    updateGlowStyle();

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      cancelAnimationFrame(animationId);
      document.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed z-50 mix-blend-mode-screen"
      style={{
        width: "80px",
        height: "80px",
        borderRadius: "50%",
        filter: "blur(35px)",
        transform: "translate(-50%, -50%)",
        transition: "box-shadow 0.3s ease, background-color 0.3s ease",
        willChange: "left, top",
      }}
    />
  );
}
