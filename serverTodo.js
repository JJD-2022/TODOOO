const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const port = 3019;
const app = express();

app.use(express.static(__dirname));
app.use(express.urlencoded({extended:true}))
app.use(express.json()); 


mongoose.connect('mongodb+srv://22x018:hello%40123@todoappcluster.tcm1b.mongodb.net/TodoApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("MongoDB Connected Successfully!");
})
.catch((error) => {
    console.error("MongoDB connection error:", error);
});

const db=mongoose.connection
db.once('open', ()=>{
    console.log("MongoDB Connected Successfully!")
})

const userSchema = new mongoose.Schema({
    task:String
})

const Users = mongoose.model("todos", userSchema)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'todo.html'))
});

app.post('/post', async (req, res) => {
    const { task } = req.body; // This should capture the input value

    const user = new Users({ task });

    try {
        await user.save();
        console.log(user); // This will log the user object, which should include the task
        res.send("Task added successfully!");
    } catch (error) {
        console.error("Error saving task:", error);
        res.status(500).send("Error saving task.");
    }
});





app.listen(port, () => {
    console.log("Server started");
});