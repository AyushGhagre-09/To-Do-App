import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const TaskForm = ({ editTask, setEditTask }) => {
  const { axios, token, fetchUserTasks } = useAppContext();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  const updateTask = async () => {
    try {
      const { data } = await axios.put(
        `/api/tasks/update/${editTask._id}`,
        formData,
        { headers: { Authorization: token } }
      );

      if (data.success) {
        toast.success("Task updated successfully");
        fetchUserTasks();
        setFormData({ title: "", description: "", status: "pending" });
        setEditTask(null);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const addTasks = async () => {
    try {
      const { data } = await axios.post(
        "/api/tasks/create",
        {
          title: formData.title,
          description: formData.description,
          status: formData.status,
        },
        { headers: { Authorization: token } }
      );
      console.log(data);
      if (data.success) {
        fetchUserTasks();
        setFormData({
          title: "",
          description: "",
          status: "pending",
        });
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editTask) updateTask();
    else addTasks();
  };
  useEffect(() => {
    if (editTask) {
      setFormData({
        title: editTask.title,
        description: editTask.description,
        status: editTask.status,
      });
    }
  }, [editTask]);

  return (
    <div className="max-h-80 relative top-12 z-1 mt-5 max-w-md mx-auto bg-white shadow-lg p-6 rounded-lg mb-20">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="title" className="font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full mt-1 border p-2 rounded h-8"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="font-medium">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full mt-1 border p-2 rounded h-8"
            required
          />
        </div>

        <div>
          <label htmlFor="status" className="font-medium">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full mt-1 border p-2 text-sm rounded h-9"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In-progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 "
        >
          {editTask ? "Edit" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
