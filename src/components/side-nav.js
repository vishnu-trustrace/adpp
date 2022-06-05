import { Link } from "react-router-dom";
import { useMoralis } from "react-moralis";

export default function SideNav() {

    const { user } = useMoralis();

    return (
      <div id="layoutSidenav_nav">
        <nav
          className="sb-sidenav accordion sb-sidenav-dark"
          id="sidenavAccordion"
        >
          <div className="sb-sidenav-menu">
            <div className="nav">
              <div className="sb-sidenav-menu-heading">Core</div>
              <Link className="nav-link" to="/">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-tachometer-alt"></i>
                </div>
                Dashboard
              </Link>
              <a
                className="nav-link collapsed"
                href="#"
                data-bs-toggle="collapse"
                data-bs-target="#collapseLayouts"
                aria-expanded="false"
                aria-controls="collapseLayouts"
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-columns"></i>
                </div>
                Wallet
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down"></i>
                </div>
              </a>
              <div
                className="collapse"
                id="collapseLayouts"
                aria-labelledby="headingOne"
                data-bs-parent="#sidenavAccordion"
              >
                <nav className="sb-sidenav-menu-nested nav">
                  <Link className="nav-link" to="/transaction-history">
                    Transfer History
                  </Link>
                  <a className="nav-link" href="layout-sidenav-light.html">
                    Transfer
                  </a>
                  <Link className="nav-link" to="/balance">
                    Balance
                  </Link>
                </nav>
              </div>
            </div>
          </div>
          <div className="sb-sidenav-footer">
            <div className="small">Logged in as:</div>
            {user?.getUsername()}
          </div>
        </nav>
      </div>
    );
}