import React, { useState, useEffect } from "react";
import projectService from "../../services/project.service";

const EditProduct = ({ productDetails, productIndex, isHovered, userId }) => {
  const [title, setTitle] = useState(productDetails.title);
  const [description, setDescription] = useState(productDetails.description);
  // const [image, setImage] = useState(productDetails.image);
  const [price, setPrice] = useState(productDetails.price);
  const [quantity, setQuantity] = useState(productDetails.quantity);
  const [categories, setCategories] = useState(productDetails.categories);
  const [categoryInputs, setCategoryInputs] = useState([
    ...productDetails.categories,
  ]);
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
    projectService.editOne(productDetails._id, requestBody).then((response) => {
      window.location.reload();
    });
  };

  useEffect(() => {
    setCategoryInputs([...categories]);
  }, [categories]);

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
                <strong>Images</strong>
                <br />
                {productDetails.images.map((image, index) => {
                  return (
                    <img
                      src={image}
                      key={`${productDetails.title}-image-${index}`}
                      alt={`${productDetails.title} ${index}`}
                    />
                  );
                })}
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
                <br />
              </p>
              <div className="modal-action">
                <button type="submit" className="btn" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default EditProduct;
