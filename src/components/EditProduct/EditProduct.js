import React, { useState } from "react";

const EditProduct = ({ productDetails, productIndex, isHovered }) => {
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
            <form className="flex flex-col">
              <h3 className="font-bold text-lg">Product details!</h3>
              <p>
                <strong>Title:</strong> {productDetails.title}
                <br />
                <strong>Price:</strong> {productDetails.price} €
                <br />
                <strong>Quantity:</strong> {productDetails.quantity}
                <br />
              </p>
              <div className="modal-action">
                <button className="btn" onClick={handleModalClose}>
                  Close
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
