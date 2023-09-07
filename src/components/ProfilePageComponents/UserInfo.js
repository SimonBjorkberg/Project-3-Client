import EditProfile from "./EditProfile";

const UserInfo = ({
  foundUser,
  setMessage,
  setFoundUser,
  loggedInUser,
  newContact,
  createChat,
  setNewContact,
}) => {
  return (
    <div className="h-60 flex bg-neutral-200">
      <div className="avatar">
        <div className="w-40 h-40 shadow-xl mt-auto mb-10 ml-10 rounded-full border-black border-2">
          <img src={foundUser.image} alt="" />
        </div>
      </div>
      <div className="ml-10 flex flex-col my-auto">
        <p className="text-5xl mb-2 font-bold text-left">{foundUser?.username}</p>
        <p className="font-semibold text-sm text-left">
          {foundUser.products?.length} Listed Products *{" "}
          {foundUser.reviews.length} Reviews
        </p>
      </div>
      {loggedInUser && loggedInUser?._id === foundUser?._id && (
        <EditProfile
          setMessage={setMessage}
          setFoundUser={setFoundUser}
          foundUser={foundUser}
        />
      )}
      {loggedInUser?._id !== foundUser._id && newContact && (
        <p
          className="hover:cursor-pointer hover:bg-green-500 absolute right-[50px] top-[120px] w-40 bg-green-600 shadow-xl border border-neutral-400 rounded-sm py-2"
          onClick={() => {
            createChat(loggedInUser._id, foundUser._id);
            setNewContact(false);
          }}
        >
          add {foundUser.username} as a contact
        </p>
      )}
    </div>
  );
};

export default UserInfo;
