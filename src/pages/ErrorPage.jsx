import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  // set timer after few seconds Error
  const navigate = useNavigate();
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col items-center">
        <h1 className="text-white text-center text-9xl font-black mb-2">
          404 error
        </h1>
        <h1 className="text-white text-center text-5xl font-bold mb-10">
          Page not found
        </h1>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="flex justify-center items-center gap-1 w-11/12 ml-2 bg-red-700 text-white font-medium sm:font-bold text-xl px-16 md:text-xl  py-3 rounded shadow hover:shadow-lg hover:bg-red-900 outline-none focus:outline-none mr-3 mb-1 ease-linear transition-all duration-150"
        >
          <IoHomeOutline />
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
