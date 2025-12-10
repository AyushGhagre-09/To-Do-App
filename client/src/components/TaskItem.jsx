import React from "react";
import { Edit3, Trash2, Clock, Loader, CheckCircle } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
const Taskitem = ({setEditTask}) => {
  const { axios, token, fetchUserTasks, tasks } = useAppContext();

  const deleteTask = async (id) => {
    try {
      const { data } = await axios.delete(`/api/tasks/delete/${id}`, {
        headers: { Authorization: token },
      });
      if (data.success) {
        fetchUserTasks();
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  if (!tasks.length) {
    return (
      <p className="text-center text-gray-700 mt-5 text-md">No tasks found</p>
    );
  }
  const getStatusBadge = (status) => {
    if (status === "pending")
      return (
        <span className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
          <Clock size={14} /> Pending
        </span>
      );

    if (status === "in-progress")
      return (
        <span className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
          <Loader size={14} className="animate-spin" /> In Progress
        </span>
      );

    return (
      <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
        <CheckCircle size={14} /> Done
      </span>
    );
  };

  return (
    <div className="max-w-lg mx-auto mt-6 space-y-4">
      {tasks.map((t) => (
        <div
          key={t._id}
          className="p-5 bg-white shadow-sm hover:shadow-lg transition-shadow rounded-xl border border-gray-200"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold">{t.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{t.description}</p>
            </div>

            {/* Status badge */}
            {getStatusBadge(t.status)}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button onClick={()=>{scrollTo(0,0);setEditTask(t)}}className="flex items-center gap-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 transition text-white text-sm rounded-lg shadow">
              <Edit3 size={15} />Edit
            </button>

            <button
              onClick={() => deleteTask(t._id)}
              className="flex items-center gap-1 px-3 py-1 bg-red-500 hover:bg-red-600 transition text-white text-sm rounded-lg shadow"
            >
              <Trash2 size={15} /> Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Taskitem;
