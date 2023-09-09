import { useContext } from "react";
import { ShoppingCartContext } from "../../context/shoppingCart.context";

const ShoppingCartPage = () => {

    const { cartProducts } = useContext(ShoppingCartContext);
    return (
        <div>
            <div className="flex justify-around">
                <div>Product</div>
                <div>Quantity</div>
                <div>Price</div>
            </div>
            
                {cartProducts.map(product => {
                  return  <div className="flex justify-around">
                        <div>{product.title}</div>
                        <div>{product.quantity}</div>
                        <div>{product.price}</div>
                        </div>
                })}
                
            

        </div>
    )
};

export default ShoppingCartPage;