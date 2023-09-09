import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import SellPage from "./pages/SellPage/SellPage";
import ProductDetailsPage from "./pages/ProductDetailsPage/ProductDetailsPage";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import ChatPage from "./pages/ChatPage";
import UserList from "./components/chatComponents/UserList";
import Footer from "./components/Footer/Footer";
import ANavBar from "./components/ANavBar";
import ProfilePageTest from "./pages/ProfilePageTest/ProfilePageTest";
import ShoppingCartPage from "./pages/ShoppingCartPage/ShoppingCartPage";
import StripeContainer from "./stripe/StripeContainer";
import ThankYou from "./pages/StripePages/ThankYou";
import CardDeclined from "./pages/StripePages/CardDeclined";

function App() {
  const location = useLocation();

  return (
    <div className="App" data-theme="light">
      {location.pathname.includes("/chat/") ? null : <ANavBar />}
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/products" element={<ProductsPage />} />

        <Route
          path="/product/single/:productId"
          element={<ProductDetailsPage />}
        />

        <Route path="/profile/:userId" element={<ProfilePageTest />} />

        <Route
          path="/chat"
          element={
            <IsPrivate>
              <UserList />
            </IsPrivate>
          }
        />
        <Route
          path="/chat/:chatId"
          element={
            <IsPrivate>
              <ChatPage />
            </IsPrivate>
          }
        />
        <Route
          path="/payment"
          element={
            <IsPrivate>
              <StripeContainer />
            </IsPrivate>
          }
        />
        <Route
          path="/stripe/thank-you"
          element={
            <IsPrivate>
              <ThankYou />
            </IsPrivate>
          }
        />
        <Route
          path="/stripe/card-declined"
          element={
            <IsPrivate>
              <CardDeclined />
            </IsPrivate>
          }
        />

        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
        <Route
          path="/sell"
          element={
            <IsPrivate>
              <SellPage />
            </IsPrivate>
          }
        />
        <Route
          path="/shopping-cart"
          element={
            <ShoppingCartPage />
          }
        />
      </Routes>
      {location.pathname.includes("/chat") ? null : <Footer />}
    </div>
  );
}

export default App;
