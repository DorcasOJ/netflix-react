import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Movie from "./Movie";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { MoveLeft, MoveRight } from "./ArrowMove";

const Row = ({ title, fetchURL }) => {
  const [movies, setMovies] = useState([]);
  const sliderRef = useRef();

  useEffect(() => {
    axios.get(fetchURL).then((response) => {
      setMovies(response.data.results);
    });
  }, [fetchURL]);

  // if (title === "Originals") {
  //   console.log("Originals", movies);
  // }

  // if (title === "Popular") {
  //   console.log(movies);
  // }

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
              item.backdrop_path !== null && <Movie key={id} item={item} />
          )}
        </div>
        <MoveRight sliderRef={sliderRef} />
      </div>
    </>
  );
};

export default Row;
