const express = require('express');
const app = express();
const port1 = 3019;
const port2 = 3020;
const port3 = 3021;
const port4 = 3022;

// Middleware to serve static files
app.use(express.static(__dirname)); // Ensure your HTML files are served

// Start server for port 3019
app.get('/todo', (req, res) => {
    res.sendFile(__dirname + '/3019-todo.html');
});
app.listen(port1, () => {
    console.log(`Todo server running on http://localhost:${port1}`);
});

// Start server for port 3020
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/3020-login.html');
});
app.listen(port2, () => {
    console.log(`Login server running on http://localhost:${port2}`);
});

// Start server for port 3021
app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/3021-signup.html');
});
app.listen(port3, () => {
    console.log(`Signup server running on http://localhost:${port3}`);
});

// Start server for port 3022
app.get('/feedback', (req, res) => {
    res.sendFile(__dirname + '/3022-feedback.html');
});
app.listen(port4, () => {
    console.log(`Feedback server running on http://localhost:${port4}`);
});
