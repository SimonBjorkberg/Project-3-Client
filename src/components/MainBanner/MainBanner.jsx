import { Link } from "react-router-dom";
import "./MainBanner.css";

function MainBanner() {
  return (
    <div className="block">
        <div>  
          <img src="https://static.vinted.com/assets/seller-promotion/gender_test/a/banner-wide-7403f719caac875cfeea61593da7fc7e7320c126193b4ff654e4397f54d430ae.jpg" className="  w-full xl:h-[42rem]"></img>
        </div>
        <div className="card bg-base-100 shadow-xl lg:hidden md:hidden ">
          <div className="card-body">
            <h2 className="card-title">Want to make money?</h2>
            <p>
              If you have baby clothes not used anymore discover how to make
              money
            </p>
            <div className="card-actions justify-end">
              <Link to="/products" className="w-full">
                <button className="btn btn-primary">Our products</button>
              </Link>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl  md:inline-flex absolute top-40 left-10 w-[14rem] sm:hidden lg:hidden">
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

        <div className="card bg-base-100 shadow-xl  lg:inline-flex absolute top-52 left-10 w-[24rem] sm:hidden md:hidden xl:hidden">
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

        <div className="card bg-base-100 shadow-xl  lg:hidden sm:hidden md:hidden xl:inline-flex absolute top-52 left-10 w-[32rem] ">
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
