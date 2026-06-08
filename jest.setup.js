require("dotenv").config({ path: ".env.test" });

// Mock OpenAI
jest.mock("openai", () =>
  jest.fn(() => ({
    chat: {
      completions: {
        create: jest.fn().mockResolvedValue({
          choices: [{ message: { content: "Mock AI response" } }],
        }),
      },
    },
  }))
);

// Suppress console logs during tests
global.console.log = jest.fn();
global.console.error = jest.fn();
global.console.warn = jest.fn();

// Set timeout
jest.setTimeout(10000);
