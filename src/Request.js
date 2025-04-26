const key = import.meta.env.VITE_TMDB_KEY;

export const PREFIX = "https://api.themoviedb.org/3/";
const requests = {
  requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
  requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=3`,
  requestTrending: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=2`,
  requestDrama: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=history&page=1&imclude_adult=false`,
  requestAnime: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=animation&page=1&imclude_adult=false`,
  requestAfrican: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=african&page=1&imclude_adult=false`,

  requestLocal: `https://api.themoviedb.org/3/search/movie?query=nigerian&include_adult=false&language=en-US&page=1&region=Nigeria&api_key=${key}`,

  requestAmerican: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=american&page=1&imclude_adult=false`,
  requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=4`,

  originals: `https://api.themoviedb.org/3/discover/tv?api_key=${key}&with_networks=213&sort_by=popularity.desc&language=en-US`,
  action: `${PREFIX}discover/movie?api_key=${key}&with_genres=28`,
  comedy: `${PREFIX}discover/movie?api_key=${key}&with_genres=35`,
  horror: `${PREFIX}discover/movie?api_key=${key}&with_genres=27`,
  adventure: `${PREFIX}discover/movie?api_key=${key}&with_genres=12`,
  sciFi: `${PREFIX}discover/movie?api_key=${key}&with_genres=878`,
  animated: `${PREFIX}discover/movie?api_key=${key}&with_genres=16`,
  war: `${PREFIX}discover/movie?api_key=${key}&with_genres=10752`,
  trending: `${PREFIX}trending/all/week?api_key=${key}&sort_by=popularity.desc&language=en-US`,
  trendingSeries: `${PREFIX}trending/tv/week?api_key=${key}&sort_by=popularity.desc&language=en-US`,
  documentary: `${PREFIX}discover/movie?api_key=${key}&with_genres=99`,
  music: `${PREFIX}discover/movie?api_key=${key}&with_genres=10402`,
  fiction: `${PREFIX}discover/movie?api_key=${key}&with_genres=878`,
  romance: `${PREFIX}discover/movie?api_key=${key}&with_genres=10749`,
  western: `${PREFIX}discover/movie?api_key=${key}&with_genres=37`,
  search: `${PREFIX}search/movie?api_key=${key}&include_adult=false&language=en-US&region=Nigeria&query=`,
};

export const imageURL = {
  url: "https://image.tmdb.org/t/p/w500/",
  bgURL:
    "https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg",
};

export const Genre = {
  movieGenre: `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`,
  tvGenre: `https://api.themoviedb.org/3/genre/tv/list?api_key=${key}&language=en-US`,
};
export default requests;
