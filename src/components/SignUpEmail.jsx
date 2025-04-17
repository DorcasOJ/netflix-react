import React from "react";
import { MdChevronRight } from "react-icons/md";

const SignUpEmail = () => {
  return (
    <>
      <p className="text-sm tracking-wide  mb-2">
        Ready to watch? Enter your email to create or restart your membership
      </p>
      <form className="flex flex-col sm:flex-row items-center justify-center w-full max-w-[650px] sm:gap-2">
        <input
          type="email"
          placeholder="Email address"
          className="bg-[#2c2c2c]/80 border border-gray-400  px-3 py-[9px] my-2 rounded-2xl sm:flex-2 w-full "
        />
        <button className="bg-red-800 px-3 py-[6px] rounded-2xl font-bold  text-lg sm:flex-1 cursor-pointer flex items-center justify-center gap-2 hover:bg-white hover:border-red-600 hover:text-red-600 hover:gap-5 w-full ">
          Get Started
          <MdChevronRight className="font-normal text-2xl" />
        </button>
      </form>
    </>
  );
};

export default SignUpEmail;
