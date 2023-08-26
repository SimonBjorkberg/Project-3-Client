import { useState } from "react";
import profileService from "../../services/profile.service";
import scrollToTop from "../../utils/ScrollToTop";

const EditAvatar = ({ user, setUser, setMessage }) => {
  const [image, setImage] = useState();

  const appendImage = (e) => {
    const formData = new FormData();
    formData.append("imageUrl", e.target.files[0]);
    setImage(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await profileService.uploadImage(image);
    const userResponse = await profileService.editImage(
      user._id,
      response.data.fileUrl
    );
    console.log(userResponse.data.image);
    setUser((user) => ({ ...user, image: userResponse.data.image }));
    setMessage(userResponse.data.message);
  };

  return (
    <div>
      <button className="btn" onClick={() => window.my_modal_3.showModal()}>
        Edit Avatar
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="avatar mx-auto">
              <div className="w-24 rounded-full">
                <img src={user.image} alt="Profile-pic" />
              </div>
            </div>
            <input
              type="file"
              className="file-input file-input-bordered max-w-xs w-2/3 mx-auto"
              onChange={appendImage}
            />
            <button
              onClick={() => {
                window.my_modal_3.close();
                scrollToTop();
              }}
              className="bg-neutral w-1/2 mx-auto p-2 text-white mt-2 mb-10"
            >
              Change Picture
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default EditAvatar;
