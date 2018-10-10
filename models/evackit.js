const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const evacuationSchema = new Schema({
  item: { type: String, required: true },
  checked: { type: Boolean, default: false}
});

const Evacuation = mongoose.model("Evacuation", evacuationSchema);

module.exports = Evacuation;
