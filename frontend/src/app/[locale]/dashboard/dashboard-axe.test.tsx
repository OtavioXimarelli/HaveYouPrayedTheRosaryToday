import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { axe } from "vitest-axe";
import DashboardPage from "./page";

// Mock the dependencies
vi.mock("@/i18n/routing", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));

vi.mock("@/providers/auth-provider", () => ({
  useAuth: () => ({
    user: { name: "Test User" },
  }),
}));

vi.mock("@/hooks/use-hydrated", () => ({
  useIsMounted: () => true,
}));

describe("DashboardPage Accessibility", () => {
  it("should have no accessibility violations", async () => {
    const { container } = render(<DashboardPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
