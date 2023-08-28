import "./ProductCard.css";
import { Link } from "react-router-dom";
import axios from "axios"
import LikeButton from "../LikeButton/LikeButton";
import { useEffect, useState } from "react";


function ProductCard() {

  const [products, setProducts] = useState("")


  useEffect(() => {

    axios.get("http://localhost:5005/product/all")
    .then(response => setProducts(response.data))
  }, [])

  return (
    <>
    
      
      {products && products.map(product => {
        return (
        <div className="card w-96 bg-base-100 shadow-xl my-8 min-w-200">
        <figure>
           <Link to={`/product/single/${product._id}`}>
             <img src={product.images[0]} alt={product.title} />
           </Link>
         </figure>
         <div className="card-body">
             <div className="flex flex-col items-start">
               <h3 className="card-title">
                 {product.price}$<div className="badge badge-secondary">NEW</div>
               </h3>
               <p>Brand: {product.brand}</p>
               <p>{product.age}</p>
             </div>
             <div className="card-actions justify-center">
              {product.categories.map(categorie => <div className="badge badge-outline">{categorie}</div>)}
               <p>Sold by: {product.author.username}</p>
               <div class="flex ">
                 <button className="btn btn-primary">Add to Cart</button>
               </div>
               <div className="absolute top-3 right-3">
                 <LikeButton />
               </div>
             </div>
           </div>
           </div> 
           )
      })   }
        </>
    
  );
}

export default ProductCard;
