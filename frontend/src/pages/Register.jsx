import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [show, setshow] = useState("show");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function toggle(e) {
    e.preventDefault();
    if (show == "show") {
      setshow("hide");
    } else {
      setshow("show");
    }
  }
  const register = async (e) => {
    console.log("Clicked");
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/register", {
        name: name,
        email: email,
        password: password,
      });
      alert("Registration successful!");
      navigate("/login");
      console.log(response);
    } catch (error) {
      if (error.response.status === 409) {
        alert("Email already exists");
      } else {
        alert("Registration failed!");
      }
      console.error(error);
    }
  };

  return (
    <>
      <form>
        <input
          className="form-control mt-2"
          type="text"
          name="name"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
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
        <button
          className="btn btn-success mt-2"
          type="submit"
          onClick={register}
        >
          Register
        </button>
      </form>
    </>
  );
};

export default Register;
