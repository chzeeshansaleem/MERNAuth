import { Link, useNavigate } from "react-router-dom";
import { Authcontext } from "../Components/UserContext";
import { useContext } from "react";
const Header = () => {
  const { userauth, setuserauth } = useContext(Authcontext);
  let auth = sessionStorage.getItem("auth");
  if (auth) {
    setuserauth(true);
  }
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-dark">
        <ul className="d-flex justify-content-around text-white">
          {auth && userauth ? (
            <div>
              {" "}
              <li>
                <Link to="/" className="text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-white">
                  {" "}
                  Profile
                </Link>
              </li>
              <li>
                <button className="btn btn-danger" onClick={logout}>
                  {" "}
                  Logout
                </button>
              </li>
            </div>
          ) : (
            <div>
              {" "}
              <li>
                <Link to="/register" className="text-white">
                  {" "}
                  Register
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-white">
                  {" "}
                  Login
                </Link>
              </li>
            </div>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Header;
