import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { v4 as uuidv4 } from "uuid";
import reviewService from "../../services/review.service";
import { Link } from "react-router-dom";
import { useState } from "react";

function ListOfReviews({
  userReviews,
  handleEditReview,
  handleUpdateReview,
  editingReview,
}) {
  const [updatedComment, setUpdatedComment] = useState("");
  const calculateAverageRating = (reviews) => {
    const totalRating = reviews.reduce((sum, review) => sum + review.review, 0);
    return (totalRating / reviews.length).toFixed(0);
  };

  return (
    <>
      <p>
        Average Rating:
        {Array.from({ length: calculateAverageRating(userReviews) }, () => (
          <FontAwesomeIcon key={uuidv4()} icon={solidStar} />
        ))}
        {Array.from({ length: 5 - calculateAverageRating(userReviews) }, () => (
          <FontAwesomeIcon key={uuidv4()} icon={regularStar} />
        ))}
      </p>
      {userReviews.map((review) => {
        {
          const handleEditClick = () => {
            handleEditReview(review);
          };
        }
        return (
          <div key={review._id}>
            <p>
              comment: "
              {review && review.comment ? review.comment : "No comment written"}
              "
              {editingReview === review._id ? (
                <div>
                  <textarea
                    defaultValue={review.comment || ""}
                    onChange={(e) => setUpdatedComment(e.target.value)}
                  />
                  <button
                    onClick={() =>
                      handleUpdateReview(review._id, updatedComment)
                    }
                  >
                    Save
                  </button>
                </div>
              ) : (
                <Link onClick={() => handleEditReview(review._id)}>edit </Link>
              )}
              <Link onClick={() => reviewService.deleteReview(review._id)}>
                delete
              </Link>{" "}
            </p>
          </div>
        );
      })}
    </>
  );
}

export default ListOfReviews;
