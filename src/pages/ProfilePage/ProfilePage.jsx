import "./ProfilePage.css";
import profileService from "../../services/profile.service";
import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import EditProfile from "../../components/EditProfile/EditProfile";
import EditAvatar from "../../components/EditAvatar/EditAvatar";
import EditProduct from "../../components/EditProduct/EditProduct";
import { ChatContext } from "../../context/chat.context";
import { AuthContext } from "../../context/auth.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

function ProfilePage() {
  const { potentialChats, createChat } = useContext(ChatContext);
  const { user } = useContext(AuthContext);
  const [foundUser, setFoundUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [productHovered, setProductHovered] = useState(null);
  const { userId } = useParams();
  const [message, setMessage] = useState(false);
  const [newContact, setNewContact] = useState(false);
  const [visitorIsProfilePage, setVisitorIsProfilePage] = useState(false);

  useEffect(() => {
    if (user._id === userId) {
      setVisitorIsProfilePage(true);
    }
  }, [visitorIsProfilePage]);

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

  const calculateAverageRating = (reviews) => {
    const totalRating = reviews.reduce((sum, review) => sum + review.review, 0);
    return (totalRating / reviews.length).toFixed(0);
  };

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

  const updateUser = (newUser) => {
    setFoundUser(newUser);
  };

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
          {newContact && (
            <p
              className="p-2 bg-green-500 w-40 mx-auto hover:cursor-pointer"
              onClick={() => {
                createChat(user._id, userId);
                setNewContact(false);
              }}
            >
              Add {foundUser.username} as a Contact
            </p>
          )}
          <main className="flex flex-row place-content-center items-center gap-4">
            {foundUser.image ? (
              <img
                src={foundUser.image}
                alt={foundUser.username}
                className="rounded-full overflow-hidden border-2 border-white shadow-ld max-h-52 shadow"
              />
            ) : (
              ""
            )}
            <div className="flex flex-col">
              <h2>{`${foundUser.username}`}</h2>
              <h3>Email registred: {`${foundUser.email}`}</h3>
              <div className="gap-4">
                {visitorIsProfilePage ? (
                  <>
                    <EditProfile
                      user={foundUser}
                      updateUser={updateUser}
                      setMessage={setMessage}
                    />
                    <EditAvatar
                      user={foundUser}
                      setUser={setFoundUser}
                      setMessage={setMessage}
                    />{" "}
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </main>
          <div className="flex flex-col place-content-evenly mt-4">
            <div>
              <h3>Reviews:</h3>
              {foundUser.reviews.length > 0 ? (
                <>
                  <p>
                    Average Rating:
                    {Array.from(
                      { length: calculateAverageRating(foundUser.reviews) },
                      () => (
                        <FontAwesomeIcon key={uuidv4()} icon={solidStar} />
                      )
                    )}
                    {Array.from(
                      { length: 5 - calculateAverageRating(foundUser.reviews) },
                      () => (
                        <FontAwesomeIcon key={uuidv4()} icon={regularStar} />
                      )
                    )}
                  </p>
                  {foundUser.reviews.map((review) => {
                    return (
                      <div key={review._id}>
                        <p>comment: "{review.comment}"</p>
                      </div>
                    );
                  })}
                </>
              ) : (
                <p>no reviews so far</p>
              )}
            </div>
            <div className="w-full max-w-[100%] mt-4">
              <h3>Products to be sold:</h3>
              {foundUser.products.length > 0 ? (
                <table className="mt-4 mb-4">
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
                    {foundUser.products.map((product, index) => {
                      return (
                        <tr
                          className="gap-4"
                          key={product._id}
                          onMouseEnter={() => {
                            if (visitorIsProfilePage) {
                              setProductHovered(product._id);
                            }
                          }}
                          onMouseLeave={() => {
                            if (visitorIsProfilePage) {
                              setProductHovered(null);
                            }
                          }}
                        >
                          <td>
                            <Link to={`/product/single/${product._id}`}>
                              {" "}
                              {product.title}
                            </Link>
                          </td>
                          <td>
                            <img
                              className="max-w-[100px]"
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
                              userId={userId}
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
            {visitorIsProfilePage ? (
              <div className="w-full max-w-[100%] mt-4">
                <h3>Products liked:</h3>
                {foundUser.productsLiked.length > 0 ? (
                  <table className="mt-4 mb-4">
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
                      {foundUser.productsLiked.map((product, index) => {
                        return (
                          <tr
                            className="gap-4"
                            key={product._id}
                            onMouseEnter={() => {
                              if (visitorIsProfilePage) {
                                setProductHovered(product._id);
                              }
                            }}
                            onMouseLeave={() => {
                              if (visitorIsProfilePage) {
                                setProductHovered(null);
                              }
                            }}
                          >
                            <td>
                              <Link to={`/product/single/${product._id}`}>
                                {" "}
                                {product.title}
                              </Link>
                            </td>
                            <td>
                              <img
                                className="max-w-[100px]"
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
                              {productHovered === product._id ? (
                                <button className="btn btn-outline bg-base-100">
                                  Unlike
                                </button>
                              ) : (
                                ""
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <p>no products liked</p>
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        </>
      )}
    </>
  );
}

export default ProfilePage;
