export function safeParseJSON(raw) {
  if (!raw || typeof raw !== "string") return null;

  let text = raw
    .replace(/^```json\s*/i, "")
    .replace(/^```/, "")
    .replace(/```$/, "")
    .trim();

  const match = text.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
  if (!match) return null;

  text = match[0];

   
  text = text
    .replace(/\\'/g, "'")      
    .replace(/\u2019/g, "'");  

  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("JSON parse failed:", err.message);
    console.error(text);
    return null;
  }
}
