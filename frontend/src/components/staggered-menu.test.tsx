import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { StaggeredMenu } from "./staggered-menu";

describe("StaggeredMenu", () => {
  it("renders correctly", () => {
    render(<StaggeredMenu />);
    expect(screen.getByLabelText("Open menu")).toBeInTheDocument();
  });
});
