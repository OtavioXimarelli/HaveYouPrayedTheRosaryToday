import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import GuiaInterativoPage from "./page";

// Mock the dependencies
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "pt",
}));

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

describe("GuiaInterativoPage", () => {
  it("renders correctly with mock data", () => {
    render(<GuiaInterativoPage />);
    // Initial state without selected mode
    expect(screen.getByText("modeSelect.title")).toBeInTheDocument();
  });
});
