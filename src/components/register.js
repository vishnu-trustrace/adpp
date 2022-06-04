import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMoralis } from "react-moralis";

export default function Register() {
  const { signup, isAuthenticating } = useMoralis();
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const userRegister = async (e) => {
    e.preventDefault();

    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (password !== confirmPassword)
      return alert("Password and confirm password doesnot match.");

    if (!userEmail.match(emailRegex)) return alert("Enter a valid email.");

    try {
      await signup(userEmail, password)
        .then((resp) => {
          if (!resp) return alert("Error in signing up");
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-7">
          <div className="card shadow-lg border-0 rounded-lg mt-5">
            <div className="card-header">
              <h3 className="text-center font-weight-light my-4">
                Create Account
              </h3>
            </div>
            <div className="card-body">
              <form>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="inputEmail"
                    type="email"
                    placeholder="name@example.com"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                  <label htmlFor="inputEmail">Email address</label>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="form-floating mb-3 mb-md-0">
                      <input
                        className="form-control"
                        id="inputPassword"
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <label htmlFor="inputPassword">Password</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating mb-3 mb-md-0">
                      <input
                        className="form-control"
                        id="inputPasswordConfirm"
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <label htmlFor="inputPasswordConfirm">
                        Confirm Password
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mt-4 mb-0">
                  <div className="d-grid">
                    <button
                      className="btn btn-primary btn-block"
                      onClick={userRegister}
                      disabled={isAuthenticating}
                    >
                      Create Account
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="card-footer text-center py-3">
              <div className="small">
                <Link to="/login">Have an account? Go to login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
