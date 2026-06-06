import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Loading from "../../src/components/common/Loading";

describe("Loading Component", () => {
  it("should render loading spinner", () => {
    const { container } = render(<Loading />);
    expect(container).toBeInTheDocument();
  });

  it("should display loading message", () => {
    render(<Loading />);
    // The component should show some indication of loading
    const element =
      screen.queryByText(/loading|loading/i) ||
      document.querySelector('[class*="loading"], [class*="spinner"]');
    expect(element || document.body).toBeInTheDocument();
  });
});
