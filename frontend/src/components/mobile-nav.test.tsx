import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MobileNav } from "./mobile-nav";

describe("MobileNav", () => {
  it("renders correctly", () => {
    render(<MobileNav />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
});
