import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { useNavigate } from "react-router-dom";

const ChatDrawerItem = ({ chat, user }) => {
  const navigate = useNavigate();
  const { recipientUser } = useFetchRecipientUser(chat, user);
  const onClickNavigate = () => {
    navigate("/chat");
  };
  return (
    <div className="mb-2">
      {!recipientUser ? (
        <p>Loading</p>
      ) : (
        <div
          className="flex border-b border-t py-2 hover:cursor-pointer hover:bg-neutral hover:text-white"
          onClick={onClickNavigate}
        >
          <div className="avatar">
            <div className="w-10 rounded-xl">
            <img src={recipientUser.image} alt="pic" className="ml-2" />
            </div>
          </div>
          <p className="my-auto ml-2 text-lg">{recipientUser.username}</p>
        </div>
      )}
    </div>
  );
};

export default ChatDrawerItem;
