module.exports = app => {
    const task = require('../controllers/task.controller.js')
    const router = require('express').Router()

    router.get('/', task.findAll); // Recover all tasks
    router.get('/user/:username', task.getUserTasks); // Retrieve tasks for a specific customer
    router.post('/create', task.createTask); // Add a new task
    router.put('/update-status', task.updateTaskStatus); // Update task status
    router.get('/clients', task.getAllClients); // Retrieve a list of all customers
    router.delete('/:id', task.deleteTask); // Delete a task via its ID

    app.use('/api/tasks', router);
};