require("dotenv").config({ path: ".env.test" });

// Mock Google Generative AI
jest.mock("@google/generative-ai", () => ({
  GoogleGenerativeAI: jest.fn(() => ({
    getGenerativeModel: jest.fn(() => ({
      generateContent: jest.fn().mockResolvedValue({
        response: {
          text: jest.fn(() => "Mock AI response"),
        },
      }),
    })),
  })),
}));

// Suppress console logs during tests
global.console.log = jest.fn();
global.console.error = jest.fn();
global.console.warn = jest.fn();

// Set timeout
jest.setTimeout(10000);
