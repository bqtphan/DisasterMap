// Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require('./models');
const cors = require('cors');
const routes = require('./routes');

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 3001;

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Routes
app.use(routes);

// Starting the server, syncing our models
db.sequelize.sync({}).then(() => {
  app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });
})

