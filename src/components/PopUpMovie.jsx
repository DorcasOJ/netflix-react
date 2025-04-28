import React, { useContext, useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContent";
import { Genre, imageURL } from "../Request";
import axios from "axios";
import { truncateString } from "../utils/helper";
import { LiaTimesCircleSolid } from "react-icons/lia";
import { CiCirclePlus } from "react-icons/ci";
import { FaRegTimesCircle } from "react-icons/fa";
import { FaCirclePlay } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { ratings } from "../utils/helper";
import { getGenres } from "../utils/helper";
import { ItemContext } from "../context/ItemContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

const PopUpMovie = ({ item, setItem }) => {
  const [genres, setGenres] = useState({});
  const [like, setLike] = useState();
  const { user } = UserAuth();
  const { saveShow } = useContext(ItemContext);

  useEffect(() => {
    axios.get(Genre.movieGenre).then((resp) => {
      resp.data.genres.map((genre) => {
        setGenres((prev) => ({ ...prev, [genre.id]: genre.name }));
      });

      onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
        const data = doc
          .data()
          ?.savedShows.filter((movie) => movie.id === item.id)[0];

        if (data) setLike(true);
      });
    });

    axios.get(Genre.tvGenre).then((resp) =>
      resp.data.genres.map((genre) => {
        setGenres((prev) => ({ ...prev, [genre.id]: genre.name }));
      })
    );
  }, [item]);

  const ratingStars = ratings(item.vote_average);

  return (
    <div className="fixed top-24 w-11/12 left-10 mx-auto h-[80%] bg-dark text-white z-20 bg-black/90 rounded-lg overflow-auto scroll-black">
      <LiaTimesCircleSolid
        className="text-4xl text- absolute right-2 top-1 cursor-pointer z-20 hover:bg-neutral-600 rounded-lg"
        onClick={() => setItem({})}
      />

      <div className="w-full h-1/3 relative bg-[#ccc] rounded-t-lg ">
        <img
          src={`${imageURL.lgUrl}${item?.backdrop_path}`}
          alt={item?.title ? item.title : item.name}
          className="w-full h-full rounded-t-lg object-cover"
          loading="lazy"
        />
        <Link to={`/play/${item.id}/${item.backdrop_path.slice(1)}`}>
          <button className="text-[#e2e2e2] absolute bottom-1 left-8 rounded bg-red-700 px-4 py-2 text-sm flex items-center justify-center gap-1 cursor-pointer z-30">
            <FaCirclePlay />
            PLAY
          </button>
        </Link>

        <div className="absolute bg-gradient-to-t from-black from-50% w-full h-12 z-10 top-[85%] "></div>
      </div>

      <div className=" p-3 rounded-xl bg-[#121212] w-[95%] h-[63%] mx-auto  mt-4 shadow relative">
        <p className="text-lg font-bold pt-1 pb-3 border-b border-b-gray-500 text-[#e2e2e2]">
          {item?.title ? item.title : item.name}
        </p>
        <p className="py-3 border-b border-b-gray-500 text-gray-400 text-sm">
          {truncateString(item?.overview, 260)}
        </p>

        {window.innerHeight > 500 && (
          <>
            <div className="py-3 border-b border-b-gray-500 text-gray-400 text-sm">
              <div className="pb-1 flex items-center gap-1 ">
                Rating:
                {
                  <span className="flex items-center">
                    <span className="text-red-600 text-base">
                      {ratingStars[0]}
                      {ratingStars[1]}
                    </span>
                    <span className="">{ratingStars[[2]]} </span>
                  </span>
                }
              </div>
              <div className="pb-1">
                Released on:{" "}
                <span className="ps-1 text-white">
                  {" "}
                  {item.release_date
                    ? item.release_date
                    : item.first_air_date}{" "}
                </span>
              </div>
              <div className="pb-1">
                Language:{" "}
                <span className="ps-1 text-white">
                  {item.original_language}{" "}
                </span>{" "}
              </div>
              <div className="pb-1">
                Genre:{" "}
                <span className="ps-1 text-white">
                  {getGenres(item.genre_ids, genres)}
                </span>{" "}
              </div>
            </div>

            <div className="flex items-center justify-between py-3">
              <button
                className={` p-2  text-sm flex items-center gap-1  ${
                  !like
                    ? "border  border-[#e2e2e2] rounded cursor-pointer"
                    : "cursor-not-allowed"
                }`}
                onClick={() => {
                  saveShow(user, item);
                  {
                    !like && setLike(true);
                  }
                }}
              >
                {!like && <CiCirclePlus className="text-lg" />}
                {!like ? "Add to Favorite" : "Added to Favorite"}
              </button>

              <button
                className="text-red-600 border-none text-sm flex items-center gap-1 cursor-pointer"
                onClick={() => setItem({})}
              >
                <FaRegTimesCircle className="test-3xl" />
                CLOSE
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PopUpMovie;
