import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const subMenuProducts = () => {
    return (
      <li>
        <Link to="#" className="text-white hover:text-gray-300">
          products
        </Link>
      </li>
    );
  };
  const subMenuLogAndSign = () => {
    return (
      <>
        <li>
          <Link to="/login" className="text-white hover:text-gray-300">
            login
          </Link>
        </li>
        <li>
          <Link to="/signup" className="text-white hover:text-gray-300">
            signup
          </Link>
        </li>
      </>
    );
  };

  const subMenuLogOut = () => {
    return (
      <li>
        <Link to="#" className="text-white hover:text-gray-300">
          logout
        </Link>
      </li>
    );
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <div className="text-white font-semibold text-lg">
          <Link to="/">Logo</Link>
        </div>
        <ul className="hidden md:flex space-x-4 md:space-x-8">
          {subMenuProducts()}
          {!isLoggedIn ? subMenuLogAndSign() : subMenuLogOut()}
        </ul>
        <div className="flex flex-col items-center space-x-4 md:hidden">
          <button
            id="menu-toggle"
            className="text-white flex justify-end button-center"
            onClick={toggleMenu}
          >
            {menuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
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
            )}
          </button>
          <ul
            className={`${
              menuOpen
                ? "h-auto opacity-100 flex flex-col items-end"
                : "h-0 opacity-0"
            } md:flex md:space-x-8 menu-open ease-in duration-300`}
          >
            {subMenuProducts()}
            {!isLoggedIn ? subMenuLogAndSign() : subMenuLogOut()}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
