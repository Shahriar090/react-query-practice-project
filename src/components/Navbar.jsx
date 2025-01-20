import { Link, useNavigate } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { useState } from "react";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  const handleLogOut = async () => {
    try {
      signOut(auth);
      console.log("Log Out Successful");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <nav className="w-full h-20 bg-cyan-500 px-8 py-2 flex items-center justify-between">
      <div className="logo w-[30%]">
        <h1 className="text-white text-2xl font-semibold">
          React Query Practice Project
        </h1>
      </div>

      <div className="search-bar w-[30%]">
        <input
          type="text"
          placeholder="Search Here..."
          className="px-4 py-3 rounded-md w-full h-12 text-black font-medium"
        />
      </div>

      <div className="nav-items w-[30%]">
        <ul className="flex items-center space-x-4 text-white text-xl justify-end">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Products</a>
          </li>
          {user ? (
            <li>
              <button
                onClick={handleLogOut}
                className="px-4 py-2 rounded-md text-sm bg-red-500 text-white"
              >
                LogOut
              </button>
            </li>
          ) : (
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
