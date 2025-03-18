const db = require('../models')
const Task = db.tasks
const User = db.users  // Add to retrieve customers

exports.findAll = (req, res) => {
    Task.findAll()
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || 'Some error occurred'
        })
    })
};

// Retrieve tasks for a specific customer
exports.getUserTasks = async (req, res) => {
    const { username } = req.params;

    try {
        const tasks = await Task.findAll({ where: { clientUsername: username } });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving tasks.', error: error.message });
    }
};

// Create a new task with the associated mechanic and customer
exports.createTask = async (req, res) => {
    const { title, description = '', mechanicUsername, clientUsername } = req.body;

    console.log("Data received for task creation :", req.body); // Check

    if (!title || !mechanicUsername || !clientUsername) {
        console.error("Error: A field is missing!"); // Check
        return res.status(400).send({ message: "Title, mechanic username, and client username are required." });
    }

    try {
        const newTask = await Task.create({ title, description, mechanicUsername, clientUsername });
        console.log("Successfully created task :", newTask);
        res.send(newTask);
    } catch (error) {
        console.error("Server Error :", error);
        res.status(500).send({ message: "Could not create task.", error: error.message });
    }
};

// Retrieve all customers so that the mechanic can select them
exports.getAllClients = async (req, res) => {
    try {
        const clients = await User.findAll({ 
            where: { role: 'client' }, 
            attributes: ['username', 'first_name', 'last_name'] 
        });
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving clients.", error: error.message });
    }
};

// pdate task status
exports.updateTaskStatus = async (req, res) => {
    const { taskId, status } = req.body;

    if (!['todo', 'doing', 'done'].includes(status)) {
        return res.status(400).send({ message: "Invalid status." });
    }

    try {
        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).send({ message: "Task not found." });
        }

        await task.update({ status });
        res.send({ message: `Task status updated to ${status}` });
    } catch (error) {
        res.status(500).send({ message: "Error updating task status.", error: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    const { id } = req.params;
  
    try {
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found.' });
        }

        await task.destroy();
        res.status(200).json({ message: `Task ${id} deleted successfully.` });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task.', error: error.message });
    }
};

