import React, { useContext } from "react";
import Main from "../components/Main";
import Row from "../components/Row";
import requests, { Genre } from "../Request";
import { UserAuth } from "../context/AuthContent";
import IntroToSignup from "./IntroToSignup";
import { RegContext } from "../context/RegContext";
import { MdOutlineCancel, MdStarBorder } from "react-icons/md";
import { LiaTimesCircle, LiaTimesCircleSolid } from "react-icons/lia";
import { ItemContext } from "../context/ItemContext";
import { CiCirclePlus } from "react-icons/ci";
import { FaRegTimesCircle } from "react-icons/fa";
import { IoIosStar, IoMdStarHalf } from "react-icons/io";
import PopUpMovie from "../components/PopUpMovie";

const Home = () => {
  const { user } = UserAuth();
  const { item, setItem } = useContext(ItemContext);

  return (
    <>
      <div className="relative">
        {Object.keys(item).length > 0 && (
          <PopUpMovie item={item} setItem={setItem} />
        )}
        <Main />
        // <Row title="Up Coming" fetchURL={requests.requestUpcoming} />
        // <Row title="Popular" fetchURL={requests.requestPopular} />
        // <Row title="Originals" fetchURL={requests.originals} />
        // <Row title="Action" fetchURL={requests.action} />
        // <Row title="Trending" fetchURL={requests.requestTrending} />
        // <Row title="Comedy" fetchURL={requests.comedy} />
        // <Row title="Adventure" fetchURL={requests.adventure} />
        // <Row title="Scifi" fetchURL={requests.sciFi} />
        // <Row title="Animated" fetchURL={requests.animated} />
        // <Row title="War" fetchURL={requests.war} />
        // <Row title="Horror" fetchURL={requests.horror} />
        // <Row title="Series" fetchURL={requests.trendingSeries} />
        // <Row title="War" fetchURL={requests.war} />
        // <Row title="Documentary" fetchURL={requests.documentary} />
        <Row title="Local" fetchURL={requests.requestLocal} />
        // <Row title="Music" fetchURL={requests.music} />
        // <Row title="Fiction" fetchURL={requests.fiction} />
        // <Row title="Romance" fetchURL={requests.romance} />
        // <Row title="Western" fetchURL={requests.western} />
        // <Row title="Drama" fetchURL={requests.requestDrama} />
        // <Row title="TV" fetchURL={requests.requestTrending} />
      </div>
    </>
  );
};

export default Home;
