import { useEffect, useState } from "react";
import productService from "../../services/product.service";

const EditProduct = ({ modalId }) => {
  const [product, setProduct] = useState([]);
  const [images, setImages] = useState(product.images)

  useEffect(() => {
    productService.getOne(modalId).then((response) => {
      setProduct(response.data);
      setImages(response.data.images)
    });
  }, []);

  console.log(images)

  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box rounded-md max-w-[500px] p-0">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg bg-neutral text-neutral-300 p-3">
          Edit Product
        </h3>
        <div className="flex p-4">
          <div className="rounded-sm w-full flex flex-wrap justify-center">
            {product?.images?.map((image, index) => {
              return (
                <div key={index} className="w-1/2 p-2">
                  <img
                    src={image}
                    className="w-full h-[85%]"
                    alt="carousel item"
                  />
                  <button className="bg-neutral text-white py-1.5">
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default EditProduct;
