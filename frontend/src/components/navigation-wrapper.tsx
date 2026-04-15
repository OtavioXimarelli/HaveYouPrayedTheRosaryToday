"use client";

import { usePathname } from "@/i18n/routing";
import { PublicHeader } from "./public-header";
import { Navbar } from "./navbar";
import { MobileNav } from "./mobile-nav";
import { OnboardingModal } from "./onboarding-modal";
import { useAuth } from "@/providers/auth-provider";

export function NavigationWrapper() {
  const pathname = usePathname();
  const { isLoggedIn } = useAuth();

  const publicPrefixes = [
    "/",
    "/about",
    "/como-rezar",
    "/historia",
    "/misterios-do-dia",
    "/oracoes-tradicionais",
    "/ensinamentos",
    "/recursos",
  ];

  const isPublicPage = publicPrefixes.some((prefix) => {
    if (prefix === "/") return pathname === "/";
    return pathname === prefix || pathname.startsWith(`${prefix}/`);
  });
  
  // Only show floating navbar on dashboard when authenticated
  const isDashboardPage = pathname === "/dashboard";
  const shouldShowFloatingNav = isDashboardPage && isLoggedIn;
  const shouldShowMobileNav = !isPublicPage && pathname.startsWith("/ferramentas");
  
  const renderNav = () => {
    if (isPublicPage) {
      return <PublicHeader />;
    }
    
    if (shouldShowFloatingNav) {
      return <Navbar />;
    }
    
    return <PublicHeader />;
  };

  return (
    <>
      <OnboardingModal enabled={isDashboardPage && isLoggedIn} />
      {renderNav()}
      {shouldShowMobileNav && <MobileNav />}
    </>
  );
}
