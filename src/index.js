// index.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

const data = require('./data');

app.use(bodyParser.json());

// List all users
app.get('/users', (req, res) => {
    res.json(data);
});

// Get a specific user
app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = data.find(user => user.id === id);
    if (!user) {
        res.status(404).json({ message: 'User not found' });
    } else {
        res.json(user);
    }
});

// Create a new user
app.post('/users', (req, res) => {
    const newUser = {
        id: data.length + 1,
        name: req.body.name,
        email: req.body.email
    };
    data.push(newUser);
    res.status(201).json(newUser);
});

// Update a user
app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = data.find(user => user.id === id);
    if (!user) {
        res.status(404).json({ message: 'User not found' });
    } else {
        user.name = req.body.name;
        user.email = req.body.email;
        res.json(user);
    }
});

// Delete a user
app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = data.findIndex(user => user.id === id);
    if (userIndex === -1) {
        res.status(404).json({ message: 'User not found' });
    } else {
        const deletedUser = data.splice(userIndex, 1);
        res.json(deletedUser[0]);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});