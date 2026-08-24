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

		// Capture the answer before clearing the input
		const submittedAnswer = answer;

		// Add the answer to the conversation
		setMessages((currentMessages) => [
			...currentMessages,
			{
				role: "candidate",
				content: submittedAnswer,
			},
		]);

		// Clear the input
		setAnswer("");

		// Send the captured answer to the backend
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

		console.log(data);

		if (data.completed) {
			setFeedback(data.feedback);
			setInterviewComplete(true);
		} else {
			setMessages((currentMessages) => [
				...currentMessages,
				{
					role: "interviewer",
					content: data.question,
				},
			]);
		}
	};

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
