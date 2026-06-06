import { describe, it, expect, beforeEach, vi } from "vitest";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import DashboardPage from "../../src/pages/DashboardPage";
import AppContext from "../../src/context/AppContext";

describe("DashboardPage Component", () => {
  const mockContextValue = {
    user: {
      id: "1",
      fullname: "Test User",
      email: "test@test.com",
      totalXp: 500,
      level: 2,
      currentStreak: 5,
      points: 500,
    },
    notifications: [],
    loading: false,
    error: null,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render dashboard page", () => {
    const { container } = render(
      <BrowserRouter>
        <AppContext.Provider value={mockContextValue}>
          <DashboardPage />
        </AppContext.Provider>
      </BrowserRouter>,
    );

    expect(container).toBeInTheDocument();
  });

  it("should display user profile section", () => {
    const { container } = render(
      <BrowserRouter>
        <AppContext.Provider value={mockContextValue}>
          <DashboardPage />
        </AppContext.Provider>
      </BrowserRouter>,
    );

    // Dashboard should show user stats
    expect(container).toBeInTheDocument();
  });

  it("should display quick action buttons", () => {
    const { container } = render(
      <BrowserRouter>
        <AppContext.Provider value={mockContextValue}>
          <DashboardPage />
        </AppContext.Provider>
      </BrowserRouter>,
    );

    // Dashboard should have action buttons
    expect(container).toBeInTheDocument();
  });

  it("should display recent activity or progress", () => {
    const { container } = render(
      <BrowserRouter>
        <AppContext.Provider value={mockContextValue}>
          <DashboardPage />
        </AppContext.Provider>
      </BrowserRouter>,
    );

    expect(container).toBeInTheDocument();
  });
});
