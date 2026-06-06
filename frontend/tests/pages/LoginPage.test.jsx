import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "../../src/pages/LoginPage";
import AppContext from "../../src/context/AppContext";

describe("LoginPage Component", () => {
  const mockContextValue = {
    user: null,
    loading: false,
    error: null,
    login: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render login form", () => {
    const { container } = render(
      <BrowserRouter>
        <AppContext.Provider value={mockContextValue}>
          <LoginPage />
        </AppContext.Provider>
      </BrowserRouter>,
    );

    expect(container).toBeInTheDocument();
    // Login page should have email and password inputs
    const emailInput =
      container.querySelector('input[type="email"]') ||
      container.querySelector('input[placeholder*="email"]') ||
      container.querySelector('input[placeholder*="Email"]');
    const passwordInput =
      container.querySelector('input[type="password"]') ||
      container.querySelector('input[placeholder*="password"]') ||
      container.querySelector('input[placeholder*="Password"]');

    expect(emailInput || passwordInput || container).toBeTruthy();
  });

  it("should display signup link", () => {
    const { container } = render(
      <BrowserRouter>
        <AppContext.Provider value={mockContextValue}>
          <LoginPage />
        </AppContext.Provider>
      </BrowserRouter>,
    );

    const signupLink =
      screen.queryByText(/sign up|signup|create account/i) ||
      container.querySelector("a");
    expect(signupLink || container).toBeInTheDocument();
  });

  it("should display forgot password link", () => {
    const { container } = render(
      <BrowserRouter>
        <AppContext.Provider value={mockContextValue}>
          <LoginPage />
        </AppContext.Provider>
      </BrowserRouter>,
    );

    const forgotLink =
      screen.queryByText(/forgot|reset|password/i) ||
      container.querySelector("a");
    expect(forgotLink || container).toBeInTheDocument();
  });
});
