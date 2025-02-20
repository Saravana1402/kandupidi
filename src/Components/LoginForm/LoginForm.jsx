import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    try {
      // Retrieve registered users from localStorage
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

      // Find the user with the matching email
      const user = registeredUsers.find((user) => user.gmail === gmail);

      if (user) {
        // Compare the hashed password (for demo purposes, using btoa)
        if (user.passwordHash === btoa(password)) {
          alert("Login successful!");
          navigate("/dashboard"); // Redirect to the dashboard or another page
        } else {
          setError("Invalid password. Please try again.");
        }
      } else {
        setError("User not found. Please register first.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
        <form onSubmit={handleLogin}>
          <h2 className="text-center mb-4">Login</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingEmail"
              placeholder="Email"
              value={gmail}
              onChange={(e) => setGmail(e.target.value)}
              required
            />
            <label htmlFor="floatingEmail">Email</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
          <div className="text-center mt-3">
            <p>
              Don't have an account?{" "}
              <a href="#" onClick={() => navigate("/register")}>
                Register
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;