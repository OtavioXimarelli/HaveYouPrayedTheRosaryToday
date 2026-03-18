import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ComingSoonModal } from "./coming-soon-modal";

describe("ComingSoonModal", () => {
  it("renders correctly when open", () => {
    render(<ComingSoonModal isOpen={true} onClose={vi.fn()} featureName="Test Feature" />);
    // Verify by title, which is translated by our mock
    expect(screen.getByText("ComingSoon.title")).toBeInTheDocument();
  });
});
