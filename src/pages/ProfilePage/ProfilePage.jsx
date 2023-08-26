import "./ProfilePage.css";
import profileService from "../../services/profile.service";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import EditProfile from "../../components/EditProfile/EditProfile";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const [message, setMessage] = useState(false);

  useEffect(() => {
    profileService.getOne(userId).then((response) => {
      setUser(response.data.user);
      setLoading(false);
    });
  }, [userId]);

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        setMessage(false)
      }, 3000);

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [message])

  return (
    <>
      {loading ? (
        <h1>Loading your profile...</h1>
      ) : (
        <>
          {message && (
            <div className="alert alert-success w-1/2 mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Avatar changed!</span>
            </div>
          )}
          <h1>Profile page</h1>
          <div className="avatar">
            <div className="w-24 rounded-xl">
              <img src={user.image} alt="Profile-pic" />
            </div>
          </div>
          <h2>Username: {`${user.username}`}</h2>
          <p>Email registred: {`${user.email}`}</p>
          <h3>Reviews:</h3>
          {user.reviews
            ? user.reviews.map((review) => {
                return (
                  <div key={review._id}>
                    <p>review: {review.review}</p>
                    <p>comment: {review.comment}</p>
                  </div>
                );
              })
            : "no reviews so far"}
          <h3>Products:</h3>
          {user.products
            ? user.products.map((product) => {
                return (
                  <div key={product._id}>
                    <p>product: {product.description}</p>
                    <p>price: {product.price}</p>
                    <p>quantity: {product.quantity}</p>
                    <p>
                      categories:{" "}
                      {product.categories.map((category) => {
                        return <span key={uuidv4()}>{category.type}</span>;
                      })}
                    </p>
                  </div>
                );
              })
            : "no products added"}
        </>
      )}

      {!loading && (
        <EditProfile user={user} setUser={setUser} setMessage={setMessage} />
      )}
    </>
  );
}

export default ProfilePage;
