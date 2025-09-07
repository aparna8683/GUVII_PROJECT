export function safeParseJSON(raw) {
  if (!raw) return raw;

  // Remove code block markers
  let text = raw.replace(/^```json\s*/, "")
                .replace(/^```/, "")
                .replace(/```$/, "")
                .trim();

  // Try normal JSON parse
  try {
    return JSON.parse(text);
  } catch {
    // Extract first JSON object or array in the text
    const match = text.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch {}
    }
    // fallback to raw text
    return raw;
  }
}
