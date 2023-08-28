import { createContext, useState, useEffect } from "react";
import chatService from "../services/chat.service";
import { useContext } from "react";
import { AuthContext } from "./auth.context";

const ChatContext = createContext();

function ChatProviderWrapper({ children }) {
  const { user } = useContext(AuthContext);

  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(true);
  const [userChatsError, setUserChatsError] = useState(null);

  useEffect(() => {
    const getUserChats = async () => {
      if (user) {
        setIsUserChatsLoading(true);
        setUserChatsError(null);
        const response = await chatService.findAll(user._id);

        setIsUserChatsLoading(false);

        if (response.error) {
          return setUserChatsError(response);
        }

        setUserChats(response.data);
      }
    };
    getUserChats();
  }, [user]);

  console.log(userChats, isUserChatsLoading, userChatsError);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export { ChatProviderWrapper, ChatContext };
