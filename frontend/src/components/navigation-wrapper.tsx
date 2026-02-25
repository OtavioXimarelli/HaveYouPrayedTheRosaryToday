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
  
  // Public pages that should show the header-style navigation
  const publicPages = ["/", "/como-rezar", "/historia", "/misterios-do-dia", "/oracoes-tradicionais", "/about"];
  const isPublicPage = publicPages.includes(pathname as string);
  
  // Only show floating navbar on dashboard when authenticated
  const isDashboardPage = pathname === "/dashboard";
  const shouldShowFloatingNav = isDashboardPage && isLoggedIn;
  
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
      <OnboardingModal />
      {renderNav()}
      <MobileNav />
    </>
  );
}
