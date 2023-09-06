import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/chat.context";
import { AuthContext } from "../../context/auth.context";
import { useNavigate, useParams } from "react-router-dom";
import profileService from "../../services/profile.service";
import Loading from "../../components/Loading/Loading";
import Products from "../../components/ProfilePageComponents/Products";
import ProfileList from "../../components/ProfilePageComponents/ProfileList";
import UserInfo from "../../components/ProfilePageComponents/UserInfo";
import LikedProducts from "../../components/ProfilePageComponents/LikedProducts";
import scrollToTop from "../../utils/ScrollToTop";

const ProfilePageTest = (props) => {
  const { potentialChats } = useContext(ChatContext);
  const { loggedInUser } = useContext(AuthContext);
  const [foundUser, setFoundUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [productHovered, setProductHovered] = useState(null);
  const { userId } = useParams();
  const [message, setMessage] = useState(false);
  const [newContact, setNewContact] = useState(false);
  const [showInfo, setShowInfo] = useState("products");
  const [recentProducts, setRecentProducts] = useState(null);
  const [showMore, setShowMore] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (potentialChats.some((chat) => chat._id === userId))
      return setNewContact(true);
  }, [userId, potentialChats]);

  useEffect(() => {
    profileService.getOne(userId).then((response) => {
      setFoundUser(response.data.user);
      setLoading(false);
    });
  }, [userId]);

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        setMessage(false);
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [message]);

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    if (foundUser?.products.length > 5 && !showMore) {
      const fiveRecent = foundUser.products.slice(
        Math.max(foundUser.products.length - 5, 1)
      );
      setRecentProducts(fiveRecent);
    }
    else {
        setRecentProducts(foundUser?.products)
    }
  }, [foundUser, showMore]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <UserInfo
            foundUser={foundUser}
            setMessage={setMessage}
            setFoundUser={setFoundUser}
            loggedInUser={loggedInUser}
          />
          <div className="bg-neutral-300 py-10">
            <ProfileList
              showInfo={showInfo}
              setShowInfo={setShowInfo}
              foundUser={foundUser}
            />
            {showInfo === "products" && (
              <Products
                recentProducts={recentProducts}
                foundUser={foundUser}
                setProductHovered={setProductHovered}
                productHovered={productHovered}
                loggedInUser={loggedInUser}
                showMore={showMore}
                setShowMore={setShowMore}
              />
            )}
            {showInfo === "liked" && (
              <LikedProducts navigate={navigate} foundUser={foundUser} />
            )}
            {showInfo === "reviews" && (
              <div className="text-left ml-10 pt-10">
                {foundUser.reviews.length === 0 && (
                  <p>This user has not been reviewed yet!</p>
                )}
                {/* CREATE USER REVIEW HERE */}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePageTest;
