import ProductCardHomepage from "../ProductCardHomepage/ProductCardHomepage";
import "./LastProducts.css";

function LastProducts() {
  return (
    <div className="block">
      <h2 className="mt-6 mb-4 text-center text-grey-800 font-semibold text-lg border-b w-[90%] mx-auto">Recently Added Products</h2>
      <main className="flex row gap-x-2 overflow-x-scroll mb-8 w-full">
        <ProductCardHomepage />
      </main>
    </div>
  );
}

export default LastProducts;
