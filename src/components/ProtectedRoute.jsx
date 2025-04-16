import React from "react";
import { UserAuth } from "../context/AuthContent";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = UserAuth;
  console.log(user);

  // const navigate = useNavigate();
  if (!user) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
