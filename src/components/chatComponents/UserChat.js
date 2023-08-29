import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";

const UserChat = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user);
  return (
    <div className="mt-2 border-2 w-60 py-3 bg-neutral rounded-md text-white border-gray-400">
    {!recipientUser ? <p>Loading</p> : <p>{recipientUser.username}</p>}
    </div>
  );
};

export default UserChat;
