import React, { useState } from "react";
import profileService from "../../services/profile.service";

const EditProfile = ({ user }) => {
  console.log(user);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  // const [image, setImage] = useState(user.image);
  const [password, setPassword] = useState(user.password);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("user id", user._id);
    const requestBody = { username };
    console.log("request body", requestBody);
    profileService
      .edit(user._id, { username, image: user.image })
      .then((response) => {
        console.log("response:", response.data);
        console.log("Updated Username:", response.data.username);
        // handleModalClose();
      })
      .catch((error) => {
        console.error("Error diting profile", error);
      });
  };

  return (
    <div className="mt-4">
      <button className="btn" onClick={showModal}>
        EDIT PROFILE
      </button>
      <dialog id="edit-profile" className="modal">
        <div className="modal-background">
          <div className="modal-box">
            <button
              onClick={handleModalClose}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
            <form method="dialog" className="modal-box" onSubmit={handleSubmit}>
              <h3 className="font-bold text-lg">Profile Information!</h3>
              <p className="py-4">
                <strong>Username:</strong>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    // console.log(username);
                  }}
                />
                <br />
                <strong>email:</strong>
                <input type="text" name="email" value={email} readOnly />
                <br />
                <strong>Password:</strong>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                {/* <img src={user.image[0]} alt={/> */}
              </p>
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
