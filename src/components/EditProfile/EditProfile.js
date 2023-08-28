// import { useState } from "react";
// import profileService from "../../services/profile.service";

const EditProfile = ({ user, setUser, setMessage }) => {
  const showModal = () => {
    const modal = document.getElementById("edit-profile");
    if (modal) {
      modal.showModal();
    }
  };
  return (
    <>
      <button className="btn" onClick={showModal}>
        EDIT PROFILE
      </button>
      <dialog id="edit-profile" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default EditProfile;
