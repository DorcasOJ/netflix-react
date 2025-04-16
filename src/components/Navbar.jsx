import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContent";
import { useState } from "react";

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const [navBgTransparent, setNavBgTransparent] = useState(true);
  const navigate = useNavigate();
  // console.log(user?.email);
  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      setNavBgTransparent(false);
    } else {
      setNavBgTransparent(true);
    }
  });

  return (
    <div
      className={`flex items-center justify-between p-4 z-[100] w-full fixed ${
        navBgTransparent ? "bg-transparent" : "bg-black"
      }`}
    >
      <Link to="/">
        <h1 className="text-red-600 cursor-pointer h-[35px]">
          <img src="/public/logo.png" alt="NETFLIX" className="h-full" />
        </h1>
      </Link>
      {user?.email ? (
        <div>
          <Link to="/account">
            <button className="text-white pr-4 cursor-pointer">Account</button>
          </Link>

          <button
            onClick={handleLogOut}
            className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white"
          >
            {" "}
            LogOut
          </button>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button className="text-white pr-4 cursor-pointer">Sign In</button>
          </Link>
          <Link to="/signUp">
            <button className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white">
              {" "}
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
