// show this
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function testGemini() {
  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: "Say hello and confirm that you are working.",
  });

  return response.text;
}
// show this
async function generateInterviewQuestion(jobTitle, conversation) {
  const formattedConversation = conversation
    .map((message) => `${message.role}: ${message.content}`)
    .join("\n");

  const prompt = `
You are a professional job interviewer.

The candidate is interviewing for this role:

${jobTitle}

Conduct a realistic job interview.

Here is the conversation so far:

${formattedConversation}

Generate the next interview question.

Rules:
- Ask ONE question only.
- The question must be relevant to the job role.
- Base the question on the candidate's previous answers.
- Adapt the question to information the candidate has already provided.
- Do not repeat any previous question.
- Do not ask questions that have already been answered.
- Do not provide feedback yet.
- Do not provide multiple questions.
- The interview should become progressively more relevant to the candidate's experience.

Return only the next interview question.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
  });

  return response.text;
}

async function generateInterviewFeedback(jobTitle, conversation) {
  const formattedConversation = conversation
    .map((message) => `${message.role}: ${message.content}`)
    .join("\n");

  const prompt = `
You are a professional job interviewer.

The candidate was interviewing for this role:

${jobTitle}

The interview is now complete.

Here is the complete interview:

${formattedConversation}

Provide constructive feedback about the candidate's performance.

Your feedback must include:

1. Overall assessment
2. What the candidate did well
3. Areas where the candidate could improve
4. Specific suggestions for giving stronger interview answers
5. A short final recommendation

Be constructive and professional.

Do not invent information that the candidate did not provide.
Base your feedback only on their interview answers.

Return the feedback as clear, readable text.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
  });

  return response.text;
}

module.exports = {
  testGemini,
  generateInterviewQuestion,
  generateInterviewFeedback,
};
