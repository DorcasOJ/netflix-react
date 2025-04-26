import React, { useContext, useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContent";
import { RegContext } from "../context/RegContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";

const Account = () => {
  const { user, logOut } = UserAuth();
  const [accountDetails, setAccountDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setAccountDetails({
        ["fullName"]: doc.data()?.fullName,
        ["cardDetails"]: doc.data()?.cardDetails[0],
      });
    });
  }, [user]);

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  //   console.log(accountDetails, user?.email);
  //   console.log(Object.keys(accountDetails).length);

  //   const { cardDetails } = useContext(RegContext);

  return (
    <div className="w-full h-screen">
      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
        alt="/"
        className="hidden sm:block absolute w-full h-full object-cover"
      />
      <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
      <div className="fixed w-full px-4 py-24 z-50">
        <div className="max-w-[900px] h-[600px] mx-auto bg-black/75 text-white">
          <div className="max-w-[800px] mx-auto py-16 px-2 overflow-auto">
            <h1 className="text-3xl font-bold pb-2">Account</h1>

            <div className="text-sm">
              <div
                className={` flex flex-wrap justify-between ${
                  Object.keys(accountDetails).length > 0 &&
                  "py-1 border-b border-t border-neutral-500"
                }`}
              >
                <p className="py-1 ">
                  Full Name:
                  <span className="ms-3">
                    {accountDetails.fullName && accountDetails.fullName}
                  </span>
                </p>
                <p className="pt-1 pb-2 ">
                  Email: <span className="ms-3">{user?.email}</span>
                </p>
              </div>

              <div
                className={` flex flex-col justify-between ${
                  accountDetails.cardDetails !== undefined &&
                  "py-1 border-b border-neutral-500"
                }`}
              >
                {accountDetails.cardDetails !== undefined &&
                  Object.entries(accountDetails?.cardDetails).map(
                    ([key, value], index) =>
                      key !== "cvv" &&
                      key !== "plan" && (
                        <p className="py-1 " key={index}>
                          <span>
                            {key.charAt(0).toUpperCase() +
                              key.slice(1).toLowerCase()}{" "}
                            :
                          </span>
                          <span className="ms-3">
                            {key === "card number"
                              ? value.replace(/(\d)(?=(?:\D*\d){0,4}$)/g, "*")
                              : value}
                          </span>
                        </p>
                      )
                  )}
              </div>

              <div
                className={` flex flex-wrap justify-between ${
                  accountDetails?.cardDetails?.plan &&
                  "py-1 border-b border-neutral-500"
                }`}
              >
                {accountDetails?.cardDetails?.plan !== undefined &&
                  Object.entries(accountDetails?.cardDetails?.plan).map(
                    ([key, value], index) => (
                      <p className="py-1 w-[48%] " key={index}>
                        <span>
                          {key.charAt(0).toUpperCase() +
                            key.slice(1).toLowerCase()}{" "}
                          :
                        </span>
                        <span className="ms-3">{value}</span>
                      </p>
                    )
                  )}
              </div>

              <div className="flex justify-between py-4">
                <button
                  className="bg-red-600  text-[10px] sm:text-base px-2 sm:px-4 py-1 sm:py-2 rounded cursor-pointer text-white"
                  onClick={handleLogOut}
                >
                  {" "}
                  LogOut
                </button>

                <Link to="/favShows" className="w-auto">
                  <button className="bg-red-600 text-[10px] sm:text-base px-5 sm:px-4 py-1 sm:py-2 rounded cursor-pointer text-white">
                    {" "}
                    Go to Favorites
                  </button>
                </Link>

                <Link to="/" className=" w-auto">
                  <button className="bg-red-600 text-[10px] sm:text-base px-5 sm:px-4 py-1 sm:py-2 rounded cursor-pointer text-white">
                    {" "}
                    Back To Home
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
