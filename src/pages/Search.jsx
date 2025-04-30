import React, { useEffect, useLayoutEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import requests, { imageURL } from "../Request";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [searchResponse, setSearchResponse] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const submitForm = (e) => {
    e.preventDefault;
    if (searchValue.trim() === "") {
      setError("This field cannot be empty!");
    } else {
      setError("");
      setLoading(true);
      Submit();
      setLoading(false);
    }
  };

  const Submit = () => {
    const query = requests.search + searchValue.replace(" ", "+");

    axios
      .get(query)
      .then((resp) => {
        console.log(resp.data.results);
        setSearchResponse(resp.data.results);
      })
      .catch((err) => {
        console.error(err);
        setSearchResponse(["an error occurred"]);
      });
  };
  // console.log(searchResponse);

  return (
    <div className="pt-24">
      <form
        className="flex items-center justify-center max-w-[650px] sm:gap-2
        border border-gray-400 rounded-2xl w-[90%] mx-auto ps-3
        "
        action={submitForm}
      >
        {error && <span className="text-xs text-red-600 ">{error}</span>}

        <input
          type="text"
          name="searchMovie"
          id="searchMovie"
          placeholder="search movies"
          className="bg-[#2c2c2c]/10  px-2 py-[8px] flex-2 w-full rounded-s-lg focus:border-none focus:outline-none text-white"
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
        />
        <button
          type="submit"
          className={`bg-red-800/70 rounded-e-2xl font-bold  text-lg flex-1 flex items-center justify-center gap-2 text-[#ccc] ${
            loading
              ? "cursor-not-allowed py-3"
              : "cursor-pointer hover:bg-white hover:border-red-600 hover:text-red-600 py-2"
          }`}
          disabled={loading}
        >
          {!loading ? (
            <>
              <IoSearchOutline className="text-2xl font-bold" />
              Search
            </>
          ) : (
            <AiOutlineLoading3Quarters className="animate-spin" />
          )}
        </button>
      </form>

      <div className="min-h-[40vh] grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-8 md:p-12 ">
        {searchResponse.length > 0 &&
          searchResponse[0] !== "an error occurred" &&
          searchResponse.map(
            (resp) =>
              resp.backdrop_path && (
                <div className="max-w-sm show mb-4 relative cursor-pointer">
                  <img
                    src={imageURL.url + resp.backdrop_path}
                    alt={resp.title}
                    className="cursor-pointer"
                  />
                  <div
                    className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white"
                    onClick={() => {
                      navigate(
                        `/play/${resp.id}/C${resp.backdrop_path.slice(1)}`
                      );
                      window.location.reload(true);
                    }}
                  >
                    <p className="whitespace-normal text-sm md:text-base font-bold flex justify-center items-center h-full text-center py-2">
                      {resp?.title}
                    </p>
                  </div>
                </div>
              )
          )}

        {searchResponse[0] === "An error occurred" && (
          <div className="text-white border-2 ">
            An error occurred, Try again after some time
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
