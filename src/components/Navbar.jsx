import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContent";
import { useContext, useState } from "react";
import { RegContext } from "../context/RegContext";
import { IoSearchOutline } from "react-icons/io5";
import { MdAccountCircle, MdOutlineFavorite } from "react-icons/md";
import { CiMenuFries } from "react-icons/ci";
import { IoIosHome } from "react-icons/io";

const Navbar = () => {
  const [navBgTransparent, setNavBgTransparent] = useState(true);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  const { registerPayment } = useContext(RegContext);

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/welcome");
    } catch (error) {
      console.log(error);
    }
  };

  // window.addEventListener("resize", () => {
  //   if (window.innerWidth < 640) {
  //     setMobileMenu(true);
  //   }
  // });

  window.addEventListener("scroll", () => {
    if (registerPayment !== null) {
      if (!registerPayment && window.scrollY > 50) {
        setNavBgTransparent(false);
      } else {
        setNavBgTransparent(true);
      }
    }
  });

  return (
    <div
      className={`z-[100] w-full fixed ${
        navBgTransparent ? "bg-transparent" : "bg-black/90"
      }`}
    >
      <div className="flex items-center justify-between p-4">
        <Link to="/home">
          <h1 className="text-red-600 cursor-pointer h-[35px] flex items-center">
            <img
              src="./logo.png"
              alt="NETFLIX"
              className="sm:h-full w-[50%] sm:w-full "
            />
          </h1>
        </Link>

        <div className="flex gap-1">
          <div className=" items-center hidden sm:flex">
            {user?.email ? (
              registerPayment ? (
                <div>
                  <button
                    onClick={handleLogOut}
                    className=" px-4 py-2 rounded cursor-pointer bg-red-600 text-white"
                  >
                    LogOut
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 md:gap-4 lg:gap-5">
                  <Link to="/search">
                    <IoSearchOutline className="text-base sm:text-2xl text-white font-bold" />
                  </Link>

                  <Link to="/favShows">
                    <button className="text-red-700 cursor-pointer rounded-full sm:bg-gradient-to-bl sm:to-gray-800 p-2 hover:to-yellow-300 hover:text-white ">
                      <MdOutlineFavorite className="text-3xl " />
                    </button>
                  </Link>

                  <Link to="/account">
                    <button className="text-white cursor-pointer rounded-full bg-gradient-to-bl to-gray-800 p-2 hover:to-yellow-300 ">
                      <img
                        src="./avater-blue.svg"
                        alt=""
                        className=" w-10  sm:w-8"
                      />
                    </button>
                  </Link>

                  <button
                    onClick={handleLogOut}
                    className="bg-red-600 text-[10px] sm:text-base px-2 sm:px-4 py-1 sm:py-2 rounded cursor-pointer text-white"
                  >
                    {" "}
                    LogOut
                  </button>
                </div>
              )
            ) : registerPayment ? (
              <Link to="/login">
                <button className=" px-4 py-2 rounded cursor-pointer text-black">
                  {" "}
                  LogIn
                </button>
              </Link>
            ) : (
              <div>
                <Link to="/login">
                  <button className="text-white pr-4 cursor-pointer">
                    Log In
                  </button>
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

          <button
            className="cursor-pointer sm:hidden "
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <CiMenuFries className="text-3xl text-white" />
          </button>
        </div>
      </div>

      {showMobileMenu && (
        <div className="relative h-screen w-full block sm:hidden ">
          <div className="w-full h-full fixed bg-gradient-to-b from-red-950 to-orange-600 ">
            <div className="w-[90%] mx-auto flex flex-col items-start justify-start py-10 text-2xl gap-3">
              <Link to="/home" className=" cursor-pointer">
                <button
                  className="flex text-[#ccc] items-center gap-2 cursor-pointer py-2 hover:text-orange-500"
                  onClick={() => {
                    setShowMobileMenu(false);
                  }}
                >
                  <IoIosHome className="text-xl font-bold" />
                  Home
                </button>
              </Link>

              <Link
                to="/search"
                className="flex text-[#ccc] items-center gap-1 cursor-pointer"
              >
                <button
                  className="flex text-[#ccc] items-center gap-2 cursor-pointer py-2 hover:text-orange-500"
                  onClick={() => {
                    setShowMobileMenu(false);
                  }}
                >
                  <IoSearchOutline className="text-xl font-bold" />
                  Search
                </button>
              </Link>

              <Link to="/favShows" className="cursor-pointer ">
                <button
                  className="flex text-[#ccc] items-center gap-2 py-2 cursor-pointer"
                  onClick={() => {
                    setShowMobileMenu(false);
                  }}
                >
                  <MdOutlineFavorite className="text-xl font-bold" />
                  Fav Shows
                </button>
              </Link>

              <Link to="/account" className="cursor-pointer">
                <button
                  className="flex text-[#ccc] items-center gap-2 cursor-pointer"
                  onClick={() => {
                    setShowMobileMenu(false);
                  }}
                >
                  <MdAccountCircle className="text-xl font-bold" />
                  Account
                </button>
              </Link>

              {user?.email ? (
                <button
                  onClick={() => {
                    handleLogOut();
                    setShowMobileMenu(false);
                  }}
                  className="bg-red-600 text-lg px-2 py-1 rounded cursor-pointer text-[#ccc] w-[20%] "
                >
                  {" "}
                  LogOut
                </button>
              ) : (
                <div className="flex items-center gap-5 pt-3">
                  <Link to="/login" className="w-[15vw]">
                    <button
                      className="bg-red-600 text-lg px-2 py-2 rounded cursor-pointer text-white w-full"
                      onClick={() => {
                        setShowMobileMenu(false);
                      }}
                    >
                      Log In
                    </button>
                  </Link>
                  <Link to="/signUp" className="w-[28vw]">
                    <button
                      className="bg-red-600 px-2 py-2 rounded cursor-pointer text-white text-lg flex"
                      onClick={() => {
                        setShowMobileMenu(false);
                      }}
                    >
                      {" "}
                      Sign Up
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
