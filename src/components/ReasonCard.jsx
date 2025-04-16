import React from "react";

const ReasonCard = () => {
  fetchText("../utils/ReasonToJoin.txt");
  return (
    <div className="bg-[#2c2c2c] sm:flex-1 rounded-3xl text-center shadow-2xl shadow-[#1e1e1e] p-5 relative w-[48%] h-[180px] sm:w-[100%] ">
      <p className=" text-base md:text-lg text-left w-full pe-2 text-red-100">
        Cancel or switch plans anytime
      </p>
      <p className="text-xs md:text-[14px] text-left pt-3 pe-3 pb-4 text-red-100">
        You're in control — cancel or switch your plan whenever it works for you
      </p>
      <img
        src="/public/handshake-svg.svg"
        alt=""
        className="w-10 absolute right-5 bottom-5"
      />
    </div>
  );
};

export default ReasonCard;

const fetchText = async ({ url }) => {
  const text = await (await fetch(url)).text();
  return text;
};
