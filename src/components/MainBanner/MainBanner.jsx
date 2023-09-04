import { Link } from "react-router-dom";
import "./MainBanner.css";

function MainBanner() {
  return (
    <div className="block">
      <div className="lg:h-[55vh] md:h-[40vh] overflow-hidden">
        <img
          src="https://static.vinted.com/assets/seller-promotion/gender_test/a/banner-wide-7403f719caac875cfeea61593da7fc7e7320c126193b4ff654e4397f54d430ae.jpg"
          className="w-full"
          alt=""
        ></img>
      </div>
      <div className="card bg-base-100 shadow-md rounded-none lg:hidden ">
        <div className="card-body">
          <h2 className="card-title">Want to make money?</h2>
          <p>
            If you have baby clothes not used anymore discover how to make money
          </p>
          <div className="card-actions justify-end">
            <Link to="/products" className="w-full">
              <button className="btn btn-primary">Our products</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-md absolute rounded-md top-56 left-40 w-96 hidden lg:flex">
        <div className="card-body ">
          <h2 className="card-title">Want to make money?</h2>
          <p>
            If you have baby clothes not used anymore discover how to make moneysds
          </p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">
              <Link to="/products">Our products</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainBanner;

// https://static.vinted.com/assets/seller-promotion/gender_test/a/banner-wide-7403f719caac875cfeea61593da7fc7e7320c126193b4ff654e4397f54d430ae.jpg
