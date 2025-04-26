import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContent.jsx";
import RegContextProvider from "./context/RegContext.jsx";
import ItemContextProvider from "./context/ItemContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider>
      <RegContextProvider>
        <ItemContextProvider>
          <App />
        </ItemContextProvider>
      </RegContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
