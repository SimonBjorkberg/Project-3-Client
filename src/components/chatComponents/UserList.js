import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { useNavigate } from "react-router-dom";

const UserList = ({ chat, user }) => {
  const navigate = useNavigate();
  const { recipientUser } = useFetchRecipientUser(chat, user);
  const onClickNavigate = () => {
    navigate("/chat");
  };
  return (
    <div className="mb-2" style={{ maxHeight: "300px", overflowY: "auto" }}>
      {!recipientUser ? (
        <p>Loading</p>
      ) : (
        <div
          className="flex py-2 hover:cursor-pointer hover:bg-neutral hover:text-white"
          onClick={onClickNavigate}
        >
          <img src={recipientUser.image} alt="pic" className="w-10 ml-2" />
          <p className="my-auto ml-2 text-lg">{recipientUser.username}</p>
        </div>
      )}
    </div>
  );
};

export default UserList;
