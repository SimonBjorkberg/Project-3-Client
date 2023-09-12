import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { useContext, useEffect, useState } from "react";
import scrollToTop from "../../utils/ScrollToTop";
import { AuthContext } from "../../context/auth.context";
import ReviewForm from "./ReviewComponents/ReviewForm";
import DeleteAndEditButtons from "./ReviewComponents/DeleteAndEditButtons";
import EditReviewDialog from "./ReviewComponents/EditReviewDialog";
import DeleteReviewDialog from "./ReviewComponents/DeleteReviewDialog";

const Reviews = ({
  foundUser,
  userReviews,
  setUserReviews,
  successMessage,
  setSuccessMessage,
}) => {
  const { loggedInUser } = useContext(AuthContext);
  const [showMore, setShowMore] = useState(false);
  const [recentReviews, setRecentReviews] = useState([]);
  const [hasReviewed, setHasReviewed] = useState(false);

  useEffect(() => {
    if (userReviews?.length > 5 && !showMore) {
      const fiveRecent = userReviews.slice(Math.max(userReviews.length - 5, 1));
      const reverseFiveRecent = fiveRecent.reverse();
      return setRecentReviews(reverseFiveRecent);
    } else {
      const userReviewsCopy = [...userReviews];
      return setRecentReviews(userReviewsCopy.reverse());
    }
  }, [userReviews, showMore, successMessage]);

  useEffect(() => {
    const reviewed = foundUser.reviews.some(
      (review) => review.reviewTarget === loggedInUser?._id
    );
    if (reviewed) {
      setHasReviewed(true);
    }
  }, [foundUser, loggedInUser]);

  return (
    <div className="text-left py-10 bg-neutral-200">
      {foundUser?.reviews.length === 0 ? (
        <p className="flex py-2 lg:w-[900px] mx-auto font-semibold">
          {foundUser.username} has not been reviewed yet!
        </p>
      ) : (
        <div>
          {recentReviews.map((review) => {
            const modalId = `modal-${review._id}`;
            const deleteModalId = `modalDelete-${review._id}`;
            return (
              <div
                key={review._id}
                className="flex py-2 border-b lg:w-[900px] mx-auto border-neutral"
              >
                <div className="flex flex-row w-full">
                  <div className="avatar h-16">
                    <div className="w-16 rounded-xl">
                      <img
                        src={review.author.image || loggedInUser.image}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="ml-5">
                    <Rating
                      initialRating={review.review}
                      readonly
                      emptySymbol={
                        <FontAwesomeIcon icon={regularStar} size="1x" />
                      }
                      fullSymbol={
                        <FontAwesomeIcon icon={solidStar} size="1x" />
                      }
                    />
                    <p className="text-sm font-semibold">
                      {review.comment
                        ? review.comment
                        : `${review.author.username} provided no comment`}
                    </p>
                  </div>
                  <DeleteAndEditButtons
                    modalId={modalId}
                    deleteModalId={deleteModalId}
                    loggedInUser={loggedInUser}
                    review={review}
                  />
                </div>
                <EditReviewDialog
                  setSuccessMessage={setSuccessMessage}
                  review={review}
                  modalId={modalId}
                  setUserReviews={setUserReviews}
                  foundUser={foundUser}
                />
                <DeleteReviewDialog
                  review={review}
                  deleteModalId={deleteModalId}
                  foundUser={foundUser}
                  userReviews={userReviews}
                  setUserReviews={setUserReviews}
                />
                <dialog
                  id={deleteModalId}
                  className="modal hover:cursor-default"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="modal-box p-0 rounded-md max-w-md w-[98%]"></div>
                </dialog>
              </div>
            );
          })}
        </div>
      )}
      {!showMore && foundUser?.reviews.length > 5 && (
        <div className="mt-5 lg:w-[900px] flex justify-center md:justify-end mx-auto">
          <button onClick={() => setShowMore(true)} className="w-fit">
            Show More
          </button>
        </div>
      )}
      {showMore && (
        <div className="mt-5 lg:w-[900px] flex justify-center md:justify-end mx-auto">
          <button
            onClick={() => {
              setShowMore(false);
              scrollToTop();
            }}
            className="w-fit"
          >
            Show Less
          </button>
        </div>
      )}
      {!hasReviewed && loggedInUser && (
        <ReviewForm foundUser={foundUser} setUserReviews={setUserReviews} />
      )}
    </div>
  );
};

export default Reviews;
