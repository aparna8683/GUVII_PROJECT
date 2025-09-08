import { questionAnswerPrompt, conceptExplainPrompt } from "../utils/prompts.js";
import { runGemini } from "./gemini.js";

// Interview Questions
export const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);
    console.log("📩 Sending prompt to Gemini:", prompt);

    const raw = await runGemini(prompt);
    console.log("📤 Gemini raw output:", raw);

    let data;
    try {
      const cleaned = raw
        .replace(/```[a-zA-Z]*/g, "") // removes ```json, ```javascript, etc.
        .replace(/```/g, "")
        .trim();

      console.log("🧹 Cleaned output before JSON.parse:", cleaned);
      data = JSON.parse(cleaned);
    } catch (err) {
      console.warn("⚠️ Gemini output not valid JSON. Error:", err.message);
      data = raw;
    }

    console.log("✅ Final data being sent:", data);
    res.status(200).json({ data });
  } catch (error) {
    console.error("❌ Gemini API Error in generateInterviewQuestions:", error);
    res.status(500).json({ message: "Failed to generate questions" });
  }
};

// Concept Explanation
export const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = conceptExplainPrompt(question);
    console.log("📩 Sending prompt to Gemini:", prompt);

    const raw = await runGemini(prompt);
    console.log("📤 Gemini raw output:", raw);

    let data;
    try {
      // 🧹 Clean ALL fences (```json, ```javascript, ```python, etc.)
      const cleaned = raw
        .replace(/```[a-zA-Z]*/g, "") // removes ```json, ```javascript, etc.
        .replace(/```/g, "")
        .trim();

      console.log("🧹 Cleaned output before JSON.parse:", cleaned);
      data = JSON.parse(cleaned);
    } catch (err) {
      console.warn("⚠️ Gemini output not valid JSON. Error:", err.message);
      data = raw;
    }

    console.log("✅ Final data being sent:", data);
    res.status(200).json({ data });
  } catch (error) {
    console.error("❌ Gemini API Error in generateConceptExplanation:", error);
    res.status(500).json({ message: "Failed to generate explanation" });
  }
};
