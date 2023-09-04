import "./ProductCardHomepage.css";
import { Link } from "react-router-dom";
import LikeButton from "../LikeButton/LikeButton";
import { useContext, useEffect, useState } from "react";
import productService from "../../services/product.service";
import { AuthContext } from "../../context/auth.context";

function ProductCardHomepage() {
  const [products, setProducts] = useState("");

  const { user, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    productService.getAll().then((response) => {
      const fiveRecent = response.data.slice(
        Math.max(response.data.length - 7, 1)
      );
      setProducts(fiveRecent);
    });
  }, []);

  return (
    <div className="flex flex-row overflow-x-auto min-w-[1900px]">
      {products &&
        products.map((product, index) => {
          let includesId = false;

          if (isLoggedIn) {
            const idToCheck = user._id;

            for (let i = 0; i < product.likes.length; i++) {
              if (product.likes[i] === idToCheck) {
                console.log(product.likes);
                includesId = true;
                break; // Exit the loop early once a match is found
              }
            }
          } else {
            includesId = false;
          }

          return (
            <div key={index} className="card min-w-96 bg-base-100 shadow-xl mx-1 rounded-t-md mb-3">
              <figure className="max-h-[7rem] min-h-[7rem]">
                <Link to={`/product/single/${product._id}`}>
                  <img src={product.images[0]} alt={product.title} />
                </Link>
              </figure>
              <div className="card-body p-0">
                <div className="flex flex-col items-start p-3">
                  <h3 className="card-title">
                    {product.price}$
                    <div className="badge badge-secondary">NEW</div>
                  </h3>
                  <p>
                    Brand:{" "}
                    <span className="font-semibold">{product.brand}</span>
                  </p>
                  <p>
                    Wear & Tear:{" "}
                    <span className="font-semibold">{product.wear.value}</span>
                  </p>
                </div>
                <div className="flex flex-col h-full px-2">
                  <div className="min-h-[48px] mb-4">
                    {product.categories.map((category, index) => (
                      <div key={index} className={`${
                          category.value === "onesies" && "bg-teal-500"
                        } ${category.value === "t-shirts" && "bg-green-500"} ${
                          category.value === "sleepsuits" && "bg-yellow-500"
                        } ${category.value === "bodysuits" && "bg-cyan-500"} ${
                          category.value === "dresses" && "bg-orange-500"
                        } badge badge-outline mx-1 my-auto`}>
                        {category.value}
                      </div>
                    ))}
                  </div>

                  <p className="h-full text-left">
                    Seller:{" "}
                    <Link className="text-blue-500 font-semibold mt-auto">
                      {product.author.username}
                    </Link>
                  </p>
                </div>
                <div className="flex w-full h-full">
                  <button className="btn btn-primary mt-auto rounded-none rounded-b-md">
                    Add to Cart
                  </button>
                </div>
                <div className="absolute top-3 right-3">
                  <LikeButton
                    productId={product._id}
                    likedStatus={includesId ? true : false}
                  />
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default ProductCardHomepage;
