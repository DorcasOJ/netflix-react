import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthContextProvider, UserAuth } from "./context/AuthContent";
import IntroToSignup from "./pages/IntroToSignup";
import Registration from "./pages/Registration";
import ErrorPage from "./pages/ErrorPage";
import Footer from "./components/Footer";
import Search from "./pages/Search";
import Play from "./pages/Play";
import FavShows from "./pages/FavShows";
import Account from "./pages/Account";
import ProtectedRoute, {
  ProtectedHomeRoute,
} from "./components/ProtectedRoute";
import { Fragment } from "react";
import AnalysisTracker from "./components/AnalysisTracker";
// import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  // const { user } = UserAuth();

  return (
    <>
      <Fragment>
        <AnalysisTracker />
        <Navbar />
        <Routes>
          <Route path="*" element={<ErrorPage />} />

          <Route
            exact
            path="/"
            element={
              <ProtectedHomeRoute>
                <IntroToSignup />
              </ProtectedHomeRoute>
            }
          />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/welcome" element={<IntroToSignup />} />

          <Route exact path="/signup/:email" element={<Signup />} />
          <Route exact path="/registration" element={<Registration />} />

          <Route
            exact
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/favShows"
            element={
              <ProtectedRoute>
                <FavShows />
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/play/:id/:img"
            element={
              <ProtectedRoute>
                <Play />
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/search"
            element={
              <ProtectedRoute>
                <Search />
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Fragment>

      <Footer />
    </>
  );
}

export default App;
