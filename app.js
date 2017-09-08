var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    // flash           = require("connect-flash"),
    passport        = require("passport"),
    localStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    Exercise        = require("./models/exercise"),
    Workout         = require("./models/workout");
    
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/lift_log", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));


// HOME PAGE ROUTE
app.get("/", function(req, res){
    res.render("index");
});


// WORKOUTS AND EXERCISE SHOW ROUTE
app.get("/workouts", function(req,res){
    Exercise.find({}, function(err, allExercises){
        if(err){
            res.redirect("/back");
        } else {
            Workout.find({}, function(err, allWorkouts){
                if(err){
                    res.redirect("/back");
                } else {
                    res.render("workouts", {exercises: allExercises, workouts: allWorkouts});
                }
            });
        }
    });
});

//NEW ROUTE - Show form to create new WORKOUT
app.get("/workouts:workout-name", function(req,res){
    res.render("add-workout")
});

// CREATE EXERCISE ROUTE
app.post("/exercises", function(req,res){
    var name = req.body.name;
    var newExercise = {name: name};
    Exercise.create(newExercise, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/workouts");
        }
    });
});

// SHOW ADD-WORKOUTS FORM
app.get("/add-workout", function(req,res){
    var name = req.query.name;
    console.log(name);
    Exercise.find({}, function(err, allExercises){
        if(err){
            console.log(err);
        } else {
            res.render("add-workout", {name: name, exercises: allExercises});
        }
    });
});


// CREATE WORKOUT ROUTE
app.post("/add-workout", function(req,res){
    var name = req.body.name;
    var newWorkout = {name: name};
    console.log(req.body);
    res.redirect("/workouts")
});

// HISTORY SHOW ROUTE
app.get("/history", function(req,res){
    res.render("history")
});









app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Lift Server is Running");
});