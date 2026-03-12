"use client";

import { useEffect, useRef, useState } from "react";

interface LightRaysProps {
  raysOrigin?: "top-center" | "top-left" | "top-right" | "center";
  raysColor?: string;
  raysSpeed?: number;
  lightSpread?: number;
  rayLength?: number;
  pulsating?: boolean;
  fadeDistance?: number;
  saturation?: number;
  followMouse?: boolean;
  mouseInfluence?: number;
  noiseAmount?: number;
  distortion?: number;
}

export function LightRays({
  raysOrigin = "top-center",
  raysColor = "#9a8f19",
  raysSpeed = 0.9,
  lightSpread = 1.3,
  rayLength = 1.3,
  pulsating = false,
  fadeDistance = 1,
  saturation = 1,
  followMouse = true,
  mouseInfluence = 0.1,
  noiseAmount = 0,
  distortion = 0,
}: LightRaysProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);

  // Handle mouse movement
  useEffect(() => {
    if (!followMouse) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        mousePosRef.current = {
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        };
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [followMouse]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      // Performance optimization: Cap devicePixelRatio at 1.5 for performance on high-DPI low-end phones
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    updateSize();

    const animate = () => {
      timeRef.current += raysSpeed * 0.01;

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      // Determine origin point
      let originX = width / 2;
      let originY = 0;

      if (raysOrigin === "top-left") {
        originX = 0;
      } else if (raysOrigin === "top-right") {
        originX = width;
      } else if (raysOrigin === "center") {
        originY = height / 2;
      }

      // Apply mouse influence
      if (followMouse) {
        originX += (mousePosRef.current.x * width - originX) * mouseInfluence;
        originY += (mousePosRef.current.y * height - originY) * mouseInfluence;
      }

      // Draw rays - optimize count for small screens
      const isMobile = width < 768;
      const rayCount = isMobile ? 8 : 12;
      
      for (let i = 0; i < rayCount; i++) {
        const angle = (i / rayCount) * Math.PI * 2 + timeRef.current * 0.5;
        const speed = Math.sin(timeRef.current + i) * 0.1;

        ctx.save();
        ctx.globalAlpha = 0.6 - i / rayCount * 0.4;

        // Create gradient
        const gradient = ctx.createLinearGradient(
          originX,
          originY,
          originX + Math.cos(angle) * width * rayLength,
          originY + Math.sin(angle) * height * rayLength
        );

        gradient.addColorStop(0, raysColor + "80");
        gradient.addColorStop(0.5, raysColor + "40");
        gradient.addColorStop(1, raysColor + "00");

        ctx.fillStyle = gradient;
        ctx.strokeStyle = raysColor + "60";
        ctx.lineWidth = 2;

        // Draw ray
        ctx.beginPath();
        ctx.moveTo(originX, originY);

        const controlX = originX + Math.cos(angle) * width * lightSpread * 0.3;
        const controlY = originY + Math.sin(angle) * height * lightSpread * 0.3;
        const endX = originX + Math.cos(angle) * width * rayLength;
        const endY = originY + Math.sin(angle) * height * rayLength;

        ctx.quadraticCurveTo(controlX, controlY, endX, endY);
        ctx.lineTo(originX + Math.cos(angle - 0.1) * width * 0.1, originY + Math.sin(angle - 0.1) * height * 0.1);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      }

      // Pulsating effect - disable on mobile if too heavy? 
      // For now just keep it as it's a simple fillRect
      if (pulsating) {
        const pulse = Math.sin(timeRef.current * 0.5) * 0.3 + 0.7;
        ctx.globalAlpha = pulse;
        ctx.fillStyle = raysColor + "10";
        ctx.fillRect(0, 0, width, height);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [raysColor, raysSpeed, lightSpread, rayLength, pulsating, mouseInfluence, followMouse, raysOrigin]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none will-change-transform"
    />
  );
}
