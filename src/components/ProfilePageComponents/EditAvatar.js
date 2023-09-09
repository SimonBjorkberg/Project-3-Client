import { useContext, useState } from "react";
import profileService from "../../services/profile.service";
import scrollToTop from "../../utils/ScrollToTop";
import { AuthContext } from "../../context/auth.context";

const EditAvatar = ({ foundUser, setFoundUser, setMessage }) => {
  const { setUserInfo, loggedInUser } = useContext(AuthContext);
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
      loggedInUser._id,
      response.data.fileUrl
    );
    setFoundUser((user) => ({ ...user, image: userResponse.data.image }));
    setUserInfo((userInfo) => ({
      ...userInfo,
      image: userResponse.data.image,
    }));
    setMessage(userResponse.data.message);
  };

  return (
    <div className="absolute right-[69px] top-[120px]">
      <div>
        <button
          onClick={() => window.my_modal_3.showModal()}
          className="my-auto h-full text-lg"
        >
          Edit Avatar
        </button>
      </div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box rounded-md max-w-[500px] p-0">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg bg-neutral text-neutral-300 p-3">
            Edit Avatar
          </h3>
          <div className="flex p-4">
            <div className="avatar">
              <div className="w-32 h-32 shadow-xl rounded-full border-black border-2">
                <img src={foundUser.image} alt="" />
              </div>
            </div>
            <form
              onSubmit={handleSubmit}
              className="my-auto flex flex-col w-full"
            >
              <input
                type="file"
                className="w-60 mx-auto file-input file-input-bordered file-input-xs rounded-sm mb-2"
                onChange={appendImage}
              />
              <button
                onClick={() => window.my_modal_3.close()}
                className="py-1 bg-neutral px-2 w-20 text-white font-semibold rounded-sm ml-auto mr-[50px]"
              >
                Save
              </button>
            </form>
          </div>
          <p className="text-[10px] text-left px-4 pb-4 mt-[-15px]">
            By proceeding, you agree to give us access to the image you choose
            to upload. Please make sure you have the right to upload the image.
          </p>
        </div>
      </dialog>
    </div>
  );
};

export default EditAvatar;
