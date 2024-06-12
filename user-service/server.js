const express = require('express');
const cors = require('cors');
const app = express();
const port = 3002;

let users = [];

app.use(cors()); // Enable CORS
app.use(express.json());

app.get('/', (req, res) => {
    res.send('User Service');
});

app.get('/users', (req, res) => {
    res.json({ users });
});

app.post('/users', (req, res) => {
    const user = req.body.user;
    users.push(user);
    res.status(201).json({ user });
});

app.delete('/users/:user', (req, res) => {
    const user = req.params.user;
    users = users.filter(u => u !== user);
    res.status(200).json({ user });
});

app.put('/users', (req, res) => {
    const { oldUser, newUser } = req.body;
    const userIndex = users.indexOf(oldUser);
    if (userIndex > -1) {
        users[userIndex] = newUser;
        res.status(200).json({ oldUser, newUser });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

app.listen(port, () => {
    console.log(`User Service listening at http://localhost:${port}`);
});

