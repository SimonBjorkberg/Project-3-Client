import { useState, createContext, useEffect } from "react";

const ShoppingCartContext = createContext();

const ShoppinCartProviderWrapper = (props) => {
  const [cartProducts, setCartProducts] = useState([]);
  // const [productQuantities, setProductQuantities] = useState({});
  useEffect(() => {
    // Retrieve cart data from local storage when the component initializes
    const storedCart = JSON.parse(localStorage.getItem("Cart"));
    if (storedCart) {
      setCartProducts(storedCart);
    }
  }, []); // Empty dependency array means this effect runs only once during component initialization

  useEffect(() => {
    // Update local storage whenever cartProducts changes
    localStorage.setItem("Cart", JSON.stringify(cartProducts));
  }, [cartProducts]);

  const handleAddToCart = (product, quantity) => {
    setCartProducts((prevCartProducts) => {
      const updatedCart = [...prevCartProducts];
      const productIndex = updatedCart.findIndex(
        (item) => item._id === product._id
      );

      if (productIndex !== -1) {
        updatedCart[productIndex].quantity = +quantity;
      } else {
        updatedCart.push({ ...product, quantity: quantity });
      }

      return updatedCart;
    });
  };

  const removeItemFromCart = (itemId) => {
    console.log("id from page", itemId);
    // Filter out the item with the specified itemId
    const updatedCart = cartProducts.filter((item) => item._id !== itemId);
    setCartProducts(updatedCart);
    // Update local storage with the updated cart
    localStorage.setItem("Cart", JSON.stringify(updatedCart));
  };

  const updateCart = (newCart) => {
    setCartProducts(newCart);
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        handleAddToCart,
        updateCart,
        removeItemFromCart,
      }}
    >
      {props.children}
    </ShoppingCartContext.Provider>
  );
};

export { ShoppinCartProviderWrapper, ShoppingCartContext };
