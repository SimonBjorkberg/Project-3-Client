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

  return (
    <ShoppingCartContext.Provider value={{ cartProducts, setCartProducts, handleAddToCart }}>
      {props.children}
    </ShoppingCartContext.Provider>
  );
};

export { ShoppinCartProviderWrapper, ShoppingCartContext };
