const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HouseholdSchema = new Schema({
    name: {
        type: String,
        required: true
    },    
    users: {
      type: Array
  },
  createdBy: {
      type: String,
      required: true
  }
});

const Household = mongoose.model("Household", HouseholdSchema);

module.exports = Household;