import "./ProductsPage.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import ProductCard from "../../components/ProductCard/ProductCard";
import PreferredCategories from "../../components/PreferredCategories/PreferredCategories";
import Footer from "../../components/Footer/Footer";

function ProductsPage() {

    const { isLoggedIn, } = useContext(AuthContext);

  return (
    <div>
      <PreferredCategories></PreferredCategories>
      <div className="flex gap-2 flex-wrap justify-around">
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

      <Footer></Footer>
    </div>
  );
}

export default ProductsPage;
