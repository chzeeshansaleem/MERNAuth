import axios from "axios";
import { useEffect, useState } from "react";
const Profile = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  let auth = localStorage.getItem("auth");

  const profiles = async () => {
    const res = await axios.get("http://localhost:8080/profile", {
      headers: {
        Authorization: auth,
      },
    });
    console.log(res);
    if (res.status == 200) {
      setname(res.data.name);
      setemail(res.data.email);
    } else {
      alert("Error: " + res.status);
    }
  };

  useEffect(() => {
    profiles();
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      <div>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
      </div>
    </div>
  );
};

export default Profile;
