import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import SellPage from "./pages/SellPage/SellPage";
import ProductDetailsPage from "./pages/ProductDetailsPage/ProductDetailsPage";
import Navbar from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import ChatPage from "./pages/ChatPage";
import UserList from "./components/chatComponents/UserList";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App" data-theme="light">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/products" element={<ProductsPage />} />

        <Route
          path="/product/single/:productId"
          element={<ProductDetailsPage />}
        />

        <Route
          path="/profile/:userId"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />

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
        {window.location.pathname !== "/chat" && <Footer />}
      </Routes>
    </div>
  );
}

export default App;
