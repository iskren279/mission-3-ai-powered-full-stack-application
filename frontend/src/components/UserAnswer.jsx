// the textarea for user to type their answer
// the button for user to confirm their answer
// when the button is click, send text to app.jsx
// when the button is click,  we need to clear the text in the textarea
const UserAnswer = ({ answer, setAnswer, onSubmitAnswer }) => {
	return (
		<div>
			<form onSubmit={onSubmitAnswer}>
				<textarea
					id="user-answer"
					value={answer}
					onChange={(event) => setAnswer(event.target.value)}
					placeholder="Enter your answer here"
				/>

				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default UserAnswer;
