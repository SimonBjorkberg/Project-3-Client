import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { ChatContext } from "../../context/chat.context";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import moment from "moment";
import UserList from "./UserList";

const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const {
    currentChat,
    messages,
    userChats,
    sendTextMessage,
    isUserChatsLoading,
    updateCurrentChat,
  } = useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
  const [textMessage, setTextMessage] = useState("");

  return (
    <div className="my-10 flex flex-row">
      <div className="w-72 border-t border-b border-l border-neutral">
        {isUserChatsLoading ? (
          <p>Loading</p>
        ) : (
          userChats.map((chat, index) => {
            return (
              <div key={index} onClick={() => updateCurrentChat(chat)}>
                <UserList user={user} chat={chat} />
              </div>
            );
          })
        )}
      </div>
      <div className="chat-box border w-96 border-neutral">
        <p className="text-xl border-b pb-2 text-white bg-neutral">
          {recipientUser ? recipientUser.username : "<--- Select a contact!"}
        </p>
        <div className="h-96 overflow-y-scroll">
          <ul className="list-none p-0">
            {messages && messages.length === 0 && (
              <p className="mt-20">
                {recipientUser ? "Start the conversation!" : null}
              </p>
            )}
            {messages.map((message, index) => (
              <li
                key={index}
                className={`my-1 w-full ${
                  message?.senderId === user?._id
                    ? "flex justify-end"
                    : "flex justify-start"
                }`}
              >
                <div
                  className={`max-w-md mx-5 p-2 shadow-md ${
                    message?.senderId === user?._id ? "text-right" : "text-left"
                  }`}
                >
                  <p className="text-sm">{message.message}</p>
                  <span className="text-xs text-gray-500">
                    {moment(message.createdAt).calendar()}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <input
            type="text"
            value={textMessage}
            onChange={(e) => setTextMessage(e.target.value)}
            placeholder="Message..."
            className="bg-white w-full text-neutral border-t border-neutral p-2 mt-3"
          />
          <button
            className="bg-neutral text-white hover:bg-neutral-700 p-2 border-t border-white"
            onClick={() =>
              sendTextMessage(
                textMessage,
                user._id,
                currentChat._id,
                setTextMessage
              )
            }
          >
            Send
          </button>
        </div>
      </div>
      <div className="spacer-div w-72"></div>
    </div>
  );
};

export default ChatBox;
