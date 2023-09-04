import { Link } from "react-router-dom";
import "./MainBanner.css";

function MainBanner() {
  return (
    <div className="block">
        <div>  
          <img src="https://static.vinted.com/assets/seller-promotion/gender_test/a/banner-wide-7403f719caac875cfeea61593da7fc7e7320c126193b4ff654e4397f54d430ae.jpg" className=" h-max-[32rem] w-full"></img>
        </div>
        <div className="card bg-base-100 shadow-xl  width-tablette align-items-center-tablette md:hidden ">
          <div className="card-body">
            <h2 className="card-title">Want to make money?</h2>
            <p>
              If you have baby clothes not used anymore discover how to make
              money
            </p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">
                <Link to="/products">Our products</Link>
              </button>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl  width-tablette align-items-center-tablette md:inline-flex absolute top-40 left-10 w-[14rem] sm:hidden">
          <div className="card-body ">
            <h2 className="card-title">Want to make money?</h2>
            <p>
              If you have baby clothes not used anymore discover how to make
              money
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