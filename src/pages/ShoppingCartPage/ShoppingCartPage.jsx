import { useContext } from "react";
import { ShoppingCartContext } from "../../context/shoppingCart.context";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ShoppingCartPage = () => {
  const { cartProducts, removeItemFromCart, updateCart } =
    useContext(ShoppingCartContext);
  const handleQuantityChange = (productId, newQuantity) => {
    const updatedCart = cartProducts.map((product) => {
      if (product._id === productId) {
        return { ...product, quantity: newQuantity };
      }
      return product;
    });

    updateCart(updatedCart);
  };

  return (
    <>
      <div className="text-left lg:pl-10 py-10 bg-neutral-200">
        {cartProducts.length === 0 ? (
          <p>your shopping cart is empty!</p>
        ) : (
          <>
            <div className="flex justify-between items-center py-2 border-b lg:w-[900px] border-neutral hover:bg-neutral-200 ">
              <div className="avatar">
                <div className="w-16 rounded-xl"></div>
              </div>
              <p className="my-auto ml-5 text-xl font-semibold w-44 truncate hover:cursor-pointer">
                Product
              </p>
              <p className="my-auto md:flex hidden ml-5 text-xl w-20">Price</p>
              <p className="my-auto md:flex hidden ml-5 text-xl w-36">
                Quantity
              </p>
              <button className="ml-5"></button>
            </div>
            {cartProducts.map((product) => {
              if (!product || !product._id) {
                return null;
              }
              return (
                <div
                  key={product._id}
                  className="flex justify-between items-center py-2 border-b lg:w-[900px] border-neutral hover:bg-neutral-200 "
                >
                  <div className="avatar">
                    <div className="w-16 rounded-xl">
                      <img src={product.images[0]} alt={product.title} />
                    </div>
                  </div>
                  <Link to={`/product/single/${product._id}`}>
                    <p className="my-auto ml-5 text-xl font-semibold w-44 truncate hover:cursor-pointer">
                      {product.title}
                    </p>
                  </Link>
                  <p className="my-auto md:flex hidden ml-5 text-xl w-20">
                    ${product.price}
                  </p>

                  <input
                    type="number"
                    className="my-auto md:flex hidden ml-5 text-xl max-w-[50px] min-w-10 bg-neutral-200"
                    value={product.quantity}
                    min={1}
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value, 10);
                      if (!isNaN(newQuantity)) {
                        handleQuantityChange(product._id, newQuantity);
                      }
                    }}
                  />

                  <button
                    className="ml-5"
                    onClick={() => {
                      removeItemFromCart(product._id);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              );
            })}
          </>
        )}
      </div>
      <div className="bg-neutral-200 py-10">
        <button className="bg-red-400 text-white py-2 px-4 rounded-sm ml-2 hover:bg-red-500">
          <Link to="/payment">Proceed to checkout</Link>
        </button>
      </div>
    </>
  );
};

export default ShoppingCartPage;
