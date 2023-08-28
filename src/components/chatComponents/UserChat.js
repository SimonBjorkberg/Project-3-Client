import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";

const UserChat = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user);

  return <div>
    {!recipientUser && <p>Loading...</p>}
    {recipientUser && <p>Recipient username: {recipientUser.data.username}</p>}
  </div>;
};

export default UserChat;
