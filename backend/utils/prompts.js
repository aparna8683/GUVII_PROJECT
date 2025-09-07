export const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => `
You are an AI trained to generate technical interview questions and answers.

Task:
- Role: ${role}
- Candidate Experience: ${experience} years
- Focus Topics: ${Array.isArray(topicsToFocus) ? topicsToFocus.join(", ") : topicsToFocus}
- Write ${numberOfQuestions} interview questions.
- For each question, generate a detailed but beginner-friendly answer.
- If the answer needs a code example, include a small code block.
- Keep formatting very clean.

⚠️ IMPORTANT INSTRUCTIONS:
1. Return a **pure JSON array** only.
2. No commentary, no explanations, no markdown fences (\`\`\`).
3. The output must look EXACTLY like this format:

[
  {
    "question": "Question here?",
    "answer": "Answer here."
  }
]

Nothing else before or after.
`;

export const conceptExplainPrompt = (question) => `
You are an AI trained to generate explanations for a given interview question.

Task:
- Explain the following interview question in depth as if teaching a beginner developer.
- Question: "${question}"
- Provide a short and clear title summarizing the concept for a header.
- Include a small code block if needed.
- Keep formatting very clean.

⚠️ IMPORTANT INSTRUCTIONS:
1. Return a **valid JSON object** only.
2. No commentary, no explanations, no markdown fences (\`\`\`).
3. The output must look EXACTLY like this format:

{
  "title": "Short title here",
  "explanation": "Detailed explanation here."
}

Nothing else before or after.
`;
