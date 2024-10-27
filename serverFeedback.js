const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const port = 3022;
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

// Define the feedback schema
const feedbackSchema = new mongoose.Schema({
    feedback: { type: String, required: true },
});

// Create a model for the feedback
const Feedback = mongoose.model("Feedback", feedbackSchema);

// Serve the feedback HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'feedback.html')); // Ensure you have a feedback.html file
});

// POST route for receiving feedback
app.post('/api/feedback', async (req, res) => {
    const { feedback } = req.body;

    // Log the incoming request body
    console.log("Received feedback:", req.body);

    try {
        // Create a new feedback entry
        const newFeedback = new Feedback({
            feedback,
        });

        // Save the feedback to the database
        await newFeedback.save();
        console.log("Feedback received:", newFeedback); // Log the saved feedback
        res.send("Feedback submitted successfully!");

    } catch (error) {
        console.error("Feedback submission failed:", error);
        res.status(500).send("Failed to submit feedback");
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Feedback server started on port ${port}`);
});
