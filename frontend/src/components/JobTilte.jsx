// we need and input with the button
// when user type jobtile and click button, then we hide the button
// when user click button, we need to send JobTitle to App.js

const JobTilte = ({
	jobTitle,
	setJobTitle,
	onStartInterview,
	interviewStarted,
}) => {
	return (
		<div>
			<form onSubmit={onStartInterview}>
				<label htmlFor="job-title">Job Title</label>
				<input
					id="job-title"
					type="text"
					value={jobTitle}
					onChange={(event) => setJobTitle(event.target.value)}
					placeholder="Enter the job title here"
				/>

				{!interviewStarted && (
					<button type="submit">Start Interview</button>
				)}
			</form>
		</div>
	);
};

export default JobTilte;
