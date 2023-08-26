import "./ProductDetailsPage.css";
import example from "../../baby-clothes.jpg"
import PreferredCategories from "../../components/PreferredCategories/PreferredCategories";
import Rating from "../../components/Rating/Rating";
import LikeButton from "../../components/LikeButton/LikeButton";



function ProductDetailsPage() {

  return (
    <div className="flex sm:flex-col  lg:flex-row">
        <div className=" lg:w-2/4 m-8 shrink-0 sm: w-fit">
          <div className="carousel">
  <div id="slide1" className="carousel-item relative w-full">
    <img src={example} className="w-full  min-w-200 " />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide4" className="btn btn-circle">❮</a> 
      <a href="#slide2" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide2" className="carousel-item relative w-full">
    <img src={example} className="w-full min-w-200" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide1" className="btn btn-circle">❮</a> 
      <a href="#slide3" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide3" className="carousel-item relative w-full">
    <img src={example} className="w-full min-w-200" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide2" className="btn btn-circle">❮</a> 
      <a href="#slide4" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide4" className="carousel-item relative w-full">
    <img src={example} className="w-full min-w-200" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide3" className="btn btn-circle">❮</a> 
      <a href="#slide1" className="btn btn-circle">❯</a>
    </div>
  </div>
</div>
        </div>
        <div className="my-8  text-black lg:text-left ">
        <div className=" flex gap-24 sm: justify-center lg:justify-start ">
        <h5 className="text-3xl font-semibold">Baby Grow</h5>
          <LikeButton/>
          
          </div>
          
          <div className="lg:flex">
          <PreferredCategories></PreferredCategories>
          </div>
          
          <p className="mb-6 font-semibold">$ 28.00</p>
          <Rating></Rating>
          <div className="mb-8">
          <p className=" mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas bibendum enim a fermentum bibendum. Ut id magna nec justo euismod placerat vel ut felis.</p>
          <p className="mt-4 font-semibold">Quantity</p>
          <input type="number" placeholder="2" className="input input-bordered w-full max-w-xs mb-4 mt-2" />
          
          </div>
          <div className="text-center">
          <button className="btn btn-outline bg-gray-800 text-white w-4/5">Add To Cart</button>
          </div>
         
        

        </div>
      


      
    </div>
  );
}

export default ProductDetailsPage;
