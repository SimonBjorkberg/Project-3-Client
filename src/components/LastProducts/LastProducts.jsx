import ProductCard from "../ProductCard/ProductCard";
import "./LastProducts.css";

function LastProducts() {
  return (
    <div className="block vh-50 ">
      <h2 className="mt-6 mb-4 text-center text-base-100 font-semibold text-lg">Last Added Products</h2>
      <main className="flex row gap-x-2 overflow-x-scroll mb-8">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </main>
    </div>
  );
}

export default LastProducts;
