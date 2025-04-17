import React from "react";
import FooterList from "../utils/FooterList";

const Footer = () => {
  return (
    <div>
      <div className="md:grid md:grid-cols-3 md:.grid-rows-5 flex flex-col gap-2 pt-6">
        {FooterList.map((list, index) => (
          <div
            key={index}
            className="text-gray-300 text-xs underline underline-offset-1 text-left cursor-pointer"
          >
            {list}
          </div>
        ))}
      </div>
      <p className="text-gray-300 text-xs  pt-8">Netflix Nigeria</p>
    </div>
  );
};

export default Footer;
