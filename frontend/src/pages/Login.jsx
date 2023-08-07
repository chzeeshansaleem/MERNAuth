import { useState, useContext, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { Authcontext } from "../Components/UserContext";
const Login = () => {
  const [show, setshow] = useState("show");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const naviagte = useNavigate();
  const { setuserauth } = useContext(Authcontext);
  const auth = localStorage.getItem("auth");
  function toggle(e) {
    e.preventDefault();
    if (show == "show") {
      setshow("hide");
    } else {
      setshow("show");
    }
  }
  const login = async (e) => {
    console.log("Clicked");
    e.preventDefault();
    const response = await axios.post("http://localhost:8080/login", {
      email,
      password,
    });
    if (response.status == 200) {
      sessionStorage.setItem("auth", response.data.token);
      setuserauth(true);
      naviagte("/");
    }

    console.log(response);
  };
  useEffect(() => {
    if (auth) {
      naviagte("/");
    } else {
      setuserauth(false);
    }
  }, []);

  return (
    <>
      <form>
        <input
          className="form-control mt-2"
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="form-control mt-2"
          type={show === "show" ? "password" : "text"}
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className="btn" onClick={toggle}>
          {show}
        </span>
        <button className="btn btn-success mt-2" type="submit" onClick={login}>
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
