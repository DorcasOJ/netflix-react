import React from "react";
import { UserAuth } from "../context/AuthContent";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = UserAuth();

  // const navigate = useNavigate();
  if (!user) {
    return <Navigate to="/welcome" replace />;
  } else {
    return children;
  }
};

export const ProtectedHomeRoute = ({ children }) => {
  const { user } = UserAuth();

  // const navigate = useNavigate();
  if (!user) {
    return children;
  } else {
    return <Navigate to="/home" replace />;
  }
};

export default ProtectedRoute;
