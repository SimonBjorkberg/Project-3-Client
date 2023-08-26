import { useState } from "react";
import profileService from "../../services/profile.service";


const EditProfile = ({ user, setUser }) => {
  const [image, setImage] = useState(undefined);
  const [username, setUsername] = useState(user.username);
  const [errorMessage, setErrorMessage] = useState(null);
  const [edit, setEdit] = useState(false);

  const appendImage = (e) => {
    const formData = new FormData();
    formData.append("imageUrl", e.target.files[0]);
    setImage(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageResponse = await profileService.uploadImage(image);

    const response = await profileService.edit(user._id, {
      username,
      image: imageResponse.data.fileUrl,
    });
    console.log(response);
    setErrorMessage(response.data.message);
  };

  const changeEdit = () => {
    setEdit(true)
  }

  console.log(user)

  return (
    <div className="edit-profile mt-20 bg-neutral p-40">
      <div className="mx-auto w-full">
        <h1 className="text-xl">{user.username}</h1>
        <img
          className="w-24 h-24 mx-auto rounded-full"
          src={user.image}
          alt="PP"
        />
      </div>
    </div>
  );
};

export default EditProfile;
