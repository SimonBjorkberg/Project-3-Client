import { createContext, useState, useEffect, useCallback } from "react";
import chatService from "../services/chat.service";
import { useContext } from "react";
import { AuthContext } from "./auth.context";

const ChatContext = createContext();

function ChatProviderWrapper({ children }) {
  const { user } = useContext(AuthContext);

  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(true);
  const [userChatsError, setUserChatsError] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState(null);

  useEffect(() => {
    if (user) {
      const getUsers = async () => {
        const response = await chatService.findAllUsers();

        if (response.err) {
          return console.log(response.err);
        }

        const pChats = response.data.filter((pUsers) => {
          let isChatCreated = false;

          if (user._id === pUsers._id) return false;

          if (userChats) {
            isChatCreated = userChats.some((chat) => {
              return (
                chat.members[0] === pUsers._id || chat.members[1] === pUsers._id
              );
            });
          }

          return !isChatCreated;
        });
        setPotentialChats(pChats);
      };
      getUsers();
    }
  }, [userChats, user]);

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

  useEffect(() => {
    const getMessages = async () => {
      setIsMessagesLoading(true);
      setMessagesError(null);

      const response = await chatService.findChat(currentChat?._id);

      setIsMessagesLoading(false);

      if (response.error) {
        return setUserChatsError(response);
      }

      setMessages(response.data);
    };
    getMessages();
  }, [currentChat?._id]);

  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);

  const createChat = useCallback(async (firstId, secondId) => {
    const response = await chatService.create({ firstId, secondId });
    if (response.err) {
      return console.log(response);
    }
    setUserChats((prev) => [...prev, response.data]);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        createChat,
        updateCurrentChat,
        currentChat,
        messages,
        isMessagesLoading,
        messagesError,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export { ChatProviderWrapper, ChatContext };
