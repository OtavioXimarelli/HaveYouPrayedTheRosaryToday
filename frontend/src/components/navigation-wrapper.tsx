"use client";

import { usePathname } from "next/navigation";
import { PublicHeader } from "./public-header";
import { Navbar } from "./navbar";

export function NavigationWrapper() {
  const pathname = usePathname();
  
  // Check if user is authenticated (you'll need to implement proper auth check)
  // For now, we'll just check if we're on the dashboard page
  const isAuthenticated = false; // TODO: Replace with actual auth check
  
  // Public pages that should show the header-style navigation
  const publicPages = ["/", "/como-rezar", "/historia", "/misterios-do-dia", "/oracoes-tradicionais"];
  const isPublicPage = publicPages.includes(pathname);
  
  // Only show floating navbar on dashboard when authenticated
  const isDashboardPage = pathname === "/dashboard";
  const shouldShowFloatingNav = isDashboardPage && isAuthenticated;
  
  // Show public header for all public pages regardless of auth status
  if (isPublicPage) {
    return <PublicHeader />;
  }
  
  // Show floating navbar only on dashboard when authenticated
  if (shouldShowFloatingNav) {
    return <Navbar />;
  }
  
  // For other authenticated pages, show public header (can be customized later)
  return <PublicHeader />;
}
