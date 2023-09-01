import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import ChatDrawer from "../components/chatComponents/ChatDrawer";

const ANavBar = (props) => {
  const { user, logOutUser, isLoggedIn } = useContext(AuthContext);

  return (
    <nav className="h-24 bg-neutral flex w-full">
      <div className="h-full w-40 flex justify-center items-center">
        <Link to="/">
          <p className="text-2xl text-white">Home</p>
        </Link>
      </div>

      {user && (
        <div className="w-[350px] h-full flex items-center justify-center ml-auto">
          <div className="md:flex hidden">
            <Link to={`/profile/${user._id}`} className="h-[40px]">
              <div className="avatar hover:opacity-50">
                <div className="h-[40px] rounded-xl">
                  <img src={user.image} alt="profile-pic" />
                </div>
              </div>
            </Link>
            <Link to="/sell">
              <p className="bg-white py-2 px-4 rounded-sm ml-2 hover:opacity-80">
                Sell
              </p>
            </Link>
            <Link className="2xl:hidden">
              <p className="bg-teal-600 text-white py-2 px-4 rounded-sm ml-2 hover:opacity-80">
                Chats
              </p>
            </Link>
            <Link onClick={logOutUser}>
              <p className="bg-red-400 text-white py-2 px-4 rounded-sm ml-2 hover:bg-red-500">
                Logout
              </p>
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
                className="menu menu-sm dropdown-content mt-1 z-[1] p-2 shadow bg-base-100 w-60 right-0 rounded-md"
              >
                <Link to={`/profile/${user._id}`}>
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
                    Chats
                  </p>
                </Link>
                <Link onClick={logOutUser}>
                  <p className="bg-red-400 text-white py-2 px-4 rounded-md text-xl hover:bg-red-500">
                    Logout
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {!user && (
        <div className="w-[350px] h-full flex items-center justify-center ml-auto">
          <div className="md:flex hidden">
            <Link to="/login" className="bg-white py-2 px-4 rounded-sm mr-2 hover:opacity-80">
              Login
            </Link>
            <Link to="/signup" className="bg-white py-2 px-4 rounded-sm ml-2 hover:opacity-80">
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
                <Link to="/login" className="text-neutral text-xl py-2 px-4 rounded-md mb-1 bg-neutral-300">
              Login
            </Link>
            <Link to="/signup" className="text-neutral text-xl py-2 px-4 rounded-md bg-neutral-300">
              Signup
            </Link>
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
