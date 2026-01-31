"use client";

import { StaggeredMenu, StaggeredMenuItem } from "./staggered-menu";

export function Navbar() {
  const menuItems: StaggeredMenuItem[] = [
    {
      label: "Início",
      href: "#home",
      onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
    },
    {
      label: "Sobre",
      href: "#about",
      onClick: () =>
        document
          .querySelector('section[class*="bg-navy-light"]')
          ?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      label: "Comunidade",
      href: "#community",
      onClick: () =>
        document
          .querySelector('[class*="community"]')
          ?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      label: "Começar Agora",
      href: "#start",
      onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
    },
  ];

  return (
    <>
      {/* Logo - Fixed on the opposite side */}
      <div className="fixed left-6 top-6 z-[100] flex items-center gap-2">
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
    </>
  );
}
