import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { createContext, useContext, useState } from "react";
import { db } from "../config/firebase";

export const RegContext = createContext();

export default function RegContextProvider({ children }) {
  const [registerPayment, setRegisterPayment] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cardDetails, setCardDetails] = useState({
    "card number": "",
    "expiration date": "",
    cvv: "",
    "name on card": "",
    plan: {},
  });

  const saveCardDetails = async (user) => {
    if (user?.email) {
      await updateDoc(doc(db, "users", `${user?.email}`), {
        cardDetails: arrayUnion({
          ...cardDetails,
        }),
      });
    } else {
      alert("Please log in to save a movie");
    }
  };

  return (
    <RegContext.Provider
      value={{
        registerPayment,
        setRegisterPayment,
        email,
        setEmail,
        password,
        setPassword,
        setCardDetails,
        cardDetails,
        saveCardDetails,
      }}
    >
      {children}
    </RegContext.Provider>
  );
}

export function UserReg() {
  return useContext(RegContext);
}
