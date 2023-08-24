import { Link } from "react-router-dom";
import "./PreferredCategories.css";

function PreferredCategories() {
  return (
    <>
      <h2 className="mb-8">Search by Categories:</h2>
      <div className="flex flex-row flex-wrap gap-x-2 gap-y-2 mb-8">
        <button className="btn btn-outline">
          <Link to="/products?">best outfits</Link>
        </button>
        <button className="btn btn-outline">
          <Link to="/products?">shoes</Link>
        </button>
        <button className="btn btn-outline">
          <Link to="/products?">toys</Link>
        </button>
        <button className="btn btn-outline">
          <Link to="/products?">Girls outfits</Link>
        </button>
        <button className="btn btn-outline">
          <Link to="/products?">Category 5</Link>
        </button>
        <button className="btn btn-outline">
          <Link to="/products?">Category 6</Link>
        </button>
        <button className="btn btn-outline">
          <Link to="/products?">Category 7</Link>
        </button>
      </div>
    </>
  );
}

export default PreferredCategories;
