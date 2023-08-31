import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { ChatContext } from "../../context/chat.context";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import moment from "moment";
import ChatDrawerItem from "./ChatDrawerItem";

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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const chatbox = document.getElementById("chatbox");
    function scrollToBottom() {
      chatbox.scrollTop = chatbox.scrollHeight;
    }

    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex w-full">
      <div className="w-full">
        <div className="text-xl p-4 text-white bg-neutral">
          {recipientUser ? (
            <div className="flex flex-row items-center justify-between">
              <label
                htmlFor="my-drawer-5"
                className="drawer-button hover:cursor-pointer lg:hidden"
              >
                <p className="text-white rounded-md">{"< "}Contacts</p>
              </label>
              <p className="flex-grow text-center lg:pr-0 pr-[96px]">
                {recipientUser.username}
              </p>
            </div>
          ) : (
            <div className="flex flex-row items-center justify-between">
              <label
                htmlFor="my-drawer-5"
                className="drawer-button hover:cursor-pointer lg:hidden"
              >
                <p className="text-white rounded-md">{"< "}Contacts</p>
              </label>
              <p className="flex-grow text-center lg:pr-0 pr-[96px]">
                Select a contact!
              </p>
            </div>
          )}
        </div>
        <div className="max-h-[75vh] overflow-y-scroll" id="chatbox">
          <ul className="list-none p-0">
            {messages && messages.length === 0 && (
              <p className="mt-20">
                {recipientUser ? "Start the conversation!" : null}
              </p>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex flex-col chat ${
                  message?.senderId === user?._id ? "chat-end" : "chat-start"
                }`}
              >
                <div className="chat-bubble max-w-[355px] mx-4">
                  {message.message}
                </div>
                <span className="text-xs mb-1 text-gray-500">
                  {moment(message.createdAt).calendar()}
                </span>
              </div>
            ))}
          </ul>
        </div>
        <form onSubmit={handleSubmit} className="flex mt-2">
          <textarea
            type="text"
            value={textMessage}
            onChange={(e) => setTextMessage(e.target.value)}
            placeholder="Message..."
            className="bg-white text-neutral border-t border-neutral w-4/5 overflow-y-auto p-2 focus:outline-none"
          />
          <button
            className="bg-neutral text-white w-1/5 border-white"
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
        </form>
      </div>

      <div className="drawer absolute">
        <input id="my-drawer-5" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side z-20">
          <label htmlFor="my-drawer-5" className="drawer-overlay"></label>
          <ul className="menu p-4 w-72 min-h-full bg-base-200 text-base-content">
            <h1 className="text-xl">My Contacts</h1>
            {isUserChatsLoading ? (
              <p>Loading</p>
            ) : (
              userChats.map((chat, index) => {
                return (
                  <label
                    key={index}
                    htmlFor="my-drawer-5"
                    className="drawer-overlay"
                  >
                    <div onClick={() => updateCurrentChat(chat)}>
                      <ChatDrawerItem user={user} chat={chat} />
                    </div>
                  </label>
                );
              })
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
