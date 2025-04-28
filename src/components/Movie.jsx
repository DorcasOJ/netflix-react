import React, { useContext, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../context/AuthContent";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import { ItemContext } from "../context/ItemContext";
import { imageURL } from "../Request";

const Movie = ({ item }) => {
  const [like, setLike] = useState();
  const { user } = UserAuth();

  const { setItem, setShowPopUp, saveShow } = useContext(ItemContext);
  // const savedShow =

  onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
    const data = doc
      .data()
      ?.savedShows.filter((movie) => movie.id === item.id)[0];

    if (data) setLike(true);
  });
  return (
    <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
      <img
        src={`${imageURL.url}${item?.backdrop_path}`}
        // src={`${imageURL.bgURL}`}
        alt={item?.title}
        className="w-full h-auto block"
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
        <p
          className="whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center py-2"
          onClick={() => {
            setItem(item);
            setShowPopUp(true);
          }}
        >
          {item?.title ? item.title : item.name}
        </p>
        <p
          onClick={() => {
            saveShow(user, item);
            setLike(true);
          }}
        >
          {like ? (
            <FaHeart className="absolute top-4 left-4 text-gray-300" />
          ) : (
            <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
          )}
        </p>
      </div>
    </div>
  );
};

export default Movie;
