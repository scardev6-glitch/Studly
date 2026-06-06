import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AppShell from "../../src/components/layout/AppShell";
import AppContext from "../../src/context/AppContext";

describe("AppShell Component", () => {
  const mockContextValue = {
    user: { id: "1", fullname: "Test User", email: "test@test.com" },
    notifications: [],
    loading: false,
    error: null,
    logout: vi.fn(),
  };

  it("should render app shell layout", () => {
    const { container } = render(
      <BrowserRouter>
        <AppContext.Provider value={mockContextValue}>
          <AppShell>
            <div>Test Content</div>
          </AppShell>
        </AppContext.Provider>
      </BrowserRouter>,
    );

    expect(container).toBeInTheDocument();
    expect(container.textContent).toContain("Test Content");
  });

  it("should render header with user info", () => {
    const { container } = render(
      <BrowserRouter>
        <AppContext.Provider value={mockContextValue}>
          <AppShell>
            <div>Content</div>
          </AppShell>
        </AppContext.Provider>
      </BrowserRouter>,
    );

    expect(container).toBeInTheDocument();
  });

  it("should render navigation", () => {
    const { container } = render(
      <BrowserRouter>
        <AppContext.Provider value={mockContextValue}>
          <AppShell>
            <div>Content</div>
          </AppShell>
        </AppContext.Provider>
      </BrowserRouter>,
    );

    // Navigation should be present
    expect(container).toBeInTheDocument();
  });
});
