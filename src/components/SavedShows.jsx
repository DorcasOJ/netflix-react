import React, { useContext, useEffect, useRef, useState } from "react";
import { UserAuth } from "../context/AuthContent";
import { AiOutlineClose } from "react-icons/ai";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { MoveLeft, MoveRight } from "./ArrowMove";
import { ItemContext } from "../context/ItemContext";
import { useNavigate } from "react-router-dom";

const SavedShows = () => {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();
  const { deleteShow } = useContext(ItemContext);
  const sliderRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedShows);
    });
  }, [user?.email, movies]);

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">My Shows</h2>
      <div className="relative flex items-center group">
        <MoveLeft sliderRef={sliderRef} />
        <div
          id={"slider"}
          ref={sliderRef}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth relative no-scrollbar"
        >
          {movies?.map((item, id) => (
            <div
              key={item.id}
              className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative px-2 py-4"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                alt={item?.title}
                className="w-full h-auto block"
              />
              <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                <p
                  className="whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center text-center h-3/4 absolute bottom-0 w-full "
                  onClick={() => {
                    navigate(`/play/${item.id}/${item.img.slice(1)}`);
                    window.location.reload(true);
                  }}
                >
                  {item?.title}
                </p>
                <p
                  onClick={() => deleteShow(item.id, movies, user)}
                  className="absolute text-gray-300 top-4 right-4 hover:text-red-500"
                >
                  <AiOutlineClose />
                </p>
              </div>
            </div>
          ))}
        </div>
        <MoveRight sliderRef={sliderRef} />
      </div>
    </>
  );
};

export default SavedShows;
