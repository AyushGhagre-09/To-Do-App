import React from "react";
import { CircleUserRound, LogIn } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
const Navbar = () => {
  const { setToken ,user} = useAppContext();

  const logout = async () => {
    try {
      setToken(null);
      localStorage.removeItem("token");
      toast.success("Logout Successfully");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex items-center justify-between px-6 h-16 bg-white border-b shadow-md">
      <div className="text-sm md:text-2xl font-semibold text-gray-800">To-Do App</div>

      <div className="flex items-center gap-3 text-gray-700">
        <CircleUserRound className="w-6 h-6" />
        <span className="hidden md:block font-medium text-sm">{user.name}</span>

        <button
          onClick={logout}
          className="hover:bg-gray-100 p-2 rounded-full transition  "

        >
          <LogIn className=" w-5 h-5 text-gray-700 " />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
