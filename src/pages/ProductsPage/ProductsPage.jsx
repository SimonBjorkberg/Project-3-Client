import "./ProductsPage.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import Categories from "../../components/Categories/Categories";
import { useState, useEffect, useContext } from "react";
import { SearchContext } from "../../context/search.context";
import productService from "../../services/product.service";

function ProductsPage() {
  const { filter, setFilter } = useContext(SearchContext)
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(null)

  useEffect(() => {
    productService.getAll().then((response) => setProducts(response.data));
  }, []);

  useEffect(() => {
    if (filter !== "") {
      const filteredCopy = products.filter((product) => {
        return product.categories.some(category => category.value === filter);
      });
      setFilteredProducts(filteredCopy);
    } else {
      setFilteredProducts(products);
    }
  }, [filter, products]);

  return (
    <div>
      <Categories setFilter={setFilter} ></Categories>
      <div className="flex gap-2 flex-wrap justify-around">
        <ProductCard
          products={filteredProducts}
          setProducts={setProducts}
        ></ProductCard>
      </div>
    </div>
  );
}

export default ProductsPage;
