import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      axios
        .get("http://127.0.0.1:8000/api/user/", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((response) => {
          setUser(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Failed to fetch user", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = (username, password) => {
    return axios
      .post("http://127.0.0.1:8000/api/token/", { username, password })
      .then((response) => {
        const token = response.data.access;
        console.log(token);
        localStorage.setItem("access_token", token);
        axios
          .get("http://127.0.0.1:8000/api/user/", {
            headers: { Authorization: "Bearer " + token },
          })
          .then((response) => {
            setUser(response.data);
          })
          .catch((error) => {
            console.log("Failed to fetch user", error);
          });
      });
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
