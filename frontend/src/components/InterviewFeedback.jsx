import ReactMarkdown from "react-markdown";
import styles from "./InterviewFeedback.module.css";

const InterviewFeedback = ({ feedback }) => {
  return (
    <section className={styles.interviewFeedback}>
      <h2 className={styles.title}>
        Interview Feedback
      </h2>

      <div className={styles.content}>
        <ReactMarkdown>{feedback}</ReactMarkdown>
      </div>
    </section>
  );
};

export default InterviewFeedback;
