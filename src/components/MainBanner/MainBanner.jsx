import { Link } from "react-router-dom";
import "./MainBanner.css";

function MainBanner() {
  return (
    <div className="flex flex-col align-center left-desktop">
      <div className="banner-container flex justify-center items-center relative absolute-desktop">
        <img
          src="https://static.vinted.com/assets/seller-promotion/gender_test/a/banner-wide-7403f719caac875cfeea61593da7fc7e7320c126193b4ff654e4397f54d430ae.jpg"
          alt="banner"
          className="banner-image"
        />
        <div class="hero-block__overlay"></div>
      </div>
      <div className="card bg-base-100 shadow-xl  width-tablette align-items-center-tablette top-desktop">
        <div className="card-body">
          <h2 className="card-title">Want to make money?</h2>
          <p>
            If you have baby clothes not used anymore discover how to make money
          </p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">
              <Link to="/products">Discover our products</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainBanner;
