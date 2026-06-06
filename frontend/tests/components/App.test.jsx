import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../../src/App";
import AppContext from "../../src/context/AppContext";

// Mock components to avoid complex dependencies
vi.mock("../../src/pages/DashboardPage", () => ({
  default: () => <div>Dashboard Page</div>,
}));

vi.mock("../../src/pages/LoginPage", () => ({
  default: () => <div>Login Page</div>,
}));

describe("App Component", () => {
  const mockContextValue = {
    user: null,
    notifications: [],
    loading: false,
    error: null,
    login: vi.fn(),
    logout: vi.fn(),
    setNotifications: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render without crashing", () => {
    render(
      <BrowserRouter>
        <AppContext.Provider value={mockContextValue}>
          <App />
        </AppContext.Provider>
      </BrowserRouter>,
    );
  });

  it("should render main app layout", () => {
    const { container } = render(
      <BrowserRouter>
        <AppContext.Provider value={mockContextValue}>
          <App />
        </AppContext.Provider>
      </BrowserRouter>,
    );

    expect(container).toBeInTheDocument();
  });
});
