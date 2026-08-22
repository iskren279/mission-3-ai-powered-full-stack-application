const sessions = new Map();

function createSession(jobTitle) {
  const sessionId = Date.now().toString();

  sessions.set(sessionId, {
    jobTitle,
    questionCount: 1,
    conversation: [
      {
        role: "interviewer",
        content: "Tell me about yourself",
      },
    ],
  });

  return sessionId;
}

function getSession(sessionId) {
  return sessions.get(sessionId);
}

function addConversationMessage(sessionId, role, content) {
  const session = sessions.get(sessionId);

  if (!session) {
    return false;
  }

  session.conversation.push({
    role,
    content,
  });

  return true;
}

function incrementQuestionCount(sessionId) {
  const session = sessions.get(sessionId);

  if (!session) {
    return false;
  }

  session.questionCount += 1;

  return true;
}

module.exports = {
  createSession,
  getSession,
  addConversationMessage,
  incrementQuestionCount,
};
