import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Header from "./pages/Header";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Logout from "./pages/Logout";
import { Authcontext } from "./Components/UserContext";
import { useContext } from "react";
import Error from "./pages/Error";

const Privateroute = () => {
  const auth = localStorage.getItem("auth");
  const { userauth } = useContext(Authcontext);
  return (
    <>{userauth || auth ? <Outlet /> : <Navigate replace to="/login" />}</>
  );
};
const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<Privateroute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

export default App;
