import "./ProfilePage.css";
import profileService from "../../services/profile.service";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import EditProfile from "../../components/EditProfile/EditProfile";
import EditAvatar from "../../components/EditAvatar/EditAvatar";
import EditProduct from "../../components/EditProduct/EditProduct";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [productHovered, setProductHovered] = useState(null);
  const [userProduct, setUserProduct] = useState(null);
  const { userId } = useParams();
  const [productModalsVisible, setProductModalsVisible] = useState({});
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
        setMessage(false);
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [message]);

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
          <main className="flex flex-row place-content-center items-center gap-4">
            {user.image ? (
              <img
                src={user.image}
                alt={user.username}
                className="rounded-full overflow-hidden border-2 border-white shadow-ld max-h-52 shadow"
              />
            ) : (
              ""
            )}
            <div className="flex flex-col">
              <h2>{`${user.username}`}</h2>
              <h3>Email registred: {`${user.email}`}</h3>
              <div className="gap-4">
                <EditProfile
                  user={user}
                  setUser={setUser}
                  setMessage={setMessage}
                />
                <EditAvatar
                  user={user}
                  setUser={setUser}
                  setMessage={setMessage}
                />
              </div>
            </div>
          </main>
          <div className="flex flex-col place-content-evenly">
            <div>
              <h3>Reviews:</h3>
              {user.reviews.length > 0 ? (
                user.reviews.map((review) => {
                  return (
                    <div key={review._id}>
                      <p>{review.review}</p>
                      <p>comment: {review.comment}</p>
                    </div>
                  );
                })
              ) : (
                <p>no reviews so far</p>
              )}
            </div>
            <div className="w-full max-w-[100%]">
              <h3>Products:</h3>
              {user.products.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>images</th>
                      <th>Price €</th>
                      <th>Quantity</th>
                      <th>Categories</th>
                      <th className="hidden-desktop"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.products.map((product, index) => {
                      return (
                        <tr
                          className="gap-4"
                          key={product._id}
                          onMouseEnter={() => {
                            setProductHovered(product._id);
                            setUserProduct(product);
                          }}
                          onMouseLeave={() => setProductHovered(null)}
                        >
                          <td>{product.title}</td>
                          <td>
                            <img
                              className="max-w-[100%]"
                              src={product.images[0]}
                              alt={product.title}
                              key={`image product ${product.title}`}
                            />
                          </td>
                          <td>{product.price}</td>
                          <td>{product.quantity}</td>
                          <td>
                            {product.categories.map((category) => {
                              return <span key={uuidv4()}>{category} </span>;
                            })}
                          </td>
                          <td>
                            <EditProduct
                              isHovered={productHovered === product._id}
                              productDetails={product}
                              productIndex={index}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <p>no products added</p>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProfilePage;
