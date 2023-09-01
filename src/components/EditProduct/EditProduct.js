import React, { useState, useEffect } from "react";
import productService from "../../services/product.service";

const EditProduct = ({ productDetails, productIndex, isHovered, userId }) => {
  const [title, setTitle] = useState(productDetails.title);
  const [description, setDescription] = useState(productDetails.description);
  const [image, setImage] = useState(productDetails.image);
  const [price, setPrice] = useState(productDetails.price);
  const [quantity, setQuantity] = useState(productDetails.quantity);
  const [categories, setCategories] = useState(productDetails.categories);
  const [categoryInputs, setCategoryInputs] = useState([
    ...productDetails.categories,
  ]);
  const [newImages, setNewImages] = useState([]);

  const handleModalOpen = () => {
    const modal = document.getElementById(`edit-product-${productIndex}`);
    if (modal) {
      modal.showModal();
    }
  };

  const handleModalClose = () => {
    const modal = document.getElementById(`edit-product-${productIndex}`);
    modal.close();
  };

  const handleCategoryInputChange = (index, newValue) => {
    const updatedCategoryInputs = [...categoryInputs];
    updatedCategoryInputs[index] = newValue;
    setCategoryInputs(updatedCategoryInputs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCategories([...categoryInputs]);
    const requestBody = { title, description, price, quantity, categories };
    productService.editOne(productDetails._id, requestBody).then(() => {
      window.location.reload();
    });
  };

  useEffect(() => {
    setCategoryInputs([...categories]);
  }, [categories]);

  // const appendImage = (e) => {
  //   const formData = new FormData();
  //   formData.append("imageUrl", e.target.files[0]);
  //   setImage(formData);
  // };

  return (
    <>
      <button
        className={`btn btn-outline bg-base-100 ${
          isHovered ? "" : "hidden-button-desktop"
        }`}
        onClick={handleModalOpen}
      >
        Edit
      </button>
      <dialog id={`edit-product-${productIndex}`} className="modal">
        <div className="modal-background">
          <div className="modal-box">
            <button
              onClick={handleModalClose}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <h3 className="font-bold text-lg">Product details!</h3>
              <p>
                <strong>Title:</strong>
                <br />
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                <br />
                <strong>Description</strong>
                <br />
                <input
                  type="text"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <br />
                <strong>Price:</strong>
                <br />
                <input
                  type="number"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <br />
                <strong>Quantity:</strong>
                <br />
                <input
                  type="number"
                  name="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <br />
                <strong>Categories:</strong>
                <br />
                {productDetails.categories.map((category, index) => {
                  return (
                    <input
                      key={`${category}-${index}`}
                      type="text"
                      name="categories"
                      value={categoryInputs[index]}
                      onChange={(e) => {
                        handleCategoryInputChange(index, e.target.value);
                      }}
                    />
                  );
                })}
                <strong>Images</strong>
                <br />
                {productDetails.images.map((image, index) => {
                  const appendImage = (e) => {
                    const newImage = e.target.files[0];
                    const updatedImages = [...newImages];
                    updatedImages[index] = newImage;
                    setNewImages(updatedImages);
                  };
                  return (
                    <div key={`${productDetails.title}-image-${index}`}>
                      <img
                        src={image}
                        alt={`${productDetails.title} ${index}`}
                        className="mt-6"
                      />
                      <input
                        type="file"
                        className="file-input file-input-bordered max-w-xs w-2/3 mx-auto"
                        onChange={appendImage}
                      />
                      <button
                        onClick={handleModalClose}
                        className="bg-neutral w-1/2 mx-auto p-2 text-white mt-2 mb-10"
                      >
                        edit picture
                      </button>
                    </div>
                  );
                })}
                <br />
              </p>
              <div className="modal-action">
                <button type="submit" className="btn" onClick={handleSubmit}>
                  Submit
                </button>
                {/* add a delete button */}
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default EditProduct;
