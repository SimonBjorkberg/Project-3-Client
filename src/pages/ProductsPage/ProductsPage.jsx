import "./ProductsPage.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import ProductCard from "../../components/ProductCard/ProductCard";

function ProductsPage() {

    const { isLoggedIn, } = useContext(AuthContext);

  return (
    <div>
      <h1>Products page</h1>
      <div className="flex gap-3 flex-wrap">
      <ProductCard ></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      </div>
      

      {isLoggedIn && (
        <div>
            <button className="w-1/2 bg-teal-600 mx-auto py-2 rounded-sm hover:bg-teal-500 mt-4" ><Link to="/sell">Sell</Link></button>
        </div>
      )}
    </div>
  );
}

export default ProductsPage;
