var mongoose = require("mongoose");

// Schema Setup
var exerciseSchema = new mongoose.Schema({
    name: String,
    set_number: String,
    weight: String,
    reps: String,
    created: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Exercise", exerciseSchema);