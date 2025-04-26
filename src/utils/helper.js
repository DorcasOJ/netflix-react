import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

export const likedMovies = (user) => {
  onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
    return doc.data()?.savedShows;
  });
};

export const truncateString = (str, num) => {
  if (str?.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
};

export const getGenres = (genreList, genres) => {
  let genreNames = "";
  for (let genreID of genreList) {
    genreNames += `  ${genres[genreID]} `;
  }
  return genreNames;
};

export const ratings = (ratingNum) => {
  const maxStar = 5;
  const stars = ratingNum / 2;
  const fullStars = Math.floor(stars);
  const hasHalfStar = stars % 1 >= 0.5;
  const emptyStars = maxStar - fullStars - (hasHalfStar ? 1 : 0);

  const full = "★".repeat(fullStars);
  const half = hasHalfStar ? "⯪" : "";
  const empty = "☆".repeat(emptyStars);

  return [full, half, empty];
};

// export default truncateString;
