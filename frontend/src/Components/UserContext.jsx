import { createContext, useState } from "react";

export const Authcontext = createContext("");
const UserContext = ({ children }) => {
  const [userauth, setuserauth] = useState(false);
  return (
    <Authcontext.Provider value={{ userauth, setuserauth }}>
      {children}
    </Authcontext.Provider>
  );
};

export default UserContext;
