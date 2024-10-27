const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcrypt');

const port = 3020;
const app = express();
app.use(express.static(__dirname)); 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect('mongodb+srv://22x018:hello%40123@todoappcluster.tcm1b.mongodb.net/TodoApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected Successfully!"))
.catch((error) => console.error("MongoDB connection error:", error));

const db = mongoose.connection;
db.once('open', () => console.log("MongoDB Connection is open!"));

// User schema
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
});

const SignupUsers = mongoose.model("login", userSchema);

// Serve the login HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});


// POST route for user login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await SignupUsers.findOne({ email });

        if (!user) {
            console.log("No user found with that email");
            return res.status(401).send("Invalid email or password");
        }

        const match = await bcrypt.compare(password, user.password);
        
        if (!match) {
            console.log("Password does not match");
            return res.status(401).send("Invalid email or password");
        }

        console.log("User logged in:", user);
        res.send("Login Successful!");

    } catch (error) {
        console.error("Login failed:", error);
        res.status(500).send("Failed to login");
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
