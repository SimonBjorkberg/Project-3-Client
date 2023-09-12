import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/chat.context";
import { AuthContext } from "../../context/auth.context";
import { useNavigate, useParams } from "react-router-dom";
import profileService from "../../services/profile.service";
import Loading from "../../components/Loading/Loading";
import Products from "../../components/ProfilePageComponents/ProductsComponents/Products";
import ProfileList from "../../components/ProfilePageComponents/ProfileList";
import UserInfo from "../../components/ProfilePageComponents/UserInfo";
import LikedProducts from "../../components/ProfilePageComponents/LikedProducts";
import scrollToTop from "../../utils/ScrollToTop";
import Reviews from "../../components/ProfilePageComponents/Reviews";

const ProfilePageTest = (props) => {
  const { potentialChats, createChat } = useContext(ChatContext);
  const { loggedInUser } = useContext(AuthContext);
  const [foundUser, setFoundUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const [message, setMessage] = useState(false);
  const [newContact, setNewContact] = useState(false);
  const [showInfo, setShowInfo] = useState("products");
  const [recentProducts, setRecentProducts] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [userReviews, setUserReviews] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (potentialChats.some((chat) => chat._id === userId))
      return setNewContact(true);
  }, [userId, potentialChats]);

  useEffect(() => {
    profileService.getOne(userId).then((response) => {
      setFoundUser(response.data.user);
      setUserReviews(response.data.user.reviews);
      setLoading(false);
    });
  }, [userId]);

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    if (foundUser?.products.length > 5 && !showMore) {
      const fiveRecent = foundUser.products.slice(
        Math.max(foundUser.products.length - 5, 1)
      );
      setRecentProducts(fiveRecent.reverse());
    } else {
      setRecentProducts(foundUser?.products.reverse());
    }
  }, [foundUser, showMore]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <UserInfo
            successMessage={successMessage}
            setSuccessMessage={setSuccessMessage}
            foundUser={foundUser}
            setMessage={setMessage}
            setFoundUser={setFoundUser}
            loggedInUser={loggedInUser}
            newContact={newContact}
            createChat={createChat}
            setNewContact={setNewContact}
          />
          <div>
            <ProfileList
              showInfo={showInfo}
              setShowInfo={setShowInfo}
              foundUser={foundUser}
            />
            {showInfo === "products" && (
              <Products
                recentProducts={recentProducts}
                foundUser={foundUser}
                loggedInUser={loggedInUser}
                showMore={showMore}
                setShowMore={setShowMore}
              />
            )}
            {showInfo === "liked" && (
              <LikedProducts
                navigate={navigate}
                foundUser={foundUser}
                loggedInUser={loggedInUser}
              />
            )}
            {showInfo === "reviews" && (
              <Reviews
                successMessage={successMessage}
                setSuccessMessage={setSuccessMessage}
                foundUser={foundUser}
                userReviews={userReviews}
                setUserReviews={setUserReviews}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePageTest;
