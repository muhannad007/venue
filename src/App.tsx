import "./App.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";

const loginUrl = "https://stg.dhunjam.in/account/admin/login";

const App: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(loginUrl, { username, password });
      console.log(response.data);

      setUsername("");
      setPassword("");
      navigate("/Admin");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* <Router> */}
      <div className="login-div">
        <h1>Venue Admin Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <input
            placeholder="Password"
            id="pass"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign in</button>
        </form>
        <a className="new">New Registration?</a>
      </div>
    </>
  );
};

export default App;
