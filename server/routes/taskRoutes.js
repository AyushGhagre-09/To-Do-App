
import express from "express";
import { protect } from "../middlewares/auth.js";
import { getTasks,createTask,editTask,deleteTask} from "../controllers/taskController.js";
const taskRouter=express.Router();

taskRouter.get("/get",protect,getTasks);
taskRouter.post("/create",protect,createTask);
taskRouter.put("/update/:id",protect,editTask);
taskRouter.delete("/delete/:id",protect,deleteTask);

export  default taskRouter;