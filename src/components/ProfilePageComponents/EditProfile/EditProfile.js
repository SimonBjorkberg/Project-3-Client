import React, { useState } from "react";
import "./EditProfile.css";
import profileService from "../../../services/profile.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const EditProfile = ({ user, updateUser }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [newPassword, setnewPassword] = useState("");
  const [confirmNewPassword, setconfirmNewPassword] = useState("");
  const [showInformation, setShowInformation] = useState(false);
  const showModal = () => {
    const modal = document.getElementById("edit-profile");
    if (modal) {
      modal.showModal();
    }
  };

  const handleModalClose = () => {
    const modal = document.getElementById("edit-profile");
    modal.close();
  };

  const showInfo = () => {
    setShowInformation(true);
    setTimeout(() => {
      setShowInformation(false);
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      alert("the 2 passwords are different");
      return;
    } else {
    }
    profileService
      .edit(user._id, { username, password: newPassword })
      .then(() => {
        updateUser({ ...user, username });
        handleModalClose();
      })
      .catch((error) => {
        console.error("Error diting profile", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("An error occurred while editing the profile.");
        }
      });
  };

  return (
    <div className="absolute right-[69px] top-[150px]">
      <button className="my-auto h-full text-lg" onClick={showModal}>
        Edit Profile
      </button>
      <dialog id="edit-profile" className="modal">
        <div className="modal-background">
          <div className="modal-box rounded-md max-w-[500px] p-0">
            <button
              onClick={handleModalClose}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white"
            >
              ✕
            </button>
            <h3 className="font-bold text-lg bg-neutral text-neutral-300 p-3">
              Edit Profile
            </h3>
            <form
              method="dialog"
              className="modal-box max-width"
              onSubmit={handleSubmit}
            >
              <div className="py-4 flex flex-col">
                <strong>Username:</strong>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                <div>
                  <strong>email:</strong>
                  <FontAwesomeIcon
                    className="information-email"
                    onMouseEnter={showInfo}
                    icon={faInfoCircle}
                  />
                  {showInformation && (
                    <div className="tooltip-content">
                      Email can not be changed.
                    </div>
                  )}
                </div>
                <div className="flex justify-start">{email}</div>
                <strong>new password:</strong>
                <input
                  placeholder="new password"
                  type="password"
                  name="password"
                  value={newPassword}
                  onChange={(e) => setnewPassword(e.target.value)}
                />
                <br />
                <input
                  placeholder="Confirm new password"
                  type="password"
                  name="password"
                  value={confirmNewPassword}
                  onChange={(e) => setconfirmNewPassword(e.target.value)}
                />
              </div>
              {errorMessage && (
                <div className="error-message">
                  <i className="text-red-500">{errorMessage}</i>
                </div>
              )}
              <div className="modal-action">
                <button className="btn">Update</button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default EditProfile;
