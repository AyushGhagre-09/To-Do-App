import Task from "../models/Task.js";

export const getTasks = async (req, res) => {
    try {
        const userId = req.user._id;
        const tasks = await Task.find({ userId }).sort({ updatedAt: -1 });
        res.json({ success: true, tasks });
    } catch(error) {
        res.json({ success: false, message: error.message });
    }
}

export const createTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const userId = req.user._id;
        await Task.create({ title, description, status, userId });
        res.json({ success: true, message: "Task Created" });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const editTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;
        const task = await Task.findById(id);

        if (!task) {
            return res.json({ success: false, message: 'Task not found' });
        }
        if (!task.userId.equals(req.user._id)) {
            return res.json({ success: false, message: 'Not Authorized' });
        }

        task.title = title ?? task.title;
        task.description = description ?? task.description;
        task.status = status ?? task.status;

        // Save updated task
        const updatedTask = await task.save();

        res.json({ success: true, task: updatedTask });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const deleteTask = async (req, res) => {
    try {
        const userId = req.user._id;
        const { id } = req.params;
        
        const task = await Task.findOneAndDelete({ _id: id, userId });
        if (!task) {
            return res.json({ success: false, message: 'Task not found' });
        }
        res.json({ success: true, message: "Task Deleted" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
