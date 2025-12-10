import { useState } from "react";
import Navbar from "../components/Navbar";
import TaskForm from "../components/Taskform";
import Taskitem from "../components/Taskitem";
const Dashboard = () => {
  const [editTask, setEditTask] = useState(null);
  return (
    <div>
      <Navbar />
      <TaskForm editTask={editTask} setEditTask={setEditTask} />
      <Taskitem setEditTask={setEditTask} />
    </div>
  );
};

export default Dashboard;
