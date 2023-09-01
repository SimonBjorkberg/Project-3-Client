import "./ProductsPage.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import PreferredCategories from "../../components/PreferredCategories/PreferredCategories";

function ProductsPage() {

  return (
    <div>
      <PreferredCategories></PreferredCategories>
      <div className="flex gap-2 flex-wrap justify-around">
        <ProductCard></ProductCard>
      </div>
    </div>
  );
}

export default ProductsPage;
