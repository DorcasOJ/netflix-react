import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserAuth } from "../context/AuthContent";
import PasswordInput from "../components/PasswordInput";
import { RegContext } from "../context/RegContext";

const Signup = () => {
  const [emailForm, setEmailForm] = useState("");
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [errorSignup, setErrorSignup] = useState("");
  const [fullName, setFullName] = useState("");
  const { user, signUp, error } = UserAuth();
  const { setEmail } = useContext(RegContext);
  const params = useParams();
  const navigate = useNavigate();

  // console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    setErrorSignup("");
    try {
      await signUp(emailForm, password, fullName);

      setEmail(emailForm);
    } catch (error) {
      // console.log(error);
      if (String(error).includes("email-already-in-use")) {
        setErrorSignup("Email already in use, signIn instead");
      } else {
        setErrorSignup(error.message);
      }
      setButtonDisabled(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      navigate("/registration");
    }

    if (error) {
      setErrorSignup(`${error.code}`);
      setButtonDisabled(false);
    }
  }, [user, error]);

  return (
    <>
      <div className="w-full h-screen">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="/"
          className="hidden sm:block absolute w-full h-full object-cover"
        />

        <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>

        <div className="fixed w-full px-4 py-24 z-50">
          <div className="max-w[450px] h-[600px] mx-auto bg-black/75 text-white">
            <div className="max-w-[320px] mx-auto py-16">
              <h1 className="text-3xl font-bold"> Sign up</h1>
              {errorSignup && (
                <p className="p-3 bg-red-400 my-2 text-center">{errorSignup}</p>
              )}
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col py-4"
              >
                <input
                  type="text"
                  placeholder="Full Name"
                  autoComplete="full name"
                  className="border border-gray-300 rounded text-sm w-full mb-4 px-3 py-2 bg-transparent  focus:outline-none"
                  onChange={(e) => setFullName(e.target.value)}
                />

                <input
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  className="border border-gray-300 rounded text-sm w-full mb-4 px-3 py-2 bg-transparent = focus:outline-none"
                  onChange={(e) => setEmailForm(e.target.value)}
                  value={params?.email}
                />

                <PasswordInput
                  setPassword={setPassword}
                  placeholder="Password"
                />

                {/* <input
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  className="p-3 my-2 bg-gray-700 rounded"
                  onChange={(e) => setPassword(e.target.value)}
                /> */}

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
                  className={` py-3  rounded font-bold  ${
                    buttonDisabled
                      ? "bg-red-950 my-2 cursor-not-allowed"
                      : "bg-red-600 my-6 cursor-pointer"
                  }`}
                >
                  Sign Up
                </button>

                <div className="flex justify-between items-center text-sm text-gray-600">
                  <p>
                    <input type="checkbox" className="mr-2" />
                    Remember me
                  </p>
                  <p>Need Help?</p>
                </div>
                <p className="py-8">
                  <span className="text-gray-600 pr-3">
                    Already subscribed to Netflix?
                  </span>
                  <Link to="/login">Sign In</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
