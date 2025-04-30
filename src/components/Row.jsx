import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import Movie from "./Movie";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { MoveLeft, MoveRight } from "./ArrowMove";
import { ItemContext } from "../context/ItemContext";

const Row = ({ title, fetchURL }) => {
  const [movies, setMovies] = useState([]);
  // const [isMobile, setIsMobile] = useState([]);
  const sliderRef = useRef();
  const { setItem, setShowPopUp } = useContext(ItemContext);

  const MOBILE_BREAKPOINT = 1024;

  useEffect(() => {
    axios.get(fetchURL).then((response) => {
      setMovies(response.data.results);
    });
    // const checkIsMobile = () => {
    //   if (sliderRef.current) {
    //     const width = sliderRef.current.offsetWidth;
    //     setIsMobile(width < MOBILE_BREAKPOINT);
    //   }
    // };

    // checkIsMobile();

    // window.addEventListener("resize", checkIsMobile);

    // return () => {
    //   window.removeEventListener("resize", checkIsMobile);
    // };
  }, []);

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>

      <div className="relative flex items-center group">
        <MoveLeft sliderRef={sliderRef} />
        <div
          id={"slider"}
          ref={sliderRef}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth relative no-scrollbar"
        >
          {movies?.map(
            (item, id) =>
              item.backdrop_path !== null && (
                <Movie
                  key={id}
                  item={item}
                  onClick={() => {
                    setItem(item);
                    setShowPopUp(true);
                  }}
                />
              )
          )}
        </div>
        <MoveRight sliderRef={sliderRef} />
      </div>
    </>
  );
};

export default Row;
