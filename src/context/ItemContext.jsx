import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { createContext, useState } from "react";
import { db } from "../config/firebase";

export const ItemContext = createContext();

export default function ItemContextProvider({ children }) {
  const [item, setItem] = useState({});
  const [showPopup, setShowPopUp] = useState(false);

  const saveShow = async (user, item) => {
    if (user?.email) {
      // setLike(true);
      // setSaved(true);

      await updateDoc(doc(db, "users", `${user?.email}`), {
        savedShows: arrayUnion({
          id: item.id,
          title: item.title,
          img: item.backdrop_path,
        }),
      });
    } else {
      alert("Please log in to save a movie");
    }
  };

  const saveWatchedShow = async (user, item) => {
    if (user?.email) {
      await updateDoc(doc(db, "users", `${user?.email}`), {
        watchedShows: arrayUnion({
          id: item.id,
          title: item.title,
          img: item.backdrop_path,
        }),
      });
    } else {
      alert("Please log in to save a movie");
    }
  };

  const deleteShow = async (id, movies, user) => {
    try {
      const result = movies.filter((item) => item.id !== id);
      await updateDoc(doc(db, "users", `${user?.email}`), {
        savedShows: result,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteWatchedShow = async (id, movies, user) => {
    try {
      const result = movies.filter((item) => item.id !== id);
      await updateDoc(doc(db, "users", `${user?.email}`), {
        watchedShows: result,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ItemContext.Provider
      value={{
        item,
        setItem,
        showPopup,
        setShowPopUp,
        deleteShow,
        saveShow,
        deleteWatchedShow,
        saveWatchedShow,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
}
