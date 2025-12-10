import express from "express";
import connectToDb from "./configs/db.js";
import cors from "cors";
import "dotenv/config";
import userRouter from "./routes/userRoutes.js";
import taskRouter from "./routes/taskRoutes.js";
const app = new express();
const PORT = process.env.PORT || 3000;

await connectToDb();

app.use(cors());
app.use(express.json());
app.use("/api/user",userRouter);
app.use("/api/tasks", taskRouter);

app.get("/", (req, res) => {
  res.send("Server is Live");
});

app.listen(PORT, () => {
  console.log(`Server is Listening on port ${PORT}`);
});
