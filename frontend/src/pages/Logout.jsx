import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const navigate = useNavigate();
  const auth = localStorage.clear();
  useEffect(() => {
    if (auth) {
      navigate("/login");
    }
  }, []);
  return <></>;
};

export default Logout;
