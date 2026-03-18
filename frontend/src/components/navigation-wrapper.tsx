"use client";

import { PublicHeader } from "./public-header";
import { MobileNav } from "./mobile-nav";
import { OnboardingModal } from "./onboarding-modal";

export function NavigationWrapper() {
  return (
    <>
      <OnboardingModal />
      <PublicHeader />
      <MobileNav />
    </>
  );
}
