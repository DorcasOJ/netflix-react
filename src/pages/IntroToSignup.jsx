import React, { useEffect, useRef, useState } from "react";
import { FaGreaterThan, FaPause, FaPlay } from "react-icons/fa";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { MoveLeft, MoveRight } from "../components/ArrowMove";
import axios from "axios";
import requests from "../Request";
import WelcomeMovies from "../components/WelcomeMovies";
import ReasonCard from "../components/ReasonCard";
// import "./IntroToSignup.css";

const IntroToSignup = () => {
  const sliderRef = useRef();
  const pauseAnimationRef = useRef();
  const playAnimationRef = useRef();
  const [mobileHero, setMobileHero] = useState(false);
  const [local, setLocal] = useState([]);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    // get local, african, popular, trending
    axios
      .get(requests.requestLocal)
      .then((resp) => setLocal(resp.data.results));

    axios
      .get(requests.requestTrending)
      .then((resp) => setTrending(resp.data.results));

    if (window.window.innerWidth < 650) {
      setMobileHero(true);
    } else {
      setMobileHero(false);
    }
  }, []);

  const Local = local
    .filter((item) => item.poster_path !== null && item.popularity > 0.2)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  const Trending = trending
    .filter((item) => item.poster_path !== null)
    .sort(() => 0.5 - Math.random())
    .slice(0, 6);

  //   setIntroMovies([...Local, ...Trending]);
  const introMovies = [...Local, ...Trending];
  window.addEventListener("resize", () => {
    if (window.window.innerWidth < 650) {
      setMobileHero(true);
    } else {
      setMobileHero(false);
    }
  });

  const toggleAnimation = () => {
    // console.log(pauseAnimationRef.current.style.animationPlayState);
  };
  // console.log(sliderRef.current.scrollWidth, sliderRef.current.clientWidth);

  return (
    <>
      <div className="h-full w-full absolute">
        <div className="fixed h-full w-full bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg')] bg-cover bg-center filter blur-sm"></div>

        <div className="w-full h-full bg-black/60 fixed top-0 left-0"></div>
      </div>

      <div className="w-full h-[650px] lg:h-[700px] relative ">
        <div className="w-full h-full pt-24 absolute px-4 ">
          <div className="w-full h-full mx-auto hero-shape">
            {mobileHero ? (
              <div className="relative w-full h-full">
                <div className="relative w-full h-full">
                  <div className="w-full h-full ">
                    <div className="w-full overflow-x-scroll whitespace-nowrap scroll-smooth relative  no-scrollbar bg-black/60 ">
                      {trending.map(
                        (item, id) =>
                          item.poster_path !== null && (
                            <WelcomeMovies item={item} id={id} hero={true} />
                          )
                      )}
                    </div>

                    <div className="w-full overflow-x-scroll whitespace-nowrap scroll-smooth relative  no-scrollbar bg-black/60">
                      {local.map(
                        (item, id) =>
                          item.poster_path !== null && (
                            <WelcomeMovies item={item} id={id} hero={true} />
                          )
                      )}
                    </div>
                  </div>
                  <div className="bg-black/40 absolute bg-gradient-to-t from-black top-0 left-0  w-full h-full "></div>
                </div>
              </div>
            ) : (
              <div className="w-full h-full mx-auto ">
                <img
                  src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
                  alt="/"
                  className="hidden sm:block   object-cover rounded-b-4xl shadow-xl shadow-amber-900/50 h-full w-full "
                />

                <div className="bg-black/40 absolute bg-gradient-to-b from-black top-0 left-0  w-full h-full "></div>
              </div>
            )}
          </div>
        </div>

        <div className="z-30 pt-24 px-4 absolute w-full h-full">
          <div className="w-4/5 h-full mx-auto text-white text-center flex flex-col items-center justify-center ">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl  font-bold mb-4">
              Unlimited movies, TV shows, and more
            </h1>

            <p className="text-lg lg:text-xl mb-2">
              Starts at N2,200. Cancel anytime
            </p>

            <p className="text-sm  mb-6">
              Ready to watch? Enter your email to create or restart your
              membership
            </p>
            <form className="flex flex-col sm:flex-row items-center justify-center w-full max-w-[650px] sm:gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="bg-gray-700/90 px-3 py-[9px] my-2 rounded-2xl sm:flex-2 w-full "
              />
              <button className="bg-red-600 px-3 py-[6px] rounded-2xl font-bold  text-lg sm:flex-1 cursor-pointer flex items-center justify-center gap-2 hover:bg-white hover:border-red-600 hover:text-red-600 hover:gap-5 w-full ">
                Get Started
                <MdChevronRight className="font-normal text-2xl" />
              </button>
            </form>
            {mobileHero && (
              <div
                className="absolute bottom-15 right-5 z-210 text-white"
                onClick={toggleAnimation()}
              >
                <FaPause
                  ref={pauseAnimationRef}
                  className="p-1 cursor-pointer"
                />
                <FaPlay ref={playAnimationRef} className="p-1 cursor-pointer" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-10 py-5 relative ">
        <p className=" text-xl text-red-100 pb-3 ">Trending Now</p>

        <div className="flex items-center group ">
          {<MoveLeft sliderRef={sliderRef} />}
          <div
            id={"slider"}
            ref={sliderRef}
            className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth relative no-scrollbar"
          >
            {introMovies.map(
              (item, id) =>
                item.poster_path !== null && (
                  <WelcomeMovies item={item} id={id} hero={false} />
                )
            )}
          </div>
          <MoveRight sliderRef={sliderRef} />
        </div>

        <div>
          <p className="text-red-100 text-xl pt-5 pb-3 ps-3">
            More Reasons to Join
          </p>

          <div className="flex items-center justify-center">
            <div className="flex flex-wrap items-center gap-3  sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-10  text-white">
              {/* <div className="bg-[#2c2c2c] sm:flex-1 rounded-3xl text-center shadow-2xl shadow-[#1e1e1e] p-5 relative w-[48%] h-[180px] sm:w-[100%] ">
                <p className=" text-base md:text-lg text-left w-full pe-2 text-red-100">
                  Cancel or switch plans anytime
                </p>
                <p className="text-xs md:text-[14px] text-left pt-3 pe-3 pb-4 text-red-100">
                  You're in control — cancel or switch your plan whenever it
                  works for you
                </p>
                <img
                  src="/public/handshake
                  .svg"
                  alt=""
                  className="w-10 absolute right-5 bottom-5"
                />
              </div> */}

              <ReasonCard />

              <div className="bg-[#2c2c2c] sm:flex-1 rounded-3xl text-center shadow-2xl shadow-[#1e1e1e] w-[48%] h-[180px] sm:w-[100%]  p-5 relative">
                <p className="  text-base md:text-lg text-left w-full pe-3 text-red-100">
                  A safe place just for kids
                </p>
                <p className="text-xs md:text-[14px] text-left pt-2 pb-4 text-red-100">
                  Where they can learn, play, and grow without worry.
                </p>
                <img
                  src="/public/red-heart-icon.svg"
                  alt=""
                  className="w-8 absolute right-5  bottom-7"
                />
              </div>

              <div className="bg-[#2c2c2c] sm:flex-1 rounded-3xl text-center shadow-2xl shadow-[#1e1e1e] p-5 relative w-[48%] h-[180px] sm:w-[100%] ">
                <p className=" text-base md:text-lg text-left w-full pe-2 text-red-100">
                  Watch on your favorite devices
                </p>

                <p className="text-xs md:text-[14px] text-left pt-2 pb-4 text-red-100">
                  Watch anywhere with seamless streaming across phones, tablets,
                  laptops, and more
                </p>

                <img
                  src="/public/monitor-tv.svg"
                  alt=""
                  className="w-8 absolute right-5 bottom-5"
                />
              </div>

              <div className="bg-[#2c2c2c] sm:flex-1 rounded-3xl text-center shadow-2xl shadow-[#1e1e1e] p-5 relative w-[48%] h-[180px] sm:w-[100%] ">
                <p className=" text-base md:text-lg text-left w-full pe-2 text-red-100">
                  Stories tailored to your taste
                </p>

                <p className="text-xs md:text-[14px] text-left pt-2 pb-4 text-red-100">
                  Enjoy stories tailored to your taste, with personalized picks
                  that match your interests
                </p>

                <img
                  src="/public/hand-holding.svg"
                  alt=""
                  className="w-8 absolute right-5 bottom-5"
                />
              </div>
            </div>
          </div>

          <div className="relative text-white">FAQ</div>
        </div>
      </div>
    </>
  );
};

export default IntroToSignup;
