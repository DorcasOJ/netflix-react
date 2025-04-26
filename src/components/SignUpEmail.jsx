import React, { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdChevronRight } from "react-icons/md";

const SignUpEmail = ({ email, setEmail, Submit }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const submitForm = (e) => {
    e.preventDefault;
    if (email.trim() === "") {
      setError("This field cannot be empty!");
    } else {
      setError("");
      setLoading(true);
      Submit();
    }
  };
  return (
    <>
      <p className="text-sm tracking-wide  mb-2">
        Ready to watch? Enter your email to create or restart your membership
      </p>
      <form
        className="flex flex-col sm:flex-row items-center justify-center w-full max-w-[650px] sm:gap-2"
        action={submitForm}
      >
        {error && <span className="text-xs text-red-600 ">{error}</span>}
        <input
          name="signupEmail"
          type="email"
          placeholder="Email address"
          className="bg-[#2c2c2c]/10 border border-gray-400  px-3 py-[9px] mb-2 rounded-2xl sm:flex-2 w-full "
          onChange={onChange}
        />
        <button
          className={`bg-red-800/70 rounded-2xl font-bold  text-lg sm:flex-1  flex items-center justify-center gap-2  w-full ${
            loading
              ? "cursor-not-allowed py-3"
              : "cursor-pointer hover:bg-white hover:border-red-600 hover:text-red-600 hover:gap-5 py-2"
          }`}
          disabled={loading}
        >
          {!loading ? (
            <>
              Get Started
              <MdChevronRight className="font-normal text-2xl" />
            </>
          ) : (
            <AiOutlineLoading3Quarters className="animate-spin" />
          )}
        </button>
      </form>
    </>
  );
};

export default SignUpEmail;
