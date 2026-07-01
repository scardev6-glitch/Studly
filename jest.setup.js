require("dotenv").config({ path: ".env" });

// Mock Google Generative AI
jest.mock("@google/generative-ai", () => ({
  GoogleGenerativeAI: jest.fn(() => ({
    getGenerativeModel: jest.fn(() => ({
      generateContent: jest.fn().mockResolvedValue({
        response: {
          text: () => "Mock AI response from Gemini"
        }
      }),
      startChat: jest.fn(() => ({
        sendMessage: jest.fn().mockResolvedValue({
          response: {
            text: () => "Mock chat response from Gemini"
          }
        })
      }))
    }))
  }))
}));

// Set timeout
jest.setTimeout(10000);
