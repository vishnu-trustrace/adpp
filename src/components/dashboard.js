import { useNavigate } from "react-router-dom";
import { useMoralis } from "react-moralis";
import Nav from "./nav";
import SideNav from "./side-nav";
import Footer from "./footer";

export default function Dashboard() {
  const navigate = useNavigate();
  const { isAuthenticated } = useMoralis();

  if (!isAuthenticated) return navigate("/login", { replace: true });

  return (
    <>
      <main>
        <div className="container-fluid px-4">
          <h1 className="mt-4">Dashboard</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item active">Dashboard</li>
          </ol>
        </div>
      </main>
    </>
  );
}
