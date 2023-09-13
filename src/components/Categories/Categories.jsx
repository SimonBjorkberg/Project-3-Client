import { Link } from "react-router-dom";
import "./Categories.css";
import { useContext } from "react";
import { SearchContext } from "../../context/search.context";

function Categories() {
  const { setFilter, filter } = useContext(SearchContext);

  const handleClick = (value) => {
    if (value === filter) {
      setFilter("");
    } else {
      setFilter(value);
    }
  };

  return (
    <div className="max-w-[676px] mx-auto mt-10">
      <div className="flex flex-row flex-wrap gap-x-1 gap-y-1 mb-8 justify-center">
        <button
          onClick={() => handleClick("rompers")}
          className={`${
            filter === "rompers"
              ? "bg-white border-neutral border text-neutral"
              : "text-white border border-white hover:bg-neutral-focus"
          } px-2.5 py-1.5 rounded-md font-light bg-neutral w-fit`}
        >
          <Link to="/products">Rompers</Link>
        </button>
        <button
          onClick={() => handleClick("sleepsuits")}
          className={`${
            filter === "sleepsuits"
              ? "bg-white border-neutral border text-neutral"
              : "text-white border border-white hover:bg-neutral-focus"
          } px-2.5 py-1.5 rounded-md font-light bg-neutral w-fit`}
        >
          <Link to="/products">Sleepsuits</Link>
        </button>
        <button
          onClick={() => handleClick("onesies")}
          className={`${
            filter === "onesies"
              ? "bg-white border-neutral border text-neutral"
              : "text-white border border-white hover:bg-neutral-focus"
          } px-2.5 py-1.5 rounded-md font-light bg-neutral w-fit`}
        >
          <Link to="/products">Onesies</Link>
        </button>
        <button
          onClick={() => handleClick("bodysuits")}
          className={`${
            filter === "bodysuits"
              ? "bg-white border-neutral border text-neutral"
              : "text-white border border-white hover:bg-neutral-focus"
          } px-2.5 py-1.5 rounded-md font-light bg-neutral w-fit`}
        >
          <Link to="/products">Bodysuits</Link>
        </button>
        <button
          onClick={() => handleClick("dresses")}
          className={`${
            filter === "dresses"
              ? "bg-white border-neutral border text-neutral"
              : "text-white border border-white hover:bg-neutral-focus"
          } px-2.5 py-1.5 rounded-md font-light bg-neutral w-fit`}
        >
          <Link to="/products">Dresses</Link>
        </button>
        <button
          onClick={() => handleClick("t-shirts")}
          className={`${
            filter === "t-shirts"
              ? "bg-white border-neutral border text-neutral"
              : "text-white border border-white hover:bg-neutral-focus"
          } px-2.5 py-1.5 rounded-md font-light bg-neutral w-fit`}
        >
          <Link to="/products">T-Shirts</Link>
        </button>
        <button
          onClick={() => handleClick("pantsNleggings")}
          className={`${
            filter === "pantsNleggings"
              ? "bg-white border-neutral border text-neutral"
              : "text-white border border-white hover:bg-neutral-focus"
          } px-2.5 py-1.5 rounded-md font-light bg-neutral w-fit`}
        >
          <Link to="/products">Pants & Leggings</Link>
        </button>
        <button
          onClick={() => handleClick("sweatersNcardigans")}
          className={`${
            filter === "sweatersNcardigans"
              ? "bg-white border-neutral border text-neutral"
              : "text-white border border-white hover:bg-neutral-focus"
          } px-2.5 py-1.5 rounded-md font-light bg-neutral w-fit`}
        >
          <Link to="/products">Sweaters & Cardigans</Link>
        </button>
        <button
          onClick={() => handleClick("bibs")}
          className={`${
            filter === "bibs"
              ? "bg-white border-neutral border text-neutral"
              : "text-white border border-white hover:bg-neutral-focus"
          } px-2.5 py-1.5 rounded-md font-light bg-neutral w-fit`}
        >
          <Link to="/products">Bibs</Link>
        </button>
        <button
          onClick={() => handleClick("outerwear")}
          className={`${
            filter === "outerwear"
              ? "bg-white border-neutral border text-neutral"
              : "text-white border border-white hover:bg-neutral-focus"
          } px-2.5 py-1.5 rounded-md font-light bg-neutral w-fit`}
        >
          <Link to="/products">Outerwear</Link>
        </button>
      </div>
    </div>
  );
}

export default Categories;
