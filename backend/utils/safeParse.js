export function safeParseJSON(raw) {
  if (!raw) return raw;

  // Remove code block markers
  let text = raw.replace(/^```json\s*/, "")
                .replace(/^```/, "")
                .replace(/```$/, "")
                .trim();

  // Replace literal newlines inside strings with \n
  text = text.replace(/"\s*([^"]*?)\s*"/gs, (match) => {
    return match.replace(/\n/g, "\\n");
  });

  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch {}
    }
    return raw;
  }
}
