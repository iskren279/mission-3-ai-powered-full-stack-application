import "./Conversation.css";
const Conversation = ({ messages }) => {
  //display the questions and answers
  //this components does not send anything to any other apps

  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>
          <p>{message.role}</p>
          <p>{message.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Conversation;
