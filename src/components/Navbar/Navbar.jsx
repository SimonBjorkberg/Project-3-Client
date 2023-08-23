import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="flex justify-between bg-teal-600 p-5">
      <div>
        <Link to="/">
          <button className="bg-white px-4 py-2">Home</button>
        </Link>
        <Link to="/products">
          <button className="bg-white px-4 py-2">Products</button>
        </Link>
      </div>

      <div>
        {isLoggedIn && (
          <div className="flex">
            <button
              className="mr-5 bg-red-900 text-white px-4 py-2"
              onClick={logOutUser}
            >
              Logout
            </button>

            <Link to="/profile">
              <img
                src="https://picsum.photos/id/402/200/300"
                style={{ width: 40, height: 40, borderRadius: 25 }}
                alt="profile"
              />
            </Link>
          </div>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/signup">
              {" "}
              <button className="bg-white px-4 py-2">Sign Up</button>{" "}
            </Link>
            <Link to="/login">
              {" "}
              <button className="bg-white px-4 py-2">Login</button>{" "}
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
