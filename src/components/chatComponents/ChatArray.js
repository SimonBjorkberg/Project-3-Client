import { useState } from "react";
import { useContext } from "react";
import { ChatContext } from "../../context/chat.context";

const ChatArray = (props) => {
  const { userChats } = useContext(ChatContext);
  console.log(userChats);
  const [chats, setChats] = useState([]);

  return (
    <div className="bg-red-500 w-20 h-20 z-50">
        
    </div>
  );
};

export default ChatArray;
