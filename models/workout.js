var mongoose = require("mongoose");
var Exercise = require("./exercise");

// Schema Setup
var workoutSchema = new mongoose.Schema({
    name: String,
    // date: new Date,
    exercise: [
        {
        name: String,
        sets: String,
        }
    ],
    completed: []
});

module.exports = mongoose.model("Workout", workoutSchema);