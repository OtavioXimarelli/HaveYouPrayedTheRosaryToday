"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { StaggeredMenu, StaggeredMenuItem } from "./staggered-menu";
import { AuthModal } from "./auth-modal";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  const openLogin = () => {
    setAuthMode("login");
    setAuthModalOpen(true);
  };

  const openSignup = () => {
    setAuthMode("signup");
    setAuthModalOpen(true);
  };

  const switchMode = () => {
    setAuthMode(authMode === "login" ? "signup" : "login");
  };

  const scrollToTop = () => {
    if (pathname !== "/") {
      router.push("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const scrollToAbout = () => {
    if (pathname !== "/") {
      router.push("/#about");
    } else {
      const element = document.getElementById("about");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const scrollToCommunity = () => {
    if (pathname !== "/") {
      router.push("/#community");
    } else {
      const element = document.getElementById("community");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const menuItems: StaggeredMenuItem[] = [
    {
      label: "Início",
      href: "/",
      onClick: scrollToTop,
    },
    {
      label: "Sobre",
      href: "#about",
      onClick: scrollToAbout,
    },
    {
      label: "Comunidade",
      href: "#community",
      onClick: scrollToCommunity,
    },
    {
      label: "Entrar",
      href: "#login",
      onClick: openLogin,
    },
    {
      label: "Cadastrar",
      href: "#signup",
      onClick: openSignup,
    },
  ];

  return (
    <>
      {/* Logo - Fixed on the opposite side */}
      <div className="fixed left-4 sm:left-6 top-4 sm:top-6 z-[100] flex items-center gap-2">
        <span className="text-2xl">📿</span>
        <span className="text-white font-semibold hidden sm:inline">
          Terço Hoje
        </span>
      </div>

      <StaggeredMenu
        position="right"
        colors={["#1a1a2e", "#16213e", "#0f3460"]}
        items={menuItems}
        displayItemNumbering={true}
        menuButtonColor="#FFD700"
        openMenuButtonColor="#FFFFFF"
        accentColor="#FFD700"
        closeOnClickAway={true}
      />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        onSwitchMode={switchMode}
      />
    </>
  );
}
