import "./HomePage.css";
import LastProducts from "../../components/LastProducts/LastProducts";
import MainBanner from "../../components/MainBanner/MainBanner";
import PreferredCategories from "../../components/PreferredCategories/PreferredCategories";

// components: nav bar / search bar/ main banner / module CTA / module last added products / filters / footer

function HomePage() {

  return (
    <div>
      <MainBanner />
      <PreferredCategories/>
      <LastProducts />
    </div>
  );
}

export default HomePage;
