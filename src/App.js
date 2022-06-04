import { useRoutes, Navigate, useLocation } from "react-router-dom";

import "./App.css";

import Login from "./components/login";
import Register from "./components/register";
import Dashboard from "./components/dashboard";
import LandingPage from "./components/landing-page";
import { useMoralis } from "react-moralis";
import { TransactionHistory } from "./components/transaction-history";
import Nav from "./components/nav";
import SideNav from "./components/side-nav";
import Footer from "./components/footer";

function App() {
  const { isAuthenticated } = useMoralis();
  const location = useLocation();

  const authenticateAndReturnComponent = (ActualComponent, showActual) => {
    if(showActual) return isAuthenticated ? <ActualComponent /> : <Navigate to="/login" />

    return !isAuthenticated ? <ActualComponent /> : <Navigate to="/" />
    
  }

  const element = useRoutes([
    {
      path: "/",
      element: authenticateAndReturnComponent(Dashboard, true),
    },
    {
      path: "/login",
      element: authenticateAndReturnComponent(Login, false),
    },
    {
      path: "/register",
      element: authenticateAndReturnComponent(Register, false),
    },
    { path: "/landing", element: <LandingPage /> },
    { path: "/transaction-history", element: authenticateAndReturnComponent(TransactionHistory, true) }
  ]);

  if(['/login','/register'].includes(location.pathname))
    return element;

  return (
    <>
      <Nav />
      <div id="layoutSidenav">
        <SideNav />
        <div id="layoutSidenav_content">
          { element }
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
