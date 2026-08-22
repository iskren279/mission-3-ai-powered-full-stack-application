const express = require("express");

const {
  generateInterviewQuestion,
  generateInterviewFeedback,
} = require("../services/geminiService");

const {
  createSession,
  getSession,
  addConversationMessage,
  incrementQuestionCount,
} = require("../services/interviewService");

const router = express.Router();

// Start a new interview
router.post("/start", (req, res) => {
  try {
    const { jobTitle } = req.body;

    if (!jobTitle) {
      return res.status(400).json({
        error: "Job title is required.",
      });
    }

    const sessionId = createSession(jobTitle);

    res.json({
      sessionId,
      questionNumber: 1,
      question: "Tell me about yourself",
    });
  } catch (error) {
    console.error("Start interview error:", error);

    res.status(500).json({
      error: "Failed to start interview.",
    });
  }
});

// Submit an answer and get the next question or final feedback
router.post("/:sessionId/answer", async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { answer } = req.body || {};

    if (!answer) {
      return res.status(400).json({
        error: "Answer is required.",
      });
    }

    const session = getSession(sessionId);

    if (!session) {
      return res.status(404).json({
        error: "Interview session not found.",
      });
    }

    // Save candidate answer
    addConversationMessage(sessionId, "candidate", answer);

    // If Question 6 has just been answered,
    // generate final feedback.
    if (session.questionCount >= 6) {
      const feedback = await generateInterviewFeedback(
        session.jobTitle,
        session.conversation,
      );

      return res.json({
        completed: true,
        questionNumber: session.questionCount,
        feedback: feedback,
      });
    }

    // Generate next question
    const nextQuestion = await generateInterviewQuestion(
      session.jobTitle,
      session.conversation,
    );

    // Save AI question
    addConversationMessage(sessionId, "interviewer", nextQuestion);

    // Increase question number
    incrementQuestionCount(sessionId);

    res.json({
      completed: false,
      questionNumber: session.questionCount,
      question: nextQuestion,
    });
  } catch (error) {
    console.error("Interview answer error:", error);

    res.status(500).json({
      error: "Failed to process interview answer.",
    });
  }
});

module.exports = router;
