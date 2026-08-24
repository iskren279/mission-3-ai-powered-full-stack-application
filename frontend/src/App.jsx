import { useState } from "react";

import JobTilte from "./components/JobTitle";
import Conversation from "./components/Conversation";
import UserAnswer from "./components/UserAnswer";
import InterviewFeedback from "./components/InterviewFeedback";

import API_URL from "./config";

import "./App.css";

function App() {
  const [jobTitle, setJobTitle] = useState("");

  const [sessionId, setSessionId] = useState("");

  const [messages, setMessages] = useState([]);

  const [answer, setAnswer] = useState("");

  const [feedback, setFeedback] = useState("");

  const [interviewComplete, setInterviewComplete] = useState(false);

  const handleStartInterview = async (event) => {
    event.preventDefault();

    const response = await fetch(`${API_URL}/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jobTitle,
      }),
    });

    const data = await response.json();

    setSessionId(data.sessionId);

    setMessages([
      {
        role: "interviewer",
        content: data.question,
      },
    ]);
  };

  const handleAnswerSubmit = async (event) => {
    event.preventDefault();

    const submittedAnswer = answer;

    // Add candidate answer to conversation
    setMessages((currentMessages) => [
      ...currentMessages,
      {
        role: "candidate",
        content: submittedAnswer,
      },
    ]);

    // Clear input immediately
    setAnswer("");

    const response = await fetch(`${API_URL}/${sessionId}/answer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        answer: submittedAnswer,
      }),
    });

    const data = await response.json();

    if (data.completed) {
      // Interview is finished
      setFeedback(data.feedback);
      setInterviewComplete(true);
    } else {
      // Interview continues
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "interviewer",
          content: data.question,
        },
      ]);
    }
  };
  // 1. the app need to remember jobtitle -> why? because we pass it to API
  // 2. the app need to rememer conversation {question, and answer} why? because we pass it to API
  // No need to 3. what is the number of question 1-6, why? because if question 1-5 we call api to get the next question, if number 6 we call api to get feedback

  return (
    <>
      <JobTilte
        jobTitle={jobTitle}
        setJobTitle={setJobTitle}
        onStartInterview={handleStartInterview}
        interviewStarted={Boolean(sessionId)}
      />
      <Conversation messages={messages} />
      {!interviewComplete && (
        <UserAnswer
          answer={answer}
          setAnswer={setAnswer}
          onSubmitAnswer={handleAnswerSubmit}
        />
      )}
      {interviewComplete && <InterviewFeedback feedback={feedback} />}
    </>
  );
}

export default App;
