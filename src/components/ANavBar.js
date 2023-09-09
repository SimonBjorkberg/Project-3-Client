import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import ChatDrawer from "../components/chatComponents/ChatDrawer";
import "../index.css";
import SearchBar from "./SearchBar";
import productService from "../services/product.service";
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

const ANavBar = () => {
  const { loggedInUser, logOutUser, isLoggedIn, userInfo } =
    useContext(AuthContext);
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [titleSearch, setTitleSearch] = useState([]);
  const [cartArray, setCartArray] = useState();

  useEffect(() => {
    const cart = localStorage.getItem("Cart")
    // setCartArray(JSON.parse(cart));
   
  }, [cartArray])

 

const clearCart = () => {
  localStorage.removeItem("Cart");
}
  

  useEffect(() => {
    productService.getAll().then((response) => {
      setSearchData(response.data);
    });
  }, []);

  const setFocus = () => {
    setIsFocused(true);
  };
  const deFocus = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    const handleSearch = () => {
      if (searchValue === "") {
        return setTitleSearch([]);
      }
      const filteredTitles = searchData.filter((product) => {
        return product.title.toLowerCase().includes(searchValue.toLowerCase());
      });
      setTitleSearch(filteredTitles);
    };
    handleSearch();
  }, [searchValue, searchData]);

  return (
    <nav className="h-20 bg-neutral flex w-full pl-5 md:pl-0">
      <div className="h-full w-1/5 md:w-40 flex md:justify-center justify-between items-center">
        <Link to="/">
          <p className="text-2xl text-white">Home</p>
        </Link>
      </div>
      <SearchBar
        setFocus={setFocus}
        titleSearch={titleSearch}
        deFocus={deFocus}
        isFocused={isFocused}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      {isFocused && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-80 z-40"
          onClick={deFocus}
        ></div>
      )}
      {loggedInUser && (
        <div className="md:w-[350px] h-full flex items-center justify-center ml-auto">
          <div className="md:flex hidden">
          <div className="w-10 ml-auto mr-6 md:flex sm:hidden">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
              <span className="py-2 px-4 rounded-sm ml-2 hover:opacity-80 mt-3 ">
                  <FontAwesomeIcon  icon={faCartShopping} size="2xl" style={{color: "#ffffff",}} />
                </span>
              </label>
              <div
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-1 z-[1] p-2 shadow bg-white w-60 right-0 rounded-md"
              >
               <h4 className="text-neutral text-xl py-2 px-4 rounded-md mb-1 bg-neutral-300">Shopping Cart</h4>
                {cartArray?.map(product => <p className="text-neutral text-xl py-2 px-4 rounded-md mb-1 bg-neutral-300">{product.title}</p>)}
                
                <button onClick={clearCart} className="bg-red-400 text-white py-2 px-4 rounded-md text-xl hover:bg-red-500">
                    Add to Cart
                  </button>
              </div>
            </div>
          </div>
            <Link to="/sell" className="my-auto">
              <p className="bg-white py-2 px-4 rounded-sm ml-2 hover:opacity-80 ">
                Sell
              </p>
            </Link>
            <Link to="/chat" className="2xl:hidden my-auto">
              <p className="bg-teal-600 text-white py-2 px-4 rounded-sm ml-2 hover:opacity-80">
                Chats
              </p>
            </Link>
            <Link onClick={logOutUser} className="my-auto">
              <p className="bg-red-400 text-white py-2 px-4 rounded-sm ml-2 hover:bg-red-500">
                Logout
              </p>
            </Link>
            <Link
              to={`/profile/${userInfo?._id}`}
              className="ml-8 mt-1 my-auto"
            >
              <div className="avatar hover:opacity-50">
                <div className="h-[60px] rounded-xl border border-neutral-400 bg-white">
                  <img src={userInfo?.image} alt="profile-pic" />
                </div>
              </div>
            </Link>
          </div>
          <div className="md:w-10 w-1/5 ml-auto mr-10 md:hidden flex">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <svg
                  className="w-10 h-10 hover:cursor-pointer"
                  fill="none"
                  stroke="white"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
              <div
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-1 z-[1] p-2 shadow bg-base-100 w-60 right-0 rounded-md"
              >
                <Link to={`/profile/${userInfo?._id}`}>
                  <p className="text-xl text-white py-2 mb-1 px-4 rounded-md bg-neutral hover:opacity-80">
                    Profile 
                  </p>
                </Link>
      
                <Link to="/sell">
                  <p className="bg-neutral-300 text-neutral py-2 mb-1 px-4 rounded-md text-xl hover:opacity-80">
                    Sell
                  </p>
                </Link>
                <Link to="/chat" className="2xl:hidden">
                  <p className="bg-neutral-300 text-neutral py-2 px-4 rounded-md mb-1 text-xl hover:opacity-80">
                    Contacts
                  </p>
                </Link>
                <span className="bg-neutral-300 text-neutral py-2 mb-1 px-4 rounded-md text-xl hover:opacity-80">
                  <FontAwesomeIcon size="xl" icon={faCartShopping} />
                </span>
                <Link onClick={logOutUser} className="mt-12">
                  <p className="bg-red-400 text-white py-2 px-4 rounded-md text-xl hover:bg-red-500">
                    Logout
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {!loggedInUser && (
        <div className="md:w-[350px] h-full flex items-center justify-center ml-auto">
           <div className="w-10 ml-auto mr-8 md:flex sm:hidden">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
              <span className="py-2 px-4 rounded-sm ml-2 hover:opacity-80 ">
                  <FontAwesomeIcon  icon={faCartShopping} size="2xl" style={{color: "#ffffff",}} />
                </span>
              </label>
              <div
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-1 z-[1] p-2 shadow bg-white w-60 right-0 rounded-md"
              >
                <h4 className="text-neutral text-xl py-2 px-4 rounded-md mb-1 bg-neutral-300">Shopping Cart</h4>
                {cartArray?.map(product => <p className="text-neutral text-xl py-2 px-4 rounded-md mb-1 bg-neutral-300">{product.title}</p>)}
                
                <button onClick={clearCart} className="bg-red-400 text-white py-2 px-4 rounded-md text-xl hover:bg-red-500">
                    Add to Cart
                  </button>
              </div>
            </div>
          </div>
      
          <div className="md:flex hidden">
            <Link
              to="/login"
              className="bg-white py-2 px-4 rounded-sm mr-2 hover:opacity-80"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-white py-2 px-4 rounded-sm ml-2 hover:opacity-80"
            >
              Signup
            </Link>
          </div>
          <div className="w-10 ml-auto mr-8 md:hidden flex">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <svg
                  className="w-10 h-10 hover:cursor-pointer"
                  fill="none"
                  stroke="white"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
              <div
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-1 z-[1] p-2 shadow bg-white w-60 right-0 rounded-md"
              >
                <Link
                  to="/login"
                  className="text-neutral text-xl py-2 px-4 rounded-md mb-1 bg-neutral-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-neutral text-xl py-2 px-4 rounded-md mb-1 bg-neutral-300"
                >
                  Signup
                </Link>
                <span className="text-neutral text-xl py-2 px-4 rounded-md bg-neutral-300">
                  <FontAwesomeIcon size="xl" icon={faCartShopping} />
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {isLoggedIn && <ChatDrawer />}
    </nav>
  );
};

export default ANavBar;
