const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const homeSchema = new Schema({
  item: { type: String, required: true },
  
});

const Home = mongoose.model("Home", homeSchema);

module.exports = Home;
