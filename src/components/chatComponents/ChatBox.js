import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { ChatContext } from "../../context/chat.context";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import moment from "moment";

const ChatBox = ({}) => {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, isMessagesLoading } = useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);

  if (!recipientUser) {
    return <p>No conversation selected yet ...</p>;
  }

  console.log(messages);

  return (
    <div className="chat-box border w-96 h-96 border-neutral">
      <p>{recipientUser.username}</p>
      <ul>
        {messages.map((message, index) => {
          return (
            <div
              key={index}
              className={`border my-1 flex flex-col w-full ${
                message?.senderId === user?._id ? "text-right" : "text-left"
              }`}
            >
              <p>{message.message}</p>
              <span>{moment(message.createdAt).calendar()}</span>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default ChatBox;
