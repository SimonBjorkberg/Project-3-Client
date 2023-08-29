import { useContext } from "react";
import { ChatContext } from "../context/chat.context";
import ChatBox from "../components/chatComponents/ChatBox";

const ChatPage = () => {
  const { isUserChatsLoading } = useContext(ChatContext);

  return (
    <div className="flex justify-center items-center min-h-screen">
      {isUserChatsLoading && <p>Loading Chats...</p>}
      {!isUserChatsLoading && <ChatBox />}
    </div>
  );
};

export default ChatPage;
