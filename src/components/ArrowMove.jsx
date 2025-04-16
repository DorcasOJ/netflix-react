import React, { useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export const MoveLeft = ({ sliderRef }) => {
  const slideLeft = (sliderRef) => {
    if (window.innerWidth < 1024) {
      sliderRef.current.scrollLeft =
        sliderRef.current.scrollLeft - sliderRef.current.clientWidth / 1.2;
    } else {
      sliderRef.current.scrollLeft = sliderRef.current.scrollLeft - 500;
    }
  };

  return (
    <MdChevronLeft
      onClick={() => slideLeft(sliderRef)}
      className={`bg-white left-0 rounded-full opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block h-[55px] w-[25px]`}
      size={40}
    />
  );
};

export const MoveRight = ({ sliderRef }) => {
  const slideRight = (sliderRef) => {
    if (window.innerWidth < 1024) {
      sliderRef.current.scrollLeft =
        sliderRef.current.scrollLeft + sliderRef.current.clientWidth / 1.2;
    } else {
      sliderRef.current.scrollLeft = sliderRef.current.scrollLeft + 500;
    }
  };
  return (
    <MdChevronRight
      onClick={() => slideRight(sliderRef)}
      className={`bg-white right-0 rounded-2xl opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block h-[55px] w-[25px]`}
      size={40}
    />
  );
};
