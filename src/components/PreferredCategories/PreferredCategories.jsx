import { Link } from "react-router-dom";
import "./PreferredCategories.css";

function PreferredCategories() {
  return (
    <div className="max-w-[676px] mx-auto">
    <h1 className="my-3 text-xl font-semibold">
      Search through various categories
    </h1>
      <div className="flex flex-row flex-wrap gap-x-1 gap-y-1 mb-8 justify-center">
        <button className=" px-2.5 py-1.5 rounded-md font-light bg-neutral hover:bg-neutral-focus text-white w-fit">
          <Link to="/products?">Rompers</Link>
        </button>
        <button className=" px-2.5 py-1.5 rounded-md font-light bg-neutral hover:bg-neutral-focus text-white w-fit">
          <Link to="/products?">Sleepsuits</Link>
        </button>
        <button className=" px-2.5 py-1.5 rounded-md font-light bg-neutral hover:bg-neutral-focus text-white w-fit">
          <Link to="/products?">Onesies</Link>
        </button>
        <button className=" px-2.5 py-1.5 rounded-md font-light bg-neutral hover:bg-neutral-focus text-white w-fit">
          <Link to="/products?">Bodysuits</Link>
        </button>
        <button className=" px-2.5 py-1.5 rounded-md font-light bg-neutral hover:bg-neutral-focus text-white w-fit">
          <Link to="/products?">Dresses</Link>
        </button>
        <button className=" px-2.5 py-1.5 rounded-md font-light bg-neutral hover:bg-neutral-focus text-white w-fit">
          <Link to="/products?">T-Shirts</Link>
        </button>
        <button className=" px-2.5 py-1.5 rounded-md font-light bg-neutral hover:bg-neutral-focus text-white w-fit">
          <Link to="/products?">Pants & Leggings</Link>
        </button>
        <button className=" px-2.5 py-1.5 rounded-md font-light bg-neutral hover:bg-neutral-focus text-white w-fit">
          <Link to="/products?">Sweaters & Cardigans</Link>
        </button>
        <button className=" px-2.5 py-1.5 rounded-md font-light bg-neutral hover:bg-neutral-focus text-white w-fit">
          <Link to="/products?">Bibs</Link>
        </button>
        <button className=" px-2.5 py-1.5 rounded-md font-light bg-neutral hover:bg-neutral-focus text-white w-fit">
          <Link to="/products?">Outerwear</Link>
        </button>
      </div>
    </div>
  );
}

export default PreferredCategories;
