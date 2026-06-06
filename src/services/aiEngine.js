const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Service for generating AI-powered educational content and explanations.
 */
async function generateExplanation(question, userAnswer, correctAnswer) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.warn("GEMINI_API_KEY not found. Using fallback explanation.");
      return getFallbackExplanation(question, userAnswer, correctAnswer);
    }

    const prompt = `
      You are an expert tutor for ${question.subTopic || 'General Education'}.
      A student is learning about "${question.topicId?.name || 'this topic'}".
      
      Question: ${question.text}
      User's Answer: ${question.options[userAnswer]}
      Correct Answer: ${question.options[correctAnswer]}
      
      Task: 
      1. Explain why the correct answer is right.
      2. Briefly explain the mistake the user likely made based on their answer.
      3. Keep the tone encouraging, pedagogical, and very brief (max 3 sentences).
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return getFallbackExplanation(question, userAnswer, correctAnswer);
  }
}

function getFallbackExplanation(question, userAnswer, correctAnswer) {
  const explanations = {
    "Linear Equations": "To solve for x, you must always perform the same operation on both sides to keep the equation balanced. It looks like you might have missed a step in isolating the variable.",
    "Properties": "The Distributive Property is like 'handing out' the multiplier to everything inside the parentheses. It's a foundational rule for simplifying expressions.",
    "Simplification": "When simplifying, remember to group 'like terms' together. Think of x's as apples and numbers as oranges—you can't add them together!"
  };

  return explanations[question.subTopic] || "The correct answer follows the standard rules of algebra. Keep practicing to build your intuition for these patterns!";
}

async function summarizeTopic(topicName, notes) {
  try {
    if (!process.env.GEMINI_API_KEY) return `This session covered ${topicName}. Key takeaway: ${notes.summary}`;

    const prompt = `Summarize the following study notes for ${topicName} in one powerful, memorable sentence for a student: ${notes.content}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    return `This session covered ${topicName}. Key takeaway: ${notes.summary}`;
  }
}

async function summarizeNotes(content) {
  try {
    if (!process.env.GEMINI_API_KEY) return content.substring(0, 100) + "...";

    const prompt = `Summarize these student notes into 3-5 key bullet points for quick revision: ${content}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    return "Summary not available.";
  }
}

async function generateQuestions(topicName, weakSubTopics, count = 3) {
  try {
    if (!process.env.GEMINI_API_KEY) return null;

    const prompt = `
      Create ${count} multiple-choice questions for the topic "${topicName}".
      Target these specific weak areas: ${weakSubTopics.join(', ')}.
      
      Format the output as a JSON array of objects:
      [
        {
          "text": "Question text?",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "correctAnswer": 0,
          "explanation": "Why A is correct",
          "difficulty": "medium",
          "subTopic": "Sub-topic name"
        }
      ]
      Return ONLY the JSON.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(text);
  } catch (error) {
    console.error("AI Question Generation Error:", error);
    return null;
  }
}

module.exports = {
  generateExplanation,
  summarizeTopic,
  summarizeNotes,
  generateQuestions
};
