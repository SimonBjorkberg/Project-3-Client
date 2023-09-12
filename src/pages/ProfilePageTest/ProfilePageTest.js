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
import ListOfReviews from "../../components/ProfilePageComponents/ListOfReviews";
import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import reviewService from "../../services/review.service";

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
  const [editingReview, setEditingReview] = useState(null);

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

  const handleEditReview = (review) => {
    setEditingReview(review);
  };

  const handleUpdateReview = (reviewId, updatedComment) => {
    const updatedReview = {
      comment: updatedComment,
    };
    reviewService.editReview(reviewId, updatedReview).then((response) => {
      const updatedReviews = userReviews.map((review) => {
        if (review._id === updatedReview._id) {
          return response.data.updatedReview;
        }
        return review;
      });

      setEditingReview(null);
      setUserReviews(updatedReviews);
    });
  };

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
              <LikedProducts navigate={navigate} foundUser={foundUser} />
            )}
            {showInfo === "reviews" && foundUser && (
              <div className="md:text-left md:pl-10 py-10 text-center bg-neutral-200">
                <Rating
                  emptySymbol={<FontAwesomeIcon icon={regularStar} size="2x" />}
                  fullSymbol={<FontAwesomeIcon icon={solidStar} size="2x" />}
                  onChange={(rating) => {
                    const comment =
                      document.getElementById("commentInput").value;
                    const newReview = {
                      comment: comment,
                      review: rating,
                    };

                    reviewService
                      .createReview(foundUser._id, newReview)
                      .then((response) => {
                        const updatedReviews = [
                          ...userReviews,
                          response.data.newReview,
                        ];
                        setUserReviews(updatedReviews);

                        document.getElementById("commentInput").value = "";
                      })

                      .catch((error) => {
                        console.error("Error creating review:", error);
                      });
                  }}
                />
                <textarea
                  id="commentInput"
                  placeholder="Entrez votre commentaire ici"
                  defaultValue={editingReview ? editingReview.comment : ""}
                />
                {foundUser.reviews.length === 0 ? (
                  <p>This user has not been reviewed yet!</p>
                ) : (
                  <div>
                    <p>User Rating:</p>

                    <ListOfReviews
                      userReviews={userReviews}
                      handleEditReview={handleEditReview}
                      handleUpdateReview={handleUpdateReview}
                      editingReview={editingReview}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePageTest;
