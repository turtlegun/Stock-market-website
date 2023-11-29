import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";


function Login() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate(); // Define the history object.

  const handle_submit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      if (response.data.message === "invalid password") {
        setMessage("Invalid password");
      } else {
        navigateTo("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="login">
        <h3 className="head">USER LOGIN</h3>
        <form onSubmit={handle_submit}>
          <div className="email">
            <label>Email address</label>
            <div>
              <input
                placeholder="Email"
                type="email"
                id="exampleInputEmail1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div id="emailHelp" className="form-text">
                .
              </div>
            </div>
          </div>
          <div  className="password">
            <label>Password</label>
            <div >
              <input
                placeholder="Password"
                type="password"
                id="exampleInputPassword1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="check">
            <input type="checkbox" id="exampleCheck1" />
            <label>Check me out</label>
          </div>
          <div className="bd">
          <button type="submit" className="b">
            Submit
          </button>
          <button className='but2'>
<Link to='/signup'>signup</Link>
</button>
          </div>
          <div className="invalid" id="messageBox" style={{ display: message ? "block" : "none" }}>
            {message}
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
