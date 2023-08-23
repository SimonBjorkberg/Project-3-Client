import "./ProductCard.css";

const ProductCard = () => {
  return (
    <div className="flex flex-col items-center border-4 px-5 border-teal-600 rounded max-w-xs ">
        <h5 className="my-3">Title</h5>
        <img src="https://images.unsplash.com/photo-1622290319146-7b63df48a635?ixlib=rb-4.0.3&ixid
        =M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=772&q=80" className="w-1/5 rounded-md"></img>
        <p className="my-3">19,99 $</p>
        <div className="flex gap-2"> 
            <button className="border-4 px-5 border-teal-600 rounded">See More</button>
            <button className="border-4 px-5 border-teal-600 rounded">Add to Cart</button>
        </div>
        <p className="mt-3 justify-end ">Sold by: Diogo</p>
        </div>
  );
};

export default ProductCard;
