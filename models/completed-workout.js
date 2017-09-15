var mongoose = require("mongoose");
var Exercise = require("./exercise");

// Schema Setup
var completedWorkoutSchema = new mongoose.Schema({
    workoutName: String,
    date: {type: Date, default: Date.now},
    exercise: [
        {
            exerciseName: String,
            weight: [],
            reps: []
        }
        
        ]
    
   
});

module.exports = mongoose.model("CompletedWorkout", completedWorkoutSchema);