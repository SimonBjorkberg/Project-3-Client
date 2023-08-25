import "./ProfilePage.css";
import profileService from "../../services/profile.service";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context.jsx";

function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    profileService.getOne(user._id)
    .then((response) => {
      setUserData(response.data.user)
      setLoading(false)
    });
  }, [user._id]);

  return (
    <>
      {loading ? (
        <h1>Loading your profile...</h1>
      ) : (
        <>
          <h1>Profile page</h1>
          <h2>Username: {`${userData.username}`}</h2>
          <p>Email registred: {`${userData.email}`}</p>
          <h3>Reviews:</h3>
          {userData.reviews
            ? userData.reviews.map((review) => {
                return (
                  <div key={review._id}>
                    <p>review: {review.review}</p>
                    <p>comment: {review.comment}</p>
                  </div>
                );
              })
            : "no reviews so far"}
          <h3>Products:</h3>
          {userData.products
            ? userData.products.map((product) => {
                return (
                  <div key={product._id}>
                    <p>product: {product.description}</p>
                    <p>price: {product.price}</p>
                    <p>quantity: {product.quantity}</p>
                    <p>
                      categories:{" "}
                      {product.categories.map((category) => {
                        <span>{category.type}</span>;
                      })}
                    </p>
                  </div>
                );
              })
            : "no products added"}
        </>
      )}
    </>
  );
}

export default ProfilePage;
