import { useContext } from "react";
import { ChatContext } from "../context/chat.context";
import { AuthContext } from "../context/auth.context";
import UserChat from "../components/chatComponents/UserChat";

const ChatPage = (props) => {
  const { user } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, userChatsError } =
    useContext(ChatContext);

  return (
    <div className="chat">
      {isUserChatsLoading && <p>Loading Chats...</p>}
      {!isUserChatsLoading &&
        userChats.map((chat, index) => {
          return (
            <div key={index}>
              <UserChat user={user} chat={chat} />
            </div>
          );
        })}
    </div>
  );
};

export default ChatPage;
