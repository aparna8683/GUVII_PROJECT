import 'dotenv/config';
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) throw new Error("GEMINI_API_KEY missing!");

const genAI = new GoogleGenerativeAI(API_KEY);
const MODEL_NAME = "gemini-1.5-flash";

export async function runGemini(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const result = await model.generateContent(prompt);

    // Gemini sometimes returns in candidates/parts
    let text = "";
    if (result?.response?.candidates?.[0]?.content?.parts?.[0]?.text) {
      text = result.response.candidates[0].content.parts[0].text;
    } else {
      text = JSON.stringify(result, null, 2); // fallback
    }

    return text;
  } catch (err) {
    console.error("runGemini error:", err);
    return `Gemini API Error: ${err.message}`;
  }
}
