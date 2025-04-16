const key = import.meta.env.VITE_TMDB_KEY;

const requests = {
  requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
  requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
  requestTrending: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=2`,
  requestDrama: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=history&page=1&imclude_adult=false`,
  requestAnime: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=animation&page=1&imclude_adult=false`,
  requestAfrican: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=african&page=1&imclude_adult=false`,

  requestLocal: `https://api.themoviedb.org/3/search/movie?query=nigerian&include_adult=false&language=en-US&page=1&region=Nigeria&api_key=${key}`,

  requestAmerican: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=american&page=1&imclude_adult=false`,
  requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,
};

export default requests;
