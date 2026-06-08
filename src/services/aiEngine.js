const { GoogleGenerativeAI } = require("@google/generative-ai");

// --- Gemini setup ---
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.warn("⚠️ GEMINI_API_KEY is missing. AI features will fallback.");
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

async function generateText(prompt, maxTokens = 512) {
  try {
    if (!genAI) return null;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;

    return response.text().trim();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
}

// -----------------------------
// Explanation generator
// -----------------------------
async function generateExplanation(question, userAnswer, correctAnswer) {
  try {
    const prompt = `
You are an expert tutor for ${question.subTopic || "General Education"}.
A student is learning about "${question.topicId?.name || "this topic"}".

Question: ${question.text}
User's Answer: ${question.options[userAnswer]}
Correct Answer: ${question.options[correctAnswer]}

Task:
1. Explain why the correct answer is right.
2. Explain the mistake briefly.
3. Keep it encouraging and under 3 sentences.
`;

    const text = await generateText(prompt);

    if (text) return text;

    return getFallbackExplanation(question, userAnswer, correctAnswer);
  } catch (error) {
    console.error("AI Explanation Error:", error);
    return getFallbackExplanation(question, userAnswer, correctAnswer);
  }
}

// -----------------------------
// Topic summary
// -----------------------------
async function summarizeTopic(topicName, notes) {
  try {
    if (!genAI)
      return `This session covered ${topicName}. Key takeaway: ${notes.summary}`;

    const prompt = `Summarize the following study notes for ${topicName} in one powerful sentence:\n${notes.content}`;

    const text = await generateText(prompt);

    return (
      text ||
      `This session covered ${topicName}. Key takeaway: ${notes.summary}`
    );
  } catch (error) {
    return `This session covered ${topicName}. Key takeaway: ${notes.summary}`;
  }
}

// -----------------------------
// Notes summary
// -----------------------------
async function summarizeNotes(content) {
  try {
    if (!genAI) return content.substring(0, 100) + "...";

    const prompt = `Summarize these notes into 3-5 bullet points:\n${content}`;

    const text = await generateText(prompt);

    return text || "Summary not available.";
  } catch (error) {
    return "Summary not available.";
  }
}

// -----------------------------
// Question generation
// -----------------------------
async function generateQuestions(topicName, weakSubTopics, count = 3) {
  try {
    if (!genAI) return null;

    const prompt = `
Create ${count} multiple-choice questions for "${topicName}".
Focus on: ${weakSubTopics.join(", ")}.

Return ONLY valid JSON:
[
  {
    "text": "...",
    "options": ["A", "B", "C", "D"],
    "correctAnswer": 0,
    "explanation": "...",
    "difficulty": "medium",
    "subTopic": "..."
  }
]
`;

    const text = await generateText(prompt, 1024);
    if (!text) return null;

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch (error) {
    console.error("AI Question Generation Error:", error);
    return null;
  }
}

// -----------------------------
// Fallback explanations
// -----------------------------
function getFallbackExplanation(question, userAnswer, correctAnswer) {
  const explanations = {
    "Linear Equations":
      "To solve for x, perform the same operation on both sides to keep balance. You likely missed a step isolating the variable.",
    Properties:
      "Distributive Property means multiplying everything inside brackets. It's key for simplifying expressions.",
    Simplification:
      "Group like terms together (x with x, numbers with numbers). You can't combine unlike terms.",
  };

  return (
    explanations[question.subTopic] ||
    "The correct answer follows standard rules. Keep practicing!"
  );
}

module.exports = {
  generateExplanation,
  summarizeTopic,
  summarizeNotes,
  generateQuestions,
  generateText,
};
