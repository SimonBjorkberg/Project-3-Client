import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { ShoppingCartContext } from "../../context/shoppingCart.context";

function ThankYou() {
  const { userInfo } = useContext(AuthContext);
  const { total, cartProducts } = useContext(ShoppingCartContext);
  return (
    <>
      <p className="pt-20">Thanks! {userInfo?.username}</p>
      <h1>Your order is on its way</h1>
      <p>Total amount of your order: {total}$</p>
      <h2>Your order is on its way</h2>
      {cartProducts.map((product) => {
        return <div>{product.title}</div>;
      })}
    </>
  );
}

export default ThankYou;
