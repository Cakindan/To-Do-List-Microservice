const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

let tasks = ["Add task as soon as possible"];  // Default task

app.use(cors());
app.use(express.json());

app.get('/tasks', (req, res) => {
    res.json({ tasks });
});

app.post('/tasks', (req, res) => {
    const task = req.body.task;
    tasks.push(task);
    res.status(201).json({ task });
});

app.delete('/tasks/:task', (req, res) => {
    const task = req.params.task;
    tasks = tasks.filter(t => t !== task);
    res.status(200).json({ task });
});

app.put('/tasks', (req, res) => {
    const { oldTask, newTask } = req.body;
    const taskIndex = tasks.indexOf(oldTask);
    if (taskIndex > -1) {
        tasks[taskIndex] = newTask;
        res.status(200).json({ oldTask, newTask });
    } else {
        res.status(404).json({ error: 'Task not found' });
    }
});

app.listen(port, () => {
    console.log(`Task Service listening at http://localhost:${port}`);
});
