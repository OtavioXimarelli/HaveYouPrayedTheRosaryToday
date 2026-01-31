"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { gsap } from "gsap";

export interface StaggeredMenuItem {
  label: string;
  href: string;
  onClick?: () => void;
}

export interface StaggeredMenuProps {
  position?: "left" | "right";
  colors?: string[];
  items?: StaggeredMenuItem[];
  displayItemNumbering?: boolean;
  className?: string;
  logoUrl?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  changeMenuColorOnOpen?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
  closeOnClickAway?: boolean;
}

export function StaggeredMenu({
  position = "right",
  colors = ["#B19EEF", "#5227FF"],
  items = [],
  displayItemNumbering = true,
  className = "",
  logoUrl,
  menuButtonColor = "#fff",
  openMenuButtonColor = "#fff",
  accentColor = "#FFD700",
  changeMenuColorOnOpen = true,
  onMenuOpen,
  onMenuClose,
  closeOnClickAway = true,
}: StaggeredMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const overlaysRef = useRef<HTMLDivElement[]>([]);
  const itemsRef = useRef<HTMLLIElement[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Open animation
      const tl = gsap.timeline();
      
      overlaysRef.current.forEach((overlay, index) => {
        tl.to(
          overlay,
          {
            x: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          index * 0.1
        );
      });

      tl.to(
        itemsRef.current,
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.2"
      );

      onMenuOpen?.();
    } else {
      // Close animation
      gsap.to(itemsRef.current, {
        opacity: 0,
        x: position === "right" ? 50 : -50,
        duration: 0.3,
        stagger: 0.05,
      });

      gsap.to(overlaysRef.current, {
        x: position === "right" ? "100%" : "-100%",
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.in",
      });

      onMenuClose?.();
    }
  }, [isOpen, position, onMenuOpen, onMenuClose]);

  useEffect(() => {
    if (!closeOnClickAway) return;

    const handleClickAway = (e: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickAway);
    return () => document.removeEventListener("mousedown", handleClickAway);
  }, [isOpen, closeOnClickAway]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Menu Button */}
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className={`fixed ${position === "right" ? "right-6" : "left-6"} top-6 z-[100] flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-300 ${className}`}
        style={{
          color: isOpen && changeMenuColorOnOpen ? openMenuButtonColor : menuButtonColor,
        }}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <div className="flex flex-col gap-1.5">
            <span className="h-0.5 w-6 bg-current transition-all" />
            <span className="h-0.5 w-6 bg-current transition-all" />
            <span className="h-0.5 w-6 bg-current transition-all" />
          </div>
        )}
      </button>

      {/* Menu Panel */}
      <div
        ref={menuRef}
        className={`fixed ${position === "right" ? "right-0" : "left-0"} top-0 z-[90] h-screen w-full max-w-md overflow-hidden pointer-events-${isOpen ? "auto" : "none"}`}
      >
        {/* Staggered Background Overlays */}
        <div className="relative h-full w-full">
          {colors.map((color, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) overlaysRef.current[index] = el;
              }}
              className="absolute inset-0"
              style={{
                backgroundColor: color,
                transform: `translateX(${position === "right" ? "100%" : "-100%"})`,
                zIndex: colors.length - index,
              }}
            />
          ))}
        </div>

        {/* Menu Content */}
        <div className="absolute inset-0 z-10 flex flex-col justify-between p-8">
          {/* Logo */}
          {logoUrl && (
            <div className="mb-12">
              <img src={logoUrl} alt="Logo" className="h-8" />
            </div>
          )}

          {/* Menu Items */}
          <nav className="flex-1 flex flex-col justify-center">
            <ul className="space-y-6">
              {items.map((item, index) => (
                <li
                  key={index}
                  ref={(el) => {
                    if (el) itemsRef.current[index] = el;
                  }}
                  className="opacity-0"
                  style={{
                    transform: `translateX(${position === "right" ? "50px" : "-50px"})`,
                  }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => {
                      if (item.onClick) {
                        e.preventDefault();
                        item.onClick();
                        setIsOpen(false);
                      }
                    }}
                    className="group flex items-center gap-4 text-3xl font-bold text-white transition-colors hover:opacity-80"
                    style={{
                      color: "white",
                    }}
                  >
                    {displayItemNumbering && (
                      <span 
                        className="text-sm font-normal opacity-60"
                        style={{ color: accentColor }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    )}
                    <span className="relative">
                      {item.label}
                      <span
                        className="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full"
                        style={{ backgroundColor: accentColor }}
                      />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
