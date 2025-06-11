import React, { useContext, useEffect, useRef, useState } from "react";
import { FaGreaterThan, FaPause, FaPlay } from "react-icons/fa";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { MoveLeft, MoveRight } from "../components/ArrowMove";
import axios from "axios";
import requests, { imageURL } from "../Request";
import WelcomeMovies from "../components/WelcomeMovies";
import ReasonCard from "../components/ReasonCard";
import ReasonsToMove from "../utils/ReasonToMove";
import FaQuestions from "../utils/FAQuestions";
import SingleQuestion from "../components/SingleQuestion";
import SignUpEmail from "../components/SignUpEmail";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { RegContext } from "../context/RegContext";
import { UserAuth } from "../context/AuthContent";

const IntroToSignup = () => {
  // const signupEmailInput = useRef();
  const [pauseAnimation, setPauseAnimation] = useState(false);
  const [local, setLocal] = useState([]);
  const [trending, setTrending] = useState([]);
  const navigate = useNavigate();
  const sliderRef = useRef();
  const { emailExist, error } = UserAuth();
  const { setEmail, email } = useContext(RegContext);

  useEffect(() => {
    axios
      .get(requests.requestLocal)
      .then((resp) => setLocal(resp.data.results));

    axios
      .get(requests.requestTrending)
      .then((resp) => setTrending(resp.data.results));
  }, []);

  const Local = local
    .filter((item) => item.poster_path !== null && item.popularity > 0.1)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  const Trending = trending
    .filter((item) => item.poster_path !== null)
    .sort(() => 0.5 - Math.random())
    .slice(0, 6);

  const introMovies = [...Local, ...Trending];

  const Submit = async () => {
    await emailExist(email);
    if (error) {
      console.log("network error", error);
    } else {
      navigate("/registration");
    }
  };

  return (
    <>
      <div className="h-full w-full absolute">
        <div
          className={`fixed h-full w-full bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg')] bg-cover bg-center filter blur-sm`}
        ></div>

        <div className="w-full h-full bg-black/60 bg-gradient-to-t from-black fixed top-0 left-0"></div>
      </div>

      <section className="w-full h-[650px] lg:h-[700px] relative ">
        <div className="w-full h-full pt-24 absolute px-4 ">
          <div className="w-full h-full mx-auto hero-shape shadow">
            <div className="relative w-full h-full">
              <div className="relative w-full h-full">
                <div className="w-full h-full ">
                  <div className="w-full overflow-x-scroll whitespace-nowrap scroll-smooth relative no-scrollbar bg-black/60 ">
                    {trending.map(
                      (item) =>
                        item.poster_path !== null && (
                          <WelcomeMovies
                            key={item.id}
                            item={item}
                            // id={id}
                            hero={true}
                            pauseAnimation={pauseAnimation}
                          />
                        )
                    )}
                  </div>

                  <div className="w-full overflow-x-scroll whitespace-nowrap scroll-smooth relative  no-scrollbar bg-black/60">
                    {local.map(
                      (item) =>
                        item.poster_path !== null && (
                          <WelcomeMovies
                            key={item.id}
                            item={item}
                            // id={id}
                            hero={true}
                            pauseAnimation={pauseAnimation}
                          />
                        )
                    )}
                  </div>
                </div>
                <div className="bg-black/40 absolute bg-gradient-to-t from-[#333333] from-40% top-0 left-0 w-full h-full z-30"></div>
              </div>
              <div
                className="absolute bottom-12 right-3 z-50 text-white cursor-pointer"
                onClick={() => setPauseAnimation(!pauseAnimation)}
              >
                {!pauseAnimation && <FaPause className="p-1 cursor-pointer " />}
                {pauseAnimation && <FaPlay className="p-1 cursor-pointer" />}
              </div>
            </div>
          </div>
        </div>

        <div className="z-30 pt-24 px-4 absolute w-full h-[80%] mt-15 border-red-950">
          <div className="w-4/5 h-full mx-auto text-white text-center flex flex-col items-center justify-center ">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl  font-bold mb-4">
              Unlimited movies, TV shows, and more
            </h1>

            <p className="text-lg lg:text-xl mb-4">
              Starts at N2,200. Cancel anytime
            </p>

            <SignUpEmail
              setEmail={setEmail}
              email={email}
              Submit={Submit}
              // networkError={error}
            />
          </div>
        </div>
      </section>

      <section className="px-10 py-5 relative ">
        <section className="w-full h-full">
          <p className=" md:text-xl text-lg text-red-100 pb-3 font-bold tracking-widest ">
            Trending Now
          </p>

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
                    <WelcomeMovies
                      key={item.id}
                      item={item}
                      id={id}
                      hero={false}
                    />
                  )
              )}
            </div>
            <MoveRight sliderRef={sliderRef} />
          </div>
        </section>

        <section>
          <p className="text-red-100 md:text-xl text-lg pt-5 pb-3 ps-3 tracking-widest font-bold">
            More Reasons to Join
          </p>

          <div className="flex items-center justify-center">
            <div className="flex flex-wrap items-center gap-3  sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-10  text-white">
              {ReasonsToMove.map((reason, index) => (
                <ReasonCard key={index} reason={reason} />
              ))}
            </div>
          </div>
        </section>
        <section className="relative text-white pt-8">
          <h3 className="font-bold tracking-widest md:text-xl text-lg pb-4 text-red-100">
            Frequently Asked Questions
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {FaQuestions.map((question, index) => (
              <SingleQuestion key={index} {...question} />
            ))}
          </div>
        </section>
        <div className="pt-8 w-full h-full mx-auto text-white text-center flex flex-col items-center justify-center">
          networkError={error}
          <SignUpEmail
            setEmail={setEmail}
            email={email}
            Submit={Submit}
            // networkError={error}
          />
        </div>
        <div className="pt-20">
          <Footer />
        </div>
      </section>
    </>
  );
};

export default IntroToSignup;
