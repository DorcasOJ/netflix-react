import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContent";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [error, setError] = useState("");
  const { user, logIn } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    setError("");
    try {
      await logIn(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
      if (String(error).includes("invalid-credential")) {
        setError("Invalid Email or Password");
      } else {
        setError(error.message);
      }
      setButtonDisabled(false);
      // setTimeout(() => setButtonDisabled(false), 3000);
    }
  };
  return (
    <div className="w-full h-screen">
      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
        alt="/"
        className="hidden sm:block absolute w-full h-full object-cover"
      />
      <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
      <div className="fixed w-full px-4 py-24 z-50">
        <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white">
          <div className="max-w-[320px] mx-auto py-16">
            <h1 className="text-3xl font-bold">Sign In</h1>
            {error && (
              <p className="p-3 bg-red-400 my-2 text-center">{error}</p>
            )}
            <form onSubmit={handleSubmit} className="w-full flex flex-col py-4">
              <input
                type="email"
                placeholder="Email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 my-2 bg-gray-700 rounded"
              />

              <input
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 my-2 bg-gray-700 rounded"
              />
              {buttonDisabled && (
                <div className="my-3 flex items-center justify-center h-[50px]">
                  <img
                    src="/public/netflix_spinner.gif"
                    alt="Processing"
                    className="h-full"
                  />
                </div>
              )}
              <button
                disabled={buttonDisabled}
                className={` py-3  rounded font-bold cursor-pointer ${
                  buttonDisabled ? "bg-red-950 my-2" : "bg-red-600 my-6"
                }`}
              >
                Sign In
              </button>
              <div className="flex justify-between items-center text-sm text-gray-600">
                <p>
                  <input type="checkbox" className="mr-2" />
                  Remember me
                </p>
                <p>Need Help?</p>
              </div>
              <p className="py-8">
                <span className="text-gray-600 mr-2">New to Netflix?</span>
                <Link to="/signup">Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
