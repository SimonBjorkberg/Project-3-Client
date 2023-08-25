import "./ProfilePage.css";
import authService from "../../services/auth.service";
import { useState, useEffect } from "react";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUser = () => {
    authService
      .verify()
      .then((response) => {
        setLoading(true);
        const oneUser = response.data;
        setUser(oneUser);
      })
      .then(() => setLoading(false))
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {loading ? (
        <h1>Loading your profile...</h1>
      ) : (
        <>
          <h1>Profile page</h1>
          <h2>Username: {`${user.username}`}</h2>
          <p>Email registred: {`${user.email}`}</p>
          <h3>Reviews:</h3>
          {user.reviews
            ? user.reviews.map((review) => {
                <div key={review._id}>
                  <p>review: {review.review}</p>
                  <p>comment: {review.comment}</p>
                </div>;
              })
            : "no reviews so far"}
          <h3>Products:</h3>
          {user.products
            ? user.products.map((product) => {
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
                </div>;
              })
            : "no products added"}
        </>
      )}
    </>
  );
}

export default ProfilePage;
