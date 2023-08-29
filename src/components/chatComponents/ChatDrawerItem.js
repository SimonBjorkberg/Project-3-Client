import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";

const ChatDrawerItem = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user);
  return (
    <div className="mt-2">
      {!recipientUser ? (
        <p>Loading</p>
      ) : (
        <div className="flex border-b border-t py-2 hover:cursor-pointer hover:bg-neutral hover:text-white">
          <img src={recipientUser.image} alt="pic" className="w-10 ml-2" />
          <p className="my-auto ml-2 text-lg">{recipientUser.username}</p>
        </div>
      )}
    </div>
  );
};

export default ChatDrawerItem;
