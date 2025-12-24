import dotenv from "dotenv";
dotenv.config();
import Groq from "groq-sdk";

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

const MODEL_NAME = "llama-3.3-70b-versatile";

export async function runGemini(prompt) {
  try {
    const response = await client.chat.completions.create({
      model: MODEL_NAME,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    const output =
      response?.choices?.[0]?.message?.content?.trim() ||
      "No text found";

    return output;
  } catch (error) {
    console.error("runGemini (Groq) error:", error);
    return "Error calling Groq API.";
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  (async () => {
    const test = await runGemini("Explain AI simply");
    console.log("Groq Response:", test);
  })();
}
