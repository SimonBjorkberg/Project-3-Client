import "./ProductDetailsPage.css";
import example from "../../baby-clothes.jpg"
import PreferredCategories from "../../components/PreferredCategories/PreferredCategories";
import Rating from "../../components/Rating/Rating";
import LikeButton from "../../components/LikeButton/LikeButton";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import productService from "../../services/product.service";




function ProductDetailsPage() {

  const { productId } = useParams()

  const [product, setProduct] = useState("");
  const [index, setIndex] = useState(0);

  const goToPreviousSlide = () => {
    console.log(index)
    setIndex((prevIndex) => (prevIndex === 0 ? product.images.length - 1 : prevIndex - 1));
  };

  const goToNextSlide = () => {
    console.log(index)
    setIndex((prevIndex) => (prevIndex === product.images.length - 1 ? 0 : prevIndex + 1)); 
  };

  useEffect(() => {

    productService.getOne(productId)
    .then(response => 
      setProduct(response.data)
    )

  }, [productId])

  return (
    <div className="flex sm:flex-col  lg:flex-row">
       <div className=" lg:w-2/4 m-8 shrink-0 sm: w-fit">
          {product.images && ( 
            <div className="carousel">
              <div  className="carousel-item relative w-full">
                <img src={product.images[index]} className="w-full  min-w-200 " alt={`slide${index}`} />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <button onClick={goToPreviousSlide} className="btn btn-circle">❮</button> 
                  <button onClick={goToNextSlide} className="btn btn-circle">❯</button>
                </div>
              </div> 
            </div>
          )}

        </div>
        <div className="my-8  text-black lg:text-left ">
          <div className=" flex gap-24 sm: justify-center lg:justify-start ">
            <h5 className="text-3xl font-semibold">{product.title}</h5>
            <LikeButton/>
          </div>

          <div className="flex flex-row lg:flex">
            {product.categories && product.categories.length > 0 && (
              <div className="flex flex-row flex-wrap gap-x-2 gap-y-2 my-8 justify-center">
                {product.categories.map((category) => (
                  <button className="btn btn-outline bg-gray-800 text-white w-fit">
                    {category}
                  </button>
                  ))}
              </div>
            )}
          </div>
          
          <p className="mb-6 font-semibold">$ {product.price}</p>
          {product.brand && <p>Brand: {product.brand}</p>}
          <p>Age: {product.age}</p>
          <div className="mb-8">
            <p className=" mt-4">{product.description}</p>
            <p className="mt-4 font-semibold">Quantity</p>
            <input type="number" value={product.quantity} className="input input-bordered w-full max-w-xs mb-4 mt-2" />
            <p>Author: {product.author && product.author.username}</p>
          </div>
          <div className="text-center">
            <button className="btn btn-outline bg-gray-800 text-white w-4/5">Add To Cart</button>
          </div>
        </div>
    </div>
  );
}

export default ProductDetailsPage;
