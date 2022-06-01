import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMoralis } from "react-moralis";

export default function Login() {
  const { isAuthenticating, login, authenticate } = useMoralis();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const orSepratorStyle = {
    position: "absolute",
    top: "-25px",
    left: "42%",
    zIndex: 100,
    background: "#dedede",
    padding: "10px",
    borderRadius: "50%",
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(userName, password)
        .then((loginResp) => {
          if (!loginResp) return alert("Error in logging in");
          navigate("/", { replace: true });
        })
        .catch((loginErr) => {
          console.log(loginErr);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleWalletLogin = async () => {
    try {
      await authenticate()
        .then((loginResp) => {
          if (!loginResp) return alert("Error in logging in");
          navigate("/", { replace: true });
        })
        .catch((loginErr) => {
          console.log(loginErr);
        });
    } catch (err) {}
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-5">
          <div className="card shadow-lg border-0 rounded-lg mt-5">
            <div className="card-header">
              <h3 className="text-center font-weight-light my-4">Login</h3>
            </div>
            <div className="card-body">
              <form>
                <div className="form-floating mb-3">
                  <input
                    onChange={(e) => setUserName(e.target.value)}
                    className="form-control"
                    id="inputEmail"
                    type="email"
                    placeholder="name@example.com"
                  />
                  <label htmlFor="inputEmail">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    id="inputPassword"
                    type="password"
                    placeholder="Password"
                  />
                  <label htmlFor="inputPassword">Password</label>
                </div>
                <div className="form-check mb-3" style={{ display: "none" }}>
                  <input
                    className="form-check-input"
                    id="inputRememberPassword"
                    type="checkbox"
                    value=""
                  />
                  <label
                    className="form-check-label"
                    htmlFor="inputRememberPassword"
                  >
                    Remember Password
                  </label>
                </div>
                <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                  <a
                    style={{ display: "none" }}
                    className="small"
                    href="password.html"
                  >
                    Forgot Password?
                  </a>
                  <button
                    disabled={isAuthenticating}
                    className="btn btn-primary"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                </div>
              </form>
              <div style={{ position: "relative" }}>
                <hr />
                <div style={orSepratorStyle}>OR</div>
              </div>
              <div className="wallet-login" style={{ marginTop: "50px" }}>
                <button
                  onClick={handleWalletLogin}
                  style={{ width: "100%" }}
                  className="btn btn-primary btn-lg btn-block"
                >
                  Login via Wallet
                </button>
              </div>
            </div>
            <div className="card-footer text-center py-3">
              <div className="small">
                <Link to="/register">Need an account? Sign up!</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
