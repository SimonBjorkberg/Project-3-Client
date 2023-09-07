import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { v4 as uuidv4 } from "uuid";

function ListOfReviews({ userReviews }) {
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
        return (
          <div key={review._id}>
            <p>comment: "{review.comment}"</p>
          </div>
        );
      })}
    </>
  );
}

export default ListOfReviews;
