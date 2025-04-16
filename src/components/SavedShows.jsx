import React, { useEffect, useRef, useState } from "react";
import { UserAuth } from "../context/AuthContent";
import { AiOutlineClose } from "react-icons/ai";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const SavedShows = () => {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();
  const sliderRef = useRef();

  const slideLeft = (sliderRef) => {
    sliderRef.current.scrollLeft = sliderRef.current.scrollLeft - 500;
  };

  const slideRight = (sliderRef) => {
    sliderRef.current.scrollLeft = sliderRef.current.scrollLeft + 500;
  };
  const movieRef = doc(db, "users", `${user?.email}`);
  const deleteShow = async (id) => {
    try {
      const result = movies.filter((item) => item.id !== id);
      await updateDoc(movieRef, {
        savedShows: result,
      });
    } catch (err) {
      console.error(err);
    }
  };

  console.log(movies);
  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedShows);
    });
  }, [user?.email, movies]);

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">My Shows</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={() => slideLeft(sliderRef)}
          className="bg-white left-0 rounded-full opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
        <div
          id={"slider"}
          ref={sliderRef}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth relative no-scrollbar"
        >
          {movies?.map((item, id) => (
            <div
              key={item.id}
              className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                alt={item?.title}
                className="w-full h-auto block"
              />
              <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                <p className="whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
                  {item?.title}
                </p>
                <p
                  onClick={() => deleteShow(item.id)}
                  className="absolute text-gray-300 top-4 right-4 hover:text-red-500"
                >
                  <AiOutlineClose />
                </p>
              </div>
            </div>
          ))}
        </div>
        <MdChevronRight
          onClick={() => slideRight(sliderRef)}
          className="bg-white right-0 rounded-full opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
      </div>
    </>
  );
};

export default SavedShows;
