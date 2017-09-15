var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    // flash           = require("connect-flash"),
    passport        = require("passport"),
    localStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    Exercise        = require("./models/exercise"),
    Workout         = require("./models/workout"),
    CompletedWorkout = require("./models/completed-workout");
    
mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://localhost/lift_log", {useMongoClient: true});
mongoose.connect("mongodb://shawn:shawnlift_log@ds135234.mlab.com:35234/lift_log", {useMongoClient: true});
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
    res.render("add-workout");
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
    var exercise = req.body.exercise;
    // FILTER OUT EMPTY SETS
    var sets = (req.body.sets).filter(function(i){
                    return i!="";
                });
    var newWorkout = {name: name};
    Workout.create(newWorkout, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            console.log(req.body);
            // MAKE SURE EXERCISE IS AN ARRAY
            if(Array.isArray(exercise)){
                for(var i = 0; i < exercise.length; i++){
                newlyCreated.exercise.push({name: exercise[i], sets: sets[i]});
               }
            } else {
                newlyCreated.exercise.push({name: exercise, sets: sets});
            }
            newlyCreated.save();
            res.redirect("/workouts");
        }
    });
});

// HISTORY SHOW ROUTE
app.get("/history", function(req,res){
    res.render("history");
});

// DO WORKOUT ROUTE
app.get("/do-workout/:id", function(req,res){
    Workout.findById(req.params.id, function(err, foundWorkout){
        if(err){
            console.log(err);
        } else {
            res.render("do-workout", {workout: foundWorkout});
        }
    });
});


// DO WORKOUT POST
app.post("/do-workout/:id", function(req,res){
    var exercises = Object.keys(req.body);
    console.log(req.body);
    var newCompleted = req.body[exercises[0]];
    
   
    // console.log(newCompleted);
    Workout.findById(req.params.id, function(err, foundWorkout){
        if(err){
            console.log(err);
        } else {
            CompletedWorkout.create(req.body, function(err, newlyCreated){
                if(err){
                    console.log(err);
                } else {
                    // newlyCreated.save();
                    // console.log(newlyCreated);
                    // foundWorkout.completed.push(newlyCreated);
                    // foundWorkout.save();
                    // console.log(foundWorkout);
                    // console.log(newlyCreated);
                    res.redirect("/workouts");
                }
            });
        }
    });
    
});

app.get("/photo-credits", function(req,res){
    res.render("photo-credits");
});








app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Lift Server is Running");
});