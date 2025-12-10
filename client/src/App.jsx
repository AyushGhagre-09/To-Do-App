import React from "react";
import Dashboard from "./pages/Dashboard";
import Loading from "./components/Loading";
import { useAppContext } from "./context/AppContext";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
const App = () => {
  const { user, loading } = useAppContext();
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <Toaster />
      {user ? (
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      ) : (
        <div className="bg-gradient-to-b from-[#242124] to-[#000000] flex items-center justify-center h-screen w-screen">
          <Login />
        </div>
      )}
    </>
  );
};

export default App;
