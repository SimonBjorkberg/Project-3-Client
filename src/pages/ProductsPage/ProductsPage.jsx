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

  const handleClick = () => {
    if (filter !== "") {
      setFilter("")
    }
  }

  useEffect(() => {
    if (filter !== "") {
      const filteredCopy = products.filter((product) => {
        return product.categories.some(category => category.value === filter);
      });
      if (filteredCopy.length === 0) {
        setFilteredProducts({})
      }
      setFilteredProducts(filteredCopy);
    } else {
      setFilteredProducts(products);
    }
  }, [filter, products]);

  return (
    <div>
      <Categories setFilter={setFilter} ></Categories>
      <button className={`${filter !== "" ? "px-2.5 py-1.5 rounded-md font-light bg-white hover:opacity-40 text-neutral border-2 border-neutral w-32" : "hidden"}`} onClick={() => handleClick()} >Clear Filter</button>
      <div className="flex gap-2 flex-wrap justify-around">
        {products.map((product) => {
                 return  <ProductCard
          product={product}
        ></ProductCard>
        })}
    
      </div>
    </div>
  );
}

export default ProductsPage;
