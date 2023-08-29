import { useContext } from "react";
import { ChatContext } from "../context/chat.context";
import { AuthContext } from "../context/auth.context";
import UserChat from "../components/chatComponents/UserChat";
import PotentialChats from "../components/chatComponents/PotentialChat";
import ChatBox from "../components/chatComponents/ChatBox";

const ChatPage = (props) => {
  const { user } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, updateCurrentChat } =
    useContext(ChatContext);

  return (
    <div className="flex">
      {isUserChatsLoading && <p>Loading Chats...</p>}
      <PotentialChats />
      {!isUserChatsLoading && 
      <ul>
      {userChats.map((chat, index) => {
          return (
            <div key={index} onClick={() => updateCurrentChat(chat)} className="hover:cursor-pointer">
              <UserChat user={user} chat={chat} />
            </div>
          );
        })}
        <ChatBox />
      </ul>}
    </div>
  );
};

export default ChatPage;
