import { useState, createContext, useEffect } from "react";

const ShoppingCartContext = createContext();

const ShoppinCartProviderWrapper = (props) => {
  const [cartProducts, setCartProducts] = useState([]);

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

  const handleAddToCart = (product) => {
    setCartProducts((prevCartProducts) => [...prevCartProducts, product]);
};

const updateCart = (newCart) => {
  setCartProducts(newCart);
};
 

const removeItemFromCart = (itemId) => {
  // Filter out the item with the specified itemId
  const updatedCart = cartProducts.filter((item) => item._id !== itemId);
  setCartProducts(updatedCart);
  // Update local storage with the updated cart
  localStorage.setItem("Cart", JSON.stringify(updatedCart));
};

  return (
    <ShoppingCartContext.Provider value={{ cartProducts, setCartProducts, handleAddToCart, updateCart, removeItemFromCart }}>
      {props.children}
    </ShoppingCartContext.Provider>
  );
};

export { ShoppinCartProviderWrapper, ShoppingCartContext };
