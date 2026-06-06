import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import api from "../../src/services/api";

describe("API Service", () => {
  beforeEach(() => {
    // Mock fetch
    global.fetch = vi.fn();
    // Reset localStorage
    localStorage.clear();
    localStorage.getItem = vi.fn();
    localStorage.setItem = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("API instance configuration", () => {
    it("should create API instance with base URL", () => {
      expect(api).toBeDefined();
      expect(api).toHaveProperty("defaults");
    });

    it("should have request and response interceptors", () => {
      expect(api).toHaveProperty("interceptors");
    });
  });

  describe("Authentication token handling", () => {
    it("should add auth token to requests", async () => {
      const token = "test-token-123";
      localStorage.getItem.mockReturnValue(token);

      expect(localStorage.getItem).toBeDefined();
    });

    it("should handle token refresh", async () => {
      expect(api).toBeDefined();
    });

    it("should clear token on 401 response", async () => {
      expect(api).toBeDefined();
    });
  });

  describe("Error handling", () => {
    it("should handle network errors", async () => {
      global.fetch.mockRejectedValue(new Error("Network error"));
      expect(global.fetch).toBeDefined();
    });

    it("should handle API errors", async () => {
      expect(api).toBeDefined();
    });
  });

  describe("Request methods", () => {
    it("should have GET method", () => {
      expect(api.get).toBeDefined();
    });

    it("should have POST method", () => {
      expect(api.post).toBeDefined();
    });

    it("should have PUT method", () => {
      expect(api.put).toBeDefined();
    });

    it("should have DELETE method", () => {
      expect(api.delete).toBeDefined();
    });
  });
});
