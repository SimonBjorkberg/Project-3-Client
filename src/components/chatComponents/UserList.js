import { useContext } from "react";
import { ChatContext } from "../../context/chat.context";
import { AuthContext } from "../../context/auth.context";
import ChatDrawerItem from "./ChatDrawerItem";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const { userChats, isUserChatsLoading, updateCurrentChat } =
    useContext(ChatContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleNavigate = (chatId) => {
    navigate(`/chat/${chatId}`);
  };

  return (
    <div className="max-w-md mx-auto py-10">
      {isUserChatsLoading ? (
        <p>Loading your contacts...</p>
      ) : (
        userChats.map((chat, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                updateCurrentChat(chat);
                handleNavigate(chat._id);
              }}
            >
              <ChatDrawerItem user={user} chat={chat} />
            </div>
          );
        })
      )}
    </div>
  );
};

export default UserList;
