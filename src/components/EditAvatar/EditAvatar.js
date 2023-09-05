import { useContext, useState } from "react";
import profileService from "../../services/profile.service";
import scrollToTop from "../../utils/ScrollToTop";
import { AuthContext } from "../../context/auth.context";

const EditAvatar = ({ user, setUser, setMessage }) => {
  const { userInfo, setUserInfo } = useContext(AuthContext);

  const [image, setImage] = useState();

  const appendImage = (e) => {
    const formData = new FormData();
    formData.append("imageUrl", e.target.files[0]);
    setImage(formData);
  };

  const handleModalOpen = () => {
    const modal = document.getElementById("edit-avatar");
    modal.showModal(); // Use showModal() method to open the modal
  };

  const handleModalClose = () => {
    const modal = document.getElementById("edit-avatar");
    modal.close(); // Use close() method to close the modal
    scrollToTop();
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
    setUserInfo((userInfo) => ({
      ...userInfo,
      image: userResponse.data.image,
    }));
    setMessage(userResponse.data.message);
  };

  return (
    <div className="mt-4">
      <button className="btn" onClick={handleModalOpen}>
        Edit Avatar
      </button>
      <dialog id="edit-avatar" className="modal">
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
              onClick={handleModalClose}
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
