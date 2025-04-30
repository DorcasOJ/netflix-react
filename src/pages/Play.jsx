import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { ItemContext } from "../context/ItemContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { imageURL, PREFIX } from "../Request";
import { ratings, truncateString } from "../utils/helper";
import { MoveLeft, MoveRight } from "../components/ArrowMove";
import Movie from "../components/Movie";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import { UserAuth } from "../context/AuthContent";
import { IoIosAddCircleOutline, IoIosRemoveCircle } from "react-icons/io";
import ReactPlayer from "react-player/lazy";

const Play = () => {
  const [movieDetails, setMovieDetails] = useState();
  const [trailerVideos, setTrailerVideos] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [watchedShow, setWatchShow] = useState(false);
  const [like, setLike] = useState();
  const [movies, setMovies] = useState();
  // const [yId, setYId] = useState("");g
  const [watchedMovies, setWatchedMovies] = useState([]);
  // const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();
  const key = import.meta.env.VITE_TMDB_KEY;
  const { id, img } = useParams();
  const { user } = UserAuth();
  const recommendationsRef = useRef(null);
  const { saveShow, deleteShow, deleteWatchedShow, saveWatchedShow } =
    useContext(ItemContext);
  const MOBILE_BREAKPOINT = 1024;

  // useLayoutEffect(() => {
  //   if (id) setId(id);
  // });
  //   console.log(img, id);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!id) {
      navigate("/");
      window.location.reload(true);
    } else {
      axios
        .get(`${PREFIX}movie/${id}/videos?api_key=${key}&language=en-US`)

        .then((resp) => {
          setTrailerVideos(resp.data.results);
        })
        .catch((err) => console.error(err));
    }

    if (trailerVideos === "") {
      axios
        .get(`${PREFIX}tv/${id}/videos?api_key=${key}&language=en-US`)
        .then((resp) => {
          setTrailerVideos(resp.data.results);
        })
        .catch((err) => console.error(err));

      axios
        .get(`${PREFIX}movie/${id}?api_key=${key}`)
        .then((resp) => {
          setMovieDetails(resp.data);
        })
        .catch((err) => console.error(err));

      axios
        .get(`${PREFIX}movie/${id}/recommendations?api_key=${key}`)
        .then((resp) => {
          setRecommendations(resp.data.results);
        })
        .catch((err) => console.error(err));

      onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
        setMovies(doc.data()?.savedShows);
        setWatchedMovies(doc.data()?.watchedShows);
        const data = movies?.filter((movie) => movie.id === movieDetails.id)[0];
        if (data) setLike(true);
        const watchedData = watchedMovies?.filter(
          (movie) => movie.id === movieDetails.id
        )[0];
        if (watchedData !== undefined) setWatchShow(true);
      });
    }
  }, [id]);

  return (
    <div className=" pt-18 h-full mx-auto border-2">
      {trailerVideos.length > 0 ? (
        <div className="w-full h-[40vh] bg-[#ccc] ">
          <ReactPlayer
            muted={true}
            url={trailerVideos.map(
              (video) => "https://www.youtube.com/watch/" + video.key
            )}
            playing={true}
            controls={true}
            width="100%"
            height="100%"
            volume={1}
            pip={true}
          />
        </div>
      ) : (
        <div className="w-[80%] h-[40vh] mx-auto ">
          <img
            src={`${imageURL.lgUrl}${img}`}
            alt=""
            className="w-full h-full rounded-t-lg object-cover"
            loading="lazy"
          />
        </div>
      )}

      {movieDetails?.id ? (
        <section className="p-5 sm:p-14  ">
          <div className={` flex flex-col relative`}>
            <img
              src={`${imageURL.url}${movieDetails.poster_path}`}
              alt=""
              className="absolute top-0 object-cover h-full"
            />

            <div className="text-white bg-black/90  relative  z-20 ">
              <h1 className="text-3xl mb-2 font-bold text-white">
                {movieDetails.title ||
                  movieDetails.name ||
                  movieDetails.original_title}
              </h1>

              <p className="flex items-center gap-2">
                Ratings:
                {
                  <span className="flex items-center">
                    <span className="text-red-600 text-base">
                      {ratings(movieDetails.vote_average)[0]}
                      {ratings(movieDetails.vote_average)[1]}
                    </span>
                    <span className="">
                      {ratings(movieDetails.vote_average)[[2]]}{" "}
                    </span>
                  </span>
                }
              </p>
              <p className="text-neutral-300 mt-3">{movieDetails.overview}</p>

              <div className="bg-neutral-600 w-full h-[.1rem] my-5"></div>

              <div className="  text-red-700 text-sm leading-7 sm:text-lg sm:leading-9 lg:text-zxl lg:leading-10">
                <div className="flex items-center justify-between gap-5 max-h-[80vh]">
                  <div className="flex-1">
                    <h1 className="text-red-700">
                      Released on:
                      <a className="text-white ml-1">
                        {movieDetails.release_date || movieDetails.air_date}
                      </a>
                    </h1>
                    <h1 className="text-red-700">
                      Language:
                      <a className="text-white ml-1">
                        {movieDetails.original_language}
                      </a>
                    </h1>
                    <h1 className="text-red-700">
                      Country:
                      <a className="text-white ml-1">
                        {movieDetails.origin_country[0]}
                      </a>
                    </h1>
                    <h1 className="text-red-700">
                      Production Companies:
                      <a className="text-white ml-1">
                        {movieDetails.production_companies.map((pComp) => (
                          <span key={pComp.name} className="text-white ml-2">
                            {pComp.name}
                          </span>
                        ))}
                      </a>
                    </h1>
                    <h1 className="text-red-700">
                      Production Country:
                      <a className="text-white ml-1">
                        {movieDetails.production_countries.map((pComp) => (
                          <span key={pComp.name} className="text-white ml-2">
                            {pComp.name}
                          </span>
                        ))}
                      </a>
                    </h1>
                    <h1 className="text-red-700">
                      Spoken Languages:
                      <a className="text-white ml-1">
                        {movieDetails.spoken_languages.map((lang) => (
                          <span className="text-white ml-2">{lang.name}</span>
                        ))}
                      </a>
                    </h1>
                    <h1 className="text-red-700">
                      Status:
                      <a className="text-white ml-1">{movieDetails.status}</a>
                    </h1>
                    <h1 className="text-red-700">
                      Tagline:
                      <a className="text-white ml-1">{movieDetails.tagline}</a>
                    </h1>
                    <h1 className="text-red-700">
                      Genres:{" "}
                      {movieDetails.genres.map((genre) => (
                        <span key={genre.id} className="text-white ml-2">
                          {genre.name}
                        </span>
                      ))}
                    </h1>
                    <h1 className="text-red-700">
                      Watched Show? :
                      <a className="text-white ml-1">
                        {watchedShow ? "Yes" : "No"}
                      </a>
                    </h1>
                    <h1 className="text-red-700">
                      Favorite ? :
                      <a className="text-white ml-1">{like ? "Yes" : "No"}</a>
                    </h1>
                  </div>
                  <img
                    src={`${imageURL.url}${movieDetails.poster_path}`}
                    alt=""
                    className="object-contain max-h-[80vh] flex-1 hidden lg:block"
                  />
                </div>
                <div className="flex items-center justify-center gap-4 text-white text-sm py-4">
                  {like ? (
                    <button
                      className="flex items-center justify-center gap-2 cursor-pointer hover:text-yellow-700"
                      onClick={() => {
                        deleteShow(movieDetails.id, movies, user);
                        setLike(false);
                      }}
                    >
                      <IoIosRemoveCircle />
                      Remove from Favorite
                    </button>
                  ) : (
                    <button
                      className="flex items-center justify-center gap-1 cursor-pointer hover:text-yellow-700"
                      onClick={() => {
                        setLike(true);
                        saveShow(user, movieDetails);
                      }}
                    >
                      <IoIosAddCircleOutline />
                      Add to Favorite
                    </button>
                  )}
                  {watchedShow ? (
                    <button
                      className="flex items-center justify-center gap-1 cursor-pointer hover:text-yellow-700"
                      onClick={() => {
                        setWatchShow(false);
                        deleteWatchedShow(movieDetails.id, watchedMovies, user);
                      }}
                    >
                      <IoIosAddCircleOutline />
                      Remove from Watched Movie
                    </button>
                  ) : (
                    <button
                      className="flex items-center justify-center gap-1 cursor-pointer hover:text-yellow-700"
                      onClick={() => {
                        setWatchShow(true);
                        saveWatchedShow(user, movieDetails);
                      }}
                    >
                      <IoIosAddCircleOutline />
                      Add to Watch Movie
                    </button>
                  )}
                </div>

                {/* {trailerVideos.length > 1 && (
                  <section className="py-10 px-1">
                    <div className="flex flex-wrap bg-[#000000ac] w-full">
                      <h1 className="text-white text-2xl font-semibold my-10 border-l-4 border-red-800 pl-3 ">
                        {" "}
                        Other Trailers
                      </h1>
                      <div className="grid grid-cols-3 gap-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                        {trailerVideos.map((trailerMovie) => (
                          <div
                            key={trailerMovie.name}
                            className="max-w-sm show mb-4 relative cursor-pointer"
                          >
                            <img
                              src={
                                "https://i.ytimg.com/vi/Mwf--eGs05U/maxresdefault.jpg"
                              }
                              alt=""
                              className="cursor-pointer"
                            />
                            <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                              <p
                                className="whitespace-normal text-xs  font-bold flex justify-center items-center h-full text-center py-2"
                                onClick={() => {
                                  setYId(trailerMovie.key);
                                  window.location.reload(true);
                                  window.scrollTo(0, 0);
                                  //   console.log(trailerMovie.key);
                                }}
                              >
                                {trailerMovie?.name}{" "}
                                {trailerMovie?.published_at}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                )} */}

                {recommendations.length > 0 && (
                  <section>
                    <div className="flex justify-center flex-wrap bg-[#000000ac] w-full px-1">
                      <div>
                        <h1 className="text-white text-4xl font-semibold my-10 border-l-4 border-red-800 pl-3 ">
                          {" "}
                          Watch After{" "}
                          {truncateString(
                            movieDetails.title ||
                              movieDetails.name ||
                              movieDetails.original_title,
                            80
                          )}
                        </h1>
                        <div
                          className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                          ref={recommendationsRef}
                        >
                          {recommendations.map(
                            (recMovie) =>
                              recMovie.backdrop_path && (
                                <div
                                  key={recMovie.title}
                                  className="max-w-sm show mb-4 relative cursor-pointer"
                                >
                                  <Movie
                                    item={recMovie}
                                    onClick={() => {
                                      navigate(
                                        `/play/${
                                          recMovie.id
                                        }/${recMovie.backdrop_path.slice(1)}`
                                      );
                                      window.location.reload(true);
                                    }}
                                  />
                                  <div className="whitespace-normal text-white text-sm flex gap-3 h-[55px] px-1  pt-2 md:hidden ">
                                    {/* <p
                                      className="w-full h-[50px] "
                                      onClick={() => {
                                        navigate(
                                          `/play/${
                                            recMovie.id
                                          }/${recMovie.backdrop_path.slice(1)}`
                                        );
                                        window.location.reload(true);
                                      }}
                                    >
                                      {truncateString(recMovie?.title, 45)}
                                    </p> */}
                                  </div>

                                  <div></div>
                                </div>
                              )
                          )}
                        </div>
                      </div>
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <>
          <div className="px-4 lg:px-10 xl:px-12 animate-pulse">
            <div className="w-72 mt-4 sm:ml-0 sm:w-96 py-5 mb-7 xl:py-7 xl:w-45rem bg-neutral-900 rounded-md"></div>
            <div className="w-full py-1 mb-3 xl:py-2 bg-neutral-900 rounded-md"></div>
            <div className="w-full py-1 mb-3 xl:py-2 bg-neutral-900 rounded-md"></div>
            <div className="w-full py-1 mb-3 xl:py-2 bg-neutral-900 rounded-md"></div>
            <div className="w-full py-1 mb-8 xl:py-2 bg-neutral-900 rounded-md"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default Play;
