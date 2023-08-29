import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { ChatContext } from "../../context/chat.context";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import moment from "moment";

const ChatBox = ({}) => {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, isMessagesLoading, sendTextMessage } =
    useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
  const [textMessage, setTextMessage] = useState("");

  if (!recipientUser) {
    return <p>No conversation selected yet ...</p>;
  }

  return (
    <div className="chat-box border w-[800px] h-96 border-neutral">
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
      <div>
        <input
          type="text"
          value={textMessage}
          onChange={(e) => setTextMessage(e.target.value)}
          className="bg-neutral text-white p-2 rounded-md my-1"
        />
        <button
          className="bg-white hover:bg-neutral-100 mt-3 p-2 border border-neutral"
          onClick={() => sendTextMessage(textMessage, user._id, currentChat._id, setTextMessage)}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
