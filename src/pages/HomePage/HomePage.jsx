import "./HomePage.css";
import LastProducts from "../../components/LastProducts/LastProducts";
import MainBanner from "../../components/MainBanner/MainBanner";
import PreferredCategories from "../../components/PreferredCategories/PreferredCategories";
import Footer from "../../components/Footer/Footer";

// components: nav bar / search bar/ main banner / module CTA / module last added products / filters / footer

function HomePage() {
  return (
    <>
      <MainBanner />
      <LastProducts />
      <PreferredCategories />
      <Footer />
    </>
  );
}

export default HomePage;
