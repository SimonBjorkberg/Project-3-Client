import scrollToTop from "../../utils/ScrollToTop";
import { useNavigate } from "react-router-dom";
import productService from "../../services/product.service";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const Products = ({
  foundUser,
  loggedInUser,
  recentProducts,
  showMore,
  setShowMore,
}) => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setProducts(recentProducts);
  }, [recentProducts]);

  const handleRemoveImage = (e, product, deletedImage, images) => {
    e.preventDefault();
    if (images.length <= 1) {
      return setMessage("You can not delete all pictures");
    }

    const filteredImages = product.images.filter((image) => {
      return image !== deletedImage;
    });

    const newProduct = { ...product, images: filteredImages };

    productService.editOne(product._id, newProduct).then((response) => {
      setProducts((prevProducts) => {
        const updatedProducts = prevProducts.map((prevProduct) => {
          if (prevProduct._id === product._id) {
            return response.data.updatedProduct;
          }
          return prevProduct;
        });
        setMessage("Removed image");
        return updatedProducts;
      });
    });
  };

  return (
    <div className="text-left ml-10 pt-10">
      {!foundUser?.products?.length ? (
        <p>This user has no listed products!</p>
      ) : (
        products?.map((product) => {
          const modalId = `modal-${product._id}`;
          return (
            <div
              key={product._id}
              className="flex py-2 border-b w-[900px] border-neutral hover:bg-neutral-200 hover:cursor-pointer"
              onClick={() => navigate(`/product/single/${product._id}`)}
            >
              <div className="avatar">
                <div className="w-16 rounded-xl">
                  <img src={product.images[0]} alt="" />
                </div>
              </div>
              <p className="my-auto ml-5 text-xl font-semibold w-44 truncate">
                {product.title}
              </p>
              <p className="my-auto ml-5 text-xl w-20">${product.price}</p>
              <p className="my-auto ml-5 text-xl w-36">
                {product.quantity} item/s
              </p>
              <p className="my-auto ml-5 text-xl w-20">
                {product.likes.length} Like/s
              </p>
              <div
                className="flex ml-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="mr-2 h-fit my-auto p-2 bg-neutral-400 z-20 hover:bg-blue-700"
                  onClick={() => {
                    const modal = document.getElementById(modalId);
                    if (modal) {
                      modal.showModal();
                    }
                  }}
                >
                  Edit
                </button>
                <button className="h-fit my-auto p-2 bg-neutral-400 z-20">
                  Delete
                </button>
              </div>
              <dialog
                id={modalId}
                className="modal"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-box p-0 rounded-md">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white">
                      ✕
                    </button>
                  </form>
                  <h3 className="font-bold text-lg bg-neutral text-neutral-300 p-3">
                    {product.title}
                  </h3>
                  {message && <p className="text-center">{message}</p>}
                  <div className="p-2 flex justify-center">
                    {product?.images.map((image) => {
                      return (
                        <div
                          key={uuidv4()}
                          className="avatar flex flex-col mx-1"
                        >
                          <div className="w-28 h-28 shadow-xl rounded-xl border-black border-2">
                            <img src={image} alt="" />
                          </div>
                          <form
                            onSubmit={(e) =>
                              handleRemoveImage(
                                e,
                                product,
                                image,
                                product?.images
                              )
                            }
                          >
                            <button>Remove</button>
                          </form>
                        </div>
                      );
                    })}
                  </div>
                  <div>
                    <h1 className="text-center font-semibold text-lg">
                      Add an image
                    </h1>
                    <form className="flex w-full">
                      <input type="file" />
                      <button>Save</button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
          );
        })
      )}
      {!showMore && foundUser?.products.length > 5 && (
        <div className="w-[900px] flex">
          <button onClick={() => setShowMore(true)} className="w-fit ml-auto">
            Show More
          </button>
        </div>
      )}
      {showMore && (
        <div className="w-[900px] flex">
          <button
            onClick={() => {
              setShowMore(false);
              scrollToTop();
            }}
            className="w-fit ml-auto"
          >
            Show Less
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
