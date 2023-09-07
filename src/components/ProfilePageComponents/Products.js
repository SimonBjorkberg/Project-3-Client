import scrollToTop from "../../utils/ScrollToTop";
import { useNavigate } from "react-router-dom";
import productService from "../../services/product.service";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Select from "react-select";

const Products = ({
  foundUser,
  loggedInUser,
  recentProducts,
  showMore,
  setShowMore,
}) => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState();
  const [categorieOptions, setCategorieOptions] = useState([]);
  const [wearOptions, setWearOptions] = useState();
  const [editProduct, setEditProduct] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setEditProduct((product) => ({ ...product, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editProduct.title === "") {
      return setErrorMessage("Please enter a title");
    } else if (editProduct.description === "") {
      return setErrorMessage("Please enter a description");
    } else if (editProduct.images?.length === 0) {
      return setErrorMessage("Please insert at least one image");
    } else if (editProduct.price === 0) {
      return setErrorMessage("Please enter a price above $0");
    } else if (editProduct.quantity === 0) {
      return setErrorMessage("Please set a quantity above 0");
    } else if (categorieOptions.length === 0) {
      return setErrorMessage("Please select at least one category");
    } else if (categorieOptions.length >= 3) {
      return setErrorMessage("You can only select 2 categories");
    } else {
      const editedProduct = {
        ...editProduct,
        title: editProduct.title,
        description: editProduct.description,
        images: editProduct?.images,
        price: editProduct.price,
        quantity: editProduct.quantity,
        categories: categorieOptions,
        wear: wearOptions,
      };

      productService
        .editOne(editProduct._id, editedProduct)
        .then((response) => {
          setProducts((prevProducts) => {
            const updatedProducts = prevProducts.map((prevProduct) => {
              if (prevProduct._id === editProduct._id) {
                return response.data.updatedProduct;
              }
              return prevProduct;
            });
            return updatedProducts;
          });
        });
      setEditProduct({});
      setCategorieOptions([]);
      setWearOptions({});
      scrollToTop();
    }
  };

  function handleCategorie(data) {
    setCategorieOptions(data);
  }
  function handleWear(data) {
    setWearOptions(data);
  }
  const categoriesList = [
    { value: "rompers", label: "Rompers" },
    { value: "sleepsuits", label: "Sleepsuits" },
    { value: "onesies", label: "Onesies" },
    { value: "bodysuits", label: "Bodysuits" },
    { value: "dresses", label: "Dresses" },
    { value: "t-shirts", label: "T-shirts" },
    { value: "pantsNleggings", label: "Pants" },
    { value: "sweatersNcardigans", label: "Sweaters" },
    { value: "bibs", label: "Bibs" },
    { value: "outerwear", label: "Outerwear" },
  ];

  const wearList = [
    { value: "brand new", label: "Brand New" },
    { value: "well worn", label: "Well Worn" },
    { value: "stains", label: "Stains" },
  ];

  useEffect(() => {
    if (message !== "") {
      setTimeout(() => {
        setMessage("");
      }, 3500);
    }
  }, [message]);

  useEffect(() => {
    setProducts(recentProducts);
  }, [recentProducts]);

  const handleRemoveImage = (e, product, deletedImage, images) => {
    e.preventDefault();
    if (images.length <= 1) {
      return setMessage("There must be at least one image");
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

  const appendImage = (e) => {
    const formData = new FormData();
    formData.append("imageUrl", e.target.files[0]);
    setImage(formData);
  };

  const handleAddImage = async (e, product, images) => {
    e.preventDefault();

    const imageResponse = await productService.uploadImage(image);
    console.log(imageResponse.data.fileUrl);
    const updatedImages = [...images, imageResponse.data.fileUrl];
    const newProduct = { ...product, images: updatedImages };

    const updatedProduct = await productService.editOne(
      product._id,
      newProduct
    );

    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((prevProduct) => {
        if (prevProduct._id === product._id) {
          return updatedProduct.data.updatedProduct;
        }
        return prevProduct;
      });
      return updatedProducts;
    });
    setImage(null);
    setMessage("Image added");
  };

  const reloadProducts = () => {
    productService.getAll().then((response) => {
      setProducts(response.data.products);
    });
  };

  const handleDeleteProduct = (productId) => {
    productService.deleteOne(productId).then(() => {
      reloadProducts();
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
              {loggedInUser?._id === foundUser._id && (
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
                      setEditProduct(product);
                      setCategorieOptions(product.categories);
                      setWearOptions(product.wear);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="h-fit my-auto p-2 bg-neutral-400 z-20"
                  >
                    Delete
                  </button>
                </div>
              )}

              <dialog
                id={modalId}
                className="modal hover:cursor-default"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-box p-0 rounded-md">
                  <form method="dialog">
                    <button
                      onClick={() => {
                        setImage(null);
                        setEditProduct({});
                      }}
                      className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white"
                    >
                      ✕
                    </button>
                  </form>
                  <h3 className="font-bold text-lg bg-neutral text-neutral-300 p-3">
                    {product.title}
                  </h3>
                  {message && (
                    <p
                      className={`${
                        message === "Image added"
                          ? "text-green-500"
                          : "text-red-500"
                      } text-center`}
                    >
                      {message}
                    </p>
                  )}
                  <div
                    className={`p-2 flex border-b ${
                      product?.images.length <= 4
                        ? "justify-center"
                        : "overflow-auto"
                    }`}
                  >
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
                            className="flex justify-center"
                            onSubmit={(e) =>
                              handleRemoveImage(
                                e,
                                product,
                                image,
                                product?.images
                              )
                            }
                          >
                            <button className="hover:underline w-fit">
                              Remove
                            </button>
                          </form>
                        </div>
                      );
                    })}
                  </div>
                  <div className="p-2 flex flex-col border-b mb-4">
                    <h1 className="text-center font-semibold text-lg">
                      Add an image
                    </h1>
                    <form
                      className="flex w-full flex-col justify-center"
                      onSubmit={(e) =>
                        handleAddImage(e, product, product.images)
                      }
                    >
                      <input
                        type="file"
                        className="w-[101px] mx-auto file-input file-input-bordered file-input-xs rounded-sm mb-2"
                        onChange={appendImage}
                      />
                      {image && (
                        <button className="py-1 bg-neutral px-2 w-32 mb-2 text-white font-semibold rounded-sm mx-auto">
                          Add image
                        </button>
                      )}
                    </form>
                  </div>
                  <div>
                    <h1 className="text-center font-semibold text-lg">
                      Product Information
                    </h1>
                    {message && (
                      <p className="p-2 text-green-600 font-semibold text-xl">
                        {message}
                      </p>
                    )}
                    <form
                      className="flex flex-col w-[400px] mx-auto"
                      onSubmit={handleSubmit}
                    >
                      <label className="text-left font-semibold ml-1 mt-4">
                        Title:
                      </label>
                      <input
                        className="p-2 focus:outline-none border  my-4"
                        type="text"
                        name="title"
                        value={editProduct.title}
                        onChange={handleChange}
                        placeholder="Title..."
                      />
                      <label className="text-left font-semibold ml-1">
                        Description:
                      </label>
                      <textarea
                        className="p-2 focus:outline-none border my-4"
                        type="text"
                        name="description"
                        value={editProduct.description}
                        onChange={handleChange}
                        placeholder="Description..."
                      />
                      <label className="text-left font-semibold ml-1">
                        Price:
                      </label>
                      <input
                        className="p-2 focus:outline-none border my-2"
                        type="number"
                        name="price"
                        value={editProduct.price}
                        onChange={handleChange}
                      />
                      <label className="text-left font-semibold ml-1">
                        Quantity:
                      </label>
                      <input
                        className="p-2 focus:outline-none border my-2"
                        type="number"
                        name="quantity"
                        value={editProduct.quantity}
                        onChange={handleChange}
                      />

                      <label className="text-left font-semibold ml-1">
                        Wear & Tear:
                      </label>

                      <Select
                        options={wearList}
                        name="categories"
                        value={wearOptions}
                        onChange={handleWear}
                        isSearchable={true}
                        className="my-4"
                      />

                      <label className="text-left font-semibold ml-1">
                        Categories:
                      </label>

                      <Select
                        options={categoriesList}
                        name="wear"
                        value={categorieOptions}
                        onChange={handleCategorie}
                        isSearchable={true}
                        isMulti
                        className="my-4"
                      />

                      <label className="text-left font-semibold ml-1">
                        Clothing Brand(s):
                      </label>

                      <input
                        className="p-2 focus:outline-none border"
                        type="text"
                        name="brand"
                        onChange={handleChange}
                        value={editProduct.brand}
                      />
                      <button className="text-neutral p-2 border-2 border-neutral hover:bg-neutral-100 my-6">
                        Edit Product
                      </button>
                    </form>
                    {errorMessage && (
                      <p className="p-2 m-2 bg-white border-red-500 border w-52 mx-auto text-center text-red-500">
                        {errorMessage}
                      </p>
                    )}
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
