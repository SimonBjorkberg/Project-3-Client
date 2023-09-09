import EditAvatar from "./EditAvatar";
import EditProfile from "./EditProfile/EditProfile";

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
    <div className="md:h-60 h-48 flex bg-neutral-200">
      <div className="avatar">
        <div className="md:w-40 md:h-40 w-32 h-32 shadow-xl mt-auto my-auto md:mb-10 ml-6 md:ml-10 rounded-full border-black border-2">
          <img src={foundUser.image} alt="" />
        </div>
      </div>
      <div className="md:ml-10 ml-4 flex flex-col my-auto">
        <p className="md:text-5xl text-3xl md:mb-2 font-bold text-left">
          {foundUser?.username}
        </p>
        <p className="font-semibold text-sm text-left">
          {foundUser.products?.length} Listed Products *{" "}
          {foundUser.reviews.length} Reviews
        </p>
      </div>
      {loggedInUser && loggedInUser?._id === foundUser?._id && (
        <>
          <EditAvatar
            setMessage={setMessage}
            setFoundUser={setFoundUser}
            foundUser={foundUser}
          />
          <EditProfile
            user={foundUser}
            updateUser={setFoundUser}
            setMessage={setMessage}
          />
        </>
      )}
      {loggedInUser?._id !== foundUser._id && newContact && (
        <p
          className="hover:cursor-pointer hover:bg-teal-500 absolute right-0 top-[80px] w-fit bg-teal-600 text-neutral shadow-md rounded-bl-xl py-3 md:py-1 px-3"
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
