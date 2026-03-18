import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
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

describe("DashboardPage", () => {
  it("renders correctly with mock data", () => {
    render(<DashboardPage />);
    expect(screen.getByTestId("dashboard-page")).toBeInTheDocument();
  });
});
