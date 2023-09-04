import { Link } from "react-router-dom";
import "./PreferredCategories.css";

function PreferredCategories() {
  return (
   
      <div className="flex flex-row flex-wrap gap-x-2 gap-y-2 my-8 justify-center">
        <button className="btn btn-outline bg-gray-800 text-white w-fit">
          <Link to="/products?">Rompers</Link>
        </button>
        <button className="btn btn-outline bg-gray-800 text-white w-fit">
          <Link to="/products?">Sleepsuits</Link>
        </button>
        <button className="btn btn-outline bg-gray-800 text-white w-fit">
          <Link to="/products?">Onesies</Link>
        </button>
        <button className="btn btn-outline bg-gray-800 text-white w-fit">
          <Link to="/products?">Bodysuits</Link>
        </button>
        <button className="btn btn-outline bg-gray-800 text-white w-fit">
          <Link to="/products?">Dresses</Link>
        </button>
        <button className="btn btn-outline bg-gray-800 text-white w-fit">
          <Link to="/products?">T-Shirts</Link>
        </button>
        <button className="btn btn-outline bg-gray-800 text-white w-fit">
          <Link to="/products?">Pants & Leggings</Link>
        </button>
        <button className="btn btn-outline bg-gray-800 text-white w-fit">
          <Link to="/products?">Sweaters & Cardigans</Link>
        </button>
        <button className="btn btn-outline bg-gray-800 text-white w-fit">
          <Link to="/products?">Bibs</Link>
        </button>
        <button className="btn btn-outline bg-gray-800 text-white w-fit">
          <Link to="/products?">Outerwear</Link>
        </button>
      </div>
  );
}

export default PreferredCategories;
