import React, { useContext, useEffect, useState } from "react";
import requests, { imageURL } from "../Request";
import axios from "axios";
import { CiPlay1 } from "react-icons/ci";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { truncateString } from "../utils/helper";
import { UserAuth } from "../context/AuthContent";
import { Link, useNavigate } from "react-router-dom";
import { ItemContext } from "../context/ItemContext";

const Main = () => {
  const [movie, setMovie] = useState([]);
  const { user } = UserAuth();
  const { saveShow } = useContext(ItemContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovie(
        response.data.results[
          Math.floor(Math.random() * response.data.results.length)
        ]
      );
    });
  }, []);

  // console.log(movie);

  return (
    <div className="w-full h-[550px] text-white relative">
      <div className="w-full h-full">
        <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
        <img
          src={`${imageURL.lgUrl}${movie?.backdrop_path}`}
          alt={movie?.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute w-full top-[20%] p-4 md:p-8">
        <h1 className="text-3xl md:text-5xl font-bold">{movie?.title}</h1>
        <div className="my-4 flex">
          <Link to={`/play/${movie?.id}${movie?.backdrop_path}`}>
            <button className="bg-red-600 py-2 px-5 flex items-center justify-center gap-1 font-bold text-white rounded cursor-pointer">
              <CiPlay1 className="text-white" />
              Play
            </button>
          </Link>

          <button
            className="border border-gray-300 text-white rounded py-2 px-5 ml-4 flex items-center justify-center gap-2 cursor-pointer hover:text-red-600 hover:bg-white "
            onClick={() => {
              saveShow(user, movie);
              navigate("/favShows");
            }}
          >
            {/* {like ? <FaHeart /> : <FaRegHeart />} */}
            Watch Later
          </button>
        </div>

        <p className="text-gray-400 text-sm">Released: {movie?.release_date}</p>
        <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
          {truncateString(movie?.overview, 150)}
        </p>
      </div>
    </div>
  );
};

export default Main;
