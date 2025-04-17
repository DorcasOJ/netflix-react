import React from "react";

const ReasonCard = ({ reason }) => {
  return (
    <div className="bg-[#2c2c2c] sm:flex-1 rounded-3xl text-center shadow-2xl shadow-[#1e1e1e] p-5 relative w-[100%] h-[180px] sm:w-[100%] md:h-[200px]">
      <p className=" text-base md:text-lg text-left w-full pe-2 text-red-100">
        {reason.heading}
      </p>
      <p className="text-xs md:text-[14px] text-left pt-3 pe-3 pb-4 text-red-100">
        {reason.summary}
      </p>
      <img
        // src="/public/handshake-svg.svg"
        src={`/public/${reason.icon}`}
        alt=""
        className="w-10 absolute right-5 bottom-5 "
      />
    </div>
  );
};

export default ReasonCard;
