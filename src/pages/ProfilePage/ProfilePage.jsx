import "./ProfilePage.css";
import profileService from "../../services/profile.service";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid'
import EditProfile from "../../components/EditProfile/EditProfile";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams()

  useEffect(() => {
    profileService.getOne(userId)
    .then((response) => {
      setUser(response.data.user)
      setLoading(false)
    });
  }, [userId]);

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

      {!loading && <EditProfile user={user} setUser={setUser} />}

    </>
  );
}

export default ProfilePage;
