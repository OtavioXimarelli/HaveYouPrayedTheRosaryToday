import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Navbar } from "./navbar";

describe("Navbar", () => {
  it("renders correctly", () => {
    render(<Navbar />);
    expect(screen.getByTestId("navbar-desktop")).toBeInTheDocument();
  });
});
