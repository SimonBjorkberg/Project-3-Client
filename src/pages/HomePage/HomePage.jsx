import "./HomePage.css";
import LastProducts from "../../components/LastProducts/LastProducts";
import MainBanner from "../../components/MainBanner/MainBanner";
import PreferredCategories from "../../components/PreferredCategories/PreferredCategories";
import Footer from "../../components/Footer/Footer";
import ChatArray from "../../components/chatComponents/ChatArray";

// components: nav bar / search bar/ main banner / module CTA / module last added products / filters / footer

function HomePage() {

  return (
    <div>
      <MainBanner />
      <PreferredCategories/>
      <LastProducts />
      <Footer />
      <ChatArray />
    </div>
  );
}

export default HomePage;
