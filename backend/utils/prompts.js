// utils/prompts.js

export const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => `
You are an AI trained to generate technical interview questions and answers.

Task:
- Role: ${role}
- Candidate Experience: ${experience} years
- Focus Topics: ${Array.isArray(topicsToFocus) ? topicsToFocus.join(", ") : topicsToFocus}
- Write ${numberOfQuestions} interview questions.
- For each question, generate a detailed but beginner-friendly answer.
- If the answer needs a code example, include it INLINE using escaped newlines (\\n), NOT raw code blocks.
- Keep formatting very clean.

⚠️ IMPORTANT INSTRUCTIONS:
1. Return a **pure JSON array** only.
2. Escape all newlines in strings using \\n.
3. Escape quotes inside strings with \\".
4. No commentary, no explanations, no markdown fences (\`\`\`).
5. The output must look EXACTLY like this format:

[
  {
    "question": "Question here?",
    "answer": "Answer here. If code is included, it must use escaped newlines like: import pandas as pd\\ndf = pd.read_csv('file.csv')"
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
- Include code examples INLINE using escaped newlines (\\n), NOT raw code blocks.
- Keep formatting very clean.

⚠️ IMPORTANT INSTRUCTIONS:
1. Return a **valid JSON object** only.
2. Escape all newlines in strings using \\n.
3. Escape quotes inside strings with \\".
4. No commentary, no explanations, no markdown fences (\`\`\`).
5. The output must look EXACTLY like this format:

{
  "title": "Short title here",
  "explanation": "Detailed explanation here. If code is included, it must use escaped newlines like: print('Hello world')"
}

Nothing else before or after.
`;
