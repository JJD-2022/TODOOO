const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcrypt');

const port = 3022; // Change port number if necessary
const app = express();

// Middleware to serve static files and parse request bodies
app.use(express.static(__dirname)); // Serve static files from the current directory
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://22x018:hello%40123@todoappcluster.tcm1b.mongodb.net/TodoApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB Connected Successfully!");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });

const db = mongoose.connection;
db.once('open', () => {
    console.log("MongoDB Connection is open!");
});

// Define the user schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Create a model for the user
const Users = mongoose.model("signup", userSchema);

// Serve the login HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html')); // Ensure you have a login.html file
});

// POST route for user login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    console.log("Received login data:", { email, password }); // Log the received data

    try {
        // Check if user exists
        const user = await Users.findOne({ email });

        if (!user) {
            console.log("User not found.");
            return res.status(401).send("Invalid email or password!");
        }

        // Compare the provided password with the stored hashed password
        const match = await bcrypt.compare(password, user.password);
        
        if (!match) {
            console.log("Password does not match.");
            return res.status(401).send("Invalid email or password!");
        }

        console.log("User logged in successfully:", user);
        res.send("Login Successful!"); // Send success response

    } catch (error) {
        console.error("Login failed:", error);
        res.status(500).send("Failed to login");
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
