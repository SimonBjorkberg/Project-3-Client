import "./ProfilePage.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import profileService from "../../services/profile.service";
import { Link } from "react-router-dom";

function ProfilePage() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    profileService.getOne(user._id).then((response) => {
      setUserData(response.data.user);
      setLoading(false);
    });
  }, [user._id]);

  console.log(userData.products);
  return (
    <div className="profile page">
     
    </div>
  );
}

export default ProfilePage;
