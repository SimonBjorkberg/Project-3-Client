import ChatDrawerItem from "./ChatDrawerItem";
import { useContext } from "react";
import { ChatContext } from "../../context/chat.context";
import { AuthContext } from "../../context/auth.context";

const ChatDrawer = () => {

  const { user } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, updateCurrentChat } =
    useContext(ChatContext);
  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="fixed bottom-10 right-36 z-10">
        <div className="drawer-content absolute">
          <label
            htmlFor="my-drawer-4"
            className="drawer-button hover:cursor-pointer lg:flex hidden"
          >
            <p className="py-2 px-11 bg-red-500 text-white">Contacts</p>
          </label>
        </div>
      </div>

      <div className="drawer-side z-20">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <ul className="menu p-4 w-72 min-h-full bg-base-200 text-base-content hidden lg:flex">
          <h1 className="text-xl">My Contacts</h1>
          {isUserChatsLoading ? (
            <p>Loading</p>
          ) : (
            userChats.map((chat, index) => {
              return (
                <label key={index} htmlFor="my-drawer-4" className="drawer-overlay">
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
  );
};

export default ChatDrawer;
