import { questionAnswerPrompt, conceptExplainPrompt } from "../utils/prompts.js";
import { runGemini } from "./gemini.js";

// ✅ Just return raw Gemini output

export const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);
    const raw = await runGemini(prompt);

    res.status(200).json({ raw }); // 🚀 no parsing
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ message: "Failed to generate questions" });
  }
};

export const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = conceptExplainPrompt(question);
    const raw = await runGemini(prompt);

    res.status(200).json({ raw }); // 🚀 no parsing
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ message: "Failed to generate explanation" });
  }
};
