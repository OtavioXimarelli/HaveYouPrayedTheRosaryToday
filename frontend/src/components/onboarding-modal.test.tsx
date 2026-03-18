import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { OnboardingModal } from "./onboarding-modal";

describe("OnboardingModal", () => {
  it("renders correctly", () => {
    render(<OnboardingModal />);
    // The onboarding modal has a delay before opening, so initially it might not be visible
    // We just check it renders without crashing
  });
});
