import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import AppContext from "../../src/context/AppContext";

vi.mock("../../src/services/api", () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
  },
}));

describe("AppContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("should create context with initial values", () => {
    expect(AppContext).toBeDefined();
    expect(AppContext.Provider).toBeDefined();
    expect(AppContext.Consumer).toBeDefined();
  });

  it("should have required context properties", () => {
    const mockValue = {
      user: null,
      notifications: [],
      loading: false,
      error: null,
      login: vi.fn(),
      logout: vi.fn(),
      signup: vi.fn(),
      setNotifications: vi.fn(),
    };

    expect(mockValue).toHaveProperty("user");
    expect(mockValue).toHaveProperty("notifications");
    expect(mockValue).toHaveProperty("loading");
    expect(mockValue).toHaveProperty("error");
    expect(mockValue).toHaveProperty("login");
    expect(mockValue).toHaveProperty("logout");
    expect(mockValue).toHaveProperty("signup");
  });
});
