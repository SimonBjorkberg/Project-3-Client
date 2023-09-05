import { Link } from "react-router-dom";
import "./Categories.css";
import { useContext } from "react";
import { SearchContext } from "../../context/search.context";

function Categories() {

  const { filter, setFilter } = useContext(SearchContext)

  const handleClick = (value) => {
    setFilter(value)
  }

  return (
    <div className="max-w-[676px] mx-auto">
    <h1 className="my-3 text-xl font-semibold">
      Search through various categories
    </h1>
      <div className="flex flex-row flex-wrap gap-x-1 gap-y-1 mb-8 justify-center">
        <button onClick={() => handleClick("rompers")} className="px-2.5 py-1.5 rounded-md font-light bg-neutral hover:bg-neutral-focus text-white w-fit">
          <Link to="/products">Rompers</Link>
        </button>
        <button onClick={() => handleClick("sleepsuits")} className="px-2.5 py-1.5 rounded-md font-light bg-neutral hover:bg-neutral-focus text-white w-fit">
          <Link to="/products">Sleepsuits</Link>
        </button>
        <button onClick={() => handleClick("onesies")} className="px-2.5 py-1.5 rounded-md font-light bg-neutral hover:bg-neutral-focus text-white w-fit">
          <Link to="/products">Onesies</Link>
        </button>
        <button onClick={() => handleClick("bodysuits")} className="px-2.5 py-1.5 rounded-md font-light bg-neutral hover:bg-neutral-focus text-white w-fit">
          <Link to="/products">Bodysuits</Link>
        </button>
        <button onClick={() => handleClick("dresses")} className="px-2.5 py-1.5 rounded-md font-light bg-neutral hover:bg-neutral-focus text-white w-fit">
          <Link to="/products">Dresses</Link>
        </button>
        <button onClick={() => handleClick("t-shirts")} className="px-2.5 py-1.5 rounded-md font-light bg-neutral hover:bg-neutral-focus text-white w-fit">
          <Link to="/products">T-Shirts</Link>
        </button>
        <button onClick={() => handleClick("pantsNleggings")} className="px-2.5 py-1.5 rounded-md font-light bg-neutral hover:bg-neutral-focus text-white w-fit">
          <Link to="/products">Pants & Leggings</Link>
        </button>
        <button onClick={() => handleClick("sweatersNcardigans")} className="px-2.5 py-1.5 rounded-md font-light bg-neutral hover:bg-neutral-focus text-white w-fit">
          <Link to="/products">Sweaters & Cardigans</Link>
        </button>
        <button onClick={() => handleClick("bibs")} className="px-2.5 py-1.5 rounded-md font-light bg-neutral hover:bg-neutral-focus text-white w-fit">
          <Link to="/products">Bibs</Link>
        </button>
        <button onClick={() => handleClick("outerwear")} className="px-2.5 py-1.5 rounded-md font-light bg-neutral hover:bg-neutral-focus text-white w-fit">
          <Link to="/products">Outerwear</Link>
        </button>
      </div>
    </div>
  );
}

export default Categories;
