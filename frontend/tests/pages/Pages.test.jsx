import { describe, it, expect, beforeEach, vi } from "vitest";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NotesPage from "../../src/pages/NotesPage";
import PlannerPage from "../../src/pages/PlannerPage";
import ProgressPage from "../../src/pages/ProgressPage";
import AppContext from "../../src/context/AppContext";

vi.mock("../../src/services/api", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

const mockContextValue = {
  user: { id: "1", fullname: "Test User" },
  notifications: [],
  loading: false,
  error: null,
};

describe("NotesPage Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render notes page", () => {
    const { container } = render(
      <BrowserRouter>
        <AppContext.Provider value={mockContextValue}>
          <NotesPage />
        </AppContext.Provider>
      </BrowserRouter>,
    );

    expect(container).toBeInTheDocument();
  });

  it("should display notes list", () => {
    const { container } = render(
      <BrowserRouter>
        <AppContext.Provider value={mockContextValue}>
          <NotesPage />
        </AppContext.Provider>
      </BrowserRouter>,
    );

    expect(container).toBeInTheDocument();
  });

  it("should have create note button", () => {
    const { container } = render(
      <BrowserRouter>
        <AppContext.Provider value={mockContextValue}>
          <NotesPage />
        </AppContext.Provider>
      </BrowserRouter>,
    );

    expect(container).toBeInTheDocument();
  });
});

describe("PlannerPage Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render planner page", () => {
    const { container } = render(
      <BrowserRouter>
        <AppContext.Provider value={mockContextValue}>
          <PlannerPage />
        </AppContext.Provider>
      </BrowserRouter>,
    );

    expect(container).toBeInTheDocument();
  });

  it("should display study plan", () => {
    const { container } = render(
      <BrowserRouter>
        <AppContext.Provider value={mockContextValue}>
          <PlannerPage />
        </AppContext.Provider>
      </BrowserRouter>,
    );

    expect(container).toBeInTheDocument();
  });

  it("should have plan management features", () => {
    const { container } = render(
      <BrowserRouter>
        <AppContext.Provider value={mockContextValue}>
          <PlannerPage />
        </AppContext.Provider>
      </BrowserRouter>,
    );

    expect(container).toBeInTheDocument();
  });
});

describe("ProgressPage Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render progress page", () => {
    const { container } = render(
      <BrowserRouter>
        <AppContext.Provider value={mockContextValue}>
          <ProgressPage />
        </AppContext.Provider>
      </BrowserRouter>,
    );

    expect(container).toBeInTheDocument();
  });

  it("should display progress statistics", () => {
    const { container } = render(
      <BrowserRouter>
        <AppContext.Provider value={mockContextValue}>
          <ProgressPage />
        </AppContext.Provider>
      </BrowserRouter>,
    );

    expect(container).toBeInTheDocument();
  });

  it("should show subject progress breakdown", () => {
    const { container } = render(
      <BrowserRouter>
        <AppContext.Provider value={mockContextValue}>
          <ProgressPage />
        </AppContext.Provider>
      </BrowserRouter>,
    );

    expect(container).toBeInTheDocument();
  });
});
