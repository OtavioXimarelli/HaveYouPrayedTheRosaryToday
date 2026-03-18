import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { StreakCounter } from "./streak-counter";

const mockStats = {
  currentStreak: 5,
  longestStreak: 10,
  totalCheckIns: 50,
  lastCheckIn: "2026-03-17",
};

describe("StreakCounter", () => {
  it("renders compact variant correctly", () => {
    render(<StreakCounter stats={mockStats} variant="compact" />);
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("renders full variant correctly", () => {
    render(<StreakCounter stats={mockStats} variant="full" />);
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();
  });
});
