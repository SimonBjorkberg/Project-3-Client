import EditAvatar from "../EditAvatar/EditAvatar";

const EditProfile = ({ user, setUser, setMessage }) => {

  return (
    <div className="edit-profile mt-20 bg-neutral p-40">
      <EditAvatar user={user} setUser={setUser} setMessage={setMessage} />
    </div>
  );
};

export default EditProfile;
