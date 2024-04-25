const { createContext, useState, useEffect, useContext } = require("react");

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData?.user,
        token: parseData?.token,
      });
    }
  }, []);
  return (
    <>
      <AuthContext.Provider value={[auth, setAuth]}>
        {children}
      </AuthContext.Provider>
    </>
  );
};
