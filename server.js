const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const PORT = process.env.PORT || 3002;
const app = express();
const cors = require('cors');

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
// Add routes, both API and view
app.use(routes);


// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
var MONGODB_URI =  process.env.MONGODB_URI || "mongodb://localhost/emergency_kit";
mongoose.connect(MONGODB_URI);
const db = mongoose.connection;

mongoose.connection.on('connected', function() {
  console.log("connection established successfully");
  console.log("Running Seeds.....");
  require('./seeds/index.js')();	

  
});

mongoose.connection.on('error', function(err) {
  console.log('connection to mongo failed ' + err);
});

// Send every other request to the React app
// Define any API routes before this runs
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
