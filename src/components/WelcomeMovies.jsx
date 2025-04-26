import React from "react";

const WelcomeMovies = ({ item, id, hero, pauseAnimation }) => {
  return (
    <div
      className={`inline-block cursor-pointer relative ${
        !hero
          ? "w-[170px] sm:w-[200px] md:w-[230px] lg:w-[260px] h-[350px] p-5"
          : "w-[160px] h-[255px] animate-movies p-1"
      }`}
      style={{ animationPlayState: pauseAnimation ? "paused" : "running" }}
    >
      {!hero && (
        <span className="absolute fascinate-font text-7xl  text-red-100 left-[-5px] ">
          {id + 1}
        </span>
      )}

      <img
        src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`}
        alt={item?.title}
        className="w-full block object-cover h-full rounded-4xl "
      />
      {!hero && (
        <div className="absolute top-0 left-0 w-full h-full hover:bg-black/30 opacity-0 hover:opacity-100 text-white rounded-4xl">
          <p className="whitespace-normal text-xs md:text-lg font-bold flex justify-center items-center h-full text-center">
            {item?.title}
          </p>
        </div>
      )}
    </div>
  );
};

export default WelcomeMovies;
