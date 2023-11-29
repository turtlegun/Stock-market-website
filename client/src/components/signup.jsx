import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Axios from "axios";
import "./signup.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function Signup() {
  const navigateTo = useNavigate();
  const [message, setMessage] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    Axios.post("http://localhost:3000/user", data)
      .then((response) => {
        if (response.data.message === "User already exists") {
          setMessage("User already exists");
        } else {
          
          navigateTo("/login")
        }
      })
      .catch((error) => {
        console.error("Error sending data to the backend:", error);
      });
  };

  return (
    <div className="signup">
      <h3>User Register</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="first">
          <label htmlFor="first_name">First name</label>
          <Controller
            name="first_name"
            control={control}
            render={({ field }) => (
              <input type="text" className="form-control" placeholder="First_name" {...field} />
            )}
          />
          <div className="error">
            {errors.first_name && errors.first_name.message}
          </div>
        </div>

        <div className="email">
          <label>Email address</label>
          <div className="input1">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input type="email" className="form-control" placeholder="Email" {...field} />
              )}
            />
            <div>.</div>
          </div>
          <div className="error">{errors.email && errors.email.message}</div>
        </div>

        <div className="pasL">
          <label>Password</label>
          <div>
            <Controller
              name="password"
              control={control}
              render={({ field }) => <input type="password" placeholder="Password" {...field} />}
            />
          </div>
          <div className="error">
            {errors.password && errors.password.message}
          </div>
        </div>

        <div className="checkL">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label>Check me out</label>
        </div>
        <button className='but2'>
<Link to='/login'>Login</Link>
</button>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <div id="messageBox" className="messageBox" style={{ display: message ? "block" : "none" }}>
          {message}
        </div>
      </form>
    </div>
  );
}

export default Signup;
