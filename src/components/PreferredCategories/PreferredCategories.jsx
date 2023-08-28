import { Link } from "react-router-dom";
import "./PreferredCategories.css";

function PreferredCategories() {
  return (
    <>
      <div className="flex flex-row flex-wrap gap-x-2 gap-y-2 my-8 justify-center">
        <button className="btn btn-outline bg-gray-800 text-white">
          <Link to="/products?">best outfits</Link>
        </button>
        <button className="btn btn-outline bg-gray-800 text-white">
          <Link to="/products?">shoes</Link>
        </button>
        <button className="btn btn-outline bg-gray-800 text-white">
          <Link to="/products?">toys</Link>
        </button>
        <button className="btn btn-outline bg-gray-800 text-white">
          <Link to="/products?">Girls outfits</Link>
        </button>
        <button className="btn btn-outline bg-gray-800 text-white">
          <Link to="/products?">Category 5</Link>
        </button>
        <button className="btn btn-outline bg-gray-800 text-white">
          <Link to="/products?">Category 6</Link>
        </button>
        <button className="btn btn-outline bg-gray-800 text-white">
          <Link to="/products?">Category 7</Link>
        </button>
      </div>
    </>
  );
}

export default PreferredCategories;
