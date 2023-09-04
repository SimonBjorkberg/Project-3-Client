import React, { useState } from "react";
import "./EditProfile.css";
import profileService from "../../services/profile.service";
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
    <div className="mt-4">
      <button className="btn" onClick={showModal}>
        EDIT PROFILE
      </button>
      <dialog id="edit-profile" className="modal">
        <div className="modal-background">
          <div className="modal-box minimum-width-350">
            <button
              onClick={handleModalClose}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
            <form
              method="dialog"
              className="modal-box minimum-width-250"
              onSubmit={handleSubmit}
            >
              <h3 className="font-bold text-lg">Profile Information!</h3>
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
                  placeholder="type again your new password"
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
