import { useContext } from "react";
import { ChatContext } from "../context/chat.context";
import { AuthContext } from "../context/auth.context";
import UserChat from "../components/chatComponents/UserChat";
import PotentialChats from "../components/chatComponents/PotentialChat";
import ChatBox from "../components/chatComponents/ChatBox";
import ChatDrawer from "../components/chatComponents/ChatDrawer";
import ChatDrawerItem from "../components/chatComponents/ChatDrawerItem";

const ChatPage = (props) => {
  const { user } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, updateCurrentChat } =
    useContext(ChatContext);

  return (
    <div className="flex">
      {isUserChatsLoading && <p>Loading Chats...</p>}
      <PotentialChats />
      {!isUserChatsLoading && (
        <ul className="w-64">
          {userChats.map((chat, index) => {
            return (
              <div
                key={index}
                onClick={() => updateCurrentChat(chat)}
                className="w-64 hover:cursor-pointer"
              >
                <UserChat user={user} chat={chat} />
              </div>
            );
          })}
          <ChatBox />
        </ul>
      )}
    </div>
  );
};

export default ChatPage;
