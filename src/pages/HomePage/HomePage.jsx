import "./HomePage.css";
import LastProducts from "../../components/LastProducts/LastProducts";
import MainBanner from "../../components/MainBanner/MainBanner";
import Categories from "../../components/Categories/Categories";

// components: nav bar / search bar/ main banner / module CTA / module last added products / filters / footer

function HomePage() {

  return (
    <div>
      <MainBanner />
      <Categories/>
      <LastProducts />
    </div>
  );
}

export default HomePage;
