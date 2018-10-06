const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const evacuationSchema = new Schema({
  item: { type: String, required: true },
  
});

const Evacuation = mongoose.model("Evacuation", evacuationSchema);

module.exports = Evacuation;
