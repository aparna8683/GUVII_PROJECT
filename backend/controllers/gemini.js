import 'dotenv/config';
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY;
console.log("GEMINI_API_KEY:", API_KEY);

const genAI = new GoogleGenerativeAI(API_KEY);
const MODEL_NAME = "gemini-1.5-flash";

export async function runGemini(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const chat = model.startChat({
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      },
      history: [],
    });

    const result = await chat.sendMessage(prompt);

    // ✅ Safely extract text
    let text = "No response generated.";
    if (result?.response?.candidates?.[0]?.content?.parts?.[0]?.text) {
      text = result.response.candidates[0].content.parts[0].text;
    } else if (typeof result?.response?.text === "function") {
      text = result.response.text();
    } else if (typeof result?.response?.text === "string") {
      text = result.response.text;
    }

    return text.trim();
  } catch (error) {
    console.error("runGemini error:", error);
    return "Error: " + (error.message || "Something went wrong with Gemini API");
  }
}

// ✅ Test standalone
if (import.meta.url === `file://${process.argv[1]}`) {
  (async () => {
    try {
      console.log("Testing Gemini API...");
      const testPrompt = "Explain AI in simple words";
      const response = await runGemini(testPrompt);
      console.log("Gemini response:", response);
    } catch (err) {
      console.error("Gemini test failed:", err);
    }
  })();
}
