import "./ProductCard.css";
import { Link } from "react-router-dom";
import LikeButton from "../LikeButton/LikeButton";
import { useEffect, useState } from "react";
import productService from "../../services/product.service";

function ProductCard() {

  const [products, setProducts] = useState("")


  useEffect(() => {
    productService.getAll()
      .then(response => setProducts(response.data))
  }, [])

  

  return (
    <>
    
      
      {products && products.map((product, index) => {

      const likedStatus = localStorage.getItem(`liked_${product._id}`) === "true";

        return (
        <div key={index} className="card w-96 bg-base-100 shadow-xl my-8 min-w-200">
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
              {product.categories.map((categorie, index) => <div key={index} className="badge badge-outline">{categorie}</div>)}
               <p>Sold by: <Link to={`/profile/${product.author._id}`} className="text-blue-500 font-semibold">{product.author.username}</Link></p>
               <div className="flex ">
                 <button className="btn btn-primary">Add to Cart</button>
               </div>
               <div className="absolute top-3 right-3">

               
                 <LikeButton productId={product._id} initialLiked={likedStatus}/>
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
