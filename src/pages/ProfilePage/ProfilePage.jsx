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

  const modalModule = (nameOfModal, modalIndex) => {
    const modalId = `modal_${modalIndex}`;

    const showModal = () => {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.showModal();
      }
    };
    return (
      <>
        <button className="btn" onClick={showModal}>
          {nameOfModal}
        </button>
        <dialog id={modalId} className="modal">
          <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">
              Press ESC key or click the button below to close
            </p>
            <div className="modal-action">
              <button className="btn">Close</button>
            </div>
          </form>
        </dialog>
      </>
    );
  };

  useEffect(() => {
    profileService.getOne(userId).then((response) => {
      setUser(response.data.user);
      setLoading(false);
    });
  }, [userId]);

  return (
    <>
      {loading ? (
        <h1>Loading your profile...</h1>
      ) : (
        <>
          <h1>Profile page</h1>
          <main className="flex flex-row place-content-center items-center gap-4">
            <img
              src={user.image}
              alt={user.username}
              className="rounded-full overflow-hidden border-2 border-white shadow-ld max-h-52 shadow"
            />
            <div className="flex flex-col">
              <h2>{`${user.username}`}</h2>
              <p>Email registred: {`${user.email}`}</p>
              <div className="gap-4">
                {modalModule("edit Profil", 1)}
                {modalModule("Edit Picture", 2)}
              </div>
            </div>
          </main>
          <div className="flex flex-row place-content-evenly">
            <div>
              <h3>Reviews:</h3>
              {user.reviews
                ? user.reviews.map((review) => {
                    return (
                      <div key={review._id}>
                        <p>{review.review}</p>
                        <p>comment: {review.comment}</p>
                      </div>
                    );
                  })
                : "no reviews so far"}
            </div>
            <div>
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
            </div>
          </div>
        </>
      )}

      {!loading && <EditProfile user={user} setUser={setUser} />}
    </>
  );
}

export default ProfilePage;
