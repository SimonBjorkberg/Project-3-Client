import EditProfile from "./EditProfile";

const UserInfo = ({ foundUser, setMessage, setFoundUser, loggedInUser }) => {
  return (
    <div className="h-60 flex bg-neutral-200">
      <div className="avatar">
        <div className="w-40 h-40 shadow-xl mt-auto mb-10 ml-10 rounded-full border-black border-2">
          <img src={foundUser.image} alt="" />
        </div>
      </div>
      <div className="ml-10 flex flex-col my-auto">
        <p className="text-5xl font-bold text-left">{foundUser.username}</p>
        <p className="font-semibold text-sm text-left">
          {foundUser.products?.length} products listed * {foundUser.reviews.length} Reviews
        </p>
      </div>
      {loggedInUser && loggedInUser._id === foundUser._id && (
        <EditProfile
          setMessage={setMessage}
          setFoundUser={setFoundUser}
          foundUser={foundUser}
        />
      )}
    </div>
  );
};

export default UserInfo;
