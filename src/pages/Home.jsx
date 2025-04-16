import React from "react";
import Main from "../components/Main";
import Row from "../components/Row";
import requests from "../Request";

const Home = () => {
  return (
    <>
      <Main />
      <Row title="Up Coming" fetchURL={requests.requestUpcoming} />
      <Row title="Local" fetchURL={requests.requestLocal} />
      <Row title="Popular" fetchURL={requests.requestPopular} />

      {/* <Row title="Trending" fetchURL={requests.requestTrending} /> */}
      <Row title="Top Rated" fetchURL={requests.requestTopRated} />
      <Row title="Anime" fetchURL={requests.requestAnime} />

      <Row title="Drama" fetchURL={requests.requestDrama} />
      <Row title="Movie" fetchURL={requests.requestLocal2} />
      <Row title="African" fetchURL={requests.requestAfrican} />
      <Row title="America" fetchURL={requests.requestAmerican} />
    </>
  );
};

export default Home;
