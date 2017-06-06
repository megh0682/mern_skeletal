// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Require History Schema
var History = require("./models/History");

// Create Instance of Express
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

// -------------------------------------------------

// MongoDB Configuration configuration (Change this URL to your own DB)
mongoose.connect("mongodb://newyorktimesdb:newyorktimesdb@ds161931.mlab.com:61931/newyorktimesdb");

                  
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------

// Main "/" Route. This will redirect the user to our rendered React application
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// This is the route we will send GET requests to retrieve our most recent search data.
// We will call this route the moment our page gets rendered
app.get("/api", function(req, res) {

  // We will find all the records, sort it in descending order, then limit the records to 5
  History.find({}).sort([
    ["date", "descending"]
  ]).limit(5).exec(function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});

// This is the route we will send POST requests to save each search.
app.post("/api", function(req, res) {
  console.log("headline: " + req.body.headline);
  console.log("weblink: " + req.body.web_url);
  // Here we'll save the location based on the JSON input.
  // We'll use Date.now() to always get the current date time
  History.create({
    headline: req.body.headline,
    weblink:req.body.weblink,
    date: Date.now()
  }, function(err,doc) {
    if (err) {
      console.log(err);
    }
    else {
      console.log(doc._id);
      res.send("Saved Search");

    }
  });
});
//Get a single record using id
app.get("/api/:id", function(req, res) {

  // We will find all the records, sort it in descending order, then limit the records to 5
  History.findById(req.params.id, function (err, doc){
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
    
});

// This is the route we will send delete requests to delete the article by id
app.delete("/api/:id", function(req, res) {
  console.log("id: " + req.params.id);
    History.findByIdAndRemove(req.params.id, function (err,doc) {  
    // We'll create a simple object to send back with a message and the id of the document that was removed
    var response = {
        message: "Article successfully deleted",
        id: doc._id
    };
    res.send(response);
    });
});


// -------------------------------------------------

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
