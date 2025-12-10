import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const AppContext = createContext();

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/data", {
        headers: { Authorization: token },
      });
      if (data.success) {
        setUser(data.user);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  const fetchUserTasks = async () => {
    try {
      const { data } = await axios.get("/api/tasks/get", {
        headers: { Authorization: token },
      });
      if (data.success) {
        setTasks(data.tasks);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

 

  useEffect(() => {
    if (user) {
      fetchUserTasks();
    } else {
      setTasks([]);
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setUser(null);
    }
  }, [token]);
  
  const value = { axios,user, setUser, tasks, setTasks, token, setToken, loading,fetchUserTasks };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
