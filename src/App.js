import { useRoutes, Navigate, useLocation } from "react-router-dom";

import "./App.css";

import Login from "./components/login";
import Register from "./components/register";
import Dashboard from "./components/dashboard";
import LandingPage from "./components/landing-page";
import { useMoralis } from "react-moralis";

function App() {
  const { isAuthenticated } = useMoralis();

  const element = useRoutes([
    {
      path: "/",
      element: isAuthenticated ? <Dashboard /> : <Navigate to="/login" />,
    },
    {
      path: "/login",
      element: !isAuthenticated ? <Login /> : <Navigate to="/" />,
    },
    {
      path: "/register",
      element: !isAuthenticated ? <Register /> : <Navigate to="/login" />,
    },
    { path: "/landing", element: <LandingPage /> },
  ]);

  return element;
}

export default App;
